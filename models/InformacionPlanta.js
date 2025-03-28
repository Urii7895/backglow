import mongoose from "mongoose";

const InformacionPlantaSchema = new mongoose.Schema({
    Descripcion: String,
    Nombre_Cientifico: String,
    Familia: String,
    Reino: String,
    Clase: String,
    Diversidad: String,
    plantaId: { type: String, ref: "Planta" },
  });
  
  export default mongoose.model("InformacionPlanta", InformacionPlantaSchema);