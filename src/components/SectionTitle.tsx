import { motion } from 'framer-motion';

type SectionTitleProps = {
  title: string;
  subtitle: string;
  isLight?: boolean;
};

const SectionTitle = ({ title, subtitle, isLight = true }: SectionTitleProps) => {
  return (
    <motion.div 
      className="text-center max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        {isLight ? (
          <>
            {title.split(' ')[0]} <span className="text-bold-coral">{title.split(' ').slice(1).join(' ')}</span>
          </>
        ) : (
          <>
            <span className="text-bold-coral">{title.split(' ')[0]}</span> {title.split(' ').slice(1).join(' ')}
          </>
        )}
      </h2>
      <p className="text-lg text-warm-gray dark:text-warm-gray/80">{subtitle}</p>
    </motion.div>
  );
};

export default SectionTitle;