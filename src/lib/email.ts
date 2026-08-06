import { Resend } from "resend";

export const isResendConfigured = Boolean(process.env.RESEND_API_KEY && process.env.RESEND_FROM_EMAIL);

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function sendContactMail(params: { name: string; email: string; message: string }) {
  if (!resend || !process.env.RESEND_FROM_EMAIL || !process.env.CONTACT_TO_EMAIL) {
    throw new Error("Resendが未設定です（RESEND_API_KEY / RESEND_FROM_EMAIL / CONTACT_TO_EMAIL）");
  }
  return resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL,
    to: process.env.CONTACT_TO_EMAIL,
    replyTo: params.email,
    subject: `【期待値研究所】お問い合わせ（${params.name}様）`,
    text: `お名前: ${params.name}\nメールアドレス: ${params.email}\n\n${params.message}`,
  });
}
