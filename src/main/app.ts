import express from "express"
import { setupSwagger } from "./config/swagger"

const app = express();
app.use(express.json());

//config swagger
setupSwagger(app);

//iniciar aplicação
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`)
})