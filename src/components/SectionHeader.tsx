"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  tag?: string;
  title: string;
  subtitle?: string;
}

const SectionHeader = ({ tag, title, subtitle }: SectionHeaderProps) => (
  <motion.div
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    className="text-center mb-12 lg:mb-18"
  >
    {tag && (
      <span className="inline-block font-heading text-[0.6rem] tracking-[0.35em] text-primary mb-4 border border-primary/25 bg-primary/5 px-5 py-1.5 rounded-sm text-shadow-body">
        {tag}
      </span>
    )}
    <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground mb-4 tracking-[0.07em] text-shadow-heading">
      {title}
    </h2>
    {subtitle && (
      <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base leading-relaxed tracking-wide text-shadow-body">
        {subtitle}
      </p>
    )}
  </motion.div>
);

export default SectionHeader;
