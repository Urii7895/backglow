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
        const sensores = req.body.map(sensor => ({
            nombre: sensor.nombre || 'nombre_default',  // Agrega un nombre si no lo tiene
            valor: sensor.valor || 0,                    // Agrega un valor por defecto
            unidad: sensor.unidad || 'default',          // Agrega una unidad por defecto
            fecha: new Date()
        }));

        const nuevosSensores = await Sensores.insertMany(sensores);
        res.status(201).json(nuevosSensores);
    } catch (error) {
        console.error("Error guardando sensores:", error);
        res.status(400).json({ message: error.message });
    }
}
