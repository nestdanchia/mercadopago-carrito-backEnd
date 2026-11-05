import { crearPreferencia } from '../services/mercadopago.service.js';

export const crearPago = async (req, res) => {
  try {
    const { items, totalFinal, orderId } = req.body;
    console.log("orderId recibido:", orderId);
    console.log("totalFinal", totalFinal);

    if (!totalFinal || isNaN(totalFinal)) {
      return res.status(400).json({ error: "El precio total no es válido o está vacío." });
    }

    if (!items || items.length === 0) {
      return res.status(400).json({ error: "El carrito está vacío" });
    }

    const result = await crearPreferencia(totalFinal, orderId);

    console.log(JSON.stringify(result, null, 2));

    res.json({
      id: result.id,
      init_point: result.init_point
    });
    console.log("Preference ID:", result.id);
    console.log("Collector ID:", result.collector_id);
    console.log("Init Point:", result.init_point);

  } catch (error) {
    console.error("Error creando preferencia:", error?.message || error);
    if (error?.cause) console.error("Causa:", error.cause);
    if (error?.status) console.error("HTTP status MP:", error.status);
    res.status(500).json({ error: "Error al generar el pago", detalle: error?.message });
  }
};
