import { MercadoPagoConfig } from 'mercadopago';
import dotenv from 'dotenv';

// Asegura leer las variables del .env
dotenv.config();

export const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";
export const GROQ_KEY = process.env.GROQ_API_KEY;
export const OPENROUTER_KEY = process.env.OPENROUTER_API_KEY;

export const GROQ_MODEL = "llama-3.1-8b-instant";
export const OPENROUTER_MODEL = "meta-llama/llama-3.1-8b-instruct";

export const client = new MercadoPagoConfig({ 
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN 
});

console.log("¿El Token existe?:", !!process.env.MERCADOPAGO_ACCESS_TOKEN);
if (process.env.MERCADOPAGO_ACCESS_TOKEN) {
  console.log("Inicio del token detectado:", process.env.MERCADOPAGO_ACCESS_TOKEN.substring(0, 10) + "...");
}
