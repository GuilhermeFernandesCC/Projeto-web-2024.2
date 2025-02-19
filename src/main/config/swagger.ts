import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options: swaggerJSDoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "LunarMaps API",
            version: "1.0.0",
            description: "Documentação da API"
        },
        serves: [
            {
                url: "http://localhost:3000",
                description: "Servidor de Desenvolvimento",
            },
        ],
    },
    apis: [
        "./src/main/lunarmaps/routes/*.ts"
    ],
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Express) => {
    app.use("/api-docs",swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log(" 📄 Swagger Rodando em http://localhost:3000/api-docs")
};