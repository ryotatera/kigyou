"use client";

import { useEffect, useState } from "react";

const KEY = "ssp:mockAuth";

export type AuthState = "anonymous" | "member";

export function useMockAuth(): {
  state: AuthState;
  signIn: () => void;
  signOut: () => void;
  ready: boolean;
} {
  const [state, setState] = useState<AuthState>("anonymous");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const v = window.localStorage.getItem(KEY);
      if (v === "member" || v === "anonymous") setState(v);
    } catch {}
    setReady(true);
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY && (e.newValue === "member" || e.newValue === "anonymous")) {
        setState(e.newValue);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const signIn = () => {
    window.localStorage.setItem(KEY, "member");
    setState("member");
  };
  const signOut = () => {
    window.localStorage.setItem(KEY, "anonymous");
    setState("anonymous");
  };

  return { state, signIn, signOut, ready };
}
