"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";

export default function HeadquartersError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[BASE8HQ] Headquarters error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-50" />
      <div className="absolute inset-0 bg-radial-glow" />
      <div className="scan-line" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="card-glass rounded-sm p-10 max-w-lg w-full text-center relative z-10"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex items-center justify-center mb-6"
        >
          <div
            className="w-16 h-16 rounded-sm border border-destructive/50 flex items-center justify-center"
            style={{ boxShadow: "0 0 20px rgba(239,68,68,0.3)" }}
          >
            <AlertTriangle className="w-8 h-8 text-destructive" />
          </div>
        </motion.div>

        <span className="font-heading text-[0.6rem] tracking-[0.3em] text-destructive mb-3 inline-block">
          {"// HQ Comms Down"}
        </span>
        <h1 className="font-heading text-2xl font-bold text-foreground mb-3">
          Headquarters Unreachable
        </h1>
        <p className="text-muted-foreground text-sm leading-relaxed mb-6">
          Unable to load headquarters briefing. Attempt to re-establish the
          uplink or navigate to a known position.
        </p>
        {error?.digest && (
          <p className="font-mono text-[0.65rem] text-muted-foreground/50 mb-6 border border-primary/10 rounded-sm px-3 py-1 inline-block">
            REF: {error.digest}
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-2">
          <button
            onClick={reset}
            className="btn-glow-filled rounded-sm flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Re-establish Uplink
          </button>
          <Link
            href="/"
            className="btn-glow rounded-sm flex items-center justify-center gap-2"
          >
            <Home className="w-3.5 h-3.5" />
            Return to HQ
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
