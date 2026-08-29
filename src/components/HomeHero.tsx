"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function HomeHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-command-grid pt-28 pb-12 lg:pt-0 lg:pb-0">
      {/* Veil to darken edges of the grid slightly, drawing focus to center */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80 pointer-events-none" />
      
      <div className="relative container mx-auto px-4 z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-8 items-center min-h-[80vh]">
          
          {/* LEFT: Hero Content */}
          <div className="text-center lg:text-left flex flex-col items-center lg:items-start order-1">
            <motion.div
              initial={{ opacity: 0, y: 44 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] font-semibold mb-6 leading-[1.05] tracking-[0.05em]">
                EVERY MOVE. <br className="hidden md:block" />
                <span className="text-primary text-glow-amber">ONE HQ.</span>
              </h1>
              <p className="font-sans text-[0.9rem] sm:text-base md:text-lg tracking-wide text-muted-foreground mb-10 max-w-xl leading-relaxed">
                Eight operational units across brand, media, marketing and digital—coordinated from one independent creative headquarters.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row items-center gap-4 mt-2"
            >
              <Link href="/deploy-mission" className="btn-glow-filled rounded-md font-heading uppercase tracking-widest text-[0.8rem] px-8 py-3.5">
                Start a Project
              </Link>
              <Link href="/contact" className="btn-glow rounded-md font-heading uppercase tracking-widest text-[0.8rem] px-8 py-3.5">
                Get a Strategy Call
              </Link>
            </motion.div>
          </div>

          {/* RIGHT: Hero Core System */}
          <div className="relative flex justify-center items-center order-2 h-[350px] sm:h-[400px] lg:h-[600px] w-full">
            <motion.div 
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-[260px] h-[260px] sm:w-[400px] sm:h-[400px] lg:w-[500px] lg:h-[500px] flex items-center justify-center"
            >
              
              {/* Core SVG Logo */}
              <div className="relative z-20 w-[120px] sm:w-[150px] lg:w-[220px] aspect-square flex items-center justify-center drop-shadow-[0_0_25px_rgba(245,179,1,0.25)]">
                <Image src="/base8hq-emblem.svg" alt="BASE8 Headquarters Core" fill className="object-contain" priority />
              </div>
              
              {/* Radar Systems Container */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                
                {/* Ring 1 (Inner Solid) */}
                <div className="absolute w-[50%] h-[50%] border border-primary/10 rounded-full" />
                
                {/* Ring 2 (Dashed Orbit) */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 60, ease: "linear", repeat: Infinity }}
                  className="absolute w-[75%] h-[75%] border border-primary/20 border-dashed rounded-full flex items-center justify-center"
                >
                  {/* Orbital Payload / Marker */}
                  <div className="absolute top-0 w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_8px_rgba(245,179,1,0.8)] -translate-y-1/2" />
                </motion.div>
                
                {/* Ring 3 (Outer Solid) */}
                <div className="absolute w-[100%] h-[100%] border border-primary/5 rounded-full" />

                {/* Ring 4 (Very subtle huge outer, hidden on mobile) */}
                <div className="absolute w-[130%] h-[130%] border border-white/[0.03] rounded-full hidden md:block" />

                {/* Crosshairs / Tick Marks */}
                <div className="absolute w-[105%] h-[1px] bg-primary/10" />
                <div className="absolute w-[1px] h-[105%] bg-primary/10" />
                
                {/* Labels connected to the radar system */}
                <div className="absolute -top-4 lg:-top-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
                   <span className="font-heading text-[0.55rem] tracking-[0.3em] uppercase text-muted-foreground whitespace-nowrap">Core // Active</span>
                   <div className="w-[1px] h-4 lg:h-12 bg-primary/30" />
                </div>
                
                <div className="absolute top-[30%] -left-8 lg:-left-24 flex items-center gap-3 opacity-60">
                   <span className="font-heading text-[0.45rem] sm:text-[0.5rem] tracking-[0.3em] uppercase text-muted-foreground whitespace-nowrap">Strategy</span>
                   <div className="h-[1px] w-4 lg:w-16 bg-primary/30" />
                </div>

                <div className="absolute bottom-[30%] -left-12 lg:-left-32 flex items-center gap-3 opacity-60">
                   <span className="font-heading text-[0.45rem] sm:text-[0.5rem] tracking-[0.3em] uppercase text-muted-foreground whitespace-nowrap">Growth</span>
                   <div className="h-[1px] w-4 lg:w-20 bg-primary/30" />
                </div>
                
                <div className="absolute top-[40%] -right-8 lg:-right-24 flex items-center gap-3 opacity-60">
                   <div className="h-[1px] w-4 lg:w-16 bg-primary/30" />
                   <span className="font-heading text-[0.45rem] sm:text-[0.5rem] tracking-[0.3em] uppercase text-muted-foreground whitespace-nowrap">Creative</span>
                </div>

                <div className="absolute bottom-[20%] -right-12 lg:-right-28 flex items-center gap-3 opacity-60">
                   <div className="h-[1px] w-6 lg:w-24 bg-primary/30" />
                   <span className="font-heading text-[0.45rem] sm:text-[0.5rem] tracking-[0.3em] uppercase text-muted-foreground whitespace-nowrap">Technology</span>
                </div>

              </div>
            </motion.div>
          </div>

        </div>
      </div>
      
      {/* Bottom capability ticker (Desktop only, enhances the command center feel) */}
      <div className="absolute bottom-0 left-0 w-full border-t border-primary/10 bg-black/40 backdrop-blur-md hidden md:flex justify-between items-center px-8 py-3 font-heading text-[0.5rem] tracking-[0.3em] uppercase text-muted-foreground z-20">
         <div className="flex gap-8 items-center">
            <span className="text-primary font-semibold text-glow-amber">Capabilities //</span>
            <span className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-primary" /> Strategy</span>
            <span className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-primary" /> Identity</span>
            <span className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-primary" /> Content</span>
            <span className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-primary" /> Technology</span>
            <span className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-primary" /> Growth</span>
         </div>
         <div className="flex gap-4">
           <span className="flex items-center gap-2 opacity-50"><span className="text-primary font-mono">01</span> Emblem Core</span>
           <span className="flex items-center gap-2 opacity-50"><span className="text-primary font-mono">02</span> Signal Grid</span>
           <span className="flex items-center gap-2 opacity-50"><span className="text-primary font-mono">03</span> Black Vault</span>
         </div>
      </div>
    </section>
  );
}
