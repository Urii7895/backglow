import mongoose from "mongoose";

const RachaSchema = new mongoose.Schema({
  Dias_de_racha: { type: Number, required: true },
  id_Usuarios: { type: mongoose.Schema.Types.ObjectId, ref: "Usuarios", required: true },  // Referencia a Usuarios
  id_Planta: { type: mongoose.Schema.Types.ObjectId, ref: "Planta", required: true },  // Referencia a Planta
});

export default mongoose.model("Racha", RachaSchema);
