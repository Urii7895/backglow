import mongoose from "mongoose";

const PlantaSchema = new mongoose.Schema({
    nombre: {type:String, required:true},
    estado:{
      type: String,
      required: true,
      enum:["Saludable","Riesgo","Crítico"]
    },
    fechaAdquisicion: {type:Date,default:Date.now},
    logroId:{type: mongoose.Schema.Types.ObjectId, ref: "Logros",required:true},
  });
  
  export default mongoose.model("Planta", PlantaSchema);