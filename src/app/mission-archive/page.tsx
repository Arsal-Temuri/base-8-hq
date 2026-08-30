"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import PageWrapper from "@/components/PageWrapper";
import CTASection from "@/components/CTASection";

const projects = [
  {
    name: "Dewan Cement",
    category: "Brand Identity",
    image: "/assets/project-cement.jpg",
    description: "Complete identity overhaul for one of Pakistan's leading cement brands.",
    slug: "dewan-cement"
  },
  {
    name: "Spectre Coffee",
    category: "Full Rebrand",
    image: "/assets/project-coffee.jpg",
    description: "From bean to brand — a full sensory rebrand for a specialty coffee house.",
    slug: "spectre-coffee"
  },
  {
    name: "Apex Fitness",
    category: "Digital Campaign",
    image: "/assets/project-fitness.jpg",
    description: "Performance-driven digital campaign that tripled online engagement.",
    slug: "apex-fitness"
  },
  {
    name: "Griffin Aerospace",
    category: "Brand Strategy",
    image: "/assets/project-aerospace.jpg",
    description: "Strategic brand architecture for a next-generation aerospace company.",
    slug: "griffin-aerospace"
  },
  {
    name: "Lumina Tech",
    category: "Digital Campaign",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    description: "Data-driven campaign focusing on visual intelligence.",
    slug: "lumina-tech"
  },
  {
    name: "Vanguard",
    category: "Brand Strategy",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=1200&q=80",
    description: "Positioning a bold new player in the financial sector.",
    slug: "vanguard"
  }
];

const categories = ["All", "Brand Identity", "Full Rebrand", "Digital Campaign", "Brand Strategy"];

function PremiumProjectCard({ project, index }: { project: typeof projects[0], index: number }) {
  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      <div className="block w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-sm">
        {/* Image Container */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm border border-primary/10 bg-black/40">
          <Image
            src={project.image}
            alt={project.name}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          
          {/* Subtle gradient overlay to ensure text legibility if we wanted overlaid text, 
              but we are doing premium editorial style (text below). 
              We'll just add a glass effect on hover over the image. */}
          <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-500" />
          
          {/* Subtle border glow on hover */}
          <div className="absolute inset-0 border border-primary/0 group-hover:border-primary/40 rounded-sm transition-colors duration-500" />
          
          {/* Floating Category Pill inside the image */}
          <div className="absolute top-4 right-4 translate-y-[-10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
            <span className="font-heading text-[0.55rem] tracking-[0.25em] text-primary border border-primary/30 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-sm text-glow-amber">
              {project.category}
            </span>
          </div>
        </div>

        {/* Text Content - Editorial Style (Below Image) */}
        <div className="mt-5 flex items-start justify-between gap-4">
          <div>
            <h3 className="font-heading font-semibold text-xl tracking-[0.05em] text-white/95 group-hover:text-primary transition-colors duration-300">
              {project.name}
            </h3>
            <p className="mt-2 text-sm text-white/50 leading-relaxed tracking-wide max-w-sm line-clamp-2">
              {project.description}
            </p>
          </div>
          
          <span className="font-heading text-xs tracking-[0.2em] text-primary/40 group-hover:text-primary/80 transition-colors duration-300">
            {num}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

const MissionArchivePage = () => {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <PageWrapper>
      {/* Page Header */}
      <section className="pt-36 pb-12 lg:pt-48 lg:pb-16 section-veil">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-block font-heading text-[0.6rem] tracking-[0.38em] text-primary mb-5 border border-primary/25 bg-primary/5 px-5 py-1.5 rounded-sm text-shadow-body">
              Archive
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-7xl font-semibold text-foreground mb-6 tracking-[0.07em] text-shadow-hero">
              MISSION ARCHIVE
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto text-[0.9rem] md:text-base leading-relaxed tracking-wide text-shadow-body">
              Explore our completed operations. High-impact brand identities, digital campaigns, and strategic overhauls.
            </p>
          </motion.div>

          {/* Filter tabs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap justify-center gap-2.5 mt-12"
          >
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`font-heading text-[0.6rem] tracking-[0.25em] px-5 py-2.5 rounded-sm border transition-all duration-300 ${
                  filter === c
                    ? "border-primary bg-primary/15 text-primary shadow-[0_0_16px_rgba(245,166,35,0.25)]"
                    : "border-primary/20 text-muted-foreground hover:text-foreground hover:border-primary/50 hover:bg-white/5"
                }`}
              >
                {c}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="pb-20 lg:pb-32 section-veil relative z-10">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((p, i) => (
                <PremiumProjectCard
                  key={p.name}
                  project={p}
                  index={i}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-muted-foreground py-24 font-heading text-sm tracking-widest"
            >
              No missions found in this sector.
            </motion.p>
          )}
        </div>
      </section>

      <CTASection />
    </PageWrapper>
  );
};

export default MissionArchivePage;
