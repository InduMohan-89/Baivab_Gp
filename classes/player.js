class Player{
    constructor(){
        this.name = null;
        this.index = null;
        this.positionY = 150;
        this.health = 100;
        this.ammo = 10;
    }
    readPlayerCount(){
        var playerCountRef = database.ref("playerCount");
        playerCountRef.on("value",(data)=>{
            playerCountValue = data.val();
        })
    }
    writePlayerCount(count){
        database.ref("/").update({
            playerCount: count 
        })
    }
    addPlayer(){
        var playerIndex = "players/player" + this.index;
        database.ref(playerIndex).set({
            name: this.name,
            positionY : this.positionY,
            health : this.health,
            ammo : this.ammo
        })
    }
    static getPlayerInfo(){
        var playerInforRef = database.ref("players")
        playerInforRef.on("value",(data)=>{
            allPlayers = data.val();
        })
    }
    update(){
        var playerIndex = "players/player" + this.index;
        database.ref(playerIndex).update({
            positionY : this.positionY,
            health : this.health,
            ammo : this.ammo
        })
    }
} 