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
    className="card-glass rounded-sm p-4 sm:p-5 lg:p-6 group cursor-default"
  >
    <div className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center border border-primary/40 rounded-sm mb-3 sm:mb-4 text-primary group-hover:bg-primary/10 transition-colors">
      <Icon size={16} />
    </div>
    <h3 className="font-heading text-[0.7rem] sm:text-xs tracking-wider text-foreground mb-2">{title}</h3>
    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{description}</p>
  </motion.div>
);

export default ServiceCard;
