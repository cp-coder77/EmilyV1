export interface EmotionAnalysis {
  mood: 'happy' | 'neutral' | 'frustrated';
  score: number;
}

export interface EmotionResponse {
  mood: string;
  score: number;
}

const VADER_API_URL = 'https://8735f7ae-ff7a-4fa3-aaa0-a6dbdb478833-00-1ngrxexxskf84.sisko.replit.dev/analyze/';

export const analyzeEmotion = async (text: string): Promise<EmotionAnalysis> => {
  try {
    console.log('🧠 Analyzing emotion for:', text);
    
    const response = await fetch(VADER_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      console.warn('⚠️ VADER API request failed, falling back to neutral mood');
      return { mood: 'neutral', score: 0 };
    }

    const data: EmotionResponse = await response.json();
    console.log('💭 Detected emotion:', data);

    // Normalize the mood to our expected values
    const normalizedMood = normalizeMood(data.mood);
    
    return {
      mood: normalizedMood,
      score: data.score || 0
    };
  } catch (error) {
    console.error('❌ Error analyzing emotion:', error);
    // Graceful fallback - don't break the chat flow
    return { mood: 'neutral', score: 0 };
  }
};

const normalizeMood = (mood: string): 'happy' | 'neutral' | 'frustrated' => {
  const lowerMood = mood.toLowerCase();
  
  if (lowerMood.includes('happy') || lowerMood.includes('positive') || lowerMood.includes('joy')) {
    return 'happy';
  }
  
  if (lowerMood.includes('frustrated') || lowerMood.includes('negative') || lowerMood.includes('sad') || lowerMood.includes('angry')) {
    return 'frustrated';
  }
  
  return 'neutral';
};

export const enhanceResponseWithEmotion = (originalResponse: string, emotion: EmotionAnalysis): string => {
  const { mood, score } = emotion;
  
  // Only enhance if we have a confident emotion detection (score > 0.3)
  if (score < 0.3) {
    return originalResponse;
  }
  
  switch (mood) {
    case 'happy':
      return `Yay! 😄 ${originalResponse}`;
    
    case 'frustrated':
      return `It's okay, we'll figure it out together 💛 ${originalResponse}`;
    
    case 'neutral':
    default:
      return originalResponse;
  }
};