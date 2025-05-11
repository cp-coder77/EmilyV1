import { Link } from 'react-router-dom';
import { Heart, Github, Twitter } from 'lucide-react';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="bg-vanilla-cream/50 dark:bg-midnight-navy/50 pt-12 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Logo size={24} />
              <span className="font-heading font-bold text-lg">Emily</span>
            </div>
            <p className="text-warm-gray dark:text-warm-gray/80 mb-4">
              An emotionally intelligent AI companion for students, teachers, and curious minds.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-warm-gray hover:text-bold-coral transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="text-warm-gray hover:text-bold-coral transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-heading font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-warm-gray hover:text-bold-coral transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/chat" className="text-warm-gray hover:text-bold-coral transition-colors">
                  Chat with Emily
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-warm-gray hover:text-bold-coral transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-heading font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-warm-gray hover:text-bold-coral transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-warm-gray hover:text-bold-coral transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-warm-gray hover:text-bold-coral transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-heading font-semibold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li>
                <a href="mailto:hello@emily-ai.com" className="text-warm-gray hover:text-bold-coral transition-colors">
                  hello@emily-ai.com
                </a>
              </li>
              <li>
                <a href="#" className="text-warm-gray hover:text-bold-coral transition-colors">
                  Support
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-warm-gray/20 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-warm-gray text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Emily AI. All rights reserved.
          </p>
          <p className="text-warm-gray text-sm flex items-center">
            Made with <Heart size={14} className="mx-1 text-bold-coral" /> by the Emily team
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;