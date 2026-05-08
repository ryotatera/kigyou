import { LoginLink, SignupLink } from "./ExternalCTA";

export function AuthBar() {
  return (
    <div className="flex items-center gap-3 text-sm">
      <LoginLink className="text-ink-soft hover:text-ink">ログイン</LoginLink>
      <SignupLink className="rounded-md bg-accent px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-accent-dark">
        10 日無料で始める
      </SignupLink>
    </div>
  );
}
