"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "submitting" | "sent" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message"),
      }),
    });

    if (res.ok) {
      setStatus("sent");
      form.reset();
    } else {
      const data = await res.json().catch(() => ({}));
      setErrorMessage(data.error || "送信に失敗しました");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return <p className="rounded border border-ink/10 bg-ink/5 p-4">お問い合わせを受け付けました。ご連絡ありがとうございます。</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium">
          お名前
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="mt-1 w-full rounded border border-ink/20 px-3 py-2"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          メールアドレス
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-1 w-full rounded border border-ink/20 px-3 py-2"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium">
          お問い合わせ内容
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className="mt-1 w-full rounded border border-ink/20 px-3 py-2"
        />
      </div>
      {status === "error" && <p className="text-sm text-vermillion">{errorMessage}</p>}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="rounded bg-ink px-6 py-2 text-paper disabled:opacity-50"
      >
        {status === "submitting" ? "送信中..." : "送信する"}
      </button>
    </form>
  );
}
