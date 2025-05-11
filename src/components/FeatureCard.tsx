import { ReactNode } from 'react';
import { motion } from 'framer-motion';

type FeatureCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
  delay?: number;
};

const FeatureCard = ({ icon, title, description, delay = 0 }: FeatureCardProps) => {
  return (
    <motion.div 
      className="card group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="w-12 h-12 rounded-full bg-peach-blush/20 dark:bg-peach-blush/10 flex items-center justify-center mb-6 transform transition-transform group-hover:scale-110 text-bold-coral">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-warm-gray dark:text-warm-gray/80">{description}</p>
    </motion.div>
  );
};

export default FeatureCard;