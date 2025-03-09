import express from "express";
import cors from "cors";
import patientRoutes from "./routes/patientRoutes.js";

const app = express();

const port = 3000;

app.use(cors()); // Enable CORS

app.use(express.json()); // Middleware to

app.use("/api", patientRoutes);

// prints out html in the host http://localhost:3000/
app.get("/", (req, res) => {
  res.send("<h1>Hello World, is this working?</h1>");
});

// confirmation that port is running
app.listen(port, () => {
  console.log(`Server running like a bitvh on port ${port}`);
});
