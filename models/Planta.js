import mongoose from "mongoose";
const PlantaSchema = new mongoose.Schema({
    Nombre: String,
    Fecha_de_inicio_de_cuidado: Date,
    Estado: String,
    id_usuario: { type: String, ref: "Usuarios" },
  });
  
  export default mongoose.model("Planta", PlantaSchema);