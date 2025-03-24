import Usuarios from "../models/Usuarios.js";

export const findAllUsuarios = async () => await Usuarios.find();
export const createUsuario = async (data) => await new Usuarios(data).save();
