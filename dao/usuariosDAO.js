import Usuario from "../models/Usuarios.js"; // Asegúrate de que el modelo sea de "Usuarios"

export const createUsuario = async (data) => {
  try {
    // Crear el usuario y asociar la racha
    const usuario = new Usuario({
      nombre: data.nombre,
      email: data.email,
      password: data.password,
    });

    // Guardamos el usuario
    const usuarioGuardado = await usuario.save();
    return usuarioGuardado;  // Devolvemos el usuario guardado
  } catch (error) {
    console.error("❌ Error al crear el usuario:", error);
    throw new Error("Error al crear el usuario");
  }
};
