import Sensores from "../models/Sensores.js";

export const findAllSensores = async () => await Sensores.find();
export const createSensor = async (data) => await new Sensores(data).save();
