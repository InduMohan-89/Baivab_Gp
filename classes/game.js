class Game{
    constructor(){
        this.reset = createButton("Reset");
    }
    readGameState(){
        var gameStateRef = database.ref("gameState");
        gameStateRef.on("value",(data)=>{
            gameStateValue = data.val()
        });
    }
    start(){
        playerObj = new Player();
        playerObj.readPlayerCount();

        player = createSprite(50,150);
        player.addImage("player",playerImg);
        player.scale = 0.06;

        enemy = createSprite(450,150);
        enemy.addImage("enemy",enemyImg);
        enemy.scale = 0.3;

        playersArray = [player,enemy];  
        
        laserGroup = new Group();


        var laserPositions = [
            { x: width / 2 + 25, y: height-100, image: laserImg },
            { x: width / 2 + 25, y: height - 100, image: laser2Img },
            
          ];

          
         
         
    }

    addLaser(positions = []){
        var x, y, img;
        for (var i = 0; i<2; i++){
            x = positions[i].x;
            y = positions[i].y;
            img = positions[i].image;

            var sprite = createSprite(x,y);
            sprite.addImage(img);
            sprite.velocityX = -3;
        }
    }
    update(state){
     database.ref("/").update({
         gameState : state
     })   
    }
    handleElements(){
        this.reset.position(width-60,10);
        formObj.hide();
    }
    handleResetButton(){
        this.reset.mousePressed(()=>{
            database.ref("/").update({
                gameState : 0,
                playerCount : 0 , 
                players : [] ,
                lasersE : [],
                lasersP:[]
            })
            window.location.reload();
        })
    }
    handlePlayerControls(){
        if(keyIsDown(UP_ARROW)){ 
            playerObj.positionY = playerObj.positionY-10;
            playerObj.update();
        }
        if(keyIsDown(DOWN_ARROW)){ 
            playerObj.positionY = playerObj.positionY+10;
            playerObj.update();
        }
    }

    handlePlayerAttacks(){
        if(playerObj.index === 1){
            var countP = 0;
           
            if(keyWentDown("space")){
                this.playerAttack(55,playerObj.positionY,3,laserImg,11);
                countP = countP+1;
                this.laserPositionUpdateP(countP);
                
            }

        }
        else{
            var countE = 0;
            if(keyWentDown("space")){
                this.playerAttack(445,playerObj.positionY,-3,laser2Img,2);
                countE = countE+1;
                console.log(countE);
                this.laserPositionUpdateE(countE);
            }
        }
    }
    laserPositionUpdateP(count){
       
        var laserRef = database.ref('lasersP/laser'+count+'/');
        laserRef.update({
            x:55,
            y:playerObj.positionY,
           
        });

    }
    laserPositionUpdateE(count){
        var laserRef = database.ref('lasersE/laser'+count+'/');
        laserRef.update({
            x:455,
            y:playerObj.positionY,
            
        })
    }
    displayPlayerHealth(){
         if(playerObj.index === 1){
            push();
            fill("red");
            stroke("black");
            rect(440,playersArray[1].position.y-35,50,5);
            fill("green");
            rect(440,playersArray[1].position.y-35,playerObj.health/2,5);
            pop();
        }
        else{
            push();
            fill("red");
            stroke("black");
            rect(40,playersArray[0].position.y-35,50,5);
            fill("green");
            rect(40,playersArray[0].position.y-35,playerObj.health/2,5);
            pop();
        }
    }
    handleAttack(){

    }


    playerAttack(x,y,v,img,index){
        var laser = createSprite(x,y,10,10)
        laser.velocityX = v;
        laser.scale = 0.1;
        laser.y = y;
        laser.addImage("playerLaser",img);
        laserGroup.add(laser);
    }
    handleAttackCollision(index){
        if(index === 1){
            playersArray[1].overlap(laserGroup,function(collector,collected){
            collected.remove();
                console.log("test");
                playerObj.health = playerObj.health - 10;
        })}
        else{
            playersArray[0].overlap(laserGroup,function(collector,collected){
                collected.remove();
                console.log("test1");
                playerObj.health = playerObj.health - 10;
            })
        }
    }

//        displayEnemyHealth(){
//            if(playerObj.index === 2){
//               push();
//               fill("white");
//               rect(440,playerObj.positionY-35,50,5);
//               fill("green");
//               rect(440,playerObj.positionY-35,playerObj.health/2,5);
//               pop();
//           }
//    }
    play(){
        this.handleElements();
        this.handleResetButton();
        Player.getPlayerInfo();
        if(allPlayers !== undefined){
            var index  = 0;
            for(var plr in allPlayers ){
                index = index + 1;
                var y = allPlayers[plr].positionY;
                playersArray[index-1].position.y = y;
                this.handlePlayerAttacks();
                if(index === playerObj.index){
                    this.displayPlayerHealth();
                    this.handleAttackCollision(index);
//                    this.displayEnemyHealth();
                }
            }
            this.handlePlayerControls();
            drawSprites();
        }
    }

}