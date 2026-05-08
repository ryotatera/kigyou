"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMockAuth } from "@/lib/auth";

export function LoginForm() {
  const { signIn } = useMockAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setSubmitting(true);
    setTimeout(() => {
      signIn();
      router.push("/account");
    }, 350);
  };

  return (
    <form onSubmit={submit} className="mt-8 space-y-3">
      <div className="space-y-1">
        <label className="block text-xs font-medium text-ink-mute" htmlFor="email">
          メールアドレス
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-md border border-line bg-white px-4 py-3 text-base text-ink outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
      </div>
      <div className="space-y-1">
        <label className="block text-xs font-medium text-ink-mute" htmlFor="pw">
          パスワード
        </label>
        <input
          id="pw"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-md border border-line bg-white px-4 py-3 text-base text-ink outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-md bg-ink px-4 py-3 text-base font-semibold text-white hover:bg-black disabled:opacity-60"
      >
        {submitting ? "ログイン中…" : "ログイン"}
      </button>
      <div className="flex items-center justify-between text-xs text-ink-mute">
        <Link href="/about" className="hover:underline">
          パスワードをお忘れですか？
        </Link>
        <Link href="/signup" className="font-medium text-ink hover:underline">
          新規登録
        </Link>
      </div>
    </form>
  );
}
