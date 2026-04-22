export const COUNTRY_CODES = [
  { code: "+49", country: "Germany", flag: "🇩🇪" },
  { code: "+1", country: "United States", flag: "🇺🇸" },
  { code: "+44", country: "United Kingdom", flag: "🇬🇧" },
  { code: "+33", country: "France", flag: "🇫🇷" },
  { code: "+39", country: "Italy", flag: "🇮🇹" },
  { code: "+34", country: "Spain", flag: "🇪🇸" },
  { code: "+31", country: "Netherlands", flag: "🇳🇱" },
  { code: "+41", country: "Switzerland", flag: "🇨🇭" },
  { code: "+43", country: "Austria", flag: "🇦🇹" },
  { code: "+48", country: "Poland", flag: "🇵🇱" },
  { code: "+380", country: "Ukraine", flag: "🇺🇦" },
  { code: "+7", country: "Russia", flag: "🇷🇺" },
  { code: "+86", country: "China", flag: "🇨🇳" },
  { code: "+81", country: "Japan", flag: "🇯🇵" },
  { code: "+91", country: "India", flag: "🇮🇳" },
  { code: "+55", country: "Brazil", flag: "🇧🇷" },
  { code: "+61", country: "Australia", flag: "🇦🇺" },
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
