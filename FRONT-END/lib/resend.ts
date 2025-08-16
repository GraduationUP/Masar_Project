"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (
  name: string,
  email: string,
  message: string
) => {
  await resend.emails.send({
    to: "osamalghoul2@gmail.com",
    from: `Masar <onboarding@resend.dev>`,
    subject: "New message from Masar website",
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Message Received</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; background-color: #f4f4f4;">

    <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
            <td style="padding: 20px 0;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                    <tr>
                        <td align="center" style="padding: 40px 0 30px 0; border-bottom: 1px solid #e0e0e0;">
                            <h1 style="margin: 0; font-size: 28px; color: #333333;">رسالة جديدة من موقع مسار</h1>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 40px 30px;">
                            <p style="margin: 0; font-size: 16px; line-height: 24px; color: #555555;">${name}</p>
                            <p style="margin: 20px 0 0 0; font-size: 16px; line-height: 24px; color: #555555;">${email}</p>
                            <div style="margin-top: 20px; padding: 20px; border: 1px solid #e0e0e0; background-color: #f9f9f9; border-radius: 4px;">
                                <p style="margin: 0; font-size: 16px; line-height: 24px; color: #333333;"><strong>Message:</strong></p>
                                <p style="margin: 10px 0 0 0; font-size: 16px; line-height: 24px; color: #555555;">${message}</p>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 30px; border-top: 1px solid #e0e0e0;">
                            <p style="margin: 0; font-size: 14px; line-height: 20px; color: #999999; text-align: center;">
                                &copy; <script>document.write(new Date().getFullYear())</script> Masar. All Rights Reserved.<br>
                                <a href="https://www.Masar.com" style="color: #007bff; text-decoration: none;">Masar</a>
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>

</body>
</html>`,
  });
};
