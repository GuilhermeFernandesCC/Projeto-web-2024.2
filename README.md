# Projeto-web-2024.2
Salas com canvas compartilhados para jogar RPG.
# Documentação Swagger
http://localhost:3000/api-docs

## Run project

### Instalar Dependências
npm install

### Run Migration 
npx prisma migrate dev  init OBS: Supabase meio instável no plano básico talvez uma ou duas tentativas seja necessária

### Run
npm run dev

# Objetos 

## Usuários
Cada usuário participa de varias salas, nessas salas ele pode ser Mestre(Admin) ou Jogador(Convidado) 

## Salas / Mesas 
Cada sala com seus participantes, possui N canvas 

## Canvas
Telas de desenho com grid integrado e uma imagem de fundo (mapas),
todos os participantes podem desenhar no canvas e apagar seus próprios desenhos(mestre pode apagar desenho de outros)

## Tokens
Representa o jogador no mapa (Herda imagem do usuário)

# Funcionalidades
## Régua 
Para medição dentro do grid do canvas.
## Upload de imagens 
Para plano de fundo dos canvas. (PNG 24bit color - 8bit transparency)
## Alinhamento de grid 
Se imagem já tiver grid, essa ferramenta permite alinhas os grid para melhor uso.

# Tecnologias planejadas 
## Login: Utiliza conta google exclusivamente (OAuth2) 
## Back: Node.js Com express e Typescript
## Front: Angular
## Banco de Dados: PostGreSQL (Supabase)
## Conexão com Banco: Prisma

# Requisitos 
### Login com conta google

### Como usuário (Mestre) eu posso criar uma mesa

### Como usuário (Jogador) posso convidar pessoas para a mesa

### Como usuário queor vizualizar o mapa da sala 

### Como usuário quero desenhar no mapa e os outros deve conseguir ver

### Apagar os desenhos devem poder apagados pelo usuátio que os criou ou pelo mestre da mesa

