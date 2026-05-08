import { EXTERNAL_LINK_PROPS, LOGIN_URL, SIGNUP_URL } from "@/lib/external";

type ButtonHTMLAttrs = React.AnchorHTMLAttributes<HTMLAnchorElement>;

interface Props extends Omit<ButtonHTMLAttrs, "href"> {
  children: React.ReactNode;
}

export function SignupLink(props: Props) {
  return <a href={SIGNUP_URL} {...EXTERNAL_LINK_PROPS} {...props} />;
}

export function LoginLink(props: Props) {
  return <a href={LOGIN_URL} {...EXTERNAL_LINK_PROPS} {...props} />;
}
