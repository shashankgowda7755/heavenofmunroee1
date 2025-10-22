import sgMail from '@sendgrid/mail';

if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

interface EmailParams {
  to: string;
  from: string;
  subject: string;
  text?: string;
  html?: string;
}

export async function sendEmail(params: EmailParams): Promise<boolean> {
  // If SendGrid is not configured, log the message instead of sending
  if (!process.env.SENDGRID_API_KEY || !process.env.SENDGRID_FROM_EMAIL) {
    console.log('Email would be sent:', {
      to: params.to,
      from: params.from,
      subject: params.subject,
      text: params.text
    });
    return true;
  }

  try {
    const emailData: any = {
      to: params.to,
      from: params.from,
      subject: params.subject,
    };
    
    if (params.text) emailData.text = params.text;
    if (params.html) emailData.html = params.html;
    
    await sgMail.send(emailData);
    console.log('Email sent successfully to:', params.to);
    return true;
  } catch (error) {
    console.error('SendGrid email error:', error);
    return false;
  }
}

export function formatBookingNotification(data: any) {
  const subject = `New Booking Inquiry - ${data.name}`;
  const text = `
New booking inquiry received:

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || 'Not provided'}
Check-in Date: ${data.checkInDate || 'Not specified'}
Check-out Date: ${data.checkOutDate || 'Not specified'}
Guests: ${data.numberOfGuests || 'Not specified'}
Package Type: ${data.packageType || 'Not specified'}

Special Requests:
${data.specialRequests || 'None'}

Submitted at: ${new Date().toLocaleString()}
  `;

  const html = `
    <h2>New Booking Inquiry</h2>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
    <p><strong>Check-in Date:</strong> ${data.checkInDate || 'Not specified'}</p>
    <p><strong>Check-out Date:</strong> ${data.checkOutDate || 'Not specified'}</p>
    <p><strong>Number of Guests:</strong> ${data.numberOfGuests || 'Not specified'}</p>
    <p><strong>Package Type:</strong> ${data.packageType || 'Not specified'}</p>
    <p><strong>Special Requests:</strong></p>
    <p>${data.specialRequests || 'None'}</p>
    <p><strong>Submitted at:</strong> ${new Date().toLocaleString()}</p>
  `;

  return { subject, text, html };
}

export function formatContactNotification(data: any) {
  const subject = `New Contact Message - ${data.name}`;
  const text = `
New contact message received:

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || 'Not provided'}

Message:
${data.message}

Submitted at: ${new Date().toLocaleString()}
  `;

  const html = `
    <h2>New Contact Message</h2>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
    <p><strong>Message:</strong></p>
    <p>${data.message}</p>
    <p><strong>Submitted at:</strong> ${new Date().toLocaleString()}</p>
  `;

  return { subject, text, html };
}