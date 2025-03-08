import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import express from 'express';

const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Tecknikal Test Api",
      version: "1.0.0",
      description: "Dokumentasi API menggunakan Swagger",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
}

const swaggerSpec = swaggerJSDoc(swaggerOptions);

function setupSwager(app: express.Application) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

export default setupSwager;
