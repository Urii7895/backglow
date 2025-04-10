import express from "express";
import { getSensores, createSensor, deleteSensor} from "../controllers/sensoresController.js";
import Sensor from "../models/Sensores.js"; // Importa el modelo de Sensor

const router = express.Router();

router.get("/", getSensores);
router.post("/", createSensor);

// Nueva ruta para obtener los últimos datos de cada sensor
router.get("/ultimos", async (req, res) => {
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

// Actualizar un sensor por su ID
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const sensorActualizado = await Sensor.findByIdAndUpdate(id, req.body, { new: true });
    if (!sensorActualizado) {
      return res.status(404).json({ message: "Sensor no encontrado" });
    }
    res.json(sensorActualizado);
  } catch (error) {
    console.error("❌ Error actualizando el sensor:", error);
    res.status(400).json({ error: "Error actualizando el sensor" });
  }
});

// Eliminar un sensor por su ID
router.delete("/:id", deleteSensor);  // Asignar el controlador a la ruta DELETE





export default router;
