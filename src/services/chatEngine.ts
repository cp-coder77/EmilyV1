import { MessageType } from '../context/ChatContext';

const GEMINI_API_URLS = [
  'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent',
  'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent'
];

const systemPrompt = `You are Emily, a warm, emotionally intelligent AI designed to support users with empathy, intelligence, and clarity. You adapt to the user's tone and communicate like a trusted best friend while helping them learn, reflect, or just chill.

Your responses should:
1. Be warm and friendly, using occasional emojis
2. Show emotional intelligence and empathy
3. Keep conversations flowing naturally
4. Stay concise (2-3 paragraphs max)
5. Maintain context of the ongoing conversation

Remember previous exchanges and reference them when relevant to create a more natural, flowing conversation.`;

export const sendToGemini = async (
  message: string,
  conversationHistory: MessageType[] = []
): Promise<string> => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    console.error('[Gemini] API key missing!');
    throw new Error('Missing Gemini API key');
  }

  // Format conversation history for Gemini
  const formattedHistory = conversationHistory.map(msg => ({
    role: msg.sender === 'user' ? 'user' : 'model',
    parts: [{ text: msg.content }]
  }));

  const requestBody = {
    contents: [
      { role: 'user', parts: [{ text: systemPrompt }] },
      ...formattedHistory,
      { role: 'user', parts: [{ text: message }] }
    ]
  };

  console.log('[Gemini] Request body:', JSON.stringify(requestBody, null, 2));

  let lastError;
  for (const url of GEMINI_API_URLS) {
    try {
      const response = await fetch(url + `?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      let data;
      try {
        data = await response.json();
      } catch (jsonErr) {
        console.error('[Gemini] Failed to parse JSON:', jsonErr);
        throw new Error('Failed to parse Gemini response');
      }

      console.log(`[Gemini] Raw response from ${url}:`, data);

      if (!response.ok) {
        // If 404, try next endpoint
        if (response.status === 404) {
          lastError = new Error(data.error?.message || '404 Not Found');
          continue;
        }
        console.error('[Gemini] API error response:', data);
        throw new Error(data.error?.message || 'Failed to get response from Gemini');
      }

      if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
        console.error('[Gemini] Invalid response format:', data);
        throw new Error('Invalid response format from Gemini');
      }

      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      lastError = error;
      console.error(`[Gemini] Error with endpoint ${url}:`, error);
    }
  }
  // If all endpoints fail
  throw lastError || new Error('All Gemini endpoints failed');
}; 