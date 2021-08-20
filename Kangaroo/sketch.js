/*--------------------------------------------------------*/
var PLAY = 1;
var END = 0;
var WIN = 2;
var gameState = PLAY;
var kangaroo
var invisableGround;
var obstacle;
var shrub;
var trex, trex_running, trex_collided;
var jungle, invisiblejungle;

var obstaclesGroup, obstacle1;
var shrubsGroup;
var shrubs;
var score=0;

var gameOver, restart;

function preload(){
  kangaroo_running = loadAnimation("assets/kangaroo1.png","assets/kangaroo2.png","assets/kangaroo3.png");
  kangaroo_collided = loadAnimation("assets/kangaroo1.png");
  jungleImage = loadImage("assets/bg.png");
  shrub1 = loadImage("assets/shrub1.png");
  shrub2 = loadImage("assets/shrub2.png");
  shrub3 = loadImage("assets/shrub3.png");
  obstacle1 = loadImage("assets/stone.png");
  gameOverImg = loadImage("assets/gameOver.png");
  restartImg = loadImage("assets/restart.png");
  jumpSound = loadSound("assets/jump.wav");
  collidedSound = loadSound("assets/collided.wav");
 
}

function setup() {
  createCanvas(800, 400);

  jungle = createSprite(400,100,400,20);
  jungle.addImage("jungle",jungleImage);
  jungle.scale=0.3
  jungle.x = width /2;
  kangaroo = createSprite(50,200,20,50)
  kangaroo.addAnimation("running",kangaroo_running)
  kangaroo.addAnimation("collided",kangaroo_collided)
  kangaroo.scale = 0.15
  kangaroo.setCollider("circle",0,0,300)
  invisableGround = createSprite(400,350,1600,10)
  invisableGround.visible = false;
  shrubsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;

}

function draw() {
  background(255);
  kangaroo.x=camera.position.x-270;


  drawSprites();
if(gameState == PLAY){
  jungle.velocityX = -3
  if(jungle.x < 100){
jungle.x = 400
  }
console.log(kangaroo.y)
if(keyDown("space")&& kangaroo.y > 270){
jumpSound.play()
kangaroo.velocityY = -16
}
kangaroo.velocityY = kangaroo.velocityY + 0.8
spawnShrubs()
spawnObsticales()
kangaroo.collide(invisableGround)
if(obstaclesGroup.isTouching(kangaroo)){
collidedSound.play()
gameState = END 

}
if(shrubsGroup.isTouching(kangaroo))
{
shrubsGroup.destroyEach()
}
}
else if(gameState == END)
{
kangaroo.velocityY = 0;
jungle.velocityY = 0;
obstaclesGroup.setVelocityXEach(0)
shrubsGroup.setVelocityXEach(0)
obstaclesGroup.setLifetimeEach(-1)
shrubsGroup.setLifetimeEach(-1)
}
}
function spawnShrubs(){
  if(frameCount%150==0)
  {
    shrub = createSprite(500,330,40,10)
shrub.velocityX = -6
shrub.scale = 0.6
var rand = Math.round(random(1,3))
switch(rand)
{
  case 1: 
  shrub.addImage(shrub1)
  break 
  case 2:
    shrub.addImage(shrub2)
    break
    case 3:
      shrub.addImage(shrub3)
      break
      default:
        break
}
shrub.scale = 0.05
shrub.lifetime = 400
shrub.setCollider("rectangle",0,0,shrub.width/2,shrub.height/2)
shrubsGroup.add(shrub)
  }
}

function spawnObsticales()
{
  if(frameCount%120==0)
  {
    obstacle = createSprite(400,330,40,40)
obstacle.setCollider("rectangle",0,0,200,200)
obstacle.addImage(obstacle1)
obstacle.velocityX = -6
obstacle.scale = 0.15
obstacle.lifeTime = 400
obstaclesGroup.add(obstacle)
  }
}