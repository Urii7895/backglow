import Usuarios from "../models/Usuarios.js";

export const findAllUsuarios = async () => await Usuarios.find();
export const createUsuario = async (data) => {
    try {
        const usuario = new Usuario({
            nombre:data.nombre,
            email:data.email,
            password:data.password,
            racha:{
                dias_consecutivos:0,
                ultima_fecha:new Date()
            }
        })
        const usuarioGuardado = await usuario.save()
        return usuarioGuardado
    } catch (error) {
        console.log("error")
    }
}
