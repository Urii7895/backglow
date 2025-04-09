import mongoose from "mongoose";

const PlantasSchema = new mongoose.Schema({
  id_Planta: { 
    type: mongoose.Schema.Types.ObjectId, 
    unique: true, 
    default: () => new mongoose.Types.ObjectId()  // Esta es la única línea modificada
  },
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: "Usuarios", required: true },
  // Agrega otros campos necesarios
});

export default mongoose.model("Plantas", PlantasSchema);
