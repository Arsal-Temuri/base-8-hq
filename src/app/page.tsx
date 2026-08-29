"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Shield, Palette, Video, Megaphone, Globe, PenTool, Compass, Eye,
} from "lucide-react";
import PageWrapper from "@/components/PageWrapper";
import SectionHeader from "@/components/SectionHeader";
import ServiceCard from "@/components/ServiceCard";
import InfiniteProjectSlider from "@/components/InfiniteProjectSlider";
import TeamCard from "@/components/TeamCard";
import CTASection from "@/components/CTASection";
import HomeHero from "@/components/HomeHero";

const hqOffice = "/assets/hq-office.jpg";
const projectCement = "/assets/project-cement.jpg";
const projectCoffee = "/assets/project-coffee.jpg";
const projectFitness = "/assets/project-fitness.jpg";
const projectAerospace = "/assets/project-aerospace.jpg";
const teamChairman = "/assets/Sultani%20B8.png";
const teamCTO = "/assets/Arsal%20Temuri%20B8.png";
const teamStrategist = "/assets/Qureshi%20B8.png";
const teamVisualArchitect = "/assets/Hassan%20B8.png";

const services = [
  {
    icon: Shield,
    title: "Brand & Identity Unit",
    description:
      "We craft complete identity systems through logo design, brand architecture, brand guidelines, and visual identity development.",
  },
  {
    icon: Palette,
    title: "Visual Communications Unit",
    description:
      "Our visual team creates brand graphics, print and digital collateral, campaign creatives, and presentation design that sharpen every message.",
  },
  {
    icon: Video,
    title: "Video Production Unit",
    description:
      "From edit to final output, we produce brand videos, short form content, and commercial content with a clear strategic purpose.",
  },
  {
    icon: Megaphone,
    title: "Digital Marketing Unit",
    description:
      "We run social media strategy, content planning, campaign strategy, and marketing consulting to turn reach into measurable growth.",
  },
  {
    icon: Globe,
    title: "Web Development Unit",
    description:
      "This unit builds websites, shapes UI/UX, sets up Shopify stores, and optimizes web performance for business outcomes.",
  },
  {
    icon: PenTool,
    title: "Content Creation Unit",
    description:
      "We handle scriptwriting, content concepts, short form content, and creative direction to keep messaging sharp across channels.",
  },
  {
    icon: Compass,
    title: "Strategy & Consulting Unit",
    description:
      "We define brand positioning and lead creative, content, and marketing planning so every initiative follows a clear direction.",
  },
  {
    icon: Eye,
    title: "3D Visualization Unit",
    description:
      "We deliver 3D modeling, 3D sculpting, architectural and interior/exterior visualization, plus AutoCAD drafting for immersive presentation.",
  },
];

const projects = [
  { name: "Dewan Cement", category: "Brand Identity", image: projectCement },
  { name: "Spectre Coffee", category: "Full Rebrand", image: projectCoffee },
  { name: "Apex Fitness", category: "Digital Campaign", image: projectFitness },
  { name: "Griffin Aerospace", category: "Brand Strategy", image: projectAerospace },
];

const team = [
  { name: "MR. SULTANI", role: "Founder & Creative Director", image: teamChairman },
  { name: "MR. TEMURI", role: "Co-Founder & Head of Technology", image: teamCTO },
  { name: "MR. QURESHI", role: "Co-Founder & Director of Strategic Development & Operations", image: teamStrategist },
  { name: "MR. H. MUSTAFA", role: "Co-Founder & Director of Design & Visualisation", image: teamVisualArchitect },
];

export default function Home() {
  return (
    <PageWrapper>
      {/* HERO */}
      <HomeHero />

      <div className="glow-separator" />

      {/* HQ BRIEF */}
      <section className="py-20 lg:py-28 section-veil">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="font-heading text-[0.58rem] tracking-[0.35em] text-primary mb-3 inline-block text-glow-amber">{"// Headquarters Brief"}</span>
              <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground mb-5 leading-tight tracking-[0.07em] text-shadow-heading">
                Command Center for Brand Domination
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4 text-[0.9rem] md:text-base tracking-wide text-shadow-body">
                BASE8HQ is not your average agency. We are a high-performance creative command center built for brands that refuse to blend in. Our structure allows us to remain agile while delivering strategic media, marketing & IT solutions.
              </p>
              <p className="text-muted-foreground leading-relaxed text-[0.9rem] md:text-base tracking-wide text-shadow-body">
                Every project begins with understanding the mission and ends with deploying the right creative solution.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="card-glass rounded-sm overflow-hidden relative h-[400px] md:h-full"
            >
              <Image src={hqOffice} alt="BASE8HQ Command Center" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
            </motion.div>
          </div>
        </div>
      </section>

      <div className="glow-separator" />

      {/* OPERATIONAL UNITS */}
      <section className="py-20 lg:py-28 section-veil">
        <div className="container mx-auto px-4">
          <SectionHeader tag="Units" title="Operational Units" subtitle="Specialized divisions engineered for every aspect of Media, Marketing and IT solutions." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((s, i) => (
              <ServiceCard key={s.title} {...s} index={i} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/operational-units" className="btn-glow rounded-sm">View Operational Units</Link>
          </div>
        </div>
      </section>

      <div className="glow-separator" />

      {/* MISSION ARCHIVE */}
      <section className="py-20 lg:py-28 section-veil overflow-hidden">
        <div className="container mx-auto px-4 mb-10">
          <SectionHeader tag="Archive" title="Mission Archive" subtitle="Completed operations that redefined the market." />
        </div>
        <InfiniteProjectSlider projects={projects} />
        <div className="text-center mt-10">
          <Link href="/mission-archive" className="btn-glow rounded-sm">View All Missions</Link>
        </div>
      </section>

      <div className="glow-separator" />

      {/* STRIKE TEAM */}
      <section className="py-20 lg:py-28 section-veil">
        <div className="container mx-auto px-4">
          <SectionHeader tag="Operators" title="Strike Team" subtitle="The people behind every successful mission." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {team.map((t, i) => (
              <TeamCard key={t.name} {...t} index={i} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/strike-team" className="btn-glow rounded-sm">Meet the Team</Link>
          </div>
        </div>
      </section>

      <div className="glow-separator" />

      {/* CTA */}
      <CTASection />
    </PageWrapper>
  );
}
