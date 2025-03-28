import mongoose from "mongoose";

const RachaSchema = new mongoose.Schema({
    Dias_de_racha: {type: Number, default :0 },
    id_Usuarios: { type: String, ref: "Usuarios" },
    plantaId: { type: String, ref: "Planta" },
  });
  
  export default mongoose.model("Racha", RachaSchema);
