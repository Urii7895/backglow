import Racha from "../models/Racha.js";

export const getRachas = async (req, res) => {
  try {
    const rachas = await Racha.find();
    res.json(rachas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createRacha = async (req, res) => {
  try {
    const nuevaRacha = new Racha(req.body);
    await nuevaRacha.save();
    res.status(201).json(nuevaRacha);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const getRachaByUser = async (req, res) => {
  try {
    const { idUsuario } = req.params; 
    const racha = await Racha.findOne({ id_Usuarios: idUsuario });

    if (!racha) {
      return res.status(404).json({ message: "Racha no encontrada" });
    }

    res.json(racha);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
