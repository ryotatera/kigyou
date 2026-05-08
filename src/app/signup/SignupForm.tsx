"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMockAuth } from "@/lib/auth";

export function SignupForm() {
  const { signIn } = useMockAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    setTimeout(() => {
      signIn();
      router.push("/account");
    }, 400);
  };

  return (
    <form onSubmit={submit} className="mt-8 space-y-3">
      <label className="block text-xs font-medium text-ink-mute" htmlFor="email">
        メールアドレス
      </label>
      <input
        id="email"
        type="email"
        required
        inputMode="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full rounded-md border border-line bg-white px-4 py-3 text-base text-ink outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
      />
      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-md bg-accent px-4 py-3 text-base font-semibold text-white hover:bg-accent-dark disabled:opacity-60"
      >
        {submitting ? "登録中…" : "10 日無料で始める"}
      </button>
      <p className="text-center text-xs text-ink-mute">
        登録ボタンを押すと
        <Link href="/about#terms" className="underline">
          利用規約
        </Link>
        と
        <Link href="/about#privacy" className="underline">
          プライバシーポリシー
        </Link>
        に同意したものとみなします。
      </p>
      <div className="border-t border-line pt-4 text-center text-sm text-ink-soft">
        既にアカウントをお持ちの方は{" "}
        <Link href="/login" className="font-medium text-ink underline">
          ログイン
        </Link>
      </div>
    </form>
  );
}
