import express from "express";
import {
  forgotPassword,
  loginUsuario,
  registerUsuario,
  resetPassword,
} from "../controllers/usuariosController.js";

const router = express.Router();

// Ruta para registro de usuario
router.post("/register", registerUsuario);

// Ruta para login de usuario
router.post("/login", loginUsuario);

// Ruta para solicitar restablecer contraseña
router.post("/forgot-password", forgotPassword);

// Ruta para restablecer la contraseña
router.post("/reset-password", resetPassword);

export default router;
