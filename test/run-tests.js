const { exec } = require("child_process");
const testFiles = ["test/rotas/auth.test.ts","test/rotas/user.test.ts","test/rotas/table.test.ts", "test/rotas/token.test.ts", "test/rotas/canvas.test.ts"];

function runTests(index = 0) {
  if (index >= testFiles.length) return; // Se todos os testes rodaram, sair

  console.log(`Executando: ${testFiles[index]}`);
  exec(`npx mocha --time-out 20000 --require tsx ${testFiles[index]}`, (error, stdout, stderr) => {
    console.log(stdout);
    if (error) {
      console.error(`Erro no teste ${testFiles[index]}:\n`, stderr);
      return;
    }
    runTests(index + 1); // Chama o próximo teste
  });
}

runTests();