import {
  Shield, Palette, Video, Megaphone, Globe, PenTool, Compass, Eye,
} from "lucide-react";
import { motion } from "framer-motion";
import PageWrapper from "@/components/PageWrapper";
import SectionHeader from "@/components/SectionHeader";
import CTASection from "@/components/CTASection";

interface OperationalUnit {
  icon: React.ComponentType<{ size?: number }>;
  title: string;
  services: string[];
}

const units = [
  {
    icon: Shield,
    title: "Brand & Identity Unit",
    services: [
      "Logo Design",
      "Brand Identity Systems",
      "Brand Guidelines",
      "Visual Identity Development",
    ],
  },
  {
    icon: Palette,
    title: "Visual Design Unit",
    services: [
      "Graphic Design",
      "Marketing Collateral",
      "Digital Creative Assets",
      "Social Media Design",
    ],
  },
  {
    icon: Video,
    title: "Video Production Unit",
    services: [
      "Video Editing",
      "Brand Videos",
      "Short Form Content",
      "Commercial Content Production",
    ],
  },
  {
    icon: Megaphone,
    title: "Digital Marketing Unit",
    services: [
      "Social Media Strategy",
      "Content Planning",
      "Campaign Strategy",
      "Marketing Consulting",
    ],
  },
  {
    icon: Globe,
    title: "Web Development Unit",
    services: [
      "Website Development",
      "UI / UX Design",
      "Shopify Store Setup",
      "Website Optimization",
    ],
  },
  {
    icon: PenTool,
    title: "Content Creation Unit",
    services: [
      "Scriptwriting",
      "Content Concepts",
      "Short Form Content",
      "Creative Direction",
    ],
  },
  {
    icon: Compass,
    title: "Strategy & Consulting Unit",
    services: [
      "Brand Positioning",
      "Creative Strategy",
      "Content Strategy",
      "Marketing Planning",
    ],
  },
  {
    icon: Eye,
    title: "Visualization & Design Unit",
    services: [
      "3D Modeling",
      "3D Design",
      "Architectural Visualization",
      "Interior Design Visualization",
      "CAD Design",
    ],
  },
] satisfies OperationalUnit[];

const OperationalUnits = () => (
  <PageWrapper>
    <section className="pt-32 pb-20 lg:pt-40 lg:pb-28">
      <div className="container mx-auto px-4">
        <SectionHeader
          tag="Operations"
          title="Operational Units"
          subtitle="Eight specialized divisions with clearly defined service capabilities."
        />

        <div className="grid lg:grid-cols-2 gap-4 lg:gap-5">
          {units.map((unit, index) => {
            const Icon = unit.icon;

            return (
              <motion.article
                key={unit.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="card-glass rounded-sm p-5 md:p-6 relative overflow-hidden"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-11 h-11 rounded-sm border border-primary/35 bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <Icon size={18} />
                    </div>
                    <div>
                      <h3 className="font-heading text-xs sm:text-sm tracking-wider text-foreground">{unit.title}</h3>
                      <p className="font-heading text-[0.58rem] tracking-[0.16em] text-muted-foreground mt-1">
                        UNIT {String(index + 1).padStart(2, "0")}
                      </p>
                    </div>
                  </div>

                  <span className="border border-primary/35 bg-primary/10 px-2.5 py-1 rounded-sm font-heading text-[0.56rem] tracking-[0.14em] text-primary whitespace-nowrap">
                    {unit.services.length} OPS
                  </span>
                </div>

                <div className="mt-5 space-y-2.5">
                  {unit.services.map((service) => (
                    <div
                      key={service}
                      className="flex items-center gap-3 border border-primary/20 bg-background/40 rounded-sm px-3 py-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/80 shrink-0" />
                      <span className="text-sm text-foreground">{service}</span>
                    </div>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
    <CTASection />
  </PageWrapper>
);

export default OperationalUnits;
