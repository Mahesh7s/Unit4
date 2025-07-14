const GEMINI_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

export const fetchGeminiResponse = async (userMessage) => {
  const key = import.meta.env.VITE_GEMINI_API_KEY;

  if (!key) {
    throw new Error("Gemini API key is missing in .env.local");
  }

  const res = await fetch(`${GEMINI_URL}?key=${key}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: userMessage }] }],
    }),
  });

  if (!res.ok) throw new Error('API Error');
  const data = await res.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';
};
