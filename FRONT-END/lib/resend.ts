"use server"

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (name: string, email: string, message: string) => {
    await resend.emails.send({
        to: 'osamalghoul2@gmail.com',
        from: `Masar <onboarding@resend.dev>`,
        subject: 'New message from Masar website',
        html: `<p>مرحبا اسمي هو: ${name} <br />
        Gmail: ${email} <br />
         ${message}</p>`,
    });
}
