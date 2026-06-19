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

    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanPhone = phone.trim();
    const cleanSubject = subject?.trim() || 'Sin asunto';
    const cleanMessage = message.trim();

    const mailSubject = `Nuevo contacto desde hatmex.com.mx — ${cleanSubject}`;

    const htmlBody = `
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Nuevo contacto — HATMEX</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f1eb;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f1eb;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="580" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:4px;overflow:hidden;max-width:580px;width:100%;">

          <!-- HEADER -->
          <tr>
            <td style="background-color:#1a1a1a;padding:32px 40px 24px;text-align:center;">
              <p style="margin:0 0 4px;font-family:Georgia,'Times New Roman',serif;font-size:28px;font-weight:700;letter-spacing:6px;color:#ffffff;">HATMEX</p>
              <p style="margin:0;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#9a8a6a;">Premium Handmade Hats &middot; León, Guanajuato</p>
            </td>
          </tr>

          <!-- ACCENT LINE -->
          <tr>
            <td style="background-color:#8B6914;height:3px;font-size:0;line-height:0;">&nbsp;</td>
          </tr>

          <!-- BODY -->
          <tr>
            <td style="padding:36px 40px 28px;">
              <p style="margin:0 0 4px;font-family:Georgia,'Times New Roman',serif;font-size:20px;font-weight:700;color:#1a1a1a;">New contact request</p>
              <p style="margin:0 0 24px;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#9a8a6a;">Received via hatmex.com.mx</p>

              <table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #e8e0d0;">

                <tr style="border-bottom:1px solid #f0ebe0;">
                  <td style="padding:12px 0;width:90px;vertical-align:top;">
                    <span style="font-size:11px;color:#9a8a6a;text-transform:uppercase;letter-spacing:1.5px;font-weight:600;">Name</span>
                  </td>
                  <td style="padding:12px 0;font-size:14px;color:#2c2c2a;line-height:1.6;">${cleanName}</td>
                </tr>

                <tr style="border-bottom:1px solid #f0ebe0;">
                  <td style="padding:12px 0;width:90px;vertical-align:top;">
                    <span style="font-size:11px;color:#9a8a6a;text-transform:uppercase;letter-spacing:1.5px;font-weight:600;">Email</span>
                  </td>
                  <td style="padding:12px 0;font-size:14px;line-height:1.6;">
                    <a href="mailto:${cleanEmail}" style="color:#8B6914;text-decoration:none;">${cleanEmail}</a>
                  </td>
                </tr>

                <tr style="border-bottom:1px solid #f0ebe0;">
                  <td style="padding:12px 0;width:90px;vertical-align:top;">
                    <span style="font-size:11px;color:#9a8a6a;text-transform:uppercase;letter-spacing:1.5px;font-weight:600;">Phone</span>
                  </td>
                  <td style="padding:12px 0;font-size:14px;color:#2c2c2a;line-height:1.6;">${cleanPhone}</td>
                </tr>

                <tr>
                  <td style="padding:12px 0;width:90px;vertical-align:top;">
                    <span style="font-size:11px;color:#9a8a6a;text-transform:uppercase;letter-spacing:1.5px;font-weight:600;">Subject</span>
                  </td>
                  <td style="padding:12px 0;font-size:14px;color:#2c2c2a;line-height:1.6;">${cleanSubject}</td>
                </tr>

              </table>

              <!-- MESSAGE BLOCK -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:24px;">
                <tr>
                  <td style="background-color:#faf8f4;border-left:3px solid #8B6914;padding:16px 20px;">
                    <p style="margin:0 0 10px;font-size:11px;color:#9a8a6a;text-transform:uppercase;letter-spacing:1.5px;font-weight:600;">Message</p>
                    <p style="margin:0;font-size:14px;color:#2c2c2a;line-height:1.7;">${cleanMessage.replace(/\n/g, '<br/>')}</p>
                  </td>
                </tr>
              </table>

              <!-- REPLY BUTTONS -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:28px;">
                <tr>
                  <td align="center">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding-right:12px;">
                          <a href="mailto:${cleanEmail}" style="display:inline-block;background-color:#1a1a1a;color:#ffffff;font-size:11px;letter-spacing:2px;text-transform:uppercase;padding:13px 24px;text-decoration:none;border-radius:2px;font-weight:600;">Reply by email</a>
                        </td>
                        <td>
                          <a href="https://wa.me/${cleanPhone.replace(/\D/g, '')}" style="display:inline-block;background-color:#25D366;color:#ffffff;font-size:11px;letter-spacing:2px;text-transform:uppercase;padding:13px 24px;text-decoration:none;border-radius:2px;font-weight:600;">Reply via WhatsApp</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background-color:#f4f1eb;padding:20px 40px;text-align:center;border-top:1px solid #e8e0d0;">
              <p style="margin:0 0 6px;font-family:Georgia,'Times New Roman',serif;font-size:12px;letter-spacing:3px;font-weight:700;color:#1a1a1a;">HATMEX</p>
              <p style="margin:0;font-size:11px;color:#9a8a6a;line-height:1.8;">
                hatmex.com.mx &middot; León, Guanajuato, México<br>
                This message was sent automatically from the contact form.<br>
                To reply, use the button above or write directly to the sender's email.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

    const textBody = `New contact from hatmex.com.mx\n\nName: ${cleanName}\nEmail: ${cleanEmail}\nPhone: ${cleanPhone}\nSubject: ${cleanSubject}\n\nMessage:\n${cleanMessage}`;

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
