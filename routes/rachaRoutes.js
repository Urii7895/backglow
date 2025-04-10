import express from "express";
import { getRachaByUsuario, actualizarRacha } from "../controllers/rachaController.js";

const router = express.Router();

router.get("/:usuarioId", getRachaByUsuario);
router.post("/actualizar/:usuarioId", actualizarRacha);

export default router;
