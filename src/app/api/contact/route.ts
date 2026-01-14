import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Send notification email to admin
    const adminEmail = await resend.emails.send({
      from: "KC Family Home Team <noreply@kcfhomes.com>",
      to: ["admin@kcfhomes.com"],
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #151A4A; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
              .content { background-color: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
              .message-box { background-color: white; padding: 20px; border-left: 4px solid #C9A961; border-radius: 4px; margin-bottom: 20px; }
              .contact-info { background-color: white; padding: 20px; border-radius: 8px; }
              .contact-info h3 { margin-top: 0; color: #151A4A; }
              .info-row { margin-bottom: 10px; }
              .info-label { font-weight: bold; color: #666; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>New Contact Form Submission</h1>
              </div>
              <div class="content">
                <div class="message-box">
                  <h3 style="margin-top: 0; color: #151A4A;">Message:</h3>
                  <p>${message.replace(/\n/g, '<br>')}</p>
                </div>

                <div class="contact-info">
                  <h3>Contact Information</h3>
                  <div class="info-row">
                    <span class="info-label">Name:</span> ${name}
                  </div>
                  <div class="info-row">
                    <span class="info-label">Email:</span> <a href="mailto:${email}">${email}</a>
                  </div>
                  <div class="info-row">
                    <span class="info-label">Phone:</span> ${phone || "Not provided"}
                  </div>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    // Send confirmation email to user
    const userEmail = await resend.emails.send({
      from: "KC Family Home Team <noreply@kcfhomes.com>",
      to: [email],
      subject: "Thank You for Contacting Us - KC Family Home Team",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #151A4A; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
              .header h1 { margin: 0; font-size: 28px; }
              .content { background-color: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
              .message { background-color: white; padding: 20px; border-left: 4px solid #C9A961; border-radius: 4px; margin-bottom: 20px; }
              .contact-box { background-color: white; padding: 20px; border-radius: 8px; margin-top: 20px; }
              .contact-box h3 { margin-top: 0; color: #151A4A; }
              .button { display: inline-block; padding: 12px 30px; background-color: #C9A961; color: #151A4A; text-decoration: none; border-radius: 25px; font-weight: bold; margin-top: 15px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Thank You, ${name}!</h1>
              </div>
              <div class="content">
                <div class="message">
                  <p><strong>We've received your message and appreciate you reaching out to us.</strong></p>
                  <p>Our team will review your inquiry and get back to you within 2 hours during business hours. We're here to help with all your real estate needs!</p>
                </div>

                <div class="contact-box">
                  <h3>Your Message:</h3>
                  <p style="margin: 10px 0; padding: 15px; background-color: #f9f9f9; border-radius: 4px;">${message.replace(/\n/g, '<br>')}</p>
                </div>

                <div class="contact-box">
                  <h3>Need Immediate Assistance?</h3>
                  <p style="margin: 10px 0;">Email: <a href="mailto:admin@kcfhomes.com" style="color: #C9A961;">admin@kcfhomes.com</a></p>
                  <p style="margin: 10px 0;">Phone: <a href="tel:+18166163072" style="color: #C9A961;">(816) 616-3072</a></p>
                  <p style="margin-top: 20px;">
                    <a href="https://kcfhomes.com" class="button" style="color: #151A4A;">Visit Our Website</a>
                  </p>
                </div>

                <p style="margin-top: 20px; color: #666; font-size: 14px; text-align: center;">
                  KC Family Home Team - Empowering Growing Families<br>
                  Kansas City, MO
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (adminEmail.error || userEmail.error) {
      console.error("Resend error:", adminEmail.error || userEmail.error);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: { adminEmail: adminEmail.data, userEmail: userEmail.data } }, { status: 200 });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
