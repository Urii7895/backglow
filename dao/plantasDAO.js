import Planta from "../models/Planta.js";

export const findAllPlantas = async () => await Planta.find();
export const createPlanta = async (data) => await new Planta(data).save();
