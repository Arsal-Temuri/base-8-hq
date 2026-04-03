import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
}

const ServiceCard = ({ icon: Icon, title, description, index }: ServiceCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.08 }}
    className="card-glass rounded-sm p-6 group cursor-default"
  >
    <div className="w-10 h-10 flex items-center justify-center border border-primary/40 rounded-sm mb-4 text-primary group-hover:bg-primary/10 transition-colors">
      <Icon size={18} />
    </div>
    <h3 className="font-heading text-xs tracking-wider text-foreground mb-2">{title}</h3>
    <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
  </motion.div>
);

export default ServiceCard;
