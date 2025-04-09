import mongoose from "mongoose";

const RequerimientoCuidadoSchema = new mongoose.Schema({
    Requerimiento_de_luz: Number,
    Requerimiento_de_temperatura: Number,
    Requerimiento_de_humedad: Number,
    Requerimiento_de_humedad_de_tierra: Number,
    Nivel_de_bateria: Number,
    plantaId: { type: String, ref: "Planta" },
  });
  
  export default mongoose.model("RequerimientoCuidado", RequerimientoCuidadoSchema);