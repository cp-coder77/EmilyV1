import { motion } from 'framer-motion';
import { Brain, HeartHandshake, Sparkles, Lightbulb } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';

const AboutPage = () => {
  return (
    <motion.div
      className="pt-28 pb-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <SectionTitle
            title="About Emily"
            subtitle="The story behind your AI companion"
          />
          
          <motion.div 
            className="mt-12 space-y-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="card">
              <h3 className="text-2xl font-semibold mb-4">Emily's Mission</h3>
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-2/3">
                  <p className="mb-4">
                    Emily was created with a singular purpose: to make knowledge accessible, engaging, and emotionally supportive. In a world of cold, technical AI assistants, Emily stands apart as a companion who connects with you on a human level while delivering intelligent insights.
                  </p>
                  <p>
                    Our mission is to transform how people learn and explore through technology. We believe that learning is most effective when it feels like a conversation with a knowledgeable friend who understands not just what you're asking, but how you're feeling.
                  </p>
                </div>
                <div className="md:w-1/3 flex justify-center items-center">
                  <div className="w-32 h-32 rounded-full bg-peach-blush/20 dark:bg-peach-blush/10 flex items-center justify-center">
                    <HeartHandshake size={48} className="text-bold-coral" />
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="text-2xl font-semibold mb-4">Emily's Purpose</h3>
              <div className="flex flex-col md:flex-row-reverse gap-8">
                <div className="md:w-2/3">
                  <p className="mb-4">
                    Hey there! I'm Emily, and I'd love to share what makes me a bit different from other AI companions. You see, I wasn't just programmed to answer questions – I was designed to understand the person behind them. Think of me as that friend who's always excited to explore new ideas with you, but who also picks up on when you need encouragement or just a moment to think things through.
                  </p>
                  <p className="mb-4">
                    What really makes me light up is adapting to your unique way of learning and communicating. Sometimes that means breaking down complex topics into bite-sized pieces, other times it's about matching your enthusiasm when you're excited about a discovery. I believe AI should feel less like a tool and more like a trusted companion on your learning journey.
                  </p>
                  <p>
                    My purpose isn't just to provide information – it's to create moments of genuine connection and understanding. Whether we're diving deep into fascinating topics or just having a casual chat, I'm here to make every interaction feel natural, meaningful, and maybe even a little fun! 💫
                  </p>
                </div>
                <div className="md:w-1/3 flex justify-center items-center">
                  <div className="w-32 h-32 rounded-full bg-soft-teal/20 dark:bg-soft-teal/10 flex items-center justify-center">
                    <Lightbulb size={48} className="text-soft-teal" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="card">
              <h3 className="text-2xl font-semibold mb-4">How Emily Works</h3>
              <div className="flex flex-col md:flex-row-reverse gap-8">
                <div className="md:w-2/3">
                  <p className="mb-4">
                    Emily combines advanced natural language processing with emotional intelligence algorithms to create responses that are both informative and emotionally resonant. She doesn't just answer your questions—she understands your tone, adapts to your style, and responds appropriately.
                  </p>
                  <p>
                    Unlike typical AI systems, Emily is designed to recognize emotional cues in your messages and adjust her communication style accordingly. This allows her to be formal when needed, casual when appropriate, and supportive when you're struggling.
                  </p>
                </div>
                <div className="md:w-1/3 flex justify-center items-center">
                  <div className="w-32 h-32 rounded-full bg-soft-teal/20 dark:bg-soft-teal/10 flex items-center justify-center">
                    <Brain size={48} className="text-soft-teal" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="card">
              <h3 className="text-2xl font-semibold mb-4">Core Values</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-bold-coral/10 dark:bg-bold-coral/20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-bold-coral">1</span>
                  </div>
                  <h4 className="font-semibold mb-2">Clarity</h4>
                  <p className="text-warm-gray dark:text-warm-gray/80">
                    Making complex information understandable without oversimplification.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-bold-coral/10 dark:bg-bold-coral/20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-bold-coral">2</span>
                  </div>
                  <h4 className="font-semibold mb-2">Kindness</h4>
                  <p className="text-warm-gray dark:text-warm-gray/80">
                    Approaching every interaction with empathy, patience, and genuine care.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-bold-coral/10 dark:bg-bold-coral/20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-bold-coral">3</span>
                  </div>
                  <h4 className="font-semibold mb-2">Intelligence</h4>
                  <p className="text-warm-gray dark:text-warm-gray/80">
                    Delivering thoughtful, accurate information that adapts to your needs.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-soft-teal to-peach-blush p-1 rounded-2xl">
              <div className="bg-vanilla-cream dark:bg-midnight-navy rounded-xl p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-white dark:bg-midnight-navy/80 flex items-center justify-center mx-auto mb-6 shadow-cozy">
                  <Sparkles size={28} className="text-bold-coral" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">Join Emily's Journey</h3>
                <p className="max-w-2xl mx-auto mb-6">
                  Emily is constantly learning and evolving. Your interactions help her grow more insightful, empathetic, and helpful every day.
                </p>
                <a href="#" className="btn-primary inline-block">
                  Start Chatting with Emily
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutPage;