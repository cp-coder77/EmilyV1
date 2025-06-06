import React, { createContext, useContext, useState, useCallback } from 'react';
import { sendToGemini } from '../services/chatEngine';
import { analyzeEmotion, enhanceResponseWithEmotion, EmotionAnalysis } from '../services/emotionService';

export type MessageType = {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  followUpPrompts?: string[];
  tone?: string;
  emotion?: EmotionAnalysis;
};

type ChatContextType = {
  messages: MessageType[];
  isTyping: boolean;
  isReflectiveMode: boolean;
  toggleReflectiveMode: () => void;
  sendMessage: (content: string) => Promise<void>;
  clearMessages: () => void;
  handleFollowUpPrompt: (prompt: string) => void;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

let sentimentAnalyzer: any = null;
async function getSentimentAnalyzer() {
  if (!sentimentAnalyzer) {
    const module = await import('sentiment');
    sentimentAnalyzer = new (module as any).default();
  }
  return sentimentAnalyzer;
}

const analyzeTone = async (message: string): Promise<string> => {
  const analyzer = await getSentimentAnalyzer();
  const result = analyzer.analyze(message);

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

// Rate limiting on client side
const COOLDOWN_PERIOD = 3000; // 3 seconds between messages
let lastMessageTime = 0;

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

  const addBotMessage = (content: string, emotion?: EmotionAnalysis) => {
    const botMessage: MessageType = {
      id: Date.now().toString(),
      content,
      sender: 'bot',
      timestamp: new Date(),
      emotion,
    };
    setMessages(prev => [...prev, botMessage]);
  };

  const handleError = (error: unknown) => {
    console.error('Chat error:', error);
    
    let errorMessage = "Emily's brain is recharging. Please try again in a few seconds. 🔄";
    
    if (error instanceof Error) {
      if (error.message.includes('429') || error.message.includes('rate limit')) {
        errorMessage = "I need a quick breather! Could you try again in a minute? 😅 This helps me stay within my conversation limits.";
      } else if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        errorMessage = "Looks like we're having trouble connecting. Could you check your internet and try again? 🌐";
      } else if (error.message.includes('401')) {
        errorMessage = "I'm having trouble accessing my knowledge. The team has been notified! Let's try again in a bit? 🔄";
      }
    }
    
    addBotMessage(errorMessage);
  };

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    // Check cooldown period
    const now = Date.now();
    if (now - lastMessageTime < COOLDOWN_PERIOD) {
      addBotMessage("Let's take a brief pause between messages. It helps me process our conversation better! 😊");
      return;
    }
    lastMessageTime = now;

    const userTone = await analyzeTone(content);
    
    // Step 1: Analyze emotion using VADER API
    console.log('🎭 Starting emotion analysis...');
    let emotionAnalysis: EmotionAnalysis;
    
    try {
      emotionAnalysis = await analyzeEmotion(content);
      console.log('✨ Emotion detected:', emotionAnalysis);
    } catch (error) {
      console.warn('⚠️ Emotion analysis failed, using neutral fallback:', error);
      emotionAnalysis = { mood: 'neutral', score: 0 };
    }

    const userMessage: MessageType = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
      tone: userTone,
      emotion: emotionAnalysis
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      // Step 2: Get response from Gemini (as before)
      const formattedHistory = messages.slice(-6).map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      }));

      console.log("🤖 Sending to Gemini:", {
        currentMessage: content,
        conversationHistory: formattedHistory,
        detectedEmotion: emotionAnalysis
      });

      const geminiReply = await sendToGemini(content, messages.slice(-6));
      
      // Step 3: Enhance Gemini's response based on detected emotion
      const enhancedReply = enhanceResponseWithEmotion(geminiReply, emotionAnalysis);
      
      console.log("💝 Enhanced reply:", {
        original: geminiReply,
        enhanced: enhancedReply,
        emotion: emotionAnalysis
      });

      addBotMessage(enhancedReply, emotionAnalysis);

    } catch (error) {
      console.error("❌ Chat processing error:", error);
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

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};