import express from "express";
import http from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import usuariosRoutes from './routes/usuariosRoutes.js'


dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// Middleware
app.use(cors({ origin: "*" })); 
app.use(express.json());
app.use(morgan("dev")); 

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Conectado a MongoDB"))
  .catch((error) => console.error("Error en MongoDB:", error));

app.post('/api/sensores', (req, res) => {
  const sensorData = req.body;
  console.log("📥 Datos recibidos del ESP32:", sensorData);

  io.emit("sensorData", sensorData);
  
  res.status(200).json({ mensaje: "Datos recibidos con éxito" });
});
app.use("/api/usuarios", usuariosRoutes); 



app.get("/", (req, res) => {
  res.send("🚀 Servidor funcionando");
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
server.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor corriendo en http://0.0.0.0:${PORT}`);
});
