import { execSync } from "child_process";
import axios from 'axios'
import { expect } from "chai";
import { it } from "mocha";
import { app,prisma } from "../../src/main/appTeste";
import { Server } from "http";

var url_base = ''
let server:Server

before(async function () {
    this.timeout(20000);
    //BD de Testes
    process.env.PORT = '4001';
    process.env.DATABASE_URL = "postgresql://postgres:ProjetoWeb777@db.bzbphfxgkdubddvmkgyu.supabase.co:5432/postgres"
    //URL
    url_base = `http://localhost:${process.env.PORT }`
    //execSync("npx prisma migrate dev init")
    server =  app.listen(process.env.PORT, () => {
        console.log(`🚀 Servidor rodando em http://localhost:${process.env.PORT}`)
        console.log(`Documentação Swagger em http://localhost:${process.env.PORT}/api-docs`)
    })
});

async function createUserTeste() {
    console.log("🔹 Criando usuário de teste...");
    const response = await axios.post(url_base+'/user/add/',{
        "name":"test",
        "email":"teste@email.com",
        "senha":"teste123"
        
    }).catch(function (error) {
        if (error.response) {
            console.log(error.response.data)
        }})
}

async function loginDeTeste() {
    console.log("Realizando login...")
    const response = await axios.post(url_base+'/auth/login',{
        "email":"teste@email.com",
        "password":"teste123"
    })
    return String(response.data.token)

}

beforeEach(async function () {
    this.timeout(30000)
    console.log("⏳ Resetando o banco de testes...");
    await execSync("npx prisma migrate reset --force --skip-seed", { stdio: "inherit" });
    console.log("🔄 Aguardando banco de dados reiniciar...");
    await new Promise(resolve => setTimeout(resolve, 3000));
    console.log("✅ Banco de testes resetado!");
    await createUserTeste()
    
});

after(async function ()  {
    this.timeout(20000)
    server.close()
})

describe("Testes de API Token",function(){
    const model = '/token'
    it('Deve Retornar 201 para a rota Post e um token adicionado /token/add', async function() {
        this.timeout(20000)
        const token = await loginDeTeste()
        const headers = { 'Authorization': `Bearer ${token}` }
        const response = await axios.post(url_base+model+'/add/',{
            "name":"testTable",
        },{headers}).catch(function (error) {
            if (error.response) {
                return error.response
            }})
        console.log(response.data)
        expect(response.status).to.equal(201);
    })

    it('Deve Retornar 401 para ao não receber um token válido, rota Post /token/add', async function() {
        this.timeout(20000)
        const response = await axios.post(url_base+model+'/add/',{
            "name":"testTable",
        }).catch(function (error) {
            if (error.response) {
                return error.response
            }})
        expect(response.status).to.equal(401);
    })
})