import { motion } from "framer-motion";
import PageWrapper from "@/components/PageWrapper";
import SectionHeader from "@/components/SectionHeader";
import CTASection from "@/components/CTASection";
import hqOffice from "@/assets/hq-office.jpg";

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true } as const,
  transition: { duration: 0.6 },
};

const values = [
  { title: "Mission", text: "To transform brands into dominant forces through the fusion of creative excellence and strategic precision." },
  { title: "Vision", text: "To be the world's most formidable creative command center—where every brand we touch becomes unstoppable." },
  { title: "Operational Philosophy", text: "We operate with discipline and creative fearlessness. Every project is a mission, every client is a partner, and every outcome is a victory." },
];

const Headquarters = () => (
  <PageWrapper>
    <section className="pt-32 pb-20 lg:pt-40 lg:pb-28">
      <div className="container mx-auto px-4">
        <SectionHeader tag="HQ" title="Headquarters" subtitle="The command center behind every successful brand operation." />

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <motion.div {...fadeIn}>
            <h3 className="font-heading text-lg font-bold text-foreground mb-4">About BASE8HQ</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              BASE 8 HEADQUARTERS was founded with the objective of building a focused creative studio capable of delivering strategic media and marketing solutions.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The headquarters operates through a structured system where each operator contributes specialized expertise. This approach allows BASE8HQ to remain efficient, adaptable, and results-oriented.
            </p>
          </motion.div>
          <motion.div {...fadeIn} className="card-glass rounded-sm overflow-hidden">
            <img src={hqOffice} alt="Headquarters" className="w-full object-cover" />
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card-glass rounded-sm p-6"
            >
              <h3 className="font-heading text-xs tracking-wider text-primary mb-3">{v.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{v.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
    <CTASection />
  </PageWrapper>
);

export default Headquarters;
