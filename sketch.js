var fighter, asteroid, bg;
var fighterAn, blastAn, coinAn;
var obstacleGrp, bullet, obstacle;
var lives = 3
var PLAY = 1
var END = 2
var score = 0
var gamestate = PLAY

function preload() {
  bg = loadImage("Images/gamingbackground1.jpg")
  fighterAn = loadAnimation("Images/sp1.png", "Images/sp2.png", "Images/sp3.png", "Images/sp4.png", "Images/sp5.png")
  blastAn = loadAnimation("Images/ex1.png", "Images/ex2.png", "Images/ex3.png", "Images/ex4.png", "Images/ex5.png", "Images/ex6.png", "Images/ex7.png", "Images/ex8.png", "Images/ex9.png", "Images/ex10.png", "Images/ex11.png", "Images/ex12.png", "Images/ex13.png", "Images/ex14.png", "Images/ex15.png", "Images/ex16.png")
  coinAn = loadAnimation("Images/c1.png", "Images/c2.png", "Images/c3.png", "Images/c4.png", "Images/c5.png", "Images/c6.png")
  alienImg = loadImage("Images/alien.png")
  ast1Img = loadImage("Images/asteroid1.gif")
  ast2Img = loadImage("Images/asteroid2.1.gif")
  earthImg = loadImage("Images/earth.gif")
  spaceshipImg = loadImage("Images/Spaceship2.png")
  lifeImg = loadImage("Images/life.png")
  gobg = loadImage("Images/gobg.jpg")
  bulletImg = loadImage("Images/bullet.png")
}
function setup() {
  createCanvas(800, 1000);
  fighter = createSprite(400, 900);
  fighter.addAnimation("fighterAni", fighterAn);
  fighter.setCollider("rectangle", 0, 0, 80, 120)
  life1 = createSprite(50, 50, 50, 50)
  life1.addImage(lifeImg);
  life1.scale = 0.2
  life2 = createSprite(100, 50, 50, 50)
  life2.addImage(lifeImg);
  life2.scale = 0.2
  life3 = createSprite(150, 50, 50, 50)
  life3.addImage(lifeImg);
  life3.scale = 0.2

  obstacleGrp = new Group()
  gobstacleGrp = new Group()
  bulletGroup = new Group()
  coinGrp = new Group()



}

function draw() {
  background(bg);
  //bullet keys
  if (gamestate === PLAY) {
    if (keyWentDown("SPACE")) {
      bullets()
    }
    if (keyDown("RIGHT_ARROW")) {
      fighter.x = fighter.x + 9
    }
    if (keyDown("LEFT_ARROW")) {
      fighter.x = fighter.x - 9
    }
    //life deduction
    for (var i = 0; i < obstacleGrp.length; i++) {
      if (obstacleGrp.get(i).isTouching(fighter)) {
        lives = lives - 1
        obstacleGrp.get(i).destroy();
      }
    }
    for (var i = 0; i < gobstacleGrp.length; i++) {
      if (gobstacleGrp.get(i).isTouching(fighter)) {
        lives = lives - 1
        gobstacleGrp.get(i).destroy();
      }

    }
    for (var i = 0; i < coinGrp.length; i++) {
      if (coinGrp.get(i).isTouching(fighter)) {
        score = score + 5
        coinGrp.get(i).destroy();
      }
    }
    for (var i = 0; i < obstacleGrp.length; i++) {
      if (obstacleGrp.get(i).isTouching(bulletGroup)) {
        score = score + 1
        bulletGroup.get(i).destroy();
        obstacleGrp.get(i).destroy();
      }
    }
    for (var i = 0; i < gobstacleGrp.length; i++) {
      if (gobstacleGrp.get(i).isTouching(bulletGroup)) {
        lives = lives - 1
        bulletGroup.get(i).destroy();
        gobstacleGrp.get(i).destroy();
      }
    }
    fill("red")
    strokeWeight(10)
    stroke("blue")
    textSize(40)
    text("SCORE: " + score, 550, 60)
    Spawnobstacle();
    Spawnearth();
    Spawncoin();

  }
  if (lives === 2) {
    life3.visible = false
  }
  if (lives === 1) {
    life2.visible = false
  }
  if (lives === 0) {
    life1.visible = false
    gamestate = END
  }
  // if (obstacle.y > 1000) {
    // lives = lives - 1
  // }
  if (gamestate === END) {
    obstacle.velocityY = 0
    obstacleGrp.destroyEach()
    gobstacleGrp.destroyEach()
    coinGrp.destroyEach()
    background(gobg)
    fighter.visible = false
    bulletGroup.visible = false
  }

  console.log(gamestate)
  console.log(frameCount)
  drawSprites();
}
function Spawnobstacle() {

  if (frameCount % 100 === 0) {

    obstacle = createSprite(Math.round(random(100, 700)), 0, 20, 20)
    obstacle.velocityY = 4
    var ran = Math.round(random(1, 4))

    switch (ran) {
      case 1: obstacle.addImage(alienImg)
        break;

      case 2: obstacle.addImage(ast1Img)
        break;


      case 3: obstacle.addImage(ast2Img)
        break;

      case 4: obstacle.addImage(spaceshipImg)
        break;

      default: break;
    }
    obstacle.scale = 0.5
    obstacle.lifetime = 420
    obstacleGrp.add(obstacle)
  }

}
function Spawnearth() {

  if (frameCount % 140 === 0) {

    gobstacle = createSprite(Math.round(random(100, 700)), 0, 20, 20)
    gobstacle.setCollider("circle", 0, 0, 90)
    gobstacle.velocityY = 4
    var ran = Math.round(random(1, 4))

    switch (ran) {
      case 1: gobstacle.addImage(earthImg)
        break;

      case 2: gobstacle.addImage(earthImg)
        break;


      case 3: gobstacle.addImage(earthImg)
        break;

      case 4: gobstacle.addImage(earthImg)
        break;

      default: break;
    }
    gobstacle.scale = 0.5
    gobstacle.lifetime = 420
    gobstacleGrp.add(gobstacle)
  }
}
function bullets() {

  bullet = createSprite(1000, 1000)
  bullet.y = fighter.y
  bullet.x = fighter.x
  bullet.addImage(bulletImg)
  bullet.scale = 0.125
  bullet.lifetime = 200
  bullet.velocityY = -40
  bulletGroup.add(bullet)
}
function Spawncoin() {

  if (frameCount % 300 === 0) {

    coin = createSprite(Math.round(random(100, 700)), 0, 20, 20)
    coin.setCollider("circle", 0, 0, 40)
    coin.velocityY = 6
    var ran = Math.round(random(1, 4))

    switch (ran) {
      case 1: coin.addAnimation("coinAnimation", coinAn)
        break;

      case 2: coin.addAnimation("coinAnimation", coinAn)
        break;


      case 3: coin.addAnimation("coinAnimation", coinAn)
        break;

      case 4: coin.addAnimation("coinAnimation", coinAn)
        break;

      default: break;
    }
    coin.scale = 1.5
    coin.lifetime = 420
    coinGrp.add(coin)
  }
}