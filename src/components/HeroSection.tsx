import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-b from-vanilla-cream to-vanilla-cream/50 dark:from-midnight-navy dark:to-midnight-navy/95">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Hi, I'm Emily — 
                <span className="text-bold-coral"> your cozy, clever AI companion.</span>
              </h1>
              <p className="text-lg md:text-xl text-warm-gray dark:text-warm-gray/80 mb-8">
                Let's learn, explore, and grow — together.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/chat" className="btn-primary flex items-center justify-center gap-2">
                  Start Chatting <ArrowRight size={18} />
                </Link>
                <Link to="/about" className="btn-outline">
                  Learn About Emily
                </Link>
              </div>
            </motion.div>
          </div>
          
          <div className="md:w-1/2 md:pl-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square max-w-md mx-auto bg-gradient-to-br from-peach-blush/20 to-soft-teal/20 rounded-full flex items-center justify-center p-8">
                <div className="relative w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-peach-blush to-soft-teal shadow-cozy-lg">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full w-3/4 h-3/4 flex items-center justify-center">
                      <motion.div
                        animate={{ 
                          scale: [1, 1.05, 1],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                      >
                        <div className="relative text-center">
                          <span className="text-white text-7xl opacity-90">E</span>
                          <motion.div 
                            className="absolute -top-1 -right-2 w-3 h-3 bg-bold-coral rounded-full"
                            animate={{ 
                              y: [0, -5, 0],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              repeatType: "reverse"
                            }}
                          />
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <motion.div 
                className="absolute top-0 right-0 w-14 h-14 bg-peach-blush rounded-full opacity-40"
                animate={{ 
                  y: [0, -15, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
              <motion.div 
                className="absolute bottom-10 left-0 w-10 h-10 bg-bold-coral rounded-full opacity-30"
                animate={{ 
                  y: [0, 15, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
              <motion.div 
                className="absolute bottom-0 right-20 w-8 h-8 bg-soft-teal rounded-full opacity-40"
                animate={{ 
                  y: [0, 10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;