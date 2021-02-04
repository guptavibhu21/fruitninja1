var PLAY = 1;
var END = 2;
var gameState = 1;
var knife;
var score = 0;
var fruitsGroup;
var enemyGroup;
var gameover;
var gameoverimage;
var fruit1;
var fruit2;
var fruit3;
var fruit4;
var enemy1;
var enemy2;
var fruit1image;
var fruit2image;
var fruit3image;
var fruit4image;
var enemy1image;
var enemy2image;
var knifeimage;
var r;
var fruit;
var enemy;



function preload() {
  knifeimage = loadImage("sword.png");
  gameoverimage = loadImage("gameover.png");
  fruit1image = loadImage("fruit1.png");
  fruit2image = loadImage("fruit2.png");
  fruit3image = loadImage("fruit3.png");
  fruit4image = loadImage("fruit4.png");
  enemy1image = loadImage("alien1.png");
  enemy2image = loadImage("alien2.png");
  knifeSwooshSound = loadSound("knifeSwooshSound.mp3")
  gameOverSound = loadSound("gameover.mp3")
}

function setup() {
  createCanvas(600, 400);
  knife = createSprite(40, 200, 20, 20);
  knife.addImage("moving", knifeimage);
  knife.scale = 0.7;
  knife.setCollider("rectangle", 0, 0, 40, 40);
  //knife.debug = true;
  gameover = createSprite(295, 200, 20, 20);
  gameover.addImage("stop", gameoverimage);
  gameover.scale = 2.5;

  fruitsGroup = createGroup();
  enemyGroup = createGroup();
}

function draw() {
  background("lightblue");

  if (gameState === PLAY) {
    knife.y = World.mouseY;
    knife.x = World.mouseX;
    gameover.visible = false;
  } else if (gameState === END) {
    knife.visible = false;
    fruitsGroup.destroyEach();
    enemyGroup.destroyEach();
    fruitsGroup.setVelocityXEach(0);
    enemyGroup.setVelocityXEach(0);
    //knife.addImage("stop",gameoverimage);
    knife.x = 200;
    knife.y = 200;
    gameover.visible = true;
    fruitsGroup.visible = false;
    enemyGroup.visible = false;
    enemyGroup.setLifetimeEach = 0;
    fruitsGroup.lifetimeEach = 0;
  }
  fruits();
  alien();
  if (fruitsGroup.isTouching(knife)) {
    fruitsGroup.destroyEach();
    score = score + 2;
    knifeSwooshSound.play();

  }
  if (knife.isTouching(enemyGroup)) {
    gameState = END;
    gameOverSound.play();
  }

  drawSprites();

  text("Score :- " + score, 280, 30);
}

function fruits() {
  if (World.frameCount % 80 === 0)

  {
    position = Math.round(random(1, 2));
    fruit = createSprite(400, 200, 20, 20);
    if (position == 1) {
      fruit.x = 400;
      fruit.velocityX = -(7 + (score / 4));
    } else {
      if (position == 2) {
        fruit.x = 0; //Increase the velocity of fruit after score 4 or 10 
        fruit.velocityX= (7+(score/4)); } }
        fruit.scale = 0.2;
        fruit.debug = true;
      
        r = Math.round(random(1, 4));
        if (r === 1) {
          fruit.addImage(fruit1image);

        } else if (r === 2) {
          fruit.addImage(fruit2image);

        } else if (r === 3) {
          fruit.addImage(fruit3image);

        } else if (r === 4) {
          fruit.addImage(fruit4image);

        }

        fruit.y = Math.round(random(50, 340));
        fruit.velocityX = -(7 + score / 5);


        fruitsGroup.add(fruit);
      }
    }

    function alien() {
      if (World.frameCount % 200 === 0) {
        var enemy = createSprite(400, 200, 20, 20);
        enemy.addImage("moving", enemy2image);
        enemy.y = Math.round(random(100, 300));
        enemy.velocityX = -(8 + score / 3);
        enemy.setLifetime = 50;

        enemyGroup.add(enemy);

      }
    }