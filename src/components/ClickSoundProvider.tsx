"use client";

import { useClickSound } from "@/hooks/useClickSound";

export function ClickSoundProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Initialize click sound hook
  useClickSound("/assets/click sound 1.wav");

  return <>{children}</>;
}
