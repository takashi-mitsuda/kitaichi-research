import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "お問い合わせ",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-xl px-6 py-16">
      <h1 className="text-2xl font-bold">お問い合わせ</h1>
      <p className="mt-4 leading-relaxed text-ink/80">
        データの誤りのご指摘、掲載のご依頼などは、以下のフォームからご連絡ください。
      </p>
      <div className="mt-8">
        <ContactForm />
      </div>
    </div>
  );
}
