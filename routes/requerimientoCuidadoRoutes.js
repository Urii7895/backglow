import express from "express";
import { getRequerimientosCuidado, createRequerimientoCuidado } from "../controllers/requerimientoCuidadoController.js";
const router = express.Router();

router.get("/", getRequerimientosCuidado);
router.post("/", createRequerimientoCuidado);

export default router;