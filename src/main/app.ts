import dotenv from 'dotenv'
import express from "express"
import "express-async-errors"

import { swaggerUi, swaggerSpec } from './config/swagger';
import userController from './controller/userController'
import errorMiddleware from './middleware/error';
import tableController from "./controller/tableController";
import canvasController from "./controller/canvasController";
import tokenController from "./controller/tokenController"
import authRoutes from './routes/authRoutes'

dotenv.config();

const app = express();
app.use(express.json());
//config swagger
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerSpec))
app.use('/auth',authRoutes)
app.use('/user',userController);
app.use('/table',tableController);
app.use('/canvas',canvasController);
app.use('/token',tokenController);
app.use(errorMiddleware);



//iniciar aplicação
const server = app.listen(process.env.PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${process.env.PORT}`)
    console.log(`Documentação Swagger em http://localhost:${process.env.PORT}/api-docs`)
})

export {app, server}