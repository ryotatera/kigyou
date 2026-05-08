import { LoginForm } from "./LoginForm";

export const metadata = {
  title: "ログイン | 起業の科学ポータル",
};

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-md px-6 py-16">
      <h1 className="serif text-3xl font-semibold leading-tight text-ink">
        ログイン
      </h1>
      <p className="mt-2 text-sm text-ink-soft">
        登録済みのメールアドレスで続きを観られます。
      </p>
      <LoginForm />
    </div>
  );
}
