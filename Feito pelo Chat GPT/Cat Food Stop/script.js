// Seleciona elementos do DOM
const jogo = document.getElementById("jogo");
const btnJogar = document.getElementById("btn-jogar");
const btnReiniciar = document.getElementById("btn-reiniciar");
const placar1 = document.getElementById("placar1");
const placar2 = document.getElementById("placar2");
const jogador1 = document.getElementById("jogador1");
const jogador2 = document.getElementById("jogador2");

// Cria os elementos dos pássaros
const passaro1 = document.createElement("div");
passaro1.classList.add("passaro");
passaro1.id = "passaro1";
passaro1.style.left = "150px";

const passaro2 = document.createElement("div");
passaro2.classList.add("passaro");
passaro2.id = "passaro2";
passaro2.style.left = "750px";

// Adiciona os pássaros ao jogo
jogo.appendChild(passaro1);
jogo.appendChild(passaro2);

// Define a posição vertical inicial dos pássaros
let altura1 = 250;
let altura2 = 250;
passaro1.style.bottom = altura1 + "px";
passaro2.style.bottom = altura2 + "px";

// Define a velocidade de movimentação dos pássaros
let velocidade1 = 0;
let velocidade2 = 0;

// Define o placar inicial dos jogadores
let pontos1 = 0;
let pontos2 = 0;
placar1.innerHTML = pontos1;
placar2.innerHTML = pontos2;

// Define a função para atualizar o placar dos jogadores
function atualizarPlacar() {
  placar1.innerHTML = pontos1;
  placar2.innerHTML = pontos2;
}

// Define a função para mover o pássaro 1
function moverPassaro1() {
  altura1 += velocidade1;
  velocidade1 += 2;
  passaro1.style.bottom = altura1 + "px";
}

// Define a função para mover o pássaro 2
function moverPassaro2() {
  altura2 += velocidade2;
  velocidade2 += 2;
  passaro2.style.bottom = altura2 + "px";
}

// Define a função para checar a colisão entre os pássaros
function checarColisao() {
  const retangulo1 = passaro1.getBoundingClientRect();
  const retangulo2 = passaro2.getBoundingClientRect();

  if (
    retangulo1.right >= retangulo2.left &&
    retangulo1.left <= retangulo2.right &&
    retangulo1.bottom >= retangulo2.top &&
    retangulo1.top <= retangulo2.bottom
  ) {
    colisao();
  }
}

// Define a função para quando houver colisão
function colisao() {
  if (altura1 > altura2) {
    pontos1++;
    atualizarPlacar();
    alert("O passaro 1 acertou o passaro 2!");
  } else {
    pontos2++;
    atualizarPlacar();
    alert("O passaro 2 acertou o passaro 1!");
  }
  reiniciarJogo();
}

// Define a função para reiniciar o jogo
function reiniciarJogo() {
    // Reseta as variáveis do jogo
    pombo1 = new Pombo(100, 200, 10, "orange", 38, 40, 37, 39);
    pombo2 = new Pombo(500, 200, 10, "brown", 87, 83, 65, 68);
    fezesPombo1 = [];
    fezesPombo2 = [];
    pontosPombo1 = 0;
    pontosPombo2 = 0;
  
    // Limpa o canvas e desenha os pomobos e a pontuação inicial
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pombo1.desenhar();
    pombo2.desenhar();
    desenharPontuacao();
  }
  
  // Define a função para desenhar a pontuação na tela
  function desenharPontuacao() {
    ctx.font = "20px Arial";
    ctx.fillStyle = "black";
    ctx.fillText(`Pombo 1: ${pontosPombo1} pontos`, 10, 30);
    ctx.fillText(`Pombo 2: ${pontosPombo2} pontos`, canvas.width - 170, 30);
  }
  
  // Define a função para desenhar as fezes
  function desenharFezes() {
    fezesPombo1.forEach((fezes) => {
      fezes.desenhar();
    });
    fezesPombo2.forEach((fezes) => {
      fezes.desenhar();
    });
  }
  
  // Define a função para atualizar a posição das fezes
  function atualizarFezes() {
    fezesPombo1.forEach((fezes) => {
      fezes.atualizar();
    });
    fezesPombo2.forEach((fezes) => {
      fezes.atualizar();
    });
  }
  
  // Define a função para verificar colisões das fezes com os pomobos
  function verificarColisaoFezes() {
    fezesPombo1.forEach((fezes, index) => {
      if (fezes.verificarColisao(pombo2)) {
        fezesPombo1.splice(index, 1);
        pontosPombo2++;
      }
    });
    fezesPombo2.forEach((fezes, index) => {
      if (fezes.verificarColisao(pombo1)) {
        fezesPombo2.splice(index, 1);
        pontosPombo1++;
      }
    });
  }
  
  // Define a função para atualizar o jogo
  function atualizar() {
    atualizarFezes();
    verificarColisaoFezes();
    desenharFezes();
    desenharPontuacao();
    pombo1.atualizar();
    pombo2.atualizar();
  }
  
  // Define a função para animar o jogo
  function animar() {
    requestAnimationFrame(animar);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    atualizar();
  }
  
// Define o tamanho do canvas
const canvasWidth = 800;
const canvasHeight = 600;

// Define as teclas do teclado
const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;

// Define o objeto Pombo
class Pombo {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
    this.velocity = 5;
    this.image = new Image();
    this.image.src = "https://i.imgur.com/8bqmL46.png";
  }

  draw(ctx) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  moveLeft() {
    this.x -= this.velocity;
  }

  moveUp() {
    this.y -= this.velocity;
  }

  moveRight() {
    this.x += this.velocity;
  }

  moveDown() {
    this.y += this.velocity;
  }
}

// Define o objeto Fezes
class Fezes {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 30;
    this.height = 30;
    this.velocity = 10;
    this.image = new Image();
    this.image.src = "https://i.imgur.com/7YGMmJh.png";
  }

  draw(ctx) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  moveLeft() {
    this.x -= this.velocity;
  }

  moveRight() {
    this.x += this.velocity;
  }

  moveDown() {
    this.y += this.velocity;
  }
}

// Define o objeto Jogo
class Jogo {
  constructor(canvas, canvasWidth, canvasHeight) {
    this.canvas = canvas;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.ctx = this.canvas.getContext("2d");
    this.pombo1 = new Pombo(50, 50);
    this.pombo2 = new Pombo(700, 500);
    this.feze1 = new Fezes(-100, -100);
    this.feze2 = new Fezes(-100, -100);
    this.pombo1Score = 0;
    this.pombo2Score = 0;
    this.gameOver = false;
    this.keyPressed = {};
  }
}

  // Cria os objetos Pombo e inicia o jogo
  const game = new Game();
  game.start();