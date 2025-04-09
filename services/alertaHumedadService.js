import Planta from "../models/Planta.js";

// Objeto para guardar el INICIO del tiempo de humedad baja por planta
const tiemposInicioAlerta = {};

/**
 * Verifica si la humedad está baja de forma CONTINUA (sin subidas intermedias).
 * @param {string} plantaId - ID de la planta (viene del sensor).
 * @param {number} humedad - Valor actual de humedad (ej: 25%).
 */
export async function verificarHumedadContinua(plantaId, humedad) {
  try {
    // 1. Obtener la planta para acceder al usuario asociado
    const planta = await Planta.findById(plantaId).populate("usuarioId");
    if (!planta) return;

    // 2. Configuración de alerta (ajusta estos valores si necesitas)
    const UMBRAL_HUMEDAD = 30; // Mínimo aceptable (30%)
    const TIEMPO_ALERTA_MS = 3.5 * 60 * 60 * 1000; // 3.5 horas en milisegundos

    // 3. Si la humedad es NORMAL (>= 30%), reiniciar contador si existía
    if (humedad >= UMBRAL_HUMEDAD) {
      if (tiemposInicioAlerta[plantaId]) {
        console.log(`🟢 ${planta.nombre}: ¡Humedad normal! Contador reiniciado.`);
        delete tiemposInicioAlerta[plantaId];
      }
      return;
    }

    // 4. Si la humedad está BAJA (< 30%)
    const ahora = new Date();

    // Primera vez que se detecta humedad baja
    if (!tiemposInicioAlerta[plantaId]) {
      tiemposInicioAlerta[plantaId] = ahora; // Registrar momento inicial
      console.log(`🔴 ${planta.nombre}: Humedad baja detectada a las ${ahora.toLocaleTimeString()}`);
      return;
    }

    // Calcular tiempo transcurrido desde la primera detección
    const tiempoTranscurrido = ahora - tiemposInicioAlerta[plantaId];

    // Si ya pasaron 3.5 horas, ¡NOTIFICAR!
    if (tiempoTranscurrido >= TIEMPO_ALERTA_MS) {
      console.log(`🚨 ¡Enviar notificación a ${planta.usuarioId.nombre}! ${planta.nombre} lleva 3.5+ horas con humedad baja.`);

      // Aquí iría la integración con Firebase FCM (para React Native)
      // Ejemplo: enviarNotificacion(planta.usuarioId, `¡Riega ${planta.nombre}!`);

      delete tiemposInicioAlerta[plantaId]; // Reiniciar contador después de notificar
    }
  } catch (error) {
    console.error("Error en verificarHumedadContinua:", error);
  }
}