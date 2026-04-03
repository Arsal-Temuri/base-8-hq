import { motion } from "framer-motion";

interface TeamCardProps {
  name: string;
  role: string;
  image: string;
  index: number;
}

const TeamCard = ({ name, role, image, index }: TeamCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="card-glass rounded-sm overflow-hidden group cursor-default"
  >
    <div className="aspect-[3/4] overflow-hidden">
      <img
        src={image}
        alt={name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
    </div>
    <div className="p-4">
      <h3 className="font-heading text-xs tracking-wider text-foreground">{name}</h3>
      <p className="text-xs text-primary mt-1 font-heading tracking-wider">{role}</p>
    </div>
  </motion.div>
);

export default TeamCard;
