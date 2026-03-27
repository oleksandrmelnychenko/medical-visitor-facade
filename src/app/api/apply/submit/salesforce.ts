import type { SalesforceBundle } from "@/components/sections/request-appointment/wizard/salesforce-bundle";

type SalesforceJsonValue = string | boolean;
type SalesforcePayload = Record<string, SalesforceJsonValue>;

interface SalesforceAccessTokenResponse {
  access_token?: string;
  instance_url?: string;
  token_type?: string;
  error?: string;
  error_description?: string;
}

interface SalesforceCreateSuccess {
  id: string;
  success: boolean;
  errors: unknown[];
  created?: boolean;
}

interface SalesforceAuthContext {
  accessToken: string;
  instanceUrl: string;
}

interface SalesforceConfig {
  apiVersion: string;
  baseUrl: string;
  clientId: string;
  clientSecret: string;
}

let tokenCache:
  | (SalesforceAuthContext & {
      baseUrl: string;
      expiresAt: number;
    })
  | null = null;

const COUNTRY_CODES: Record<string, string> = {
  Germany: "DE",
  "United States": "US",
  "United Kingdom": "GB",
  France: "FR",
  Italy: "IT",
  Spain: "ES",
  Netherlands: "NL",
  Belgium: "BE",
  Austria: "AT",
  Switzerland: "CH",
  Poland: "PL",
  Belarus: "BY",
  Moldova: "MD",
  Ukraine: "UA",
  Russia: "RU",
  Georgia: "GE",
  Armenia: "AM",
  Azerbaijan: "AZ",
  Kazakhstan: "KZ",
  Uzbekistan: "UZ",
  Kyrgyzstan: "KG",
  Tajikistan: "TJ",
  Turkmenistan: "TM",
  China: "CN",
  Japan: "JP",
  "South Korea": "KR",
  India: "IN",
  Brazil: "BR",
  Mexico: "MX",
  Australia: "AU",
  Canada: "CA",
  "Saudi Arabia": "SA",
  UAE: "AE",
  Turkey: "TR",
  Egypt: "EG",
  "South Africa": "ZA",
};

const GERMANY_STATE_CODES: Record<string, string> = {
  BW: "BW",
  "BADEN-WURTTEMBERG": "BW",
  "BADEN WURTTEMBERG": "BW",
  BY: "BY",
  BAVARIA: "BY",
  BAYERN: "BY",
  BE: "BE",
  BERLIN: "BE",
  BB: "BB",
  BRANDENBURG: "BB",
  HB: "HB",
  BREMEN: "HB",
  HH: "HH",
  HAMBURG: "HH",
  HE: "HE",
  HESSE: "HE",
  HESSEN: "HE",
  MV: "MV",
  "MECKLENBURG-VORPOMMERN": "MV",
  "MECKLENBURG VORPOMMERN": "MV",
  NI: "NI",
  "LOWER SAXONY": "NI",
  NIEDERSACHSEN: "NI",
  NW: "NW",
  "NORTH RHINE-WESTPHALIA": "NW",
  "NORTH RHINE WESTPHALIA": "NW",
  "NORDRHEIN-WESTFALEN": "NW",
  "NORDRHEIN WESTFALEN": "NW",
  RP: "RP",
  "RHINELAND-PALATINATE": "RP",
  "RHINELAND PALATINATE": "RP",
  RHEINLANDPFALZ: "RP",
  "RHEINLAND-PFALZ": "RP",
  SL: "SL",
  SAARLAND: "SL",
  SN: "SN",
  SAXONY: "SN",
  SACHSEN: "SN",
  ST: "ST",
  "SAXONY-ANHALT": "ST",
  "SAXONY ANHALT": "ST",
  "SACHSEN-ANHALT": "ST",
  SH: "SH",
  "SCHLESWIG-HOLSTEIN": "SH",
  "SCHLESWIG HOLSTEIN": "SH",
  TH: "TH",
  THURINGIA: "TH",
  THURINGEN: "TH",
  "THURINGEN ": "TH",
};

const US_STATE_CODES: Record<string, string> = {
  AL: "AL",
  ALABAMA: "AL",
  AK: "AK",
  ALASKA: "AK",
  AZ: "AZ",
  ARIZONA: "AZ",
  AR: "AR",
  ARKANSAS: "AR",
  CA: "CA",
  CALIFORNIA: "CA",
  CO: "CO",
  COLORADO: "CO",
  CT: "CT",
  CONNECTICUT: "CT",
  DE: "DE",
  DELAWARE: "DE",
  FL: "FL",
  FLORIDA: "FL",
  GA: "GA",
  GEORGIA: "GA",
  HI: "HI",
  HAWAII: "HI",
  ID: "ID",
  IDAHO: "ID",
  IL: "IL",
  ILLINOIS: "IL",
  IN: "IN",
  INDIANA: "IN",
  IA: "IA",
  IOWA: "IA",
  KS: "KS",
  KANSAS: "KS",
  KY: "KY",
  KENTUCKY: "KY",
  LA: "LA",
  LOUISIANA: "LA",
  ME: "ME",
  MAINE: "ME",
  MD: "MD",
  MARYLAND: "MD",
  MA: "MA",
  MASSACHUSETTS: "MA",
  MI: "MI",
  MICHIGAN: "MI",
  MN: "MN",
  MINNESOTA: "MN",
  MS: "MS",
  MISSISSIPPI: "MS",
  MO: "MO",
  MISSOURI: "MO",
  MT: "MT",
  MONTANA: "MT",
  NE: "NE",
  NEBRASKA: "NE",
  NV: "NV",
  NEVADA: "NV",
  NH: "NH",
  "NEW HAMPSHIRE": "NH",
  NJ: "NJ",
  "NEW JERSEY": "NJ",
  NM: "NM",
  "NEW MEXICO": "NM",
  NY: "NY",
  "NEW YORK": "NY",
  NC: "NC",
  "NORTH CAROLINA": "NC",
  ND: "ND",
  "NORTH DAKOTA": "ND",
  OH: "OH",
  OHIO: "OH",
  OK: "OK",
  OKLAHOMA: "OK",
  OR: "OR",
  OREGON: "OR",
  PA: "PA",
  PENNSYLVANIA: "PA",
  RI: "RI",
  "RHODE ISLAND": "RI",
  SC: "SC",
  "SOUTH CAROLINA": "SC",
  SD: "SD",
  "SOUTH DAKOTA": "SD",
  TN: "TN",
  TENNESSEE: "TN",
  TX: "TX",
  TEXAS: "TX",
  UT: "UT",
  UTAH: "UT",
  VT: "VT",
  VERMONT: "VT",
  VA: "VA",
  VIRGINIA: "VA",
  WA: "WA",
  WASHINGTON: "WA",
  WV: "WV",
  "WEST VIRGINIA": "WV",
  WI: "WI",
  WISCONSIN: "WI",
  WY: "WY",
  WYOMING: "WY",
  DC: "DC",
  "DISTRICT OF COLUMBIA": "DC",
};

const LANGUAGE_PICKLIST_VALUES: Record<string, string> = {
  english: "English",
  en: "English",
  german: "German",
  deutsch: "German",
  de: "German",
  russian: "Russian",
  ru: "Russian",
  ukrainian: "Ukrainian",
  ukrainisch: "Ukrainian",
  ua: "Ukrainian",
  spanish: "Spanish",
  espanol: "Spanish",
  es: "Spanish",
  french: "French",
  francais: "French",
  fr: "French",
  italian: "Italian",
  it: "Italian",
  polish: "Polish",
  polski: "Polish",
  pl: "Polish",
  dutch: "Dutch",
  nederlands: "Dutch",
  portuguese: "Portuguese",
  portugues: "Portuguese",
  pt: "Portuguese",
  arabic: "Arabic",
  ar: "Arabic",
  turkish: "Turkish",
  turkce: "Turkish",
  tr: "Turkish",
  chinese: "Chinese",
  mandarin: "Chinese",
  zh: "Chinese",
  japanese: "Japanese",
  ja: "Japanese",
  korean: "Korean",
  ko: "Korean",
  armenian: "Armenian",
  georgian: "Georgian",
  azerbaijani: "Azerbaijani",
  kazakh: "Kazakh",
  uzbek: "Uzbek",
  kyrgyz: "Kyrgyz",
  tajik: "Tajik",
  turkmen: "Turkmen",
  belarusian: "Belarusian",
  romanian: "Romanian",
  moldovan: "Romanian",
  hindi: "Hindi",
};

const LEGAL_SEX_VALUES: Record<
  NonNullable<SalesforceBundle["payload"]["legalSex"]>,
  string
> = {
  female: "Female",
  male: "Male",
  diverse: "Nonbinary",
  no_entry: "Not Listed",
};

const MEDICAL_SERVICE_KEYS = new Set(["medical-transport", "air-ambulance"]);
const NONMEDICAL_SERVICE_KEYS = new Set([
  "driver",
  "concierge",
  "business-aviation",
]);

function getConfig(): SalesforceConfig {
  const baseUrl = process.env.SALESFORCE_BASE_URL?.trim();
  const clientId = process.env.SALESFORCE_CLIENT_ID?.trim();
  const clientSecret = process.env.SALESFORCE_CLIENT_SECRET?.trim();
  const apiVersion =
    process.env.SALESFORCE_API_VERSION?.trim().replace(/^v/i, "") || "64.0";

  if (!baseUrl || !clientId || !clientSecret) {
    throw new Error("Missing Salesforce environment configuration");
  }

  return {
    apiVersion: `v${apiVersion}`,
    baseUrl: baseUrl.replace(/\/+$/, ""),
    clientId,
    clientSecret,
  };
}

function getString(value: string | null | undefined) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

function assignIfPresent(
  target: SalesforcePayload,
  key: string,
  value: string | boolean | undefined
) {
  if (value !== undefined) {
    target[key] = value;
  }
}

function normalizeLookupKey(value: string) {
  return value
    .trim()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .trim()
    .toUpperCase();
}

function resolveCountryCode(country: string | null | undefined) {
  if (!country) return undefined;
  return COUNTRY_CODES[country.trim()];
}

function resolveStateCode(
  state: string | null | undefined,
  countryCode: string | undefined
) {
  const trimmed = getString(state);
  if (!trimmed || !countryCode) return undefined;

  const key = normalizeLookupKey(trimmed);

  if (countryCode === "DE") {
    return GERMANY_STATE_CODES[key];
  }

  if (countryCode === "US") {
    return US_STATE_CODES[key];
  }

  return undefined;
}

function resolveLanguage(language: string | null | undefined) {
  const trimmed = getString(language);
  if (!trimmed) return undefined;
  return LANGUAGE_PICKLIST_VALUES[normalizeLookupKey(trimmed).toLowerCase()];
}

function getPrimaryPhone(bundle: SalesforceBundle) {
  return bundle.payload.phones[0]?.number?.trim() || undefined;
}

function getMobilePhone(bundle: SalesforceBundle) {
  const whatsAppNumber = bundle.payload.whatsappConsent
    ? getString(bundle.payload.whatsappNumber)
    : undefined;

  if (whatsAppNumber) {
    return whatsAppNumber;
  }

  const primaryPhone = bundle.payload.phones[0];
  if (primaryPhone?.type === "mobile") {
    return getString(primaryPhone.number);
  }

  return undefined;
}

function hasAnyService(
  selectedServices: string[],
  serviceKeys: Set<string>
) {
  return selectedServices.some((service) => serviceKeys.has(service));
}

function buildLeadPayload(bundle: SalesforceBundle): SalesforcePayload {
  const { payload } = bundle;
  const countryCode = resolveCountryCode(payload.country);
  const leadPayload: SalesforcePayload = {
    LastName: payload.lastName.trim(),
    LeadSource: "Web Form",
    MedicalDocsReceived__c: payload.hasMedicalRecords === "yes",
    MedicalService__c: hasAnyService(payload.services, MEDICAL_SERVICE_KEYS),
    NonmedicalService__c: hasAnyService(
      payload.services,
      NONMEDICAL_SERVICE_KEYS
    ),
    HasOptedOutOfEmail: payload.emailConsent === false,
    DoNotCall: false,
  };

  assignIfPresent(leadPayload, "FirstName", getString(payload.firstName));
  assignIfPresent(leadPayload, "Email", getString(payload.email));
  assignIfPresent(leadPayload, "Phone", getPrimaryPhone(bundle));
  assignIfPresent(
    leadPayload,
    "GenderIdentity",
    payload.legalSex ? LEGAL_SEX_VALUES[payload.legalSex] : undefined
  );
  assignIfPresent(leadPayload, "Street", getString(payload.streetAddress));
  assignIfPresent(leadPayload, "City", getString(payload.city));
  assignIfPresent(
    leadPayload,
    "StateCode",
    resolveStateCode(payload.state, countryCode)
  );
  assignIfPresent(leadPayload, "PostalCode", getString(payload.zipCode));
  assignIfPresent(leadPayload, "CountryCode", countryCode);
  assignIfPresent(
    leadPayload,
    "Language__c",
    resolveLanguage(payload.primaryLanguage)
  );
  assignIfPresent(leadPayload, "MobilePhone", getMobilePhone(bundle));

  return leadPayload;
}

function getFileName(file: File) {
  const trimmed = file.name.trim();
  if (/\.[A-Za-z0-9]+$/.test(trimmed)) {
    return trimmed;
  }

  const extension =
    file.type === "application/pdf"
      ? ".pdf"
      : file.type === "application/zip" ||
          file.type === "application/x-zip-compressed"
        ? ".zip"
        : file.type === "image/png"
          ? ".png"
          : file.type === "image/webp"
            ? ".webp"
            : file.type === "image/gif"
              ? ".gif"
              : ".jpg";

  return `${trimmed || "medical-document"}${extension}`;
}

function parseSalesforceError(payload: unknown) {
  if (Array.isArray(payload) && payload.length > 0) {
    return parseSalesforceError(payload[0]);
  }

  if (payload && typeof payload === "object") {
    const data = payload as Record<string, unknown>;
    const message =
      typeof data.message === "string"
        ? data.message
        : typeof data.error_description === "string"
          ? data.error_description
          : typeof data.error === "string"
            ? data.error
            : "Unknown Salesforce error";
    const code =
      typeof data.errorCode === "string" ? ` (${data.errorCode})` : "";
    return `${message}${code}`;
  }

  return "Unknown Salesforce error";
}

async function readJson(response: Response) {
  const text = await response.text();
  if (!text) return null;

  try {
    return JSON.parse(text) as unknown;
  } catch {
    return text;
  }
}

async function getAuthContext(): Promise<SalesforceAuthContext> {
  const config = getConfig();

  if (
    tokenCache &&
    tokenCache.baseUrl === config.baseUrl &&
    Date.now() < tokenCache.expiresAt
  ) {
    return tokenCache;
  }

  const params = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: config.clientId,
    client_secret: config.clientSecret,
  });

  const response = await fetch(`${config.baseUrl}/services/oauth2/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
    cache: "no-store",
  });

  const json = (await readJson(response)) as SalesforceAccessTokenResponse | string | null;

  if (!response.ok || !json || typeof json === "string") {
    throw new Error(
      `Salesforce token request failed: ${parseSalesforceError(json)}`
    );
  }

  if (!json.access_token) {
    throw new Error("Salesforce token response is missing access_token");
  }

  const authContext = {
    accessToken: json.access_token,
    instanceUrl: (json.instance_url || config.baseUrl).replace(/\/+$/, ""),
  };

  tokenCache = {
    ...authContext,
    baseUrl: config.baseUrl,
    expiresAt: Date.now() + 50 * 60 * 1000,
  };

  return authContext;
}

async function createSalesforceRecord(
  objectName: "Lead" | "ContentVersion",
  payload: SalesforcePayload
) {
  const { accessToken, instanceUrl } = await getAuthContext();
  const { apiVersion } = getConfig();

  const response = await fetch(
    `${instanceUrl}/services/data/${apiVersion}/sobjects/${objectName}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    }
  );

  const json = await readJson(response);

  if (!response.ok) {
    throw new Error(
      `${objectName} creation failed: ${parseSalesforceError(json)}`
    );
  }

  if (!json || typeof json !== "object" || Array.isArray(json)) {
    throw new Error(`${objectName} creation returned an invalid response`);
  }

  const result = json as Partial<SalesforceCreateSuccess>;

  if (!result.id || result.success !== true) {
    throw new Error(`${objectName} creation was not acknowledged by Salesforce`);
  }

  return result as SalesforceCreateSuccess;
}

async function uploadContentVersion(leadId: string, file: File) {
  const versionData = Buffer.from(await file.arrayBuffer()).toString("base64");

  await createSalesforceRecord("ContentVersion", {
    FirstPublishLocationId: leadId,
    PathOnClient: getFileName(file),
    VersionData: versionData,
  });
}

export async function submitBundleToSalesforce(
  bundle: SalesforceBundle,
  uploadedFiles: File[] = []
) {
  const lead = await createSalesforceRecord("Lead", buildLeadPayload(bundle));

  for (const file of uploadedFiles) {
    await uploadContentVersion(lead.id, file);
  }

  return {
    leadId: lead.id,
    uploadedFileCount: uploadedFiles.length,
  };
}
