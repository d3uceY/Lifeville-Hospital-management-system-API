import express from "express";
import cors from "cors";
import env from "dotenv";
import { seedSuperAdmin } from "./controllers/userControllers.js";

import cookieParser from 'cookie-parser';

import { createServer } from "http";
//SOCKETS
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
import conditionRoutes from './routes/conditionRoutes.js'
import diagnosesRoutes from './routes/diagnosesRoutes.js'
import prescriptionRoutes from './routes/prescriptionRoutes.js'
import procedureRoutes from './routes/procedureRoutes.js'
import doctorNoteRoutes from './routes/doctorNoteRoutes.js'
import nurseNoteRoutes from './routes/nurseNoteRoutes.js'
import summaryRoutes from './routes/summaryRoutes.js'
import statsRoutes from './routes/statsRoutes.js'

import { specs, swaggerUiOptions as swaggerUi } from "./swagger/swagger.js";

env.config();

const app = express();

const port = process.env.PORT || 3000;

app.use(cookieParser());

const FRONTEND = process.env.FRONTEND || "http://localhost:5173";
const allowedOrigins = [
  FRONTEND,
  "http://localhost:5173", 
];
  
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json()); // Create an HTTP server from Express app

const httpServer = createServer(app);

// Initialize Socket.IO on that server
const io = new IOServer(httpServer, { 
  cors: { 
    origin: allowedOrigins,
    credentials: true 
  } 
});

// Store the io instance on your app for later retrieval
app.set("socketio", io); // lets any controller do req.app.get("socketio")

// routes
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
app.use("/api", conditionRoutes);
app.use("/api", diagnosesRoutes);
app.use("/api", prescriptionRoutes);
app.use("/api", procedureRoutes);
app.use("/api", doctorNoteRoutes);
app.use("/api", nurseNoteRoutes);
app.use("/api", summaryRoutes);
app.use("/api", statsRoutes);

// Swagger UI
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, {
    explorer: true,
    swaggerOptions: { persistAuthorization: true },
  })
);

// seed superadmin then start listening on the HTTP server
seedSuperAdmin().then(() => {
  httpServer.listen(port, '0.0.0.0', () =>
    console.log(`Server + Socket.IO running on port ${port}`)
  );
})  .catch((err) => {
    console.error("Error seeding superadmin:", err);
    // process.exit(1);
  });

app.get("/", (req, res) => {
  res.send("<h1>API dey run</h1>");
});
