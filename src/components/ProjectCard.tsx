"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface ProjectCardProps {
  name: string;
  category: string;
  image: string;
  index: number;
}

const ProjectCard = ({ name, category, image, index }: ProjectCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="card-glass rounded-sm overflow-hidden group cursor-pointer"
  >
    <div className="aspect-video overflow-hidden relative">
      <Image
        src={image}
        alt={name}
        fill
        sizes="(max-width: 640px) 100vw, 50vw"
        className="object-cover group-hover:scale-110 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <span className="font-heading text-[0.6rem] tracking-[0.2em] text-primary">{category}</span>
        <h3 className="font-heading text-sm tracking-wider text-foreground mt-1">{name}</h3>
      </div>
    </div>
  </motion.div>
);

export default ProjectCard;
