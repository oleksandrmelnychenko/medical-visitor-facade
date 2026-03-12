export const COUNTRY_CODES = [
  { code: "+49", country: "Germany" },
  { code: "+1", country: "United States" },
  { code: "+44", country: "United Kingdom" },
  { code: "+33", country: "France" },
  { code: "+39", country: "Italy" },
  { code: "+34", country: "Spain" },
  { code: "+31", country: "Netherlands" },
  { code: "+41", country: "Switzerland" },
  { code: "+43", country: "Austria" },
  { code: "+48", country: "Poland" },
  { code: "+380", country: "Ukraine" },
  { code: "+7", country: "Russia" },
  { code: "+86", country: "China" },
  { code: "+81", country: "Japan" },
  { code: "+91", country: "India" },
  { code: "+55", country: "Brazil" },
  { code: "+61", country: "Australia" },
] as const;

export function splitInternationalPhoneNumber(
  value: string | null | undefined,
  fallbackCountryCode = "+49"
) {
  const raw = (value ?? "").trim();

  if (!raw) {
    return { countryCode: fallbackCountryCode, nationalNumber: "" };
  }

  const matchedCode = [...COUNTRY_CODES]
    .sort((left, right) => right.code.length - left.code.length)
    .find((item) => raw.startsWith(item.code));

  if (!matchedCode) {
    return {
      countryCode: fallbackCountryCode,
      nationalNumber: raw.startsWith("+") ? raw : raw.replace(/^\+/, ""),
    };
  }

  return {
    countryCode: matchedCode.code,
    nationalNumber: raw.slice(matchedCode.code.length),
  };
}
