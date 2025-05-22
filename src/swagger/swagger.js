// swagger.js
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi     from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Lifeville Hospital Management System API",
      version: "1.0.0",
      description: "Interactive docs for all inpatient, patient, doctor, etc. endpoints",
    },
    servers: [
      { url: "http://localhost:3000/" }
    ],
  },
  apis: [
    "./routes/*.js"    // <- glob pattern to your route files
  ],
};

export const specs = swaggerJsdoc(options);
export const swaggerUiOptions = swaggerUi;
