
import { execSync } from "child_process";
import axios from 'axios'
import { expect } from "chai";
import { app, prisma } from "../../src/main/app";
import { Server } from "http";
import { it } from "mocha";

var url_base = ''
let server: Server;

before(async function () {
    //BD de Testes
    process.env.PORT = '4001'
    process.env.DATABASE_URL = "postgresql://postgres:ProjetoWeb777@db.bzbphfxgkdubddvmkgyu.supabase.co:5432/postgres"
    
    server = app.listen(process.env.PORT, () => {
      console.log(`🚀 Aplicação de testes rodando na porta ${process.env.PORT}`);
    });
  
    url_base = 'http://localhost:'+process.env.PORT
    console.log(url_base)
    this.timeout(20000);
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