import Racha from "../models/Racha.js";

// Obtener todas las rachas
export const findAllRachas = async () => await Racha.find();

// Crear una nueva racha
export const createRacha = async (data) => await new Racha(data).save();

// Obtener una racha por el id de usuario
export const findRachaByUser = async (idUsuario) => await Racha.findOne({ id_Usuarios: idUsuario });
