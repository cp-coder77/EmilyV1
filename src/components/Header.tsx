import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from './ThemeToggle';
import Logo from './Logo';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isDarkMode } = useTheme();
  const location = useLocation();
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-vanilla-cream/90 dark:bg-midnight-navy/90 backdrop-blur-md py-3 shadow-md' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Logo size={32} />
          <span className="font-heading font-bold text-xl">Emily</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className={`transition hover:text-bold-coral ${location.pathname === '/' ? 'text-bold-coral' : ''}`}>
            Home
          </Link>
          <Link to="/chat" className={`transition hover:text-bold-coral ${location.pathname === '/chat' ? 'text-bold-coral' : ''}`}>
            Chat
          </Link>
          <Link to="/about" className={`transition hover:text-bold-coral ${location.pathname === '/about' ? 'text-bold-coral' : ''}`}>
            About
          </Link>
          <ThemeToggle />
          <Link to="/chat" className="btn-primary">
            Start Chatting
          </Link>
        </nav>
        
        {/* Mobile Navigation Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle />
          <button 
            className="text-midnight-navy dark:text-vanilla-cream" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-vanilla-cream dark:bg-midnight-navy shadow-md py-4">
          <nav className="container-custom flex flex-col space-y-4">
            <Link to="/" className={`transition hover:text-bold-coral p-2 ${location.pathname === '/' ? 'text-bold-coral' : ''}`}>
              Home
            </Link>
            <Link to="/chat" className={`transition hover:text-bold-coral p-2 ${location.pathname === '/chat' ? 'text-bold-coral' : ''}`}>
              Chat
            </Link>
            <Link to="/about" className={`transition hover:text-bold-coral p-2 ${location.pathname === '/about' ? 'text-bold-coral' : ''}`}>
              About
            </Link>
            <Link to="/chat" className="btn-primary self-start mt-2">
              Start Chatting
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;