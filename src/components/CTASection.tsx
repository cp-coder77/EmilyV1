import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="section">
      <div className="container-custom">
        <motion.div 
          className="bg-gradient-to-r from-bold-coral/90 to-peach-blush rounded-3xl p-12 md:p-16 text-center text-white relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Background decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full">
            <motion.div 
              className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white opacity-10"
              animate={{ 
                y: [0, 10, 0],
                x: [0, -5, 0]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            <motion.div 
              className="absolute bottom-10 right-10 w-24 h-24 rounded-full bg-white opacity-5"
              animate={{ 
                y: [0, -15, 0],
                x: [0, 10, 0]
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            <motion.div 
              className="absolute top-1/2 right-20 w-16 h-16 rounded-full bg-white opacity-10"
              animate={{ 
                y: [0, 20, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          </div>
          
          {/* Content */}
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to chat with Emily?
            </h2>
            <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto mb-8">
              Start a conversation now and experience a new way of learning, exploring, and growing with an AI companion that truly cares.
            </p>
            <Link 
              to="/chat" 
              className="inline-flex items-center gap-2 bg-white text-bold-coral px-8 py-4 rounded-full font-semibold transition-all hover:bg-opacity-90 hover:shadow-lg"
            >
              <MessageCircle size={20} />
              Start Chatting Now
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;