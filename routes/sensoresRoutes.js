import express from "express";
import { getSensores, createSensor } from "../controllers/sensoresController.js";

const router = express.Router();

router.get("/", getSensores);
// routes/sensoresRoutes.js
import express from 'express';
import SensorData from '../models/SensorData';

router.post('/', async (req, res) => {
  try {
    const datos = req.body; // Array de sensores desde el ESP32
    
    // Guarda cada sensor en la BD
    const savedData = await SensorData.insertMany(datos);
    
    // Opcional: Emitir por Socket.io
    req.io.emit('nuevosDatos', savedData);
    
    res.status(201).json(savedData);
  } catch (error) {
    res.status(500).json({ error: 'Error al guardar datos' });
  }
});



export default router;
