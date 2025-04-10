import {
  forgotPassword,
  loginUsuario,
  registerUsuario,
  resetPassword,
  getUsuarios,         // <- agrega esto
  getUsuarioById,
  updateUsuario,
  deleteUsuario,
} from "../controllers/usuariosController.js";
import express from "express";


const router = express.Router();

// Ruta para registro de usuario
router.post("/register", registerUsuario);

// Ruta para login de usuario
router.post("/login", loginUsuario);

// Ruta para solicitar restablecer contraseña
router.post("/forgot-password", forgotPassword);

// Ruta para restablecer la contraseña
router.post("/reset-password", resetPassword);


// Obtener todos los usuarios
router.get("/", getUsuarios);

// Obtener un usuario por ID
router.get("/:id", getUsuarioById);

// Actualizar un usuario
router.put("/:id", updateUsuario);

// Eliminar un usuario
router.delete("/:id", deleteUsuario);


export default router;
