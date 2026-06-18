import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    // Validación básica de campos requeridos
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json({ error: 'Name is required (min 2 characters)' }, { status: 400 });
    }
    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'A valid email is required' }, { status: 400 });
    }
    if (!phone || typeof phone !== 'string' || phone.replace(/\D/g, '').length < 7) {
      return NextResponse.json({ error: 'Phone is required (min 7 digits)' }, { status: 400 });
    }
    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      return NextResponse.json({ error: 'Message is required (min 10 characters)' }, { status: 400 });
    }

    const {
      SMTP_HOST,
      SMTP_PORT,
      SMTP_SECURE,
      SMTP_USER,
      SMTP_PASSWORD,
      CONTACT_RECEIVER_EMAIL,
    } = process.env;

    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASSWORD || !CONTACT_RECEIVER_EMAIL) {
      console.error('Missing SMTP environment variables');
      return NextResponse.json(
        { error: 'Server configuration error. Please try again later.' },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: SMTP_SECURE === 'true',
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASSWORD,
      },
    });

    const mailSubject = subject?.trim()
      ? `Nuevo contacto desde el sitio web — ${subject.trim()}`
      : 'Nuevo contacto desde el sitio web';

    const htmlBody = `
      <h2>Nuevo mensaje desde el formulario de contacto</h2>
      <p><strong>Nombre:</strong> ${name.trim()}</p>
      <p><strong>Correo:</strong> ${email.trim()}</p>
      <p><strong>Teléfono:</strong> ${phone.trim()}</p>
      ${subject?.trim() ? `<p><strong>Asunto:</strong> ${subject.trim()}</p>` : ''}
      <p><strong>Mensaje:</strong></p>
      <p>${message.trim().replace(/\n/g, '<br/>')}</p>
    `;

    const textBody = `
Nuevo mensaje desde el formulario de contacto

Nombre: ${name.trim()}
Correo: ${email.trim()}
Teléfono: ${phone.trim()}
${subject?.trim() ? `Asunto: ${subject.trim()}\n` : ''}Mensaje:
${message.trim()}
    `.trim();

    await transporter.sendMail({
      from: SMTP_USER,
      replyTo: email.trim(),
      to: CONTACT_RECEIVER_EMAIL,
      subject: mailSubject,
      text: textBody,
      html: htmlBody,
    });

    return NextResponse.json({ success: true, message: 'Message sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Contact form email error:', error);
    return NextResponse.json(
      { error: 'Something went wrong while sending the message. Please try again later.' },
      { status: 500 }
    );
  }
}
