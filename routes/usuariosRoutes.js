import express from "express";
import { loginUsuario, registerUsuario } from "../controllers/usuariosController.js";

const router = express.Router();

router.post("/login", loginUsuario);
router.post("/register", registerUsuario);

export default router;
