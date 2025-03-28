import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fechaRegistro: { type: Date, default: Date.now },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  racha: {
    id_Usuario: { type: mongoose.Schema.Types.ObjectId, ref: "Usuarios" },
    dias_consecutivos: { type: Number, default: 0 },
    fecha_ultimo_registro: { type: Date, default: Date.now },
  }
  
}, { timestamps: true });

export default mongoose.model("Usuarios", usuarioSchema);
