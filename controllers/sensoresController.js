import Sensores from "../models/Sensores.js";

export const getSensores = async (req, res) => {
    try {
        const sensores = await Sensores.find();
        res.json(sensores);
    } catch (error) {
        console.error("Error obteniendo sensores:", error);
        res.status(500).json({ message: error.message });
    }
};
export const createSensor = async (req, res) => {
    console.log("📥 Datos recibidos:", req.body);
    try {
        // Verifica si req.body es un array
        if (!Array.isArray(req.body)) {
            return res.status(400).json({ message: "Se esperaba un array de sensores" });
        }

        const sensores = req.body.map(sensor => ({
            nombre: sensor.nombre,
            valor: sensor.valor,
            unidad: sensor.unidad,
            fecha: new Date()
        }));

        const nuevosSensores = await Sensores.insertMany(sensores);
        res.status(201).json(nuevosSensores);
    } catch (error) {
        console.error("Error guardando sensores:", error);
        res.status(400).json({ message: error.message });
    }
}
// Actualizar un sensor por su ID
export const updateSensor = async (req, res) => {
    try {
      const { id } = req.params;
      const sensorActualizado = await Sensores.findByIdAndUpdate(id, req.body, { new: true });
      if (!sensorActualizado) {
        return res.status(404).json({ message: "Sensor no encontrado" });
      }
      res.json(sensorActualizado);
    } catch (error) {
      console.error("❌ Error actualizando el sensor:", error);
      res.status(400).json({ error: "Error actualizando el sensor" });
    }
  };
 // Eliminar un sensor por su ID
export const deleteSensor = async (req, res) => {
    try {
      const { id } = req.params;  // Obtener el ID de la URL
      const sensorEliminado = await Sensores.findByIdAndDelete(id);
      if (!sensorEliminado) {
        return res.status(404).json({ message: "Sensor no encontrado" });
      }
      res.json({ message: "Sensor eliminado exitosamente" });
    } catch (error) {
      console.error("❌ Error eliminando el sensor:", error);
      res.status(400).json({ error: "Error eliminando el sensor" });
    }
  };
  
