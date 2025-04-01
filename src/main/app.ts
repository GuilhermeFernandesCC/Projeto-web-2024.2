import dotenv from 'dotenv'
import express from "express"
const cors = require("cors")
import "express-async-errors"

import { swaggerUi, swaggerSpec } from './config/swagger';
import userController from './controller/userController'
import errorMiddleware from './middleware/error';
import tableController from "./controller/tableController";
import canvasController from "./controller/canvasController";
import tokenController from "./controller/tokenController"
import authController from './controller/authController'
import { PrismaClient } from '@prisma/client';


dotenv.config();
const prisma = new PrismaClient()
const app = express();
app.use(cors({
    origin: "http://localhost:5173", // Permite requisições do frontend
    methods: "GET,POST,PUT,DELETE",
    credentials: true, // Permite envio de cookies e autenticação
  }));
app.use(express.json());
//config swagger
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerSpec))
app.use('/auth',authController)
app.use('/user',userController);
app.use('/table',tableController);
app.use('/canvas',canvasController);
app.use('/token',tokenController);
app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

//iniciar aplicação
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`🚀 Servidor rodando em http://localhost:${process.env.PORT}`)
        console.log(`Documentação Swagger em http://localhost:${process.env.PORT}/api-docs`)
    })
}
export {app,prisma}