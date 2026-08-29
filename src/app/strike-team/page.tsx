"use client";

import { motion } from "framer-motion";
import PageWrapper from "@/components/PageWrapper";
import SectionHeader from "@/components/SectionHeader";
import TeamCard from "@/components/TeamCard";
import CTASection from "@/components/CTASection";

const team = [
  { name: "MR. SULTANI", role: "Founder & Creative Director", image: "/assets/Sultani%20B8.png" },
  { name: "MR. TEMURI", role: "Co-Founder & Head of Technology", image: "/assets/Arsal%20Temuri%20B8.png" },
  { name: "MR. QURESHI", role: "Co-Founder & Director of Strategic Development & Operations", image: "/assets/Qureshi%20B8.png" },
  { name: "MR. H. MUSTAFA", role: "Co-Founder & Director of Design & Visualisation", image: "/assets/Hassan%20B8.png" },
];

const shadows = [
  "Data Intelligence",
  "Cyber Security",
  "Brand Research",
  "Content Support",
];

const StrikeTeamPage = () => (
  <PageWrapper>
    <section className="pt-32 pb-20 lg:pt-40 lg:pb-28">
      <div className="container mx-auto px-4">
        <SectionHeader tag="Team" title="Our Team" subtitle="The people behind every mission." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {team.map((t, i) => (
            <TeamCard key={t.name} {...t} index={i} />
          ))}
        </div>

        <SectionHeader tag="Classified" title="Shadow Operatives" subtitle="Working behind the scenes to help every project succeed." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {shadows.map((s, i) => (
            <motion.div
              key={s}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card-glass rounded-sm p-6 text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full border border-primary/30 flex items-center justify-center text-primary font-heading font-semibold text-xl">
                ?
              </div>
              <p className="font-heading font-semibold text-[0.73rem] tracking-wider text-muted-foreground">{s}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
    <CTASection />
  </PageWrapper>
);

export default StrikeTeamPage;
