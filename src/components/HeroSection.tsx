import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  // Animation variants for staggered text entrance
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-b from-vanilla-cream to-vanilla-cream/50 dark:from-midnight-navy dark:to-midnight-navy/95">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
                variants={textVariants}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                Hi, I'm Emily — 
                <motion.span 
                  className="text-bold-coral"
                  variants={textVariants}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                >
                  {" "}your cozy, clever AI companion.
                </motion.span>
              </motion.h1>
              
              <motion.p 
                className="text-lg md:text-xl text-warm-gray dark:text-warm-gray/80 mb-8"
                variants={textVariants}
                transition={{ duration: 1, ease: "easeOut", delay: 1.2 }}
              >
                Let's learn, explore, and grow — together.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 1.8 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <Link to="/chat" className="btn-primary flex items-center justify-center gap-2">
                    Start Chatting <ArrowRight size={18} />
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <Link to="/about" className="btn-outline">
                    Learn About Emily
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
          
          <div className="md:w-1/2 md:pl-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="relative"
            >
              <div className="aspect-square max-w-md mx-auto bg-gradient-to-br from-peach-blush/20 to-soft-teal/20 rounded-full flex items-center justify-center p-8">
                <div className="relative w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-peach-blush to-soft-teal shadow-cozy-lg">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full w-3/4 h-3/4 flex items-center justify-center relative overflow-hidden">
                      {/* Enhanced sigil with better integration */}
                      <motion.div
                        className="relative z-10"
                        animate={{ 
                          scale: [1, 1.02, 1],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <motion.img
                          src="/emily-sigil.png"
                          alt="Emily AI Sigil"
                          className="w-20 h-20 md:w-24 md:h-24 object-contain relative z-10"
                          style={{
                            filter: "drop-shadow(0 0 8px rgba(255, 90, 61, 0.3)) drop-shadow(0 0 16px rgba(80, 178, 192, 0.2))",
                          }}
                          onError={(e) => {
                            console.log('Image failed to load, using fallback');
                            // Fallback to original "E" if image fails
                            e.currentTarget.style.display = 'none';
                            const fallback = e.currentTarget.nextElementSibling;
                            if (fallback) fallback.style.display = 'block';
                          }}
                        />
                        {/* Fallback "E" if image doesn't load */}
                        <div 
                          className="absolute inset-0 flex items-center justify-center text-white text-4xl md:text-5xl opacity-90 font-bold"
                          style={{ display: 'none' }}
                        >
                          E
                        </div>
                        
                        {/* Additional glow layer for better integration */}
                        <motion.div
                          className="absolute inset-0 w-20 h-20 md:w-24 md:h-24 rounded-full pointer-events-none"
                          style={{
                            background: "radial-gradient(circle, rgba(255, 90, 61, 0.1) 0%, rgba(80, 178, 192, 0.05) 50%, transparent 70%)",
                          }}
                          animate={{
                            opacity: [0.3, 0.6, 0.3],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                      </motion.div>
                      
                      {/* Floating dot animation */}
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
                  </div>
                  
                  {/* Orb surface reflection effect */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-white/20 blur-sm pointer-events-none" />
                </div>
              </div>
              
              {/* Floating elements with synchronized timing */}
              <motion.div 
                className="absolute top-0 right-0 w-14 h-14 bg-peach-blush rounded-full opacity-40"
                animate={{ 
                  y: [0, -15, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
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
                  repeatType: "reverse",
                  ease: "easeInOut"
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
                  repeatType: "reverse",
                  ease: "easeInOut"
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