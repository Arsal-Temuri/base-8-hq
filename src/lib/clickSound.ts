const clickSoundUrl = new URL("../assets/sound effects/click sound 1.wav", import.meta.url).href;

declare global {
  interface Window {
    __base8ClickSoundHandler?: EventListener;
  }
}

const CLICK_TARGET_SELECTOR = [
  "button",
  "input[type='button']",
  "input[type='submit']",
  "a[href]",
  "[role='link']",
  "[role='button']",
  ".cursor-pointer",
  "a.btn-glow",
  "a.btn-glow-filled",
  "[data-click-sound='true']",
].join(", ");

let clickAudio: HTMLAudioElement | null = null;

const shouldSkipTarget = (element: HTMLElement) => {
  if (element.getAttribute("aria-disabled") === "true") return true;
  if (element instanceof HTMLButtonElement && element.disabled) return true;
  if (element instanceof HTMLInputElement && element.disabled) return true;
  return false;
};

const playClickSound = () => {
  if (typeof Audio === "undefined") return;

  if (!clickAudio) {
    clickAudio = new Audio(clickSoundUrl);
    clickAudio.preload = "auto";
  }

  clickAudio.currentTime = 0;
  void clickAudio.play().catch(() => {
    // Ignore playback failures and preserve UI interactions.
  });
};

export const initClickSound = () => {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  if (window.__base8ClickSoundHandler) {
    const targetRemove = document.body || document;
    targetRemove.removeEventListener("click", window.__base8ClickSoundHandler, true);
  }

  const handler: EventListener = (nativeEvent) => {
    const event = nativeEvent as MouseEvent;
    if (event.button !== 0) return;

    const target = event.target;
    if (!(target instanceof Element)) return;

    const interactiveElement = target.closest(CLICK_TARGET_SELECTOR);
    if (!(interactiveElement instanceof HTMLElement)) return;
    // Allow opting out of click sounds on sensitive areas
    if (interactiveElement.closest('[data-no-click-sound]')) return;
    if (shouldSkipTarget(interactiveElement)) return;

    playClickSound();
  };

  window.__base8ClickSoundHandler = handler;
  const targetAdd = document.body || document;
  targetAdd.addEventListener("click", handler, true);
};
