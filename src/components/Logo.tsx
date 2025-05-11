import { Heart, Sparkles } from 'lucide-react';

type LogoProps = {
  size?: number;
};

const Logo = ({ size = 24 }: LogoProps) => {
  return (
    <div 
      className="relative flex items-center justify-center bg-gradient-to-br from-bold-coral to-peach-blush rounded-full"
      style={{ width: size, height: size }}
    >
      <Heart 
        size={size * 0.5} 
        className="text-white absolute" 
      />
      <Sparkles 
        size={size * 0.3} 
        className="text-white absolute top-0 right-0" 
      />
    </div>
  );
};

export default Logo;