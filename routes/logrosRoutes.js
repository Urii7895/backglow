import express from "express";
import { getLogros, createLogro } from "../controllers/logrosController.js";
const router = express.Router();

router.get("/", getLogros);
router.post("/", createLogro);

export default router;