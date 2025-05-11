import { BookOpen, Users, Brain } from 'lucide-react';
import FeatureCard from './FeatureCard';
import SectionTitle from './SectionTitle';

const WhoEmily = () => {
  return (
    <section className="section">
      <div className="container-custom">
        <SectionTitle
          title="Who Emily Helps"
          subtitle="Designed for curious, creative minds of all kinds"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <FeatureCard
            icon={<BookOpen size={24} />}
            title="Students"
            description="Get homework help, study efficiently, and understand complex concepts through friendly explanations tailored to your learning style."
            delay={0.1}
          />
          <FeatureCard
            icon={<Users size={24} />}
            title="Teachers"
            description="Find creative lesson planning ideas, get assistance with grading, and discover new ways to engage students through innovative approaches."
            delay={0.2}
          />
          <FeatureCard
            icon={<Brain size={24} />}
            title="Curious Minds"
            description="Explore new topics, satisfy your curiosity, and engage in thoughtful discussions that expand your knowledge in a comfortable, judgment-free space."
            delay={0.3}
          />
        </div>
      </div>
    </section>
  );
};

export default WhoEmily;