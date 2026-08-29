"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
}

const ServiceCard = ({ icon: Icon, title, description, index }: ServiceCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
    className="card-glass rounded-sm p-5 sm:p-6 group cursor-default"
  >
    {/* Icon badge */}
    <div className="w-9 h-9 flex items-center justify-center border border-primary/35 rounded-sm mb-4 text-primary group-hover:bg-primary/10 group-hover:border-primary/60 transition-all duration-300">
      <Icon size={15} strokeWidth={1.5} />
    </div>

    {/* Title */}
    <h3 className="font-heading text-[0.68rem] sm:text-[0.72rem] tracking-[0.14em] text-foreground mb-2.5 leading-snug text-shadow-heading">
      {title}
    </h3>

    {/* Description */}
    <p className="text-[0.8rem] sm:text-[0.85rem] text-muted-foreground leading-relaxed tracking-wide">
      {description}
    </p>
  </motion.div>
);

export default ServiceCard;
