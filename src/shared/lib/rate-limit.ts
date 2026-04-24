import { createHash } from "node:crypto";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const RATE_LIMIT_PROFILES = {
  contact: {
    limit: 5,
    window: "10 m",
    windowSeconds: 600,
    prefix: "medical-website:contact-submit",
  },
  apply: {
    limit: 3,
    window: "30 m",
    windowSeconds: 1800,
    prefix: "medical-website:apply-submit",
  },
} as const;

type RateLimitProfile = keyof typeof RATE_LIMIT_PROFILES;

type RateLimitHeaders = Record<string, string>;

type RateLimitResult = {
  allowed: boolean;
  headers: RateLimitHeaders;
};

type RateLimitCheckPayload = {
  limit: number;
  remaining: number;
  reset: number;
};

type HeaderSource = Pick<Headers, "get">;

function createRedisClient() {
  const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;

  if (!url || !token) {
    return null;
  }

  return new Redis({ url, token });
}

const redis = createRedisClient();

const limiters = redis
  ? {
      contact: new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(
          RATE_LIMIT_PROFILES.contact.limit,
          RATE_LIMIT_PROFILES.contact.window,
        ),
        prefix: RATE_LIMIT_PROFILES.contact.prefix,
        ephemeralCache: new Map<string, number>(),
        timeout: 1000,
      }),
      apply: new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(
          RATE_LIMIT_PROFILES.apply.limit,
          RATE_LIMIT_PROFILES.apply.window,
        ),
        prefix: RATE_LIMIT_PROFILES.apply.prefix,
        ephemeralCache: new Map<string, number>(),
        timeout: 1000,
      }),
    }
  : null;

function getClientIp(headers: HeaderSource) {
  const forwardedFor = headers.get("x-forwarded-for");
  if (forwardedFor) {
    const firstForwardedIp = forwardedFor.split(",")[0]?.trim();
    if (firstForwardedIp) {
      return firstForwardedIp;
    }
  }

  return (
    headers.get("x-real-ip")
    ?? headers.get("cf-connecting-ip")
    ?? headers.get("x-vercel-forwarded-for")
    ?? undefined
  );
}

function buildIdentifier(headers: HeaderSource, profile: RateLimitProfile) {
  const ip = getClientIp(headers);
  const userAgent = headers.get("user-agent") ?? "unknown";
  const hashedIdentity = createHash("sha256")
    .update(ip ? `ip:${ip}` : `ua:${userAgent}`)
    .digest("hex");

  return `${profile}:${hashedIdentity}`;
}

function buildRateLimitHeaders(
  profile: RateLimitProfile,
  result: RateLimitCheckPayload,
): RateLimitHeaders {
  const resetInSeconds = Math.max(0, Math.ceil((result.reset - Date.now()) / 1000));
  const config = RATE_LIMIT_PROFILES[profile];

  return {
    "RateLimit-Limit": String(result.limit),
    "RateLimit-Remaining": String(Math.max(result.remaining, 0)),
    "RateLimit-Reset": String(resetInSeconds),
    "RateLimit-Policy": `${config.limit};w=${config.windowSeconds}`,
  };
}

export async function enforceRateLimit(
  headers: HeaderSource,
  profile: RateLimitProfile,
): Promise<RateLimitResult> {
  const limiter = limiters?.[profile];

  if (!limiter) {
    return { allowed: true, headers: {} };
  }

  try {
    const result = await limiter.limit(buildIdentifier(headers, profile));
    const rateLimitHeaders = buildRateLimitHeaders(profile, result);

    if (!result.success) {
      return {
        allowed: false,
        headers: {
          ...rateLimitHeaders,
          "Retry-After": rateLimitHeaders["RateLimit-Reset"],
        },
      };
    }

    return { allowed: true, headers: rateLimitHeaders };
  } catch (error) {
    console.error(`[ratelimit:${profile}] failed`, error);

    return { allowed: true, headers: {} };
  }
}
