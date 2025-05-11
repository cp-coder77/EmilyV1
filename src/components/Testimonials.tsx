import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionTitle from './SectionTitle';

type Testimonial = {
  id: number;
  name: string;
  role: string;
  image: string;
  quote: string;
  rating: number;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "College Student",
    image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100",
    quote: "Emily has been a game-changer for my studies. She explains complex physics concepts in a way that actually makes sense to me. It's like having a patient tutor available 24/7.",
    rating: 5
  },
  {
    id: 2,
    name: "Sophia Martinez",
    role: "High School Teacher",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100",
    quote: "Emily helps me create engaging lesson plans when I'm running low on creative energy. The way she adapts to my needs has made my teaching more effective and enjoyable.",
    rating: 5
  },
  {
    id: 3,
    name: "David Kim",
    role: "Lifelong Learner",
    image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100",
    quote: "I use Emily to explore topics I've always been curious about. Her friendly explanations make me feel comfortable asking questions I might be embarrassed to ask elsewhere.",
    rating: 5
  }
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  
  const nextTestimonial = () => {
    setDirection(1);
    setCurrent(prev => (prev + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    setDirection(-1);
    setCurrent(prev => (prev - 1 + testimonials.length) % testimonials.length);
  };
  
  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setTimeout(() => {
      nextTestimonial();
    }, 8000);
    
    return () => clearTimeout(timer);
  }, [current]);
  
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 200 : -200,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 200 : -200,
      opacity: 0
    })
  };
  
  return (
    <section className="section">
      <div className="container-custom">
        <SectionTitle
          title="What People Say"
          subtitle="Hear from those who chat with Emily every day"
        />
        
        <div className="mt-12 relative max-w-4xl mx-auto">
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10">
            <button 
              onClick={prevTestimonial}
              className="p-2 rounded-full bg-white dark:bg-midnight-navy/50 shadow-cozy"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="text-warm-gray hover:text-bold-coral transition-colors" />
            </button>
          </div>
          
          <div className="overflow-hidden p-4">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
              >
                <div className="card px-8 py-12 text-center">
                  <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-4 border-2 border-peach-blush">
                    <img 
                      src={testimonials[current].image} 
                      alt={testimonials[current].name}
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonials[current].rating)].map((_, i) => (
                      <Star key={i} size={18} className="text-bold-coral fill-bold-coral" />
                    ))}
                  </div>
                  
                  <p className="text-lg italic mb-6">"{testimonials[current].quote}"</p>
                  
                  <h4 className="font-heading font-semibold">{testimonials[current].name}</h4>
                  <p className="text-warm-gray dark:text-warm-gray/80 text-sm">{testimonials[current].role}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          <div className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10">
            <button 
              onClick={nextTestimonial}
              className="p-2 rounded-full bg-white dark:bg-midnight-navy/50 shadow-cozy"
              aria-label="Next testimonial"
            >
              <ChevronRight className="text-warm-gray hover:text-bold-coral transition-colors" />
            </button>
          </div>
          
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > current ? 1 : -1);
                  setCurrent(index);
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  current === index ? 'bg-bold-coral w-4' : 'bg-warm-gray/30'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;