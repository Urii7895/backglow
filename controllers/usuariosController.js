import Usuario from "../models/Usuarios.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUsuario = async (req, res) => {
  try {
    console.log("📌 Recibida petición de registro:", req.body); // Agregar log

    const { nombre, email, password } = req.body;

    // Verificar si el usuario ya existe
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      console.log("⚠️ Usuario ya registrado:", email);
      return res.status(400).json({ message: "El usuario ya está registrado" });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario
    const nuevoUsuario = new Usuario({ nombre, email, password: hashedPassword });
    await nuevoUsuario.save();

    console.log("✅ Usuario registrado:", nuevoUsuario);

    res.status(201).json({
      message: "Usuario registrado con éxito",
      usuario: { id: nuevoUsuario._id, nombre, email }
    });
  } catch (error) {
    console.error("❌ Error en registerUsuario:", error);
    res.status(500).json({ message: "Error en el servidor", error: error.message });
  }
};

export const loginUsuario = async (req, res) => {
  try {
    console.log("📌 Recibida petición de login:", req.body); // Agregar log

    const { email, password } = req.body;

    // Buscar usuario
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      console.log("⚠️ Usuario no encontrado:", email);
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Verificar contraseña
    const isMatch = await bcrypt.compare(password, usuario.password);
    if (!isMatch) {
      console.log("❌ Contraseña incorrecta para:", email);
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    // Generar token JWT
    const token = jwt.sign({ id: usuario._id }, "secreto", { expiresIn: "1h" });

    console.log("✅ Usuario autenticado:", usuario);

    res.json({
      token,
      usuario: { id: usuario._id, nombre: usuario.nombre, email: usuario.email }
    });
  } catch (error) {
    console.error("❌ Error en loginUsuario:", error);
    res.status(500).json({ message: "Error en el servidor", error: error.message });
  }
};
