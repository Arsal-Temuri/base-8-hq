import PageWrapper from "@/components/PageWrapper";
import SectionHeader from "@/components/SectionHeader";
import TeamCard from "@/components/TeamCard";
import CTASection from "@/components/CTASection";
import { motion } from "framer-motion";

import teamCommander from "@/assets/team-commander.jpg";
import teamStrategist from "@/assets/team-strategist.jpg";
import teamDesigner from "@/assets/team-designer.jpg";
import teamMarketing from "@/assets/team-marketing.jpg";

const team = [
  { name: "Marcus Vane", role: "Commander", image: teamCommander },
  { name: "Aria Chen", role: "Creative Strategist", image: teamStrategist },
  { name: "Leo Kasper", role: "Design Specialist", image: teamDesigner },
  { name: "Nina Volkov", role: "Marketing Lead", image: teamMarketing },
];

const shadows = [
  "Data Intelligence Operative",
  "Cyber Warfare Specialist",
  "Brand Reconnaissance Agent",
  "Content Deployment Officer",
];

const StrikeTeam = () => (
  <PageWrapper>
    <section className="pt-32 pb-20 lg:pt-40 lg:pb-28">
      <div className="container mx-auto px-4">
        <SectionHeader tag="Team" title="Strike Team" subtitle="The elite operatives behind every mission." />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {team.map((t, i) => (
            <TeamCard key={t.name} {...t} index={i} />
          ))}
        </div>

        <SectionHeader tag="Classified" title="Shadow Operatives" subtitle="Operating behind the scenes to ensure mission success." />
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
              <div className="w-16 h-16 mx-auto mb-4 rounded-full border border-primary/30 flex items-center justify-center text-primary font-heading text-xl">
                ?
              </div>
              <p className="font-heading text-[0.65rem] tracking-wider text-muted-foreground">{s}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
    <CTASection />
  </PageWrapper>
);

export default StrikeTeam;
