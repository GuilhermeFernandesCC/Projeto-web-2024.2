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

async function createTokenTeste() {
    console.log("🔹 Criando token de teste...")
    const token = await loginDeTeste();
    const headers = { 'Authorization': `Bearer ${token}` }
    const response = await axios.post(url_base+'/token/add/',{},
        {headers}).catch(function (error) {
        if (error.response) {
            console.log("Error token table: "+error.response.data)
            return error.response
        }})
}

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
        const response = await axios.post(url_base+model+'/add/',{},{headers:headers}).catch(function (error) {
            if (error.response) {
                return error.response
            }})
        expect(response.status).to.equal(201);
    })

    it('Deve Retornar 401 para ao não receber um token válido, rota Post /token/add', async function() {
        this.timeout(20000)
        const response = await axios.post(url_base+model+'/add/').catch(function (error) {
            if (error.response) {
                return error.response
            }})
        expect(response.status).to.equal(401);
    })

    it('Deve Retornar 400 para ao receber um token inválido, rota Post /token/add', async function() {
        this.timeout(20000)
        const token = 'tokenInvalido'
        const headers = { 'Authorization': `Bearer ${token}` }
        const response = await axios.post(url_base+model+'/add/',{},{headers:headers}).catch(function (error) {
            if (error.response) {
                return error.response
            }})
        expect(response.status).to.equal(400);
    })

    it('Deve Retornar 200 ao receber um id de token existente, rota Get /token/get/1', async function() {
        this.timeout(20000)
        await createTokenTeste()
        const response = await axios.get(url_base+model+'/get/1').catch(function (error) {
            if (error.response) {
                return error.response
            }})
        expect(response.status).to.equal(200);
    })
    it('Deve Retornar 404 ao receber um id de token inexistente, rota Get /token/get/999', async function() {
        this.timeout(20000)
        const response = await axios.get(url_base+model+'/get/999').catch(function (error) {
            if (error.response) {
                return error.response
            }})
        expect(response.status).to.equal(404);
    })

    it('Deve Retornar 200 ao deletar um token existente, rota Delete /token/delete', async function () {
        this.timeout(20000)
        await createTokenTeste()
        const token = await loginDeTeste();
        const headers = { 'Authorization': `Bearer ${token}` }
        const response = await axios.delete(url_base+model+'/delete',{headers}).catch(function (error) {
            if (error.response) {
                return error.response
            }})
        expect(response.status).to.equal(200);
    })
    it('Deve Retornar 404 quando não existe token a ser deletado, rota Delete /token/delete', async function () {
        this.timeout(20000)
        const token = await loginDeTeste();
        const headers = { 'Authorization': `Bearer ${token}` }
        const response = await axios.delete(url_base+model+'/delete',{headers}).catch(function (error) {
            if (error.response) {
                return error.response
            }})
        expect(response.status).to.equal(404);
    })

    it('Deve Retornar 200 ao receber um id de token existente, rota Update /table/update/1', async function () {
        this.timeout(20000)
        await createTokenTeste();
        const token = await loginDeTeste();
        const headers = { 'Authorization': `Bearer ${token}` }
        const response = await axios.put(url_base+model+'/update/1',{},{headers}).catch(function (error) {
            if (error.response) {
                return error.response
            }})
        expect(response.status).to.equal(200);
    })
    it('Deve Retornar 404 ao receber um id de token inexistente, rota Update /tokwn/update/999', async function () {
        this.timeout(20000)
        await createTokenTeste();
        const token = await loginDeTeste();
        const headers = { 'Authorization': `Bearer ${token}` }
        const response = await axios.put(url_base+model+'/update/999',{},{headers}).catch(function (error) {
            if (error.response) {
                return error.response
            }})
        expect(response.status).to.equal(404);
    })
})