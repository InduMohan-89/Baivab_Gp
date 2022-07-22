var spaceImg;
var gameStateValue = 0
var playerCountValue = 0;
var gameObj,formObj,playerObj;
var playerImg,enemyImg;
var player,enemy;
var playersArray = [];
var allPlayers = [];
var laserImg;
var laser2Img;
var laserGroup;

function preload(){
  spaceImg = loadImage("images/space.png");
  playerImg = loadImage("images/player.png");
  enemyImg = loadImage("images/enemy.png");
  laserImg = loadImage("images/laser.png");
  laser2Img = loadImage("images/laser2.png");
}

function setup() {
  createCanvas(500, 300);
  database = firebase.database();
  formObj = new Form();
  gameObj = new Game();
  gameObj.readGameState();
  gameObj.start();
}

function draw() {
  background(spaceImg); 
  formObj.display();

  if(playerCountValue === 2){
    gameObj.update(1);
  }
  if(gameStateValue === 1){
    gameObj.play();
  }
}