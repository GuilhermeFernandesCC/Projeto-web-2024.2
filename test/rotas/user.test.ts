
import { execSync } from "child_process";
import axios from 'axios'
import { expect } from "chai";
import { app, prisma } from "../../src/main/app";
import { Server } from "http";
import { it } from "mocha";

var url_base = ''

let server: Server;
before(async function () {
  this.timeout(20000);
  //BD de Testes
  process.env.PORT = '4001'
  process.env.DATABASE_URL = "postgresql://postgres:ProjetoWeb777@db.bzbphfxgkdubddvmkgyu.supabase.co:5432/postgres"
  //Inicia aplicação em teste
  server = app.listen(process.env.PORT, () => {
    console.log(`🚀 Aplicação de testes rodando na porta ${process.env.PORT}`);
  });
  //URL
  url_base = 'http://localhost:'+process.env.PORT
  console.log(url_base)
  //console.log("⏳ Resetando o banco de testes...");
  //execSync("npx prisma migrate reset --force --skip-seed", { stdio: "inherit" });
  //console.log("✅ Banco de testes resetado!");
});
async function resetbanco(){
    before(async function () {
        this.timeout(20000)
        console.log("⏳ Resetando o banco de testes...");
        execSync("npx prisma migrate reset --force --skip-seed", { stdio: "inherit" });
        console.log("✅ Banco de testes resetado!");})
    }

async function createUserTeste() {
    console.log("🔹 Criando usuário de teste...");
    await prisma.user.create({
        data:{
            "name":"test",
            "senha":"teste123",
            "email":"teste@email.com"
        }
    })
}

after(async function () {
    this.timeout(20000)
    await prisma.$disconnect();
    if(server){
        server.close()
    }
  });
describe('Teste de API Rota User',function() {
    const model = '/user'

    describe('Testes Add',function(){
        resetbanco();

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
        resetbanco();
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
        resetbanco();
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

    describe('Testes Delete',function() {
        resetbanco();
        it('Deve Retornar 200 para a rota DELETE /user/delete/id', async function() {
            this.timeout(10000)
            await createUserTeste();
            const response = await axios.delete(url_base+model+'/delete/1').catch(
                (error) => error.response
            );
            expect(response.status).to.equal(200); 
        })
        it('Deve Retornar 404 para a rota DELETE /user/delete/id', async function() {
            this.timeout(10000)
            const response = await axios.delete(url_base+model+'/delete/2').catch(
                (error) => error.response
            ); 
            expect(response.status).to.equal(404);
        })
    })
    describe('Testes Update',function() {
        resetbanco();
        it('Deve Retornar 200 para a rota PUT /user/update/id', async function() {
            this.timeout(10000)
            await createUserTeste();
            const response = await axios.put(url_base+model+'/update/1',{
                "name":"testUpdated",
                "senha":"teste123Updated",
                "email":"testeUpdated@email.com"
            }).catch(
                (error) => error.response
            );
            expect(response.status).to.equal(200); 
        })
        it('Deve Retornar 404 para a rota PUT /user/update/id', async function() {
            this.timeout(10000)
            const response = await axios.put(url_base+model+'/update/2',{
                "name":"testUpdated",
                "senha":"teste123Updated",
                "email":"testeUpdated@email.com"
            }).catch(
                (error) => error.response
            ); 
            expect(response.status).to.equal(404);
        })
    })
})