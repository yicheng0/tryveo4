const DISPOSABLE_EMAIL_DOMAINS = [
  'tempmail.com',
  'throwawaymail.com',
  'tempmail100.com'
];

export type EmailValidationError =
  | 'invalid_email_format'
  | 'email_part_too_long'
  | 'disposable_email_not_allowed'
  | 'invalid_characters';

const EMAIL_REGEX = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;

export function validateEmail(email: string): {
  isValid: boolean;
  error?: EmailValidationError;
} {
  if (!EMAIL_REGEX.test(email)) {
    return {
      isValid: false,
      error: 'invalid_email_format'
    };
  }

  const [localPart, domain] = email.split('@');
  if (domain.length > 255 || localPart.length > 64) {
    return {
      isValid: false,
      error: 'email_part_too_long'
    };
  }

  if (DISPOSABLE_EMAIL_DOMAINS.includes(domain.toLowerCase())) {
    return {
      isValid: false,
      error: 'disposable_email_not_allowed'
    };
  }

  if (/[<>()[\]\\.,;:\s@"]+/.test(localPart)) {
    return {
      isValid: false,
      error: 'invalid_characters'
    };
  }

  return { isValid: true };
}

export function normalizeEmail(email: string): string {
  if (!email) return '';

  let normalizedEmail = email.toLowerCase();
  const [localPart, domain] = normalizedEmail.split('@');

  switch (domain) {
    case 'gmail.com':
      // remove dot and + suffix
      const gmailBase = localPart
        .replace(/\./g, '')
        .split('+')[0];
      return `${gmailBase}@${domain}`;

    case 'outlook.com':
    case 'hotmail.com':
    case 'live.com':
      // remove + suffix
      const microsoftBase = localPart.split('+')[0];
      return `${microsoftBase}@${domain}`;

    case 'yahoo.com':
      // remove - suffix
      const yahooBase = localPart.split('-')[0];
      return `${yahooBase}@${domain}`;

    default:
      // for other emails, only remove + suffix
      const baseLocalPart = localPart.split('+')[0];
      return `${baseLocalPart}@${domain}`;
  }
}