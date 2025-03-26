import mongoose from "mongoose";

const PlantaSchema = new mongoose.Schema({
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: "Usuarios", required: true },
  nombre: { type: String, required: true },
  estado: {
    type: String,
    required: true,
    enum: ["Saludable", "Riesgo", "Crítico"]
  },
  fechaAdquisicion: { type: Date, default: Date.now },
  ultimaActividad: { type: Date, default: Date.now },
  diasConsecutivos: { type: Number, default: 0 },
  logroId: { type: mongoose.Schema.Types.ObjectId, ref: "Logros", required: true }
});

// Middleware para actualizar racha y estado antes de guardar
PlantaSchema.pre("save", async function (next) {
  const ahora = new Date();
  const diferenciaDias = Math.floor((ahora - this.ultimaActividad) / (1000 * 60 * 60 * 24));

  if (diferenciaDias === 1) {
    this.diasConsecutivos += 1;
  } else if (diferenciaDias > 1) {
    this.diasConsecutivos = 0; 
  }

  try {
    const logro = await mongoose.model("Logros").findById(this.logroId);
    if (logro) {
      if (this.diasConsecutivos >= logro.tiempoCuidado) {
        this.estado = "Saludable";
      } else if (this.diasConsecutivos >= logro.tiempoCuidado - 2) {
        this.estado = "Riesgo";
      } else {
        this.estado = "Crítico";
      }
    }
  } catch (error) {
    console.error("Error al obtener logro:", error);
  }

  this.ultimaActividad = ahora;
  next();
});

export default mongoose.model("Planta", PlantaSchema);
