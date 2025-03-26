import mongoose from "mongoose";

const SensoresSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    valor: { type: Number, required: true },
    unidad: { type: String, required: true },
    fecha: { type: Date, default: Date.now },
    plataId: { type: mongoose.Schema.Types.ObjectId, ref: "Planta" }
});

export default mongoose.model("Sensor", SensoresSchema);
