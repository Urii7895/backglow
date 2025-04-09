import express from "express";
import { getSensores, createSensor } from "../controllers/sensoresController.js";
import Sensor from "../models/Sensores.js"; // Importa el modelo de Sensor

const sensoresRouter = express.Router();

sensoresRouter.get("/", getSensores);
sensoresRouter.post("/", createSensor);

// Nueva ruta para obtener los últimos datos de cada sensor
sensoresRouter.get("/ultimos", async (req, res) => {
  try {
    const sensores = await Sensor.aggregate([
      { $sort: { fecha: -1 } }, // Ordena de más reciente a más antiguo
      { 
        $group: { 
          _id: "$nombre", 
          valor: { $first: "$valor" }, 
          unidad: { $first: "$unidad" }, 
          fecha: { $first: "$fecha" }
        } 
      }
    ]);

    res.json(sensores);
  } catch (error) {
    console.error("❌ Error obteniendo datos de sensores:", error);
    res.status(500).json({ error: "Error obteniendo datos de sensores" });
  }
});
export default sensoresRouter;
