import express from "express";
import http from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import usuariosRoutes from './routes/usuariosRoutes.js'
import sensoresRouter from "./routes/sensoresRoutes.js";


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
app.use((req, res, next) => {
  req.io = io; 
  next();
}
);
// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Conectado a MongoDB"))
  .catch((error) => console.error("Error en MongoDB:", error));


app.use("/api/sensores", sensoresRouter);
app.post('/api/sensores', (req, res) => {
  console.log("📡 Datos recibidos del dispositivo:", req.body);
  io.emit("actualizarSensores", JSON.stringify(req.body)); // Reenvía via sockets
  res.status(200).json({ success: true });
});
app.use("/api/usuarios", usuariosRoutes); 



app.get("/", (req, res) => {
  res.send("🚀 Servidor funcionando");
});


io.on("connection", (socket) => {
  console.log("🟢 Nuevo cliente conectado");

  socket.on("datosSensores", (data) => {
    // Procesa y reenvía a todos los clientes
    const datosFormateados = {
      temperatura_suelo: data.temperaturaSuelo || 22, 
      temperatura_aire: data.temperaturaAire || 25,
      humedad_aire: data.humedad || 60,
      luz: data.luz || 300
    };
    console.log('Emitiendo datos:', lastData); 
req.io.emit('actualizarSensores', JSON.stringify(lastData));
    io.emit("actualizarSensores", JSON.stringify(datosFormateados));
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
