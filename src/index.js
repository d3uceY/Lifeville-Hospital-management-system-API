import express from "express";
import cors from "cors";
import env from "dotenv";
import { seedSuperAdmin } from "./controllers/userControllers.js";

import cookieParser from 'cookie-parser';

//SOCKETS
import { createServer } from "http";
import { Server as IOServer } from "socket.io";


//ROUTES
import patientRoutes from "./routes/patientRoutes.js";
import vitalSignsRoutes from "./routes/vitalSignsRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import deathRoutes from "./routes/deathRoutes.js";
import birthRoutes from "./routes/birthRoutes.js";
import symptomsRoutes from "./routes/symptomsRoutes.js";
import inpatientAdmissionsRoutes from "./routes/inpatientAdmissionsRoutes.js";
import bedRoutes from "./routes/bedRoutes.js";
import userRoutes from './routes/userRoutes.js'
import billRoutes from './routes/billRoutes.js'
import labTestRoutes from './routes/labTestRoutes.js'
import complaintsRoutes from './routes/complaintsRouter.js'
import physicalExaminationsRoutes from './routes/physicalExaminationsRoutes.js'

import { specs, swaggerUiOptions as swaggerUi } from "./swagger/swagger.js";

env.config();

const app = express();

const port = 3000;

app.use(cookieParser());

const FRONTEND = process.env.FRONTEND;
app.use(
  cors({
    origin: FRONTEND,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

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
app.use("/api", symptomsRoutes);
app.use("/api", inpatientAdmissionsRoutes);
app.use("/api", bedRoutes);
app.use("/api", userRoutes);
app.use("/api", billRoutes);
app.use("/api", labTestRoutes);
app.use("/api", complaintsRoutes);
app.use("/api", physicalExaminationsRoutes);

// Swagger UI
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, {
    explorer: true,
    swaggerOptions: { persistAuthorization: true },
  })
);

// 4) seed superadmin then start listening on the HTTP server (not app.listen)
seedSuperAdmin().then(() => {
  httpServer.listen(port, () =>
    console.log(`Server + Socket.IO running on port ${port}`)
  );
})
  .catch((err) => {
    console.error("Error seeding superadmin:", err);
    process.exit(1);
  });

// prints out html in the host http://localhost:3000/
app.get("/", (req, res) => {
  res.send("<h1>Hello World, is this working?</h1>");
});

// // confirmation that port is running
// app.listen(port, () => {
//   console.log(`Server running like a bitvh on port ${port}`);
// });
