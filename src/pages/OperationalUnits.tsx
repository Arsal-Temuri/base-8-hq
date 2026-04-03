import {
  Shield, Palette, Video, Megaphone, Globe, PenTool, Compass, Eye,
} from "lucide-react";
import PageWrapper from "@/components/PageWrapper";
import SectionHeader from "@/components/SectionHeader";
import ServiceCard from "@/components/ServiceCard";
import CTASection from "@/components/CTASection";

const units = [
  { icon: Shield, title: "Brand & Identity Unit", description: "We forge brand identities from the ground up—logos, brand books, tone of voice, and visual systems that command respect and recognition. Your brand becomes a force." },
  { icon: Palette, title: "Visual Design Unit", description: "From UI/UX to print design, our visual unit crafts experiences that captivate and convert. Every pixel serves a purpose in the mission." },
  { icon: Video, title: "Video Production Unit", description: "Cinematic storytelling meets tactical precision. We produce brand films, product demos, social content, and motion graphics that stop the scroll." },
  { icon: Megaphone, title: "Digital Marketing Unit", description: "Precision-targeted campaigns across all channels. SEO, PPC, social media, email—we deploy the right strategy at the right time for maximum ROI." },
  { icon: Globe, title: "Web Development Unit", description: "Custom-built digital command centers. We develop high-performance websites and web applications using cutting-edge frameworks and technologies." },
  { icon: PenTool, title: "Content Creation Unit", description: "Strategic content that resonates, engages, and converts. From copywriting to editorial, every word is a weapon in your brand arsenal." },
  { icon: Compass, title: "Strategy & Consulting Unit", description: "Data-driven intelligence meets creative vision. We map the competitive landscape and chart a course for brand domination." },
  { icon: Eye, title: "Visualization & Design Unit", description: "Complex data transformed into compelling visual narratives. Infographics, data dashboards, and presentation design that inform and inspire." },
];

const OperationalUnits = () => (
  <PageWrapper>
    <section className="pt-32 pb-20 lg:pt-40 lg:pb-28">
      <div className="container mx-auto px-4">
        <SectionHeader tag="Operations" title="Operational Units" subtitle="Each unit is a specialized division of BASE8HQ, engineered for a specific domain of brand warfare." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {units.map((u, i) => (
            <ServiceCard key={u.title} {...u} index={i} />
          ))}
        </div>
      </div>
    </section>
    <CTASection />
  </PageWrapper>
);

export default OperationalUnits;
