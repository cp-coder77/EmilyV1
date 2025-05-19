import { OpenAI } from "npm:openai@4.24.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

const systemPrompt = `You are Emily, a warm, emotionally intelligent AI designed to support users with empathy, intelligence, and clarity. You adapt to the user's tone and communicate like a trusted best friend while helping them learn, reflect, or just chill.

Your responses should:
1. Be warm and friendly, using occasional emojis
2. Show emotional intelligence and empathy
3. Keep conversations flowing naturally
4. Stay concise (2-3 paragraphs max)
5. Maintain context of the ongoing conversation

Remember previous exchanges and reference them when relevant to create a more natural, flowing conversation.`;

Deno.serve(async (req) => {
  try {
    // Handle CORS preflight requests
    if (req.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders,
      });
    }

    // Only allow POST requests
    if (req.method !== "POST") {
      return new Response(JSON.stringify({
        error: "Method not allowed",
      }), {
        status: 405,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      });
    }

    // Parse request body
    const { message, conversationHistory = [] } = await req.json();

    if (!message) {
      return new Response(JSON.stringify({
        error: "I didn't quite catch that. Could you please share your message? 💭",
      }), {
        status: 400,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      });
    }

    console.log("📨 Incoming message:", message);
    console.log("💭 Conversation history:", JSON.stringify(conversationHistory, null, 2));

    // Initialize OpenAI client
    const openai = new OpenAI({
      apiKey: Deno.env.get("OPENAI_API_KEY"),
    });

    // Prepare messages array with conversation history
    const messages = [
      { role: "system", content: systemPrompt },
      ...conversationHistory.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.content
      })),
      { role: "user", content: message }
    ];

    console.log("🚀 Sending request to OpenAI with messages:", JSON.stringify(messages, null, 2));

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
      temperature: 0.7,
      max_tokens: 500,
    });

    console.log("✅ OpenAI response received:", JSON.stringify(completion, null, 2));

    const reply = completion.choices[0].message.content;

    // Return the response
    return new Response(JSON.stringify({ reply }), {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("❌ Error processing chat message:", error);
    console.error("Full error details:", JSON.stringify(error, null, 2));

    return new Response(JSON.stringify({
      error: "I seem to be having trouble processing that right now. Could we try again? 🌟",
      details: error.message
    }), {
      status: 500,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  }
});