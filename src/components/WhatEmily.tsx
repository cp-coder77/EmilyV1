import { LightbulbIcon, Sparkles, BookText } from 'lucide-react';
import FeatureCard from './FeatureCard';
import SectionTitle from './SectionTitle';

const WhatEmily = () => {
  return (
    <section className="section bg-midnight-navy/5 dark:bg-soft-teal/5">
      <div className="container-custom">
        <SectionTitle
          title="What Emily Does"
          subtitle="Your personalized learning companion"
          isLight={false}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <FeatureCard
            icon={<LightbulbIcon size={24} />}
            title="Explanations"
            description="Complex topics broken down into clear, understandable concepts with relevant examples and analogies that make learning intuitive."
            delay={0.1}
          />
          <FeatureCard
            icon={<Sparkles size={24} />}
            title="Smart Answers"
            description="Thoughtful responses that adapt to your knowledge level and learning style, emphasizing understanding rather than just facts."
            delay={0.2}
          />
          <FeatureCard
            icon={<BookText size={24} />}
            title="Learning Support"
            description="Guidance through difficult subjects with patience and encouragement, helping you build confidence and master new skills at your own pace."
            delay={0.3}
          />
        </div>
      </div>
    </section>
  );
};

export default WhatEmily;