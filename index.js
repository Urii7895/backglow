import express from "express";
import http from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import usuariosRoutes from "./routes/usuariosRoutes.js";
import plantasRoutes from "./routes/plantasRoutes.js";
import logrosRoutes from "./routes/logrosRoutes.js";
import sensoresRoutes from "./routes/sensoresRoutes.js";
import informacionPlantaRoutes from "./routes/informacionPlantaRoutes.js";
import requerimientoCuidadoRoutes from "./routes/requerimientoCuidadoRoutes.js";
import rachaRoutes from "./routes/rachaRoutes.js";
import nodemailer from 'nodemailer';

dotenv.config();


const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});


// Middleware
app.use(cors({ origin: "*" })); // Permitir peticiones desde cualquier origen
app.use(express.json()); // Permitir recibir JSON en las peticiones
app.use(morgan('dev')); // Usar morgan para ver las peticiones en la terminal

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log(" Conectado a MongoDB"))
  .catch((error) => console.error(" Error en MongoDB:", error));

app.use("/api/usuarios", usuariosRoutes);
app.use("/api/plantas", plantasRoutes);
app.use("/api/logros", logrosRoutes);
app.use("/api/sensores", sensoresRoutes);
app.use("/api/informacion-planta", informacionPlantaRoutes);
app.use("/api/requerimiento-cuidado", requerimientoCuidadoRoutes);
app.use("/api/racha", rachaRoutes);

// Ruta principal
app.get("/", (req, res) => {
  res.send("🚀 Servidor funcionando");
});

app.post('/api/sensores', (req, res) => {
  console.log("📥 Datos recibidos:", req.body);
  res.status(200).json({ mensaje: "Datos recibidos con éxito" });
});

app.post('/api/informacion-planta', (req, res) => {
  console.log("📥 Datos recibidos:", req.body);
  res.status(200).json({ mensaje: "Datos recibidos con éxito" });
});

io.on("connection", (socket) => {
  console.log("🟢 Nuevo cliente conectado");

  socket.on("sensorData", (data) => {
    io.emit("updateData", data);
  });

  socket.on("disconnect", () => {
    console.log(" Cliente desconectado");
  });
});

// Iniciar servidor
const PORT = process.env.PORT || 5000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor corriendo en http://0.0.0.0:${PORT}`);
});
