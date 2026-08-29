"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

const PageWrapper = ({ children }: { children: ReactNode }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    className="relative min-h-screen overflow-hidden"
  >
    <div className="relative z-10">{children}</div>
  </motion.div>
);

export default PageWrapper;
