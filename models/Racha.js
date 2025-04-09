import mongoose from 'mongoose';

const rachaSchema = new mongoose.Schema({
  usuarioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuarios',
    required: true
  },
  fechaInicio: {
    type: Date,
    default: Date.now // Autoestablece la fecha al crear
  },
  fechaFin: {
    type: Date,
    default: null // Inicia como null (se actualizará después)
  },
  diasConsecutivos: {
    type: Number,
    default: 0 // Inicia en 0
  },
  totalDias: {
    type: Number,
    default: 0 // Inicia en 0 (no requerido)
  }
}, { timestamps: true }); // Opcional: añade createdAt/updatedAt

const Racha = mongoose.model('Racha', rachaSchema);

export default Racha;