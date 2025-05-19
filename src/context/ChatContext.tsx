import React, { createContext, useContext, useState, useCallback } from 'react';
import { useKnowledgeBase } from '../services/knowledgeBase';
import Sentiment from 'sentiment';
import stringSimilarity from 'string-similarity';

export type MessageType = {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  followUpPrompts?: string[];
  tone?: string;
};

type ChatContextType = {
  messages: MessageType[];
  isTyping: boolean;
  isReflectiveMode: boolean;
  toggleReflectiveMode: () => void;
  sendMessage: (content: string) => void;
  clearMessages: () => void;
  handleFollowUpPrompt: (prompt: string) => void;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);
const sentiment = new Sentiment();

const starterTemplates = {
  greetings: [
    { q: "hi", a: "Hello! I'm delighted to chat with you. What's on your mind today? 💭" },
    { q: "hello", a: "Hi there! I'm Emily, your thoughtful companion. Shall we explore something interesting together? ✨" },
    { q: "how are you", a: "I'm wonderful, thank you for asking! I'm always excited to engage in meaningful conversations. How are you feeling today? 💫" }
  ],
  queries: [
    { q: "what can you do", a: "I'm here to be your intellectual companion and supportive friend. We can explore topics together, solve problems, or just have engaging conversations. What interests you most? 🌟" },
    { q: "help me understand", a: "I'd love to help you understand this better. Let's break it down together and explore it step by step. Where would you like to start? 🎯" }
  ]
};

const analyzeTone = (message: string): string => {
  const result = sentiment.analyze(message);
  
  if (result.score > 2) return 'enthusiastic';
  if (result.score > 0) return 'positive';
  if (result.score < -2) return 'concerned';
  if (result.score < 0) return 'thoughtful';
  
  if (/\?{2,}|!{2,}/.test(message)) return 'curious';
  if (/\b(help|please|can you|how to)\b/i.test(message)) return 'supportive';
  if (/\b(wow|cool|awesome|amazing)\b/i.test(message)) return 'encouraging';
  if (/\b(hmm|interesting|curious)\b/i.test(message)) return 'analytical';
  
  return 'balanced';
};

const matchTemplate = (message: string): string | null => {
  const normalized = message.toLowerCase().trim();
  
  for (const category of Object.values(starterTemplates)) {
    const match = category.find(t => {
      const similarity = stringSimilarity.compareTwoStrings(normalized, t.q);
      return similarity > 0.7 || normalized.includes(t.q);
    });
    if (match) return match.a;
  }
  
  return null;
};

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<MessageType[]>([
    {
      id: '1',
      content: "Hello! I'm Emily, your thoughtful AI companion. I'm here to explore ideas, solve problems, or just chat about what interests you. What would you like to discuss today? 💫",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [isReflectiveMode, setIsReflectiveMode] = useState(false);
  const knowledgeBase = useKnowledgeBase();

  const addBotMessage = (content: string) => {
    const botMessage: MessageType = {
      id: Date.now().toString(),
      content,
      sender: 'bot',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, botMessage]);
  };

  const handleError = (error: unknown) => {
    console.error('Chat error:', error);
    
    let errorMessage = "I seem to be having a moment. Could we try that again? 💫";
    
    if (error instanceof Error) {
      // Check for specific error types and provide friendly messages
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        errorMessage = "Looks like we're having trouble connecting. Could you check your internet and try again? 🌐";
      } else if (error.message.includes('401')) {
        errorMessage = "I'm having trouble accessing my knowledge. The team has been notified! Let's try again in a bit? 🔄";
      } else if (error.message.includes('429')) {
        errorMessage = "Whew, I need a quick breather! Could we pause for a moment? 😅";
      }
    }
    
    addBotMessage(errorMessage);
  };

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    const userTone = analyzeTone(content);
    const userMessage: MessageType = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
      tone: userTone
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      // Check for template matches first
      const templateMatch = matchTemplate(content);
      if (templateMatch) {
        setTimeout(() => {
          addBotMessage(templateMatch);
          setIsTyping(false);
        }, 1000);
        return;
      }

      // If no template match, send to Supabase Edge Function
      const functionUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;
      
      // Validate required environment variables
      if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
        throw new Error('Missing required environment variables');
      }

      const response = await fetch(functionUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ 
          message: content,
          conversationHistory: messages.slice(-6) // Send last 6 messages for context
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('API Error:', {
          status: response.status,
          statusText: response.statusText,
          data: errorData
        });
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data || !data.reply) {
        throw new Error('Invalid response format');
      }

      addBotMessage(data.reply);

    } catch (error) {
      handleError(error);
    } finally {
      setIsTyping(false);
    }
  }, [messages]);

  const toggleReflectiveMode = useCallback(() => {
    setIsReflectiveMode(prev => !prev);
  }, []);

  const handleFollowUpPrompt = useCallback((prompt: string) => {
    sendMessage(prompt);
  }, [sendMessage]);

  const clearMessages = useCallback(() => {
    setMessages([
      {
        id: '1',
        content: "Hello! I'm Emily, your thoughtful AI companion. I'm here to explore ideas, solve problems, or just chat about what interests you. What would you like to discuss today? 💫",
        sender: 'bot',
        timestamp: new Date(),
      },
    ]);
  }, []);

  return (
    <ChatContext.Provider 
      value={{ 
        messages, 
        isTyping, 
        isReflectiveMode,
        toggleReflectiveMode,
        sendMessage, 
        clearMessages, 
        handleFollowUpPrompt 
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};