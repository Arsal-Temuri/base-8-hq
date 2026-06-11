import { useEffect, useRef } from "react";

export const useClickSound = (soundPath: string = "/sounds/click-sound.wav") => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element
    const audio = new Audio(soundPath);
    audio.volume = 0.3; // Set volume to 30% (adjust as needed)
    audioRef.current = audio;

    // Handle click events globally
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      // Play sound on button and link clicks
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a")
      ) {
        // Create a new audio instance to allow overlapping sounds
        const clickAudio = new Audio(soundPath);
        clickAudio.volume = 0.3;
        clickAudio.play().catch((err) => {
          // Silently fail if audio can't play (e.g., muted browser tab)
          console.debug("Click sound failed to play:", err);
        });
      }
    };

    // Add event listener
    document.addEventListener("click", handleClick);

    // Cleanup
    return () => {
      document.removeEventListener("click", handleClick);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [soundPath]);

  return audioRef;
};
