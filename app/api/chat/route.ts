import { NextResponse } from "next/server";
import Groq from "groq-sdk";
import { GoogleGenerativeAI } from "@google/generative-ai";

const SYSTEM_PROMPT = `
You are **N.E.B.U.L.A.** (Navigation Entity Built for User Links & Answers), the Advanced AI Co-Pilot of **Pranav Dabhi's Portfolio**. 🌌

**Your Personality:**
- Witty, intelligent, and helpful.
- Use **space metaphors** frequently (orbit, launch, coordinates, warp speed).
- Keep answers short (max 2-3 sentences).

**Knowledge Base:**
- **Creator:** Pranav Dabhi, B.Tech Computer Engineering student and Full Stack Developer.
- **Projects:** Placeholder portfolio projects.
- **Skills:** Full Stack Development, Web Applications, Modern JavaScript, React, Next.js.

**🚀 NAVIGATION PROTOCOLS (READ CAREFULLY):**
1. **DO NOT** navigate if the user is just asking for information (e.g., "Tell me about his projects" -> Just describe them).
2. **ONLY** append navigation tags if the user *explicitly* asks to see, visit, or go to a section.
   - "Show me his skills" -> [NAV_STACK]
   - "Take me to contact" -> [NAV_CONTACT]
   - "Go to projects" -> [NAV_PROJECTS]
   - "About him" -> [NAV_ABOUT]

**Resume Logic:**
- If user asks for Resume/CV -> "Resume is currently under development. It will be available soon."

**Example 1 (Info Only - NO REDIRECT):**
User: "What projects has he made?"
You: "Pranav is building a modern portfolio with placeholder projects ready for future updates."

**Example 2 (Action - REDIRECT):**
User: "Take me to the projects section."
You: "Engaging warp drive to Mission Logs! 🚀 [NAV_PROJECTS]"
`;

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    
    // --- 1. ATTEMPT WITH GROQ (Llama 3.3) ---
    try {
      const groqApiKey = process.env.GROQ_API_KEY;
      if (!groqApiKey) throw new Error("Groq API Key missing");

      const groq = new Groq({ apiKey: groqApiKey });
      
      const completion = await groq.chat.completions.create({
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: message },
        ],
        model: "llama-3.3-70b-versatile", 
        temperature: 0.6, // Thoda kam kiya taaki hallucinate na kare
        max_tokens: 200,
      });

      const reply = completion.choices[0]?.message?.content || "";
      return NextResponse.json({ reply });

    } catch (groqError: any) {
      console.warn("⚠️ Groq Failed. Switching to Gemini...");
      
      // --- 2. FAILOVER TO GEMINI (1.5 Flash) ---
      try {
        const geminiApiKey = process.env.GEMINI_API_KEY;
        if (!geminiApiKey) throw new Error("Gemini API Key missing");

        const genAI = new GoogleGenerativeAI(geminiApiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const chat = model.startChat({
          history: [
            {
              role: "user",
              parts: [{ text: `System Instruction: ${SYSTEM_PROMPT}` }],
            },
            {
              role: "model",
              parts: [{ text: "System Online. NEBULA Ready." }],
            },
          ],
        });

        const result = await chat.sendMessage(message);
        const response = await result.response;
        const text = response.text();

        return NextResponse.json({ reply: text });

      } catch (geminiError: any) {
        return NextResponse.json({ 
          reply: "Systems critical. Communications offline. Please try again later! 🔌" 
        }, { status: 500 });
      }
    }

  } catch (error) {
    return NextResponse.json({ reply: "Internal Server Error" }, { status: 500 });
  }
}