const NAME_PATTERN = /^[\p{L}\p{M}' -]{2,}$/u;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_DIGITS_PATTERN = /^[\d\s().+-]{5,}$/;
const ZIP_PATTERN = /^(0|\d{5})$/;

export function validateName(value: string): boolean {
  return NAME_PATTERN.test(value.trim());
}

export function validateEmail(value: string): boolean {
  return EMAIL_PATTERN.test(value.trim());
}

export function validatePhone(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 5 && PHONE_DIGITS_PATTERN.test(value.trim());
}

export function validateMinLength(value: string, min: number): boolean {
  return value.trim().length >= min;
}

export function validateZipCode(value: string): boolean {
  return ZIP_PATTERN.test(value.trim());
}
