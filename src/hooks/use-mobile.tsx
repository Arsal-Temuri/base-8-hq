import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const isClient = typeof window !== "undefined";
  const [isMobile, setIsMobile] = React.useState<boolean>(
    isClient ? window.innerWidth < MOBILE_BREAKPOINT : false,
  );

  React.useEffect(() => {
    if (!isClient) return;

    type MediaQueryListWithListener = MediaQueryList & {
      addListener?: (listener: (this: MediaQueryList, ev: MediaQueryListEvent) => void) => void;
      removeListener?: (listener: (this: MediaQueryList, ev: MediaQueryListEvent) => void) => void;
    };

    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`) as MediaQueryListWithListener;
    const onChange = (e: MediaQueryListEvent | MediaQueryList) => {
      // MediaQueryListEvent has .matches, some environments pass MediaQueryList
      const matches = "matches" in e ? e.matches : mql.matches;
      setIsMobile(!!matches);
    };

    // Initial sync
    setIsMobile(mql.matches);

    // Add listener with fallback for older browsers
    if (typeof mql.addEventListener === "function") {
      mql.addEventListener("change", onChange as EventListener);
      return () => mql.removeEventListener("change", onChange as EventListener);
    } else if (typeof mql.addListener === "function") {
      mql.addListener(onChange as (this: MediaQueryList, ev: MediaQueryListEvent) => void);
      return () => mql.removeListener?.(onChange as (this: MediaQueryList, ev: MediaQueryListEvent) => void);
    }
  }, [isClient]);

  return isMobile;
}
