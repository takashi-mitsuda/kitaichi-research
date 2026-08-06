import { NextResponse } from "next/server";
import { sendContactMail } from "@/lib/email";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, message } = body as { name?: string; email?: string; message?: string };

  if (!name || !email || !message) {
    return NextResponse.json({ error: "全ての項目を入力してください" }, { status: 400 });
  }

  try {
    await sendContactMail({ name, email, message });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("contact mail failed", error);
    return NextResponse.json({ error: "送信に失敗しました。時間をおいて再度お試しください" }, { status: 500 });
  }
}
