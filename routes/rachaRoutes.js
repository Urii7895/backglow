import express from "express";
import { getRachas, createRacha, getRachaByUser } from "../controllers/rachaController.js";

const router = express.Router();

// Obtener todas las rachas
router.get("/", getRachas);

// Obtener la racha de un usuario específico
router.get("/:idUsuario", getRachaByUser); // Usamos el parámetro idUsuario

// Crear una nueva racha
router.post("/", createRacha);

export default router;
