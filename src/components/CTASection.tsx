import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CTASection = () => (
  <section className="relative py-24 lg:py-32 overflow-hidden">
    {/* Animated glow lines */}
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
    </div>
    <div className="absolute top-1/2 left-0 right-0 glow-separator" />

    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="relative container mx-auto px-4 text-center"
    >
      <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-6 max-w-3xl mx-auto leading-tight">
        Ready to Build Your Brand's Headquarters?
      </h2>
      <p className="text-muted-foreground mb-10 max-w-xl mx-auto">
        Deploy your next mission with a team that operates at the highest level of creative excellence.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link to="/deploy-mission" className="btn-glow-filled rounded-sm">
          Start a Project
        </Link>
        <Link to="/contact" className="btn-glow rounded-sm">
          Get a Strategy Call
        </Link>
      </div>
    </motion.div>
  </section>
);

export default CTASection;
