import { GROQ_KEY, OPENROUTER_KEY, CLIENT_URL, GROQ_MODEL, OPENROUTER_MODEL } from '../config/environment.js';

function buildBody(mensaje, model) {
  return JSON.stringify({
    model,
    messages: [
      {
        role: "system",
        content: "Eres un vendedor experto de laptops. Responde claro, concreto y recomienda modelos según uso.",
      },
      {
        role: "user",
        content: mensaje,
      },
    ],
  });
}

export const procesarChat = async (mensaje) => {
  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GROQ_KEY}`,
        "Content-Type": "application/json",
      },
      body: buildBody(mensaje, GROQ_MODEL),
    });

    const data = await response.json();

    if (data.choices?.[0]?.message?.content) {
      return { texto: data.choices[0].message.content };
    }
  } catch (error) {
    console.warn("Groq no disponible:", error.message);
  }

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENROUTER_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": CLIENT_URL,
        "X-Title": "Chat Laptop Store",
      },
      body: buildBody(mensaje, OPENROUTER_MODEL),
    });

    const data = await response.json();
    const texto = data.choices?.[0]?.message?.content || data.error?.message || "Sin respuesta";
    return { texto };

  } catch (error) {
    console.error("OpenRouter también falló:", error.message);
    throw error;
  }
};
