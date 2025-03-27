import mongoose from "mongoose";

const PlantaSchema = new mongoose.Schema({
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: "Usuarios", required: true },
  nombre: { type: String, required: true },
  estado: {
    type: String,
    required: true,
    enum: ["Saludable", "Riesgo", "Crítico"],
    default: "Crítico"
  },
  fechaAdquisicion: { type: Date, default: Date.now },
  ultimaActividad: { type: Date, default: Date.now },
  diasConsecutivos: { type: Number, default: 0 },
  logroId: { type: mongoose.Schema.Types.ObjectId, ref: "Logros", required: true }
});

export default mongoose.model("Planta", PlantaSchema);
