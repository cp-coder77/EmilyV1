import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-bold-coral/50"
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <motion.div
        initial={{ scale: 0.8, rotate: 0 }}
        animate={{ 
          scale: 1,
          rotate: isDarkMode ? 0 : 180,
        }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20
        }}
      >
        {isDarkMode ? (
          <Sun className="w-5 h-5 text-vanilla-cream hover:text-bold-coral transition-colors" />
        ) : (
          <Moon className="w-5 h-5 text-midnight-navy hover:text-bold-coral transition-colors" />
        )}
      </motion.div>
    </button>
  );
};

export default ThemeToggle;