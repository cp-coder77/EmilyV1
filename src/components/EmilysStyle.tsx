import { Heart, Zap, MessageSquare } from 'lucide-react';
import FeatureCard from './FeatureCard';
import SectionTitle from './SectionTitle';

const EmilysStyle = () => {
  return (
    <section className="section">
      <div className="container-custom">
        <SectionTitle
          title="Emily's Style"
          subtitle="More than just answers, a companion who cares"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <FeatureCard
            icon={<Heart size={24} />}
            title="Friendly"
            description="Warm, approachable, and never judgmental. Emily creates a safe space where you feel comfortable asking anything without fear of criticism."
            delay={0.1}
          />
          <FeatureCard
            icon={<Zap size={24} />}
            title="Adaptive"
            description="Recognizes your unique communication style and adjusts her tone to match your needs—whether you prefer formal explanations or casual conversations."
            delay={0.2}
          />
          <FeatureCard
            icon={<MessageSquare size={24} />}
            title="Emotionally Aware"
            description="Understands frustration, excitement, and confusion, responding with the right balance of encouragement, enthusiasm, and clarity."
            delay={0.3}
          />
        </div>
      </div>
    </section>
  );
};

export default EmilysStyle;