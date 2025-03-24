import RequerimientoCuidado from "../models/RequerimientoCuidado.js";

export const getRequerimientosCuidado = async (req, res) => {
  try {
    const requerimientos = await RequerimientoCuidado.find();
    res.json(requerimientos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createRequerimientoCuidado = async (req, res) => {
  try {
    const nuevoRequerimiento = new RequerimientoCuidado(req.body);
    await nuevoRequerimiento.save();
    res.status(201).json(nuevoRequerimiento);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};