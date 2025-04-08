import { execSync } from "child_process";
import axios from 'axios'
import { expect } from "chai";
import { it } from "mocha";
import { app,prisma } from "../../src/main/appTeste";
import { Server } from "http";

var url_base = ''
let server:Server
//teste()
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

beforeEach(async function () {
    this.timeout(30000)
    console.log("⏳ Resetando o banco de testes...");
    await execSync("npx prisma migrate reset --force --skip-seed", { stdio: "inherit" });
    console.log("🔄 Aguardando banco de dados reiniciar...");
    await new Promise(resolve => setTimeout(resolve, 3000));
    console.log("✅ Banco de testes resetado!");
});

after(async function ()  {
    this.timeout(20000)
    server.close()
})

describe("Teste de API Auth Login",function(){
    it('Deve Retornar 200 ao receber dados válidos para login', async function() {
        this.timeout(20000)
        await createUserTeste()
        const response = await axios.post(url_base+'/auth/login',{
            "email":"teste@email.com",
            "password":"teste123"
        }).catch(function (error) {
            if (error.response) {
                return error.response
            }})
        expect(response.status).to.equal(200);
    })

    it('Deve Retornar 400 ao receber dados inválidos para login', async function() {
        //await createUserTeste()
        this.timeout(20000)
        const response = await axios.post(url_base+'/auth/login',{
            "email":"teste@email.com",
            "password":"teste123"
        }).catch(function (error) {
            if (error.response) {
                return error.response
            }})
        expect(response.status).to.equal(400);
        })
})