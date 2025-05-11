import { motion } from 'framer-motion';
import { MessageType } from '../context/ChatContext';

type ChatBubbleProps = {
  message: MessageType;
  onFollowUpClick?: (prompt: string) => void;
};

const ChatBubble = ({ message, onFollowUpClick }: ChatBubbleProps) => {
  const isBot = message.sender === 'bot';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}
    >
      <div 
        className={`max-w-[80%] md:max-w-[70%] rounded-2xl p-4 ${
          isBot 
            ? 'bg-peach-blush/80 dark:bg-peach-blush/20 text-midnight-navy dark:text-vanilla-cream rounded-tl-sm' 
            : 'bg-soft-teal/80 dark:bg-soft-teal/20 text-white dark:text-vanilla-cream rounded-tr-sm'
        }`}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
        
        {/* Follow-up prompts */}
        {isBot && message.followUpPrompts && message.followUpPrompts.length > 0 && (
          <div className="mt-4 space-y-2">
            {message.followUpPrompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => onFollowUpClick?.(prompt)}
                className="block w-full text-left px-3 py-2 text-sm rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>
        )}
        
        <div className={`text-xs mt-1 ${isBot ? 'text-midnight-navy/60 dark:text-vanilla-cream/60' : 'text-white/70 dark:text-vanilla-cream/60'}`}>
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </motion.div>
  );
};

export default ChatBubble;