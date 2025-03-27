import express from "express";
import { obtenerPlanta,crearPlanta,actualizarRacha,eliminarPlanta } from "../controllers/plantaController.js";
const router = express.Router();

router.get("/:usuarioId", obtenerPlanta);
router.post("/", crearPlanta);
router.put("/:usuarioId/actualizar", actualizarRacha);
router.delete("/:usuarioId", eliminarPlanta);

export default router;