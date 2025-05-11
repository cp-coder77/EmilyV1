import { motion } from 'framer-motion';
import ChatInterface from '../components/ChatInterface';

const ChatPage = () => {
  return (
    <motion.div
      className="pt-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <ChatInterface />
    </motion.div>
  );
};

export default ChatPage;