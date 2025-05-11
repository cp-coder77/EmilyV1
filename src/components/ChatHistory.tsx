import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Pin, X, ChevronRight, Brain } from 'lucide-react';
import { format } from 'date-fns';
import { MessageType } from '../context/ChatContext';

type ChatHistoryProps = {
  messages: MessageType[];
  isOpen: boolean;
  onClose: () => void;
  onMessageClick: (content: string) => void;
};

const ChatHistory = ({ messages, isOpen, onClose, onMessageClick }: ChatHistoryProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [pinnedMessages, setPinnedMessages] = useState<string[]>(() => {
    const saved = localStorage.getItem('pinnedMessages');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const togglePin = (messageId: string) => {
    setPinnedMessages(prev => {
      const newPinned = prev.includes(messageId)
        ? prev.filter(id => id !== messageId)
        : [...prev, messageId];
      localStorage.setItem('pinnedMessages', JSON.stringify(newPinned));
      return newPinned;
    });
  };

  const filteredMessages = messages.filter(message =>
    message.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-midnight-navy/20 backdrop-blur-sm z-30"
          onClick={onClose}
        />
      )}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: isOpen ? 0 : '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed top-0 right-0 w-80 h-full bg-white dark:bg-midnight-navy/95 shadow-cozy z-40"
      >
        <div className="p-4 border-b border-warm-gray/10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Brain size={20} className="text-bold-coral" />
              <h3 className="text-lg font-semibold">My History</h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-warm-gray/10 rounded-full transition-colors"
              aria-label="Close history panel"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="relative">
            <input
              type="text"
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full bg-vanilla-cream dark:bg-midnight-navy/50 focus:outline-none focus:ring-2 focus:ring-bold-coral/50"
            />
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-warm-gray" />
          </div>
        </div>

        <div className="overflow-y-auto h-[calc(100vh-120px)] p-4 space-y-4">
          {pinnedMessages.length > 0 && (
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-warm-gray mb-2">📌 Pinned Messages</h4>
              {filteredMessages
                .filter(msg => pinnedMessages.includes(msg.id))
                .map((message) => (
                  <motion.div
                    key={`pinned-${message.id}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative group mb-2"
                  >
                    <div 
                      className={`p-3 rounded-lg ${
                        message.sender === 'bot' 
                          ? 'bg-peach-blush/10 dark:bg-peach-blush/5' 
                          : 'bg-soft-teal/10 dark:bg-soft-teal/5'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <span className="text-xs text-warm-gray">
                          {format(new Date(message.timestamp), 'h:mm a')}
                        </span>
                        <button
                          onClick={() => togglePin(message.id)}
                          className="text-bold-coral p-1 rounded-full transition-colors"
                          aria-label="Unpin message"
                        >
                          <Pin size={14} />
                        </button>
                      </div>
                      <p className="mt-1 text-sm line-clamp-2">{message.content}</p>
                    </div>
                  </motion.div>
                ))}
            </div>
          )}

          <div>
            <h4 className="text-sm font-semibold text-warm-gray mb-2">💬 Recent Messages</h4>
            {filteredMessages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative group mb-2"
              >
                <div 
                  className={`p-3 rounded-lg ${
                    message.sender === 'bot' 
                      ? 'bg-peach-blush/10 dark:bg-peach-blush/5' 
                      : 'bg-soft-teal/10 dark:bg-soft-teal/5'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <span className="text-xs text-warm-gray">
                      {format(new Date(message.timestamp), 'h:mm a')}
                    </span>
                    <button
                      onClick={() => togglePin(message.id)}
                      className={`p-1 rounded-full transition-colors ${
                        pinnedMessages.includes(message.id)
                          ? 'text-bold-coral'
                          : 'text-warm-gray opacity-0 group-hover:opacity-100'
                      }`}
                      aria-label={pinnedMessages.includes(message.id) ? "Unpin message" : "Pin message"}
                    >
                      <Pin size={14} />
                    </button>
                  </div>
                  <p className="mt-1 text-sm line-clamp-2">{message.content}</p>
                  <button
                    onClick={() => onMessageClick(message.content)}
                    className="mt-2 text-xs text-bold-coral flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Reply <ChevronRight size={12} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default ChatHistory;