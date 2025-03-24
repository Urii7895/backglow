import express from "express";
import { getPlantas, createPlanta } from "../controllers/plantaController.js";
const router = express.Router();

router.get("/", getPlantas);
router.post("/", createPlanta);

export default router;