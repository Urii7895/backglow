import Logros from "../models/Logros.js";

export const findAllLogros = async () => await Logros.find();
export const createLogro = async (data) => await new Logros(data).save();