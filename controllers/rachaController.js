import Racha from "../models/Racha.js";
import Logros from "../models/Logros.js";

// GET /api/racha/:usuarioId
export const getRachaByUsuario = async (req, res) => {
  try {
    const { usuarioId } = req.params;
    const racha = await Racha.findOne({ usuarioId });

    if (!racha) {
      return res.status(404).json({ message: "Racha no encontrada" });
    }

    res.json(racha);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la racha", error });
  }
};

export const actualizarRacha = async (req, res) => {
    try {
      const { usuarioId } = req.params;
      let racha = await Racha.findOne({ usuarioId });
  
      // Si no se encuentra la racha, se crea una nueva con los valores iniciales
      if (!racha) {
        racha = new Racha({
          usuarioId,
          fechaInicio: new Date(),
          diasConsecutivos: 1,  // Comienza con 1 si es el primer día
          totalDias: 1,         // Contamos el primer día como total
          fechaFin: null,
        });
        await racha.save();
        return res.status(201).json({ message: "Racha creada", racha });
      }
  
      // Lógica de actualización existente...
      const hoy = new Date();
      const ayer = new Date();
      ayer.setDate(hoy.getDate() - 1);
  
      const ultimaActualizacion = new Date(racha.updatedAt);
      const mismoDia = ultimaActualizacion.toDateString() === hoy.toDateString();
      const fueAyer = ultimaActualizacion.toDateString() === ayer.toDateString();
  
      if (mismoDia) {
        return res.status(200).json({ message: "Ya se contó la racha hoy", racha });
      }
  
      if (fueAyer) {
        racha.diasConsecutivos += 1;
      } else {
        racha.diasConsecutivos = 1;  // Se reinicia el contador si no es consecutivo
      }
  
      racha.totalDias += 1;
      racha.fechaFin = hoy;
  
      await racha.save();
  
      // Logro diario
      await Logros.create({
        usuarioId,
        nombre: "Cuidado Diario",
        descripcion: `Has cuidado tu planta el día ${racha.diasConsecutivos}`,
        tiempoCuidado: 1,
      });
  
      // Mensaje motivacional cada 3 días
      if (racha.diasConsecutivos % 3 === 0) {
        console.log("Vas por buen camino, sigue así y verás el fruto de tu esfuerzo");
      }
  
      // Logro semanal al sexto día
      if (racha.diasConsecutivos === 7) {
        await Logros.create({
          usuarioId,
          nombre: "Semana Verde",
          descripcion: "Has cuidado tu planta durante 7 días consecutivos",
          tiempoCuidado: 7,
        });
      }
  
      res.status(200).json({ message: "Racha actualizada", racha });
    } catch (error) {
      res.status(500).json({ message: "Error al actualizar racha", error });
    }
  };