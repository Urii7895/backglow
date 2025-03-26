import express from "express";
import { 
    forgotPassword,
  loginUsuario, 
  registerUsuario,
  resetPassword,  
} from "../controllers/usuariosController.js";

const router = express.Router();
router.post("/login", loginUsuario);
router.post("/register", registerUsuario);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;