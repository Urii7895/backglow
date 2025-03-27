import PlantaDAO from "../dao/plantasDAO.js";

const obtenerPlanta = async (req, res) => {
  try {
    const planta = await PlantaDAO.getPlantaByUsuario(req.params.usuarioId);
    if (!planta) return res.status(404).json({ mensaje: "Planta no encontrada" });
    res.json(planta);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener la planta", error });
  }
};

const crearPlanta = async (req, res) => {
  try {
    const nuevaPlanta = await PlantaDAO.crearPlanta(req.body);
    res.status(201).json(nuevaPlanta);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

const actualizarRacha = async (req, res) => {
  try {
    const planta = await PlantaDAO.actualizarActividad(req.params.usuarioId);
    if (!planta) return res.status(404).json({ mensaje: "Planta no encontrada" });
    res.json({ mensaje: "Actividad actualizada", planta });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar la racha", error });
  }
};

const eliminarPlanta = async (req, res) => {
  try {
    const planta = await PlantaDAO.eliminarPlanta(req.params.usuarioId);
    if (!planta) return res.status(404).json({ mensaje: "Planta no encontrada" });
    res.json({ mensaje: "Planta eliminada" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar la planta", error });
  }
};

export { obtenerPlanta, crearPlanta, actualizarRacha, eliminarPlanta };
