# Projeto-web-2024.2
Salas com canvas compartilhados para jogar RPG.

# Objetos 

## Usuários
Cada usuário participa de varias salas, nessas salas ele pode ser Mestre(Admin) ou Jogador(Convidado) 

## Salas / Mesas 
Cada sala com seus participantes, possui N canvas 

## Canvas
Telas de desenho com grid integrado e uma imagem de fundo (mapas),
todos os participantes podem desenhar no canvas e apagar seus próprios desenhos(mestre pode apagar desenho de outros)

## Desenhos
Todo desenhor é um objeto próprio e pode ser apagado separadamente de outros desenhos.

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
## Back: Node e Typescript
## Front: Angular
## Banco de Dados: PostGreSQL

# Requisitos 
### Login com conta google

### Como usuário (Mestre) eu posso criar uma mesa

### Como usuário (Jogador) posso convidar pessoas para a mesa

### Como usuário queor vizualizar o mapa da sala 

### Como usuário quero desenhar no mapa e os outros deve conseguir ver

### Apagar os desenhos devem poder apagados pelo usuátio que os criou ou pelo mestre da mesa

### d
