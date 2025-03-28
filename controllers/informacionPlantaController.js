import InformacionPlanta from "../models/InformacionPlanta.js";
import mongoose from "mongoose";

export const getInformacionPlanta = async (req, res) => {
  try {
    const infoPlanta = await InformacionPlanta.find();
    res.json(infoPlanta);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createInformacionPlanta = async (req, res) => {
  try {
    const nuevaInfoPlanta = new InformacionPlanta(req.body);
    await nuevaInfoPlanta.save();
    res.status(201).json(nuevaInfoPlanta);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};