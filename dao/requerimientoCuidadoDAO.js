import RequerimientoCuidado from "../models/RequerimientoCuidado.js";

export const findAllRequerimientosCuidado = async () => await RequerimientoCuidado.find();
export const createRequerimientoCuidado = async (data) => await new RequerimientoCuidado(data).save();