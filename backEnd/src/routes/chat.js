import express from 'express';
import { enviarMensaje } from '../controllers/chat.js';

const router = express.Router();

router.post("/", enviarMensaje);

export const chatRouter = router;

