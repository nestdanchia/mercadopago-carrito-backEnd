import { Preference } from 'mercadopago';
import { client, CLIENT_URL } from '../config/environment.js';

export const crearPreferencia = async (totalFinal, orderId) => {
  const itemsMercadoPago = [
    {
      title: "Compra tienda online",
      quantity: 1,
      unit_price: Math.round(Number(totalFinal) * 100) / 100,
      currency_id: "ARS",
    },
  ];

  const preference = new Preference(client);

  console.log(JSON.stringify(itemsMercadoPago, null, 2));

  const result = await preference.create({
    body: {
      items: itemsMercadoPago,
      back_urls: {
        success: `${CLIENT_URL}/pago-exitoso?orderId=${orderId}`,
        failure: `${CLIENT_URL}/pago-fallido?orderId=${orderId}`,
        pending: `${CLIENT_URL}/pago-pendiente?orderId=${orderId}`,
      },
    }
  });

  return result;
};
