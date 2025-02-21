import express from "express"
import "express-async-errors"

import { swaggerUi, swaggerSpec } from './config/swagger';
import userController from './controller/userController'
import errorMiddleware from './middleware/error';
import tableController from "./controller/tableController";
import canvasController from "./controller/canvasController";

const app = express();
app.use(express.json());
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerSpec))
app.use('/user',userController);
app.use('/table',tableController);
app.use('/canvas',canvasController)
app.use(errorMiddleware);
//config swagger


//iniciar aplicação
const server = app.listen(process.env.PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${process.env.PORT}`)
})

export {app, server}