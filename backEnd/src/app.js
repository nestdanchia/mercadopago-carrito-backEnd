import express from 'express';
import cors from 'cors';
import { pagosRouter } from './routes/pagos.js';
import { chatRouter } from './routes/chat.js';

const app = express();

app.use(cors());
app.use(express.json());

// Registro de endpoints utilizando las importaciones nombradas corregidas
app.use("/pagos", pagosRouter);
app.use("/chat", chatRouter);

console.log("Puerto donde se levanta el servidor en render :", process.env.PORT);
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
