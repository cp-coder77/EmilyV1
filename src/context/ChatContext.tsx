import React, { createContext, useContext, useState, useCallback } from 'react';
import { useKnowledgeBase } from '../services/knowledgeBase';
import { createClient } from '@supabase/supabase-js';
import Sentiment from 'sentiment';
import stringSimilarity from 'string-similarity';

// Initialize Supabase client
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

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

// Rate limiting on client side
const COOLDOWN_PERIOD = 3000; // 3 seconds between messages
let lastMessageTime = 0;

const saveMessageToDatabase = async (content: string, isBot: boolean) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User not authenticated');

  const { error } = await supabase
    .from('chat_messages')
    .insert({
      content,
      user_id: user.id,
      is_bot: isBot
    });

  if (error) throw error;
};

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<MessageType[]>([
    {
      id: '1',
      content: "Hey, I'm Emily 🦋 — your emotionally intelligent AI buddy. Ask me anything!",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [isReflectiveMode, setIsReflectiveMode] = useState(false);
  const knowledgeBase = useKnowledgeBase();

  const addBotMessage = async (content: string) => {
    try {
      await saveMessageToDatabase(content, true);
      const botMessage: MessageType = {
        id: Date.now().toString(),
        content,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error saving bot message:', error);
      // Still show the message in UI even if database save fails
      const botMessage: MessageType = {
        id: Date.now().toString(),
        content,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
    }
  };

  const handleError = async (error: unknown) => {
    console.error('Chat error:', error);
    
    let errorMessage = "I seem to be having a moment. Could we try that again? 💫";
    
    if (error instanceof Error) {
      if (error.message.includes('429') || error.message.includes('rate limit')) {
        errorMessage = "I need a quick breather! Could you try again in a minute? 😅";
      } else if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        errorMessage = "Looks like we're having trouble connecting. Could you check your internet and try again? 🌐";
      } else if (error.message.includes('timeout')) {
        errorMessage = "I'm taking a bit longer than usual to think. Let's try that again? ⏳";
      } else if (error.message.includes('User not authenticated')) {
        errorMessage = "Looks like you're not signed in. Please sign in to continue our chat! 🔐";
      } else if (error.message.includes('500')) {
        errorMessage = "I encountered an unexpected issue. My team has been notified and is working on it. Please try again in a moment! 🔧";
      }
    }
    
    await addBotMessage(errorMessage);
  };

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    // Check cooldown period
    const now = Date.now();
    if (now - lastMessageTime < COOLDOWN_PERIOD) {
      await addBotMessage("Let's take a brief pause between messages. It helps me process our conversation better! 😊");
      return;
    }
    lastMessageTime = now;

    const userTone = analyzeTone(content);
    const userMessage: MessageType = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
      tone: userTone
    };
    
    try {
      // Save user message to database first
      await saveMessageToDatabase(content, false);
      setMessages(prev => [...prev, userMessage]);
      setIsTyping(true);

      // Check for template matches first
      const templateMatch = matchTemplate(content);
      if (templateMatch) {
        setTimeout(async () => {
          await addBotMessage(templateMatch);
          setIsTyping(false);
        }, 1000);
        return;
      }

      // Make API call with error handling and retries
      let retries = 3;
      let response;
      
      while (retries > 0) {
        try {
          response = await fetch(`${import.meta.env.VITE_FLOWISE_API_HOST}/api/v1/prediction/${import.meta.env.VITE_FLOWISE_CHATFLOW_ID}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              question: content
            }),
          });
          
          if (response.ok) break;
          
          retries--;
          if (retries > 0) await new Promise(r => setTimeout(r, 1000 * (4 - retries)));
        } catch (error) {
          retries--;
          if (retries === 0) throw error;
          await new Promise(r => setTimeout(r, 1000 * (4 - retries)));
        }
      }

      if (!response || !response.ok) {
        throw new Error(`API error: ${response?.status || 'Unknown'}`);
      }

      const data = await response.json();
      
      if (!data || !data.text) {
        throw new Error('Invalid response format');
      }

      await addBotMessage(data.text);

    } catch (error) {
      await handleError(error);
    } finally {
      setIsTyping(false);
    }
  }, []);

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
        content: "Hey, I'm Emily 🦋 — your emotionally intelligent AI buddy. Ask me anything!",
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