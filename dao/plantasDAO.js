import mongoose from "mongoose";
import Planta from "../models/Planta.js";

class PlantaDAO {
  static async getPlantaByUsuario(usuarioId) {
    return await Planta.findOne({ usuarioId: new mongoose.Types.ObjectId(usuarioId) }).populate("logroId");
  }

  static async crearPlanta(data) {
    data.usuarioId = new mongoose.Types.ObjectId(data.usuarioId);
    const existe = await Planta.findOne({ usuarioId: data.usuarioId });
    if (existe) throw new Error("El usuario ya tiene una planta registrada.");
    return await Planta.create(data);
  }

  static async actualizarActividad(usuarioId) {
    const planta = await Planta.findOne({ usuarioId: new mongoose.Types.ObjectId(usuarioId) }).populate("logroId");
    if (!planta) return null;

    const ahora = new Date();
    const diferenciaDias = Math.floor((ahora - planta.ultimaActividad) / (1000 * 60 * 60 * 24));

    if (diferenciaDias === 1) {
      planta.diasConsecutivos += 1;
    } else if (diferenciaDias > 1) {
      planta.diasConsecutivos = 0;
    }

    if (planta.diasConsecutivos >= planta.logroId.tiempoCuidado) {
      planta.estado = "Saludable";
    } else if (planta.diasConsecutivos >= planta.logroId.tiempoCuidado - 2) {
      planta.estado = "Riesgo";
    } else {
      planta.estado = "Crítico";
    }

    planta.ultimaActividad = ahora;
    await planta.save();
    return planta;
  }

  static async eliminarPlanta(usuarioId) {
    return await Planta.findOneAndDelete({ usuarioId: new mongoose.Types.ObjectId(usuarioId) });
  }
}

export default PlantaDAO;
