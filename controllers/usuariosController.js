import Usuario from "../models/Usuarios.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from 'crypto'
import nodemailer from 'nodemailer';

const generarToken = (idUsuario) => {
  return jwt.sign({ id: idUsuario }, 'growglow', { expiresIn: '1h' });
};

const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "1f7f1c42b65fcc",
    pass: "5581b6e0291c61"
  }
});
transport.verify(function(error, success) {
  if (error) {
    console.log("Error al verificar el transporte:", error);
  } else {
    console.log("Servidor SMTP configurado correctamente");
  }
});

export const forgotPassword = async (req, res) => {
  const { email } = req.body
  if (!email) {
    return res.status(400).json({ message: "Correo electrónico requerido" })
  }
  try {
    const usuario = await Usuario.findOne({ email })
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" })
    }
    const resetLink = `http://localhost:4200/reset-password?email=${encodeURIComponent(email)}`;

    await transport.sendMail({
      from: '"BrightBloom - GrowGlow" <soporte@brightbloom.com>',
      to: usuario.email,
      subject: 'Restablece tu contraseña de GrowGlow',
      html: `
    <div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
      <div style="background-color: #6a1b9a; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="color: white; margin: 0;">BrightBloom</h1>
        <p style="color: #d1c4e9; margin: 5px 0 0; font-size: 18px;">GrowGlow</p>
      </div>
      <div style="padding: 25px; background-color: #f9f9f9; border-radius: 0 0 8px 8px;">
        <h2 style="color: #6a1b9a; margin-top: 0;">¡Hola!</h2>
        <p style="font-size: 16px; line-height: 1.5;">
          Hemos recibido una solicitud para restablecer la contraseña de tu cuenta en <strong>GrowGlow</strong>.
          ¡No dejes sola a tu orquídea por mucho tiempo!
        </p>
      
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetLink}"
             style="display: inline-block; padding: 12px 24px; background-color: #9c27b0; color: white; 
                    text-decoration: none; border-radius: 4px; font-weight: bold; font-size: 16px;">
            Restablecer contraseña
          </a>
        </div>
        <p style="font-size: 14px; color: #666;">
          Si no solicitaste este cambio, por favor ignora este mensaje. El enlace expirará en 1 hora.
        </p>
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center;">
          <p style="font-size: 12px; color: #999;">
            © ${new Date().getFullYear()} BrightBloom - GrowGlow. Todos los derechos reservados.
          </p>
          <p style="font-size: 12px; color: #999;">
            Si necesitas ayuda, contáctanos en <a href="mailto:soporte@brightbloom.com" style="color: #9c27b0;">soporte@brightbloom.com</a>
          </p>
        </div>
      </div>
    </div>
  `
    });

    res.json({ success: true, message: "Se enviaron las instrucciones a tu correo" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error al enviar el correo" });
  }
}

export const resetPassword = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email y contraseña son requeridos.' });
  }
  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    usuario.password = hashedPassword;
    await usuario.save();
    res.status(200).json({ message: 'Contraseña restablecida correctamente.' });
  } catch (error) {
    res.status(500).json({ message: 'Error al restablecer la contraseña.', error: error.message });
  }
};

export const registerUsuario = async (req, res) => {
  try {
    console.log("📌 Recibida petición de registro:", req.body);
    const { nombre, email, password } = req.body;
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      console.log("⚠️ Usuario ya registrado:", email);
      return res.status(400).json({ message: "El usuario ya está registrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const nuevoUsuario = new Usuario({ nombre, email, password: hashedPassword });
    await nuevoUsuario.save();
   
    
    const token = generarToken(nuevoUsuario._id);

    res.status(201).json({
      message: "Usuario registrado con éxito",
      usuario: { id: nuevoUsuario._id, nombre: nuevoUsuario.nombre, email: nuevoUsuario.email },
      token
    });
  } catch (error) {
    console.error("❌ Error en registerUsuario:", error);
    res.status(500).json({ message: "Error en el servidor", error: error.message });
  }
};


export const loginUsuario = async (req, res) => {
  try {
    console.log("📌 Recibida petición de login:", req.body);
    const { email, password } = req.body;
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      console.log("⚠️ Usuario no encontrado:", email);
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    const isMatch = await bcrypt.compare(password, usuario.password);
    if (!isMatch) {
      console.log("❌ Contraseña incorrecta para:", email);
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }
    const token = generarToken(usuario._id);

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
