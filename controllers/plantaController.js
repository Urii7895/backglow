import Planta from "../models/Planta.js";

export const getPlantas = async (req, res) => {
  try {
    const plantas = await Planta.find();
    res.json(plantas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createPlanta = async (req, res) => {
  try {
    const nuevaPlanta = new Planta(req.body);
    await nuevaPlanta.save();
    res.status(201).json(nuevaPlanta);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
