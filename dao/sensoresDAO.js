import Sensores from '../models/Sensores.js';

export default class SensoresDAO {
    static async crearMultipleSensores(datosArray) {
        try {
            return await Sensores.insertMany(datosArray); // Guarda múltiples registros
        } catch (error) {
            throw error;
        }
    }

    static async obtenerUltimosDatosAgrupados() {
        return await Sensores.aggregate([
            { $sort: { fecha: -1 } }, // Ordena por fecha descendente
            {
                $group: {
                    _id: "$nombre", // Agrupa por nombre de sensor
                    valor: { $first: "$valor" }, // Toma el valor más reciente
                    unidad: { $first: "$unidad" },
                    fecha: { $first: "$fecha" }
                }
            }
        ]);
    }
}