import { useState } from "react";
import { motion } from "framer-motion";

interface TeamStat {
  label: string;
  value: number;
}

interface TeamIntel {
  bio: string;
  stats: TeamStat[];
}

interface TeamCardProps {
  name: string;
  role: string;
  image: string;
  index: number;
}

const TEAM_INTEL: Record<string, TeamIntel> = {
  "Marcus Vane": {
    bio: "Leads high-stakes campaigns with battlefield-level discipline, aligning strategy and execution under pressure.",
    stats: [
      { label: "Speed", value: 88 },
      { label: "Precision", value: 95 },
      { label: "Experience", value: 99 },
    ],
  },
  "Aria Chen": {
    bio: "Translates abstract goals into sharp creative systems and mission-ready brand narratives.",
    stats: [
      { label: "Speed", value: 84 },
      { label: "Precision", value: 93 },
      { label: "Experience", value: 90 },
    ],
  },
  "Leo Kasper": {
    bio: "Builds visual assets engineered for impact, balancing aesthetics with tactical communication.",
    stats: [
      { label: "Speed", value: 86 },
      { label: "Precision", value: 91 },
      { label: "Experience", value: 88 },
    ],
  },
  "Nina Volkov": {
    bio: "Deploys growth-driven campaigns across channels and optimizes every touchpoint for conversion.",
    stats: [
      { label: "Speed", value: 90 },
      { label: "Precision", value: 89 },
      { label: "Experience", value: 92 },
    ],
  },
};

const surfaceClasses = "rounded-sm border border-primary/20 bg-[rgba(10,10,10,0.82)] shadow-[0_0_12px_rgba(245,166,35,0.15)] backdrop-blur-xl";

const STAT_WIDTH_CLASS: Record<number, string> = {
  82: "w-[82%]",
  84: "w-[84%]",
  85: "w-[85%]",
  86: "w-[86%]",
  88: "w-[88%]",
  89: "w-[89%]",
  90: "w-[90%]",
  91: "w-[91%]",
  92: "w-[92%]",
  93: "w-[93%]",
  95: "w-[95%]",
  99: "w-[99%]",
};

const getStatWidthClass = (value: number) => STAT_WIDTH_CLASS[value] ?? "w-[80%]";

const getFallbackIntel = (role: string, index: number): TeamIntel => ({
  bio: `Elite ${role.toLowerCase()} assigned to precision brand operations across digital and creative fronts.`,
  stats: [
    { label: "Speed", value: 82 + (index % 4) * 3 },
    { label: "Precision", value: 86 + (index % 3) * 3 },
    { label: "Experience", value: 88 + (index % 2) * 4 },
  ],
});

const TeamCard = ({ name, role, image, index }: TeamCardProps) => {
  const [flipped, setFlipped] = useState(false);
  const intel = TEAM_INTEL[name] ?? getFallbackIntel(role, index);
  const flipTransformClass = flipped ? "[transform:rotateY(180deg)]" : "[transform:rotateY(0deg)]";

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
          <div
            className={`absolute inset-0 ${surfaceClasses} overflow-hidden [backface-visibility:hidden] [-webkit-backface-visibility:hidden]`}
          >
            <div className="h-full flex flex-col">
              <div className="flex-1 overflow-hidden">
                <img
                  src={image}
                  alt={name}
                  className="w-full h-full object-cover transition-transform duration-500"
                />
              </div>
              <div className="p-3 sm:p-4">
                <h3 className="font-heading text-[0.7rem] sm:text-xs tracking-wider text-foreground">{name}</h3>
                <p className="text-[0.7rem] sm:text-xs text-primary mt-1 font-heading tracking-wider">{role}</p>
              </div>
            </div>
          </div>

          <div
            className={`absolute inset-0 ${surfaceClasses} p-3 sm:p-5 [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:rotateY(180deg)]`}
          >
            <div className="h-full flex flex-col overflow-y-auto pr-1">
              <p className="font-heading text-[0.56rem] sm:text-[0.65rem] tracking-[0.18em] text-primary mb-2.5 sm:mb-3">MISSION DOSSIER</p>
              <h3 className="font-heading text-[0.7rem] sm:text-xs tracking-wider text-foreground">{name}</h3>
              <p className="text-[0.62rem] sm:text-[0.65rem] text-primary mt-1 font-heading tracking-wider">{role}</p>

              <p className="text-[0.78rem] sm:text-xs leading-relaxed text-muted-foreground mt-2.5 sm:mt-3">{intel.bio}</p>

              <div className="mt-3 sm:mt-4 space-y-2.5 sm:space-y-3">
                {intel.stats.map((stat) => (
                  <div key={stat.label}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-heading text-[0.5rem] sm:text-[0.58rem] tracking-[0.15em] text-muted-foreground uppercase">{stat.label}</span>
                      <span className="font-heading text-[0.5rem] sm:text-[0.58rem] tracking-[0.15em] text-primary">{stat.value}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-muted/60 border border-primary/20 overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r from-primary/70 via-primary to-primary ${getStatWidthClass(stat.value)}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TeamCard;
