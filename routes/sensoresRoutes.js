import express from 'express';
import SensoresController from '../controllers/sensoresController.js';

const router = express.Router();

router.post('/', SensoresController.crearSensores);
router.get('/ultimos', SensoresController.obtenerUltimosDatos);

export default router;