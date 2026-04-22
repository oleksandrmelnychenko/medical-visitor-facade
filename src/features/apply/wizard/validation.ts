const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const ZIP_PATTERN = /^(0|\d{5})$/;

export function validateName(value: string): boolean {
  return value.trim().length >= 2;
}

export function validateEmail(value: string): boolean {
  return EMAIL_PATTERN.test(value.trim());
}

export function validateMinLength(value: string, min: number): boolean {
  return value.trim().length >= min;
}

export function validateZipCode(value: string): boolean {
  return ZIP_PATTERN.test(value.trim());
}
