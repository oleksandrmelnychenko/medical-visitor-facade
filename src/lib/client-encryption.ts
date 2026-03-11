"use client";

const SESSION_KEY_STORAGE = "gmed.client-encryption-key.v1";

// In-memory cache to avoid re-importing the key on every call
let cachedKey: CryptoKey | null = null;

function toBase64(buffer: ArrayBuffer) {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)));
}

function fromBase64(value: string) {
  return Uint8Array.from(atob(value), (char) => char.charCodeAt(0));
}

async function getOrCreateSessionKey() {
  if (typeof window === "undefined") {
    throw new Error("Client encryption is only available in the browser.");
  }

  if (cachedKey) return cachedKey;

  const existingKey = window.sessionStorage.getItem(SESSION_KEY_STORAGE);

  if (existingKey) {
    cachedKey = await crypto.subtle.importKey(
      "raw",
      fromBase64(existingKey),
      { name: "AES-GCM" },
      false,
      ["encrypt", "decrypt"]
    );
    return cachedKey;
  }

  const key = await crypto.subtle.generateKey(
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"]
  );
  const rawKey = await crypto.subtle.exportKey("raw", key);
  window.sessionStorage.setItem(SESSION_KEY_STORAGE, toBase64(rawKey));
  cachedKey = key;

  return cachedKey;
}

export async function saveEncryptedJson(storageKey: string, value: unknown) {
  const key = await getOrCreateSessionKey();
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encodedPayload = new TextEncoder().encode(JSON.stringify(value));
  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    encodedPayload
  );

  localStorage.setItem(
    storageKey,
    JSON.stringify({
      iv: toBase64(iv.buffer),
      payload: toBase64(encrypted),
    })
  );
}

export async function readEncryptedJson<T>(storageKey: string): Promise<T | null> {
  const rawValue = localStorage.getItem(storageKey);

  if (!rawValue) {
    return null;
  }

  try {
    const parsed = JSON.parse(rawValue) as { iv?: string; payload?: string };

    if (!parsed.iv || !parsed.payload) {
      localStorage.removeItem(storageKey);
      return null;
    }

    const key = await getOrCreateSessionKey();
    const decrypted = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv: fromBase64(parsed.iv) },
      key,
      fromBase64(parsed.payload)
    );

    return JSON.parse(new TextDecoder().decode(decrypted)) as T;
  } catch {
    localStorage.removeItem(storageKey);
    return null;
  }
}

export function removeEncryptedJson(storageKey: string) {
  localStorage.removeItem(storageKey);
}
