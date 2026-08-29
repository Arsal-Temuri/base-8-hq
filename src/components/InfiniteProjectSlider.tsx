"use client";

import Image from "next/image";

interface Project {
  name: string;
  category: string;
  image: string;
}

interface Props {
  projects: Project[];
}

// Duplicate array so we can animate -50% for a seamless loop
function duplicate<T>(arr: T[], times = 4): T[] {
  return Array.from({ length: times }, () => arr).flat();
}

function SliderCard({ project }: { project: Project }) {
  return (
    <div className="relative flex-shrink-0 w-[280px] sm:w-[320px] rounded-sm overflow-hidden border border-primary/15 group cursor-default"
         style={{ height: "190px" }}>
      <Image
        src={project.image}
        alt={project.name}
        fill
        sizes="320px"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
      {/* Hover amber tint */}
      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/8 transition-colors duration-500" />
      {/* Amber border glow on hover */}
      <div className="absolute inset-0 rounded-sm ring-0 group-hover:ring-1 ring-primary/50 transition-all duration-300" />
      {/* Text */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <span className="font-heading text-[0.55rem] tracking-[0.28em] text-primary text-glow-amber block mb-1">
          {project.category}
        </span>
        <h3 className="font-heading text-[0.8rem] tracking-[0.1em] text-white font-semibold text-shadow-heading leading-snug">
          {project.name}
        </h3>
      </div>
    </div>
  );
}

export default function InfiniteProjectSlider({ projects }: Props) {
  const row1 = duplicate(projects, 4);
  const row2 = duplicate([...projects].reverse(), 4);

  return (
    <div className="overflow-hidden w-full space-y-4 select-none">
      {/* Row 1 — scrolls left */}
      <div className="flex gap-4 slider-left w-max">
        {row1.map((p, i) => (
          <SliderCard key={`r1-${i}`} project={p} />
        ))}
      </div>
      {/* Row 2 — scrolls right */}
      <div className="flex gap-4 slider-right w-max">
        {row2.map((p, i) => (
          <SliderCard key={`r2-${i}`} project={p} />
        ))}
      </div>
    </div>
  );
}
