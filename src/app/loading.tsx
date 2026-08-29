export default function GlobalLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-50" />
      {/* Radial glow */}
      <div className="absolute inset-0 bg-radial-glow" />
      {/* Scan line */}
      <div className="scan-line" />

      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* Animated radar/spinner ring */}
        <div className="relative w-20 h-20">
          {/* Outer ring */}
          <span
            className="absolute inset-0 rounded-full border border-primary/30"
            style={{ boxShadow: "0 0 12px rgba(245,166,35,0.15)" }}
          />
          {/* Spinning arc */}
          <span
            className="absolute inset-0 rounded-full border-t-2 border-r-2 border-primary animate-spin"
            style={{
              animationDuration: "1s",
              boxShadow: "0 0 20px rgba(245,166,35,0.4)",
            }}
          />
          {/* Inner pulsing dot */}
          <span className="absolute inset-0 flex items-center justify-center">
            <span
              className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"
              style={{ boxShadow: "0 0 10px rgba(245,166,35,0.8)" }}
            />
          </span>
        </div>

        {/* Label */}
        <div className="text-center">
          <p className="font-heading text-[0.65rem] tracking-[0.35em] text-primary animate-pulse">
            Acquiring Signal...
          </p>
          <div className="mt-2 flex justify-center gap-1">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="w-1 h-1 rounded-full bg-primary/60"
                style={{
                  animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
