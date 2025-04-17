import express from "express";
import cors from "cors";

//SOCKETS
import { createServer } from "http";
import { Server as IOServer } from "socket.io";

import patientRoutes from "./routes/patientRoutes.js";
import vitalSignsRoutes from "./routes/vitalSignsRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import deathRoutes from "./routes/deathRoutes.js";
import birthRoutes from "./routes/birthRoutes.js";

const app = express();

const port = 3000;

app.use(cors()); // Enable CORS

app.use(express.json()); // Middleware to parse JSON requests

// 1) Create an HTTP server from your Express app
const httpServer = createServer(app);

// 2) Initialize Socket.IO on that server
const io = new IOServer(httpServer, { cors: { origin: "*" } });

// 3) Store the io instance on your app for later retrieval
app.set("socketio", io); // ← lets any controller do req.app.get("socketio")
// Mount your routes
app.use("/api", patientRoutes);
app.use("/api", vitalSignsRoutes);
app.use("/api", doctorRoutes);
app.use("/api", appointmentRoutes);
app.use("/api", deathRoutes);
app.use("/api", birthRoutes);

// 4) Start listening on the HTTP server (not app.listen)
httpServer.listen(port, () =>
  console.log(`Server + Socket.IO running on port ${port}`)
);

// prints out html in the host http://localhost:3000/
app.get("/", (req, res) => {
  res.send("<h1>Hello World, is this working?</h1>");
});

// // confirmation that port is running
// app.listen(port, () => {
//   console.log(`Server running like a bitvh on port ${port}`);
// });
