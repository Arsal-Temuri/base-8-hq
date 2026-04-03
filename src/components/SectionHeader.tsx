import { motion } from "framer-motion";

interface SectionHeaderProps {
  tag?: string;
  title: string;
  subtitle?: string;
}

const SectionHeader = ({ tag, title, subtitle }: SectionHeaderProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6 }}
    className="text-center mb-12 lg:mb-16"
  >
    {tag && (
      <span className="inline-block font-heading text-[0.65rem] tracking-[0.3em] text-primary mb-3 border border-primary/30 px-4 py-1 rounded-sm">
        {tag}
      </span>
    )}
    <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
      {title}
    </h2>
    {subtitle && (
      <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
        {subtitle}
      </p>
    )}
  </motion.div>
);

export default SectionHeader;
