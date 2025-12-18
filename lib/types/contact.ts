/**
 * Contact form types and validation schemas
 */

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

export interface ContactFormResponse {
  success: boolean;
  message: string;
  error?: string;
}

export interface ResendEmailPayload {
  from: string;
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
}
