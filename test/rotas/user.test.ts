
import { execSync } from "child_process";
import axios from 'axios'
import { expect } from "chai";
import { it } from "mocha";
import { app,prisma } from "../../src/main/appTeste";
import teste from "teste-auth";
var url_base = ''
//teste()
before(async function () {
    this.timeout(20000);
    //BD de Testes
    process.env.PORT = '4001';
    process.env.DATABASE_URL = "postgresql://postgres:ProjetoWeb777@db.bzbphfxgkdubddvmkgyu.supabase.co:5432/postgres"
    //URL
    url_base = `http://localhost:${process.env.PORT }`
    //execSync("npx prisma migrate dev init")
    app.listen(process.env.PORT, () => {
        console.log(`🚀 Servidor rodando em http://localhost:${process.env.PORT}`)
        console.log(`Documentação Swagger em http://localhost:${process.env.PORT}/api-docs`)
    })
});

before(async function () {
    this.timeout(20000)
    console.log("⏳ Resetando o banco de testes...");
    execSync("npx prisma migrate reset --force --skip-seed", { stdio: "inherit" });
    console.log("✅ Banco de testes resetado!");
});

after(async function ()  {
    this.timeout(20000)
    
})

async function createUserTeste() {
    console.log("🔹 Criando usuário de teste...");
    const response = await axios.post(url_base+'/user/add/',{
        "name":"test",
        "email":"teste@email.com",
        "senha":"teste123"
        
    })
    console.log(response.data)
}

async function loginDeTeste() {
    console.log("Realizando login...")
    const response = await axios.post(url_base+'/auth/login',{
        "email":"teste@email.com",
        "password":"teste123"
    })
    return String(response.data.token);

}
describe("Teste de API User",function(){
    const model = '/user'

    describe(`Testes ${model} Add`,function(){
        before(function () {
            this.timeout(20000)
            console.log("⏳ Resetando o banco de testes...");
            execSync("npx prisma migrate reset --force --skip-seed", { stdio: "inherit" });
            console.log("✅ Banco de testes resetado!");
        });
        it('Deve Retornar 201 para a rota Post e um usuário adicionado /user/add', async function() {
            this.timeout(10000)
            const response = await axios.post(url_base+model+'/add/',{
                "name":"test",
                "senha":"teste123",
                "email":"teste@email.com"
            }).catch(function (error) {
                if (error.response) {
                    return error.response
                }});
            expect(response.status).to.equal(201);
            expect(response.data.email).to.equal("teste@email.com"); //Email é um indentificador único previsivel 
        })
        it('Deve Retornar 400 para a rota Post e erro de email já adicionado /user/add', async function() {
            this.timeout(10000)
            const response = await axios.post(url_base+model+'/add/',{
                "name":"test",
                "senha":"teste123",
                "email":"teste@email.com"
            }).catch(function (error) {
                if (error.response) {
                    return error.response
                }})
            expect(response.status).to.equal(400);
            expect(response.data.message).to.equal('Bad Request: Email já cadastrado.'); //Email é um indentificador único
        })
    })

    describe('Testes Getall',function() {
        before(function () {
            this.timeout(20000)
            console.log("⏳ Resetando o banco de testes...");
            execSync("npx prisma migrate reset --force --skip-seed", { stdio: "inherit" });
            console.log("✅ Banco de testes resetado!");
        });
        it('Deve Retornar 200 para a rota GET e uma lista vazia /user/getall', async function() {
            this.timeout(10000)
            const response = await axios.get(url_base+model+'/getall');
            //console.log(response.data)
            expect(response.status).to.equal(200);
            expect(response.data).to.have.lengthOf(0);
        })
        
        it('Deve Retornar 200 para a rota GET e uma lista de tamanho 1 /user/getall', async function() {
            this.timeout(10000)
            await createUserTeste();
            const response = await axios.get(url_base+model+'/getall');
            //console.log(response.data)
            expect(response.status).to.equal(200);
            expect(response.data).to.have.lengthOf(1);
        })
    })

    describe('Testes Get',function() {
        before(function () {
            this.timeout(20000)
            console.log("⏳ Resetando o banco de testes...");
            execSync("npx prisma migrate reset --force --skip-seed", { stdio: "inherit" });
            console.log("✅ Banco de testes resetado!");
        });
        it('Deve Retornar 200 para a rota GET /user/get/id', async function() {
            this.timeout(10000)
            await createUserTeste();
            const response = await axios.get(url_base+model+'/get/1'); 
            expect(response.status).to.equal(200);
        })
        it('Deve Retornar 404 para a rota GET', async function() {
            this.timeout(10000)
            const response = await axios.get(url_base+model+'/get/2').catch(
                (error) => error.response
            ); 
            expect(response.status).to.equal(404);
        })
    })

    describe('Testes Delete', function() {
        //token="teste2"
        before(async function () {
            this.timeout(20000)
            console.log("⏳ Resetando o banco de testes...");
            execSync("npx prisma migrate reset --force --skip-seed", { stdio: "inherit" });
            console.log("✅ Banco de testes resetado!");
            
            //await createUserTeste();
            //console.log("Usuario Criado")
            //token = await loginDeTeste();
            //console.log("Logado"+`${token}`)
            //console.log(token)
        });
        
        it('Deve Retornar 200 para a rota DELETE /user/delete/id', async function() {
            this.timeout(30000)
            await createUserTeste();
            let token = await loginDeTeste();
            console.log("token criado : " + token)
            const headers = { Authorization: `Bearer ${token}` }
            const response = await axios.delete(url_base+model+'/delete/1',{
                headers
            }).catch(
                (error) => error.response
            );
            console.log(response.data)
            expect(response.status).to.equal(200); 
        })
        it('Deve Retornar 404 para a rota DELETE /user/delete/id', async function() {
            this.timeout(20000);
            await createUserTeste();
            let token = await loginDeTeste();
            console.log(token)
            const headers = { 'Authorization': `Bearer ${token}` }
            const response = await axios.delete(url_base+model+'/delete/999',{
                headers
            }).catch(
                (error) => error.response
            );
            console.log(response.data)
            expect(response.status).to.equal(404);
        })
    })
    describe('Testes Update',function() {
        before(async function () {
            this.timeout(30000)
            console.log("⏳ Resetando o banco de testes...");
            execSync("npx prisma migrate reset --force --skip-seed", { stdio: "inherit" });
            console.log("✅ Banco de testes resetado!");

            
            //console.log("Usuario Criado")
            //const token = await loginDeTeste();
            //console.log("Logado")
        });
        it('Deve Retornar 200 para a rota PUT /user/update/id', async function() {
            this.timeout(20000)
            await createUserTeste();
            let token = await loginDeTeste();
            const headers = { Authorization: `Bearer ${token}` }
            const response = await axios.put(url_base+model+'/update/1',{
                "name":"testUpdated",
                "email":"testeUpdated@email.com"
            },{
                headers
            }).catch(
                (error) => error.response
            );
            expect(response.status).to.equal(200); 
        })
        it('Deve Retornar 404 para a rota PUT /user/update/id', async function() {
            this.timeout(20000)
            await createUserTeste();
            let token = await loginDeTeste();
            const headers = { Authorization: `Bearer ${token}` }
            const response = await axios.put(url_base+model+'/update/99',{
                "name":"testUpdated",
                "email":"testeUpdated@email.com"
            },{
                headers
            }).catch(
                (error) => error.response
            ); 
            console.log(response.data)
            expect(response.status).to.equal(404);
        })
    })
})