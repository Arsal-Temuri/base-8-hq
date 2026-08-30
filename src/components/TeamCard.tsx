"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface TeamMemberIntel {
  bio: string;
  capabilities: string[];
}

interface TeamCardProps {
  name: string;
  role: string;
  image: string;
  index: number;
}

const TEAM_INTEL: Record<string, TeamMemberIntel> = {
  "MR. SULTANI": {
    bio: "Founder and creative visionary steering the brand’s narrative, direction, and high-impact executions across all major campaigns.",
    capabilities: [
      "Brand direction & creative leadership",
      "Campaign concepting & storytelling",
      "Creative production oversight",
      "Client vision alignment",
      "High-end brand positioning",
    ],
  },
  "MR. TEMURI": {
    bio: "Co-founder leading the digital infrastructure behind BASE8HQ, building systems and experiences that scale with the business.",
    capabilities: [
      "Web & product development",
      "UX architecture & digital systems",
      "Technology strategy & execution",
      "AI-driven workflow design",
      "Scalable platform thinking",
    ],
  },
  "MR. QURESHI": {
    bio: "Co-founder shaping strategic growth, operational systems, and execution frameworks that turn insight into measurable momentum.",
    capabilities: [
      "Strategic planning & execution",
      "Business operations & growth systems",
      "Market research & decision support",
      "Performance marketing oversight",
      "Operational efficiency design",
    ],
  },
  "MR. H. MUSTAFA": {
    bio: "Co-founder and visual lead transforming ideas into compelling, high-fidelity designs and immersive visual experiences.",
    capabilities: [
      "3D visualization & design direction",
      "Brand visual storytelling",
      "Concept art & presentation design",
      "Architectural & product visuals",
      "Premium visual execution",
    ],
  },
  "RENcore (REN)": {
    bio: "Strategic intelligence core supporting command decisions, operational systems and mission integrity across BASE8HQ from planning to execution.",
    capabilities: [
      "Strategic Intelligence, Analysis & Decision Support",
      "Systems Architecture & Operational Frameworks",
      "Research, Ideation & Mission Planning",
      "Financial Protocol & Revenue Integrity",
      "AI-Assisted Strategy, Optimization & Knowledge Support",
    ],
  },
};

const getFallbackIntel = (role: string): TeamMemberIntel => ({
  bio: `Elite ${role.toLowerCase()} assigned to precision brand operations across digital and creative fronts.`,
  capabilities: [
    "Strategic oversight",
    "Cross-functional execution",
    "Creative problem solving",
    "Client-facing leadership",
    "High-impact delivery",
  ],
});

const surfaceClasses =
  "rounded-sm border border-primary/20 bg-[rgba(10,10,10,0.82)] shadow-[0_0_12px_rgba(245,166,35,0.15)] backdrop-blur-xl";

const TeamCard = ({ name, role, image, index }: TeamCardProps) => {
  const [flipped, setFlipped] = useState(false);
  const intel = TEAM_INTEL[name] ?? getFallbackIntel(role);
  const flipTransformClass = flipped
    ? "[transform:rotateY(180deg)]"
    : "[transform:rotateY(0deg)]";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      className="w-full group"
    >
      <div className="relative w-full aspect-[4/5] [perspective:1400px]">
        <div
          className={`relative h-full w-full transform-gpu transition-transform [transition-duration:1500ms] [transform-style:preserve-3d] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] [will-change:transform] ${flipTransformClass}`}
        >
          {/* ── FRONT ── */}
          <div
            className={`absolute inset-0 ${surfaceClasses} rounded-b-none border-b-0 overflow-hidden [backface-visibility:hidden] [-webkit-backface-visibility:hidden]`}
          >
            <div className="h-full w-full relative">
              <Image
                src={image}
                alt={name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-contain object-bottom transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>

          {/* ── BACK ── */}
          <div
            className={`absolute inset-0 ${surfaceClasses} rounded-b-none border-b-0 p-4 sm:p-5 [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:rotateY(180deg)]`}
          >
            <div className="h-full flex flex-col">
              {/* Header */}
              <p className="font-heading text-[0.56rem] sm:text-[0.6rem] tracking-[0.2em] text-primary mb-3">
                MISSION DOSSIER
              </p>
              
              {/* Divider */}
              <div className="mb-3 h-px bg-gradient-to-r from-primary/40 via-primary/20 to-transparent" />

              {/* Bio */}
              <p className="text-[0.68rem] sm:text-[0.72rem] leading-relaxed text-muted-foreground mb-3">
                {intel.bio}
              </p>

              {/* Capabilities */}
              <ul className="space-y-1.5 flex-1 overflow-hidden">
                {intel.capabilities.map((cap) => (
                  <li key={cap} className="flex items-start gap-2">
                    {/* Golden bullet dot */}
                    <span className="mt-[0.28rem] shrink-0 w-1 h-1 rounded-full bg-primary shadow-[0_0_4px_rgba(245,166,35,0.8)]" />
                    <span className="text-[0.62rem] sm:text-[0.68rem] text-muted-foreground leading-snug">
                      {cap}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* ── PERSISTENT TAG (BELOW FLIP CONTAINER) ── */}
      <div className={`p-3 sm:p-4 ${surfaceClasses} rounded-t-none border-t border-primary/20 relative z-10`}>
        <h3 className="font-heading text-[0.7rem] sm:text-xs tracking-wider text-foreground">
          {name}
        </h3>
        <p className="text-[0.7rem] sm:text-xs text-primary mt-1 font-heading tracking-wider">
          {role}
        </p>
      </div>
    </motion.div>
  );
};

export default TeamCard;
