import mongoose from "mongoose";
const LogrosSchema = new mongoose.Schema({
    Nombre: String,
    Descripcion: String,
    Tiempo_de_cuidado: Number,
    id_usuario: { type: String, ref: "Usuarios" },
  });
  
  export default mongoose.model("Logros", LogrosSchema);