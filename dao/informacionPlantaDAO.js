import InformacionPlanta from "../models/InformacionPlanta.js";

export const findAllInformacionPlanta = async () => await InformacionPlanta.find();
export const createInformacionPlanta = async (data) => await new InformacionPlanta(data).save();







