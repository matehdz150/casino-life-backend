import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Casino Life API",
      version: "1.0.0",
      description:
        "API del backend de Casino Life — incluye autenticación, ranking, perfil e historial de juegos.",
      contact: {
        name: "Equipo Casino Life",
        email: "soporte@casinolife.com",
      },
    },
    servers: [
      {
        url: "http://localhost:8000",
        description: "Servidor de desarrollo",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export function setupSwagger(app: Express) {
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("📘 Swagger Docs available at http://localhost:8000/api/docs");
}