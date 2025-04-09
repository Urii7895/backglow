import mongoose from "mongoose";

const LogrosSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    tiempoCuidado: { type: Number, required: true, min: 1 },
    usuarioId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Usuarios", 
        required: false // Cambiado a false para permitir null 
    }
}, { timestamps: true });

export default mongoose.model("Logros", LogrosSchema);
