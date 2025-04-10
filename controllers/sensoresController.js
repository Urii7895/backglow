import SensoresDAO from '../dao/sensoresDAO.js';

export default class SensoresController {
    static async crearSensores(req, res, next) {
        try {
            const datosArray = req.body; // Recibe el array completo
    
            // Validación básica
            if (!Array.isArray(datosArray)) { // Corregido el paréntesis de cierre
                return res.status(400).json({ error: "Se esperaba un array de datos" });
            }
    
            const savedData = await SensoresDAO.crearMultipleSensores(datosArray);
            
            // Emitir el último conjunto de datos
            if (req.io) {
                const lastData = savedData.slice(-4); // Últimos 4 registros (uno por sensor)
                req.io.emit('actualizarSensores', JSON.stringify(lastData));
            }
    
            res.status(201).json(savedData);
        } catch (error) {
            next(error);
        }
    }

    static async obtenerUltimosDatos(req, res, next) {
        try {
            const result = await SensoresDAO.obtenerUltimosDatos();
            const formattedData = {};
            result.forEach(item => {
                formattedData[item._id] = item.valor;
            });
            res.json(formattedData);
        } catch (error) {
            next(error);
        }
    }
}