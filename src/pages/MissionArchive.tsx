import { useState } from "react";
import PageWrapper from "@/components/PageWrapper";
import SectionHeader from "@/components/SectionHeader";
import ProjectCard from "@/components/ProjectCard";
import CTASection from "@/components/CTASection";

import projectCement from "@/assets/project-cement.jpg";
import projectCoffee from "@/assets/project-coffee.jpg";
import projectFitness from "@/assets/project-fitness.jpg";
import projectAerospace from "@/assets/project-aerospace.jpg";

const projects = [
  { name: "Dewan Cement", category: "Brand Identity", image: projectCement },
  { name: "Spectre Coffee", category: "Full Rebrand", image: projectCoffee },
  { name: "Apex Fitness", category: "Digital Campaign", image: projectFitness },
  { name: "Griffin Aerospace", category: "Brand Strategy", image: projectAerospace },
];

const categories = ["All", "Brand Identity", "Full Rebrand", "Digital Campaign", "Brand Strategy"];

const MissionArchive = () => {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <PageWrapper>
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="container mx-auto px-4">
          <SectionHeader tag="Archive" title="Mission Archive" subtitle="Explore our completed operations and the impact they created." />
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`font-heading text-[0.65rem] tracking-widest px-4 py-2 rounded-sm border transition-all ${
                  filter === c
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-primary/20 text-muted-foreground hover:text-foreground hover:border-primary/40"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {filtered.map((p, i) => (
              <ProjectCard key={p.name} {...p} index={i} />
            ))}
          </div>
        </div>
      </section>
      <CTASection />
    </PageWrapper>
  );
};

export default MissionArchive;
