import mongoose from "mongoose";


const sensorDataSchema = new mongoose.Schema({
    nombre: String,
    valor: Number,
    unidad: String,
    fecha: { type: Date, default: Date.now }
  });
  

  export default mongoose.model('SensorData', sensorDataSchema);
