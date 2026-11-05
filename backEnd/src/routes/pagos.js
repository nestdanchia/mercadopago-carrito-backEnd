import express from 'express';
import { crearPago } from '../controllers/pagos.js';

const router = express.Router();

router.post("/", crearPago);

export const pagosRouter = router;
