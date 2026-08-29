"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const CTASection = () => (
  <section className="relative py-24 lg:py-36 overflow-hidden section-veil">
    {/* Ambient amber glow orb */}
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="w-[500px] h-[500px] rounded-full bg-primary/6 blur-[130px]" />
    </div>

    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className="relative container mx-auto px-4 text-center"
    >
      <h2 className="font-heading text-2xl md:text-3xl lg:text-[2.6rem] font-semibold text-foreground mb-5 max-w-3xl mx-auto leading-tight tracking-[0.07em] text-shadow-heading">
        Bring us the mission. We&apos;ll map the move.
      </h2>
      <p className="text-muted-foreground mb-12 max-w-lg mx-auto text-[0.9rem] md:text-base leading-relaxed tracking-wide text-shadow-body">
        Tell us where the brand is, where it needs to go and what is getting in the way. We&apos;ll assemble the right command.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/deploy-mission" className="btn-glow-filled rounded-sm">
          Start a Project
        </Link>
        <Link href="/contact" className="btn-glow rounded-sm">
          Get a Strategy Call
        </Link>
      </div>
    </motion.div>
  </section>
);

export default CTASection;
