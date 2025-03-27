import Racha from "../models/Racha.js";
import Usuarios from "../models/Usuarios.js"; // Importar el modelo de usuarios

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
    console.log("🟢 ID recibido en el backend:", idUsuario);

    if (!idUsuario) {
      return res.status(400).json({ message: "ID de usuario no proporcionado" });
    }

    // Asegurarse de que el ID del usuario sea un ObjectId válido
    const usuario = await Usuarios.findById(idUsuario); 
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const racha = await Racha.findOne({ id_Usuarios: idUsuario });
    console.log("🔍 Resultado de búsqueda en MongoDB:", racha);

    if (!racha) {
      return res.status(404).json({ message: "Racha no encontrada en la base de datos" });
    }

    res.json(racha);
  } catch (error) {
    console.error("❌ Error en getRachaByUser:", error);
    res.status(500).json({ message: error.message });
  }
};
