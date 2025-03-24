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
    try {
        const sensores = req.body; // Recibir un array de sensores

        if (!Array.isArray(sensores)) {
            return res.status(400).json({ message: "Se esperaba un array de sensores" });
        }

        const nuevosSensores = await Sensores.insertMany(sensores);
        res.status(201).json(nuevosSensores);
    } catch (error) {
        console.error("Error guardando sensores:", error);
        res.status(400).json({ message: error.message });
    }
}
