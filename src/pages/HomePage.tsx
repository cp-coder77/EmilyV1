import { motion } from 'framer-motion';
import HeroSection from '../components/HeroSection';
import WhoEmily from '../components/WhoEmily';
import WhatEmily from '../components/WhatEmily';
import EmilysStyle from '../components/EmilysStyle';
import Testimonials from '../components/Testimonials';
import CTASection from '../components/CTASection';

const HomePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <HeroSection />
      <WhoEmily />
      <WhatEmily />
      <EmilysStyle />
      <Testimonials />
      <CTASection />
    </motion.div>
  );
};

export default HomePage;