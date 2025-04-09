import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fechaRegistro: { type: Date, default: Date.now },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  
  
}, { timestamps: true });

export default mongoose.model("Usuarios", usuarioSchema);
