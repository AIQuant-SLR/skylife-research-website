import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { ContactFormData, ContactFormResponse } from '@/lib/types/contact';

export async function POST(req: NextRequest) {
  // Initialize Resend with API key (lazy initialization to avoid build-time errors)
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    // Parse request body
    const body: ContactFormData = await req.json();
    const { firstName, lastName, email, phone, message } = body;

    // Basic validation
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json<ContactFormResponse>(
        {
          success: false,
          message: 'Missing required fields',
          error: 'Please fill in all required fields',
        },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json<ContactFormResponse>(
        {
          success: false,
          message: 'Invalid email format',
          error: 'Please provide a valid email address',
        },
        { status: 400 }
      );
    }

    // Create email HTML content
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #22d3ee 0%, #3b82f6 50%, #a855f7 100%);
              color: white;
              padding: 20px;
              border-radius: 8px 8px 0 0;
            }
            .content {
              background: #f8fafc;
              padding: 30px;
              border: 1px solid #e2e8f0;
              border-radius: 0 0 8px 8px;
            }
            .field {
              margin-bottom: 15px;
            }
            .label {
              font-weight: 600;
              color: #475569;
              margin-bottom: 5px;
            }
            .value {
              color: #1e293b;
              padding: 10px;
              background: white;
              border-radius: 4px;
              border: 1px solid #e2e8f0;
            }
            .message-box {
              background: white;
              padding: 15px;
              border-radius: 4px;
              border: 1px solid #e2e8f0;
              white-space: pre-wrap;
              word-wrap: break-word;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h2 style="margin: 0;">New Contact Form Submission</h2>
            <p style="margin: 5px 0 0 0; opacity: 0.9;">Skylife Research Website</p>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Name:</div>
              <div class="value">${firstName} ${lastName}</div>
            </div>
            <div class="field">
              <div class="label">Email:</div>
              <div class="value">${email}</div>
            </div>
            <div class="field">
              <div class="label">Phone:</div>
              <div class="value">${phone || 'Not provided'}</div>
            </div>
            <div class="field">
              <div class="label">Message:</div>
              <div class="message-box">${message}</div>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Skylife Research <noreply@skyliferesearch.com>',
      to: 'abhinavr9955@gmail.com',
      replyTo: email,
      subject: `New Contact Form: ${firstName} ${lastName}`,
      html: emailHtml,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json<ContactFormResponse>(
        {
          success: false,
          message: 'Failed to send email',
          error: 'An error occurred while sending your message. Please try again.',
        },
        { status: 500 }
      );
    }

    // Success response
    return NextResponse.json<ContactFormResponse>(
      {
        success: true,
        message: 'Message sent successfully! We will get back to you soon.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json<ContactFormResponse>(
      {
        success: false,
        message: 'Server error',
        error: 'An unexpected error occurred. Please try again later.',
      },
      { status: 500 }
    );
  }
}
