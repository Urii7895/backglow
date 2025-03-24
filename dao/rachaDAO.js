import Racha from "../models/Racha.js";

export const findAllRachas = async () => await Racha.find();
export const createRacha = async (data) => await new Racha(data).save();