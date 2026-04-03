import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Shield, Palette, Video, Megaphone, Globe, PenTool, Compass, Eye,
} from "lucide-react";
import PageWrapper from "@/components/PageWrapper";
import SectionHeader from "@/components/SectionHeader";
import ServiceCard from "@/components/ServiceCard";
import ProjectCard from "@/components/ProjectCard";
import TeamCard from "@/components/TeamCard";
import CTASection from "@/components/CTASection";

import heroBg from "@/assets/hero-bg.jpg";
import hqOffice from "@/assets/hq-office.jpg";
import projectCement from "@/assets/project-cement.jpg";
import projectCoffee from "@/assets/project-coffee.jpg";
import projectFitness from "@/assets/project-fitness.jpg";
import projectAerospace from "@/assets/project-aerospace.jpg";
import teamCommander from "@/assets/team-commander.jpg";
import teamStrategist from "@/assets/team-strategist.jpg";
import teamDesigner from "@/assets/team-designer.jpg";
import teamMarketing from "@/assets/team-marketing.jpg";

const services = [
  { icon: Shield, title: "Brand & Identity Unit", description: "Forge unbreakable brand identities that command authority and recognition across all battlefields." },
  { icon: Palette, title: "Visual Design Unit", description: "Craft striking visual systems that dominate attention and leave lasting impressions." },
  { icon: Video, title: "Video Production Unit", description: "Produce cinematic content that captures missions and amplifies your message." },
  { icon: Megaphone, title: "Digital Marketing Unit", description: "Deploy precision-targeted campaigns that reach and convert your ideal operatives." },
  { icon: Globe, title: "Web Development Unit", description: "Build digital command centers with cutting-edge technology and seamless performance." },
  { icon: PenTool, title: "Content Creation Unit", description: "Generate strategic content that engages, informs, and drives action." },
  { icon: Compass, title: "Strategy & Consulting Unit", description: "Chart the course for brand domination with data-driven strategic intelligence." },
  { icon: Eye, title: "Visualization & Design Unit", description: "Transform complex data into compelling visual narratives that inform decisions." },
];

const projects = [
  { name: "Dewan Cement", category: "Brand Identity", image: projectCement },
  { name: "Spectre Coffee", category: "Full Rebrand", image: projectCoffee },
  { name: "Apex Fitness", category: "Digital Campaign", image: projectFitness },
  { name: "Griffin Aerospace", category: "Brand Strategy", image: projectAerospace },
];

const team = [
  { name: "Marcus Vane", role: "Commander", image: teamCommander },
  { name: "Aria Chen", role: "Creative Strategist", image: teamStrategist },
  { name: "Leo Kasper", role: "Design Specialist", image: teamDesigner },
  { name: "Nina Volkov", role: "Marketing Lead", image: teamMarketing },
];

const Index = () => {
  return (
    <PageWrapper>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/30" />
        </div>
        <div className="scan-line" />
        <div className="relative container mx-auto px-4 text-center pt-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
              <span className="text-primary">Base8</span> Headquarters
            </h1>
            <p className="font-heading text-sm sm:text-lg md:text-xl tracking-[0.3em] text-muted-foreground mb-8">
              Where Brands Become Forces
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-6 mb-10 font-heading text-xs tracking-[0.2em] text-muted-foreground"
          >
            {["Media", "Marketing", "Strategy", "Execution"].map((w) => (
              <span key={w} className="border border-primary/20 px-4 py-2 rounded-sm">{w}</span>
            ))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/deploy-mission" className="btn-glow-filled rounded-sm">Start a Project</Link>
            <Link to="/contact" className="btn-glow rounded-sm">Get a Strategy Call</Link>
          </motion.div>
        </div>
      </section>

      <div className="glow-separator" />

      {/* HQ BRIEF */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="font-heading text-[0.65rem] tracking-[0.3em] text-primary mb-3 inline-block">// Headquarters Brief</span>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">
                Command Center for Brand Domination
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                BASE8HQ is not your average agency. We are a high-performance creative command center built for brands that refuse to blend in. Our operational units combine strategy, design, and technology to create unstoppable brand forces.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                From identity forging to digital warfare, every mission we deploy is precision-engineered for maximum impact.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="card-glass rounded-sm overflow-hidden"
            >
              <img src={hqOffice} alt="BASE8HQ Command Center" className="w-full h-full object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      <div className="glow-separator" />

      {/* OPERATIONAL UNITS */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <SectionHeader tag="Units" title="Operational Units" subtitle="Specialized divisions engineered for every aspect of brand warfare." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((s, i) => (
              <ServiceCard key={s.title} {...s} index={i} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/operational-units" className="btn-glow rounded-sm">View Operational Units</Link>
          </div>
        </div>
      </section>

      <div className="glow-separator" />

      {/* MISSION ARCHIVE */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <SectionHeader tag="Archive" title="Mission Archive" subtitle="Completed operations that redefined the battlefield." />
          <div className="grid sm:grid-cols-2 gap-4">
            {projects.map((p, i) => (
              <ProjectCard key={p.name} {...p} index={i} />
            ))}
          </div>
        </div>
      </section>

      <div className="glow-separator" />

      {/* STRIKE TEAM */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <SectionHeader tag="Team" title="Strike Team" subtitle="The elite operatives behind every successful mission." />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {team.map((t, i) => (
              <TeamCard key={t.name} {...t} index={i} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/strike-team" className="btn-glow rounded-sm">View Strike Team</Link>
          </div>
        </div>
      </section>

      <div className="glow-separator" />

      {/* CTA */}
      <CTASection />
    </PageWrapper>
  );
};

export default Index;
