import { motion } from "framer-motion";
import { ReactNode } from "react";

const PageWrapper = ({ children }: { children: ReactNode }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.4 }}
    className="min-h-screen bg-grid-pattern bg-radial-glow"
  >
    {children}
  </motion.div>
);

export default PageWrapper;
