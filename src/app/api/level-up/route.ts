import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { question1, question2, question3, email, fullName, phone } = body;

    // Validate required fields
    if (!question1 || !question2 || !question3 || !email) {
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
      subject: `New Level Up Form Submission from ${fullName || email}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #151A4A; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
              .content { background-color: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
              .question { margin-bottom: 25px; }
              .question-label { font-weight: bold; color: #151A4A; margin-bottom: 8px; }
              .question-answer { background-color: white; padding: 15px; border-left: 4px solid #C9A961; border-radius: 4px; }
              .contact-info { background-color: white; padding: 20px; border-radius: 8px; margin-top: 20px; }
              .contact-info h3 { margin-top: 0; color: #151A4A; }
              .info-row { margin-bottom: 10px; }
              .info-label { font-weight: bold; color: #666; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>New Level Up Form Submission</h1>
              </div>
              <div class="content">
                <div class="question">
                  <div class="question-label">1. What is holding you back the most right now with buying your next home?</div>
                  <div class="question-answer">${question1}</div>
                </div>

                <div class="question">
                  <div class="question-label">2. On a scale of 1-10 how urgent are you to solve this problem today?</div>
                  <div class="question-answer">${question2}</div>
                </div>

                <div class="question">
                  <div class="question-label">3. How soon would you like to LEVEL UP and be in your next home?</div>
                  <div class="question-answer">${question3}</div>
                </div>

                <div class="contact-info">
                  <h3>Contact Information</h3>
                  <div class="info-row">
                    <span class="info-label">Name:</span> ${fullName || "Not provided"}
                  </div>
                  <div class="info-row">
                    <span class="info-label">Email:</span> ${email}
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
      subject: "Thank You for Your Interest - KC Family Home Team",
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
                <h1>Thank You${fullName ? ", " + fullName : ""}!</h1>
              </div>
              <div class="content">
                <div class="message">
                  <p><strong>We've received your information and are excited to help you LEVEL UP to your next home!</strong></p>
                  <p>One of our experienced representatives will review your responses and reach out to you within 24 hours to discuss how we can help you achieve your real estate goals.</p>
                </div>

                <div class="contact-box">
                  <h3>What Happens Next?</h3>
                  <ul style="margin: 10px 0; padding-left: 20px;">
                    <li>Our team will review your unique situation</li>
                    <li>We'll prepare personalized recommendations for your home search</li>
                    <li>A representative will contact you to schedule a consultation</li>
                  </ul>
                </div>

                <div class="contact-box">
                  <h3>Need to Reach Us Sooner?</h3>
                  <p style="margin: 10px 0;">Email: <a href="mailto:admin@kcfhomes.com" style="color: #C9A961;">admin@kcfhomes.com</a></p>
                  <p style="margin: 10px 0;">Phone: <a href="tel:+18165757763" style="color: #C9A961;">(816) 575-7763</a></p>
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
