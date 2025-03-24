import express from "express";
import { getRachas, createRacha, getRachaByUser } from "../controllers/rachaController.js";

const router = express.Router();

router.get("/", getRachas); 
router.get("/:idUsuario", getRachaByUser); // Nueva ruta para obtener la racha por usuario
router.post("/", createRacha);

export default router;
