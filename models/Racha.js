import mongoose from "mongoose";

const RachaSchema = new mongoose.Schema({
<<<<<<< HEAD
  Dias_de_racha: { type: Number, required: true },
  id_Usuarios: { type: mongoose.Schema.Types.ObjectId, ref: "Usuarios", required: true },  // Referencia a Usuarios
  id_Planta: { type: mongoose.Schema.Types.ObjectId, ref: "Planta", required: true },  // Referencia a Planta
});

export default mongoose.model("Racha", RachaSchema);
=======
    Dias_de_racha: Number,
    id_Usuarios: { type: String, ref: "Usuarios" },
    plantaId: { type: String, ref: "Planta" },
  });
  
  export default mongoose.model("Racha", RachaSchema);
>>>>>>> origin/Michelle
