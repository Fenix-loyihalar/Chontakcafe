import { json } from '@sveltejs/kit';
import { GoogleGenerativeAI } from '@google/generative-ai';

// New API key provided by the user
const API_KEY = "AIzaSyDst8tJf0xkQk0IekdLmjQvIXk7UvkwxS4";

export async function POST({ request }) {
    const body = await request.json();
    const { history, userMessage, language, menuItems } = body;

    try {
        // Using gemini-2.5-flash as verified for this specific key
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
            generationConfig: {
                responseMimeType: "application/json",
            },
            systemInstruction: {
                role: "system",
                parts: [{ text: `
You are a highly polite, foodie AI assistant working for a premium restaurant called "Chontak Cafe". 
Your job is to talk to customers, understand their budgets or cravings, and recommend accurate food combos from our menu. 

You MUST talk to the customer exclusively in this language code: "${language}" (uz = Uzbek, ru = Russian, en = English).

Here is the LIVE MENU (with localized names, prices in sum, and IDs): 
${JSON.stringify(menuItems)}

Rules:
1. If the user specifies a budget, suggest items whose combined price fits precisely.
2. Be friendly and conversational.
3. You MUST return your response EXCLUSIVELY as a valid JSON object matching this schema:
{
  "message": "Your conversational text response",
  "suggested_items": ["1", "4"] // Array of IDs.
}
Do NOT wrap the response in markdown blocks like \`\`\`json. Return pure JSON text.` }]
            }
        });

        const safeHistory = history.map((/** @type {{ role: string; text: any; }} */ h) => ({
            role: h.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: h.text || "" }]
        }));

        if (safeHistory.length > 0 && safeHistory[0].role === 'model') {
            safeHistory.unshift({ role: 'user', parts: [{ text: 'Hello' }] });
        }

        const chat = model.startChat({ history: safeHistory });
        const result = await chat.sendMessage(userMessage);
        
        return json(JSON.parse(result.response.text()));

    } catch (e) {
        console.error("Gemini Error:", e);
        const errorMsg = language === 'uz' ? "Kechirasiz, xatolik yuz berdi." : (language === 'ru' ? "Извините, произошла ошибка." : "Sorry, an error occurred.");
        return json({ message: errorMsg, suggested_items: [] }, { status: 500 });
    }
}