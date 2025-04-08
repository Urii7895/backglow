import express from "express";
import {
  forgotPassword,
  loginUsuario,
  registerUsuario,
  resetPassword,
} from "../controllers/usuariosController.js";

const usuariosRoutes = express.Router();
usuariosRoutes.post("/login", loginUsuario);
usuariosRoutes.post("/register", registerUsuario);
usuariosRoutes.post("/forgot-password", forgotPassword);
usuariosRoutes.post("/reset-password", resetPassword);

export default usuariosRoutes;