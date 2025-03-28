import Usuarios from "../models/Usuarios.js";
import Racha from "../models/Racha.js";  // Importamos el modelo de Racha

export const createUsuario = async (data) => {
  try {
    // Crear una nueva racha para el usuario
    const nuevaRacha = new Racha({
      Dias_de_racha: 0,  // Inicializamos la racha a 0
    });
    const rachaGuardada = await nuevaRacha.save();  // Guardamos la racha

    // Crear el usuario y asociar la racha
    const usuario = new Usuarios({
      nombre: data.nombre,
      email: data.email,
      password: data.password,
      id_racha: rachaGuardada._id,  // Asociamos la racha al usuario
    });

    const usuarioGuardado = await usuario.save();  // Guardamos el usuario
    return usuarioGuardado;  // Devolvemos el usuario guardado
  } catch (error) {
    console.error("❌ Error al crear el usuario:", error);
    throw new Error("Error al crear el usuario");
  }
};
