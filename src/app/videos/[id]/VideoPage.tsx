"use client";

import { useState } from "react";
import type { Video } from "@/lib/types";
import { useMockAuth } from "@/lib/auth";
import { VideoPlayer } from "@/components/VideoPlayer";
import { PaywallOverlay } from "@/components/PaywallOverlay";

export function VideoPage({ video }: { video: Video }) {
  const { state, signIn, ready } = useMockAuth();
  const [paywallOpen, setPaywallOpen] = useState(false);

  if (!ready) {
    return (
      <div className="aspect-video w-full animate-pulse rounded-xl bg-ink/10" aria-hidden />
    );
  }

  return (
    <div className="relative">
      <VideoPlayer
        video={video}
        authState={state}
        onPaywallChange={setPaywallOpen}
      />
      <PaywallOverlay
        video={video}
        open={paywallOpen}
        onClose={() => setPaywallOpen(false)}
        onSignIn={() => {
          signIn();
          setPaywallOpen(false);
        }}
      />
    </div>
  );
}
