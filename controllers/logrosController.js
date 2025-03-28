import Logros from "../models/Logros.js";
import mongoose from "mongoose";

export const getLogros = async (req, res) => {
  try {
    const logros = await Logros.find();
    res.json(logros);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createLogro = async (req, res) => {
  try {
    const nuevoLogro = new Logros(req.body);
    await nuevoLogro.save();
    res.status(201).json(nuevoLogro);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};