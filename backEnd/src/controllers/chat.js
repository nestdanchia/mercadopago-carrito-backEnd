import { procesarChat } from '../services/ia.service.js';

export const enviarMensaje = async (req, res) => {
  const { mensaje } = req.body;

  if (!mensaje) {
    return res.status(400).json({ texto: "Falta el mensaje del usuario." });
  }

  try {
    const resultado = await procesarChat(mensaje);
    return res.json(resultado);
  } catch (error) {
    return res.status(500).json({ texto: "El servicio de IA no está disponible." });
  }
};
