import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

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
        "./src/main/controller/*.ts"
    ],
};

const swaggerSpec = swaggerJSDoc(options);
export {swaggerUi, swaggerSpec}