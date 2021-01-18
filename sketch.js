
var PLAY=1;
var END=0;
var gameState=1;

var sword,fruit ,monster,fruitGroup,enemyGroup, score,r,randomFruit;
var swordImage , fruit1, fruit2 ,fruit3,fruit4, monsterImage, gameOverImage
var swordSound , gameOverSound

function preload(){
  
  swordImage = loadImage("sword.png");
  monsterImage = loadAnimation("alien1.png","alien2.png")
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  gameOverImage = loadImage("gameover.png")
  swordSound=loadSound("knifeSwooshSound.mp3")
  gameOverSound=loadSound("gameover.mp3")
}



function setup() {
  createCanvas(600, 600);
  
  
   sword=createSprite(40,200,20,20);
   sword.addImage(swordImage);//adds the image for the sword
   sword.scale=0.7//scales the size of the sword
  
  
  score=0;
  fruitGroup=createGroup();
  enemyGroup=createGroup();
  
}

function draw() {
  background("lightgreen");//sets the background colour
  
  if(gameState===PLAY){
    
   
    fruits();
    Enemy();
    
    
    sword.y=World.mouseY;
    sword.x=World.mouseX;
  
  
    if(fruitGroup.isTouching(sword)){
      fruitGroup.destroyEach();// destroys the fruits
      score=score+2;
      swordSound.play();//plays the sound of the sword when it hits the fruit
      
    }
    else
    {
    
      if(enemyGroup.isTouching(sword)){
        gameState=END;
        
        fruitGroup.destroyEach();
        enemyGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        enemyGroup.setVelocityXEach(0);
        gameOverSound.play();//plays the sound of game over 
    
        sword.addImage(gameOverImage);//adds the image of gameover instead of the sword
        sword.x=200;
        sword.y=200;
      }
    }
  }
  
  drawSprites();
  
  fill("red");
  textSize(15)// for displaying the score
  text("Points : "+ score,520,30);
   
  fill ("purple");
  textSize(30)
  text ("FRUIT NINJA",225,35)// for displaying the name of the game
  
} 


function Enemy(){
  if(World.frameCount%200===0){
    monster=createSprite(400,200,20,20);
    monster.addAnimation("moving", monsterImage);//animation of the monster
    monster.y=Math.round(random(100,300));
    monster.velocityX=-(8+(score/10));
    monster.setLifetime=50;// sets lifetime of the monster to avoid a memory leak
    
    enemyGroup.add(monster);
  }
}

function fruits(){
  if(World.frameCount%80===0){
    var position= Math.round(random(1,2))//generates a random number for the position of the fruits
    fruit=createSprite(400,200,20,20);
    if(position===1){
      fruit.x=0
      fruit.velocityX=7+(score/4)
    }
    else{
      fruit.x=400
      fruit.velocityX=-(7+(score/4))
      
    }
    
    fruit.scale=0.2;
     //fruit.debug=true;
     r=Math.round(random(1,4));
    if (r == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }
    
    fruit.y=Math.round(random(50,340));
   
    //fruit.velocityX=-7;
    fruit.setLifetime=100;//sets lifetime of the fruit to avoid memory leak
    
    fruitGroup.add(fruit);
  }
}