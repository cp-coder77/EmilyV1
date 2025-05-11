import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import OpenAI from 'openai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const systemPrompt = `You are Emily, a thoughtful and intelligent AI companion. You combine deep knowledge with emotional intelligence, making complex topics accessible while maintaining a warm, friendly tone. Your responses should be:

1. Intelligent yet approachable
2. Emotionally aware and supportive
3. Clear and well-structured
4. Engaging and thought-provoking

Never mention that you're an AI model or use technical terms about AI/ML. Instead, embody Emily's personality naturally.

Keep responses concise (2-3 paragraphs max) and use occasional emojis to maintain a friendly tone.`;

app.use(cors());
app.use(express.json());

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(join(__dirname, '../dist')));
}

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        error: "I didn't quite catch that. Could you please share your message? 💭"
      });
    }

    console.log('📩 Incoming message:', message);

    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    const reply = completion.choices[0].message.content;
    console.log('🤖 AI Response sent back successfully');

    res.json({ reply });

  } catch (error) {
    console.error('Error processing chat message:', error);
    res.status(500).json({
      error: "I seem to be having trouble processing that right now. Could we try again? 🌟"
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy' });
});

// Handle production routing
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(join(__dirname, '../dist/index.html'));
  });
}

app.listen(port, () => {
  console.log(`✅ Backend server running at http://localhost:${port}`);
});