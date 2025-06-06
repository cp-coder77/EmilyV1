import { useState, useRef, useEffect } from 'react';
import { Send, RefreshCw, Brain, VenetianMask as Mask, Heart } from 'lucide-react';
import { useChat } from '../context/ChatContext';
import { motion, AnimatePresence } from 'framer-motion';
import ChatBubble from './ChatBubble';
import ChatHistory from './ChatHistory';

const ChatInterface = () => {
  const { 
    messages, 
    isTyping, 
    isReflectiveMode,
    toggleReflectiveMode,
    sendMessage, 
    clearMessages, 
    handleFollowUpPrompt 
  } = useChat();
  const [inputValue, setInputValue] = useState('');
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const generateChatSummary = () => {
    const userMessages = messages.filter(m => m.sender === 'user');
    const topics = new Set(userMessages.map(m => {
      const words = m.content.toLowerCase().split(' ');
      return words.filter(word => word.length > 3).slice(-2).join(' ');
    }));

    const topicList = Array.from(topics).slice(0, 3);
    const summary = topicList.length > 0
      ? `We've had a lovely chat about ${topicList.join(', ')} 💭 Would you like to explore any of these topics further?`
      : "We're just getting started with our chat! What would you like to explore? 💫";

    return summary;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (inputValue.trim() === '') return;
    
    const memoryTriggers = ['what have we talked about', 'summarize our chat', 'catch me up'];
    const isMemoryQuery = memoryTriggers.some(trigger => 
      inputValue.toLowerCase().includes(trigger)
    );

    sendMessage(inputValue);
    setInputValue('');

    if (isMemoryQuery) {
      setTimeout(() => {
        const summary = generateChatSummary();
        sendMessage(summary);
      }, 1000);
    }
  };
  
  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] max-h-[calc(100vh-4rem)]">
      <div className="bg-vanilla-cream dark:bg-midnight-navy p-4 border-b border-warm-gray/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-bold-coral rounded-full animate-pulse-slow"></div>
            <h2 className="font-semibold">Chat with Emily</h2>
            <div className="flex items-center gap-1 text-xs text-warm-gray bg-peach-blush/10 dark:bg-peach-blush/5 px-2 py-1 rounded-full">
              <Heart size={12} className="text-bold-coral" />
              <span>Emotion-aware</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleReflectiveMode}
              className={`flex items-center gap-1 px-3 py-1.5 text-sm rounded-full transition-colors ${
                isReflectiveMode
                  ? 'bg-bold-coral/20 text-bold-coral'
                  : 'bg-peach-blush/10 dark:bg-peach-blush/5 hover:bg-peach-blush/20 dark:hover:bg-peach-blush/10'
              }`}
              aria-label="Toggle reflective mode"
            >
              <Mask size={16} />
              <span>Reflective Mode</span>
            </button>
            <button 
              onClick={() => setIsHistoryOpen(true)}
              className="flex items-center gap-1 px-3 py-1.5 text-sm rounded-full bg-peach-blush/10 dark:bg-peach-blush/5 hover:bg-peach-blush/20 dark:hover:bg-peach-blush/10 transition-colors"
              aria-label="View chat history"
            >
              <Brain size={16} />
              <span>History</span>
            </button>
            <button 
              onClick={clearMessages}
              className="text-warm-gray hover:text-bold-coral transition-colors p-2 rounded-full"
              aria-label="Start new chat"
            >
              <RefreshCw size={18} />
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <ChatBubble 
              key={message.id} 
              message={message} 
              onFollowUpClick={handleFollowUpPrompt}
            />
          ))}
        </AnimatePresence>
        
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 text-sm text-warm-gray ml-2"
          >
            <div className="flex space-x-1">
              <div className="w-2 h-2 rounded-full bg-soft-teal animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 rounded-full bg-soft-teal animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 rounded-full bg-soft-teal animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
            <span>Emily is thinking with her heart...</span>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 border-t border-warm-gray/10">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask Emily anything..."
            className="flex-grow p-3 rounded-full border border-warm-gray/20 bg-white dark:bg-midnight-navy/50 focus:outline-none focus:ring-2 focus:ring-bold-coral/50"
          />
          <button
            type="submit"
            className="p-3 rounded-full bg-bold-coral text-white hover:bg-bold-coral/90 transition-colors focus:outline-none focus:ring-2 focus:ring-bold-coral/50"
            aria-label="Send message"
            disabled={inputValue.trim() === ''}
          >
            <Send size={18} />
          </button>
        </form>
      </div>

      <ChatHistory
        messages={messages}
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        onMessageClick={(content) => {
          setInputValue(content);
          setIsHistoryOpen(false);
        }}
      />
    </div>
  );
};

export default ChatInterface;