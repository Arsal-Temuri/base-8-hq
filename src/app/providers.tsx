"use client";

import { ClickSoundProvider } from "@/components/ClickSoundProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClickSoundProvider>
      {children}
    </ClickSoundProvider>
  );
}
