import mongoose from 'mongoose';

const SensoresSchema = new mongoose.Schema({
    nombre: { 
        type: String, 
        enum: ['Temperatura', 'Luz', 'Humedad Suelo', 'Humedad Aire'] // Valores permitidos
    },
    valor: { 
        type: Number, 
        validate: {
            validator: (v) => v >= 0, // Validación para que el valor sea positivo
            message: 'El valor debe ser un número positivo'
        }
    },
    unidad: { 
        type: String, 
        enum: ['°C', 'luz', '%'] // Unidades permitidas
    },
    fecha: { 
        type: Date, 
        default: Date.now 
    },
    plantaId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Planta",
    }
});

const Sensores = mongoose.model('Sensores', SensoresSchema);

export default Sensores;