"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
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

        <SectionHeader tag="Classified" title="Shadow Operatives" subtitle="Independent specialists deployed when the mission demands it." />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto card-glass border border-primary/40 shadow-[0_0_30px_rgba(255,165,0,0.1)] rounded-md p-8 md:p-12 text-center relative overflow-hidden mb-20"
        >
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-14 h-14 mx-auto mb-6 rounded-full border border-primary/50 bg-background/50 flex items-center justify-center text-primary font-heading font-semibold text-xl shadow-[0_0_15px_rgba(255,165,0,0.2)]">
              ?
            </div>
            
            <h3 className="font-heading font-bold text-xl md:text-2xl tracking-widest text-foreground uppercase mb-4">
              Enter The Shadow Network
            </h3>
            
            <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto mb-8 leading-relaxed">
              BASE8HQ maintains an open network of independent specialists, freelancers and creative operatives who may be deployed when a mission requires their expertise. Submit your profile to join our Shadow Operative Network for future mission-based collaboration.
            </p>
            
            <ul className="flex flex-col items-start gap-3 mb-10 text-muted-foreground text-sm md:text-base mx-auto w-fit text-left">
              <li className="flex items-center gap-3">
                <ChevronRight className="w-4 h-4 text-primary" />
                <span>No fixed vacancy.</span>
              </li>
              <li className="flex items-center gap-3">
                <ChevronRight className="w-4 h-4 text-primary" />
                <span>No permanent posting.</span>
              </li>
              <li className="flex items-center gap-3">
                <ChevronRight className="w-4 h-4 text-primary" />
                <span>Your skills determine the mission.</span>
              </li>
            </ul>
            
            <button className="px-8 py-3 border border-primary/80 text-primary font-heading text-sm font-semibold tracking-widest uppercase hover:bg-primary/10 hover:shadow-[0_0_15px_rgba(255,165,0,0.3)] transition-all duration-300 mb-6 rounded-sm">
              Submit Operative Profile
            </button>
            
            <p className="text-xs text-muted-foreground/70">
              Profiles remain on file for future BASE8HQ missions.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
    <CTASection />
  </PageWrapper>
);

export default StrikeTeamPage;
