import express from "express";
import { getInformacionPlanta, createInformacionPlanta } from "../controllers/informacionPlantaController.js";
const router = express.Router();


router.get("/", getInformacionPlanta);
router.post("/", createInformacionPlanta);

export default router;