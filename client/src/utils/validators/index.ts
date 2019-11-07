const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const isEmailValid = (email: string) => EMAIL_REGEX.test(email);
