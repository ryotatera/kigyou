import { SignupForm } from "./SignupForm";

export const metadata = {
  title: "10 日無料で始める | 起業の科学ポータル",
};

export default function SignupPage() {
  return (
    <div className="mx-auto max-w-md px-6 py-16">
      <h1 className="serif text-3xl font-semibold leading-tight text-ink">
        10 日間 無料で始める
      </h1>
      <p className="mt-2 text-sm text-ink-soft">
        メールアドレスのみで開始できます。クレジットカード不要、いつでも解約可能。
      </p>
      <SignupForm />
    </div>
  );
}
