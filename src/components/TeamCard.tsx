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
  "Mr. Sultani": {
    bio: "Creative director driving brand vision, campaign strategy and full-scale production from concept to delivery.",
    capabilities: [
      "Brand Strategy, Positioning & Creative Direction",
      "Marketing Campaign Planning & Content Strategy",
      "Film, Video, Audio & Voice-over Production",
      "Creative Project Management & Coordination",
      "Client Presentations & Brand Growth",
    ],
  },
  "Mr. Temuri": {
    bio: "Technology lead building digital products, interfaces and intelligent systems that power modern brands.",
    capabilities: [
      "Web Development",
      "App Development",
      "UI / UX Design",
      "Software Consultation",
      "AI Automation",
    ],
  },
  "Mr. Qureshi": {
    bio: "Strategy lead turning market insight into operational advantage through data-driven decision making.",
    capabilities: [
      "Business Strategy, Market Research & Discovery",
      "UX Thinking & Digital Experiences",
      "Performance Marketing & Meta Advertising",
      "Process Optimization & Workflow Analysis",
      "Systems Thinking & Digital Growth",
    ],
  },
  "Mr. H. Mustafa": {
    bio: "Visual lead crafting high-fidelity 3D assets and graphic design that define the brand's visual language.",
    capabilities: [
      "3D Character, Prop & Digital Asset Modeling",
      "Architectural 3D Interior & Exterior Visualization",
      "Logo Design, Branding & Image Manipulation",
      "Posters, Social Media Graphics & Thumbnails",
      "Professional High-Quality Visual Design",
    ],
  },
};

const getFallbackIntel = (role: string): TeamMemberIntel => ({
  bio: `Elite ${role.toLowerCase()} assigned to precision brand operations across digital and creative fronts.`,
  capabilities: [
    "Strategic brand operations",
    "Cross-channel execution",
    "Creative problem solving",
    "Client engagement & communication",
    "Campaign planning & delivery",
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
      className="w-full"
    >
      <div className="relative w-full aspect-[2/3] sm:aspect-[3/4] [perspective:1400px]">
        <div
          className={`relative h-full w-full transform-gpu transition-transform [transition-duration:1500ms] [transform-style:preserve-3d] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] [will-change:transform] ${flipTransformClass}`}
        >
          {/* ── FRONT ── */}
          <div
            className={`absolute inset-0 ${surfaceClasses} overflow-hidden [backface-visibility:hidden] [-webkit-backface-visibility:hidden]`}
          >
            <div className="h-full flex flex-col">
              <div className="relative flex-1 overflow-hidden">
                <Image
                  src={image}
                  alt={name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500"
                />
              </div>
              <div className="p-3 sm:p-4">
                <h3 className="font-heading text-[0.7rem] sm:text-xs tracking-wider text-foreground">
                  {name}
                </h3>
                <p className="text-[0.7rem] sm:text-xs text-primary mt-1 font-heading tracking-wider">
                  {role}
                </p>
              </div>
            </div>
          </div>

          {/* ── BACK ── */}
          <div
            className={`absolute inset-0 ${surfaceClasses} p-4 sm:p-5 [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:rotateY(180deg)]`}
          >
            <div className="h-full flex flex-col">
              {/* Header */}
              <p className="font-heading text-[0.56rem] sm:text-[0.6rem] tracking-[0.2em] text-primary mb-2 sm:mb-3">
                MISSION DOSSIER
              </p>
              <h3 className="font-heading text-[0.7rem] sm:text-xs tracking-wider text-foreground leading-snug">
                {name}
              </h3>
              <p className="text-[0.62rem] sm:text-[0.65rem] text-primary mt-0.5 font-heading tracking-wider">
                {role}
              </p>

              {/* Divider */}
              <div className="my-2.5 sm:my-3 h-px bg-gradient-to-r from-primary/40 via-primary/20 to-transparent" />

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
    </motion.div>
  );
};

export default TeamCard;
