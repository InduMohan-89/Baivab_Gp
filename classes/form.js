class Form {
    constructor(){
     this.input = createInput("").attribute("placeholder","Enter your name");
     this.playbutton = createButton("Play"); 
     this.messageText = createElement("h2") 
     this.title = createImg("images/title.png","gameTitle");
    }
    setELementPosition(){
        this.input.position(130,140);
        this.playbutton.position(180,190);
        this.messageText.position(70,120);
        this.title.position(17,50);
    }
    setElementStyle(){
        this.input.class("inputBoxStyle");
        this.playbutton.class("playbuttonStyle");
        this.messageText.class("messageStyle");
        this.title.class("titleStyle");
    }
    handleButtonPressed(){
        this.playbutton.mousePressed(()=>{
            this.input.hide();
            this.playbutton.hide();
            this.title.hide();
            playerCountValue = playerCountValue + 1;
            playerObj.writePlayerCount(playerCountValue);
            playerObj.name = this.input.value();
            playerObj.index = playerCountValue;
            console.log(playerCountValue);
            var message = `Hello ${this.input.value()} </br> wait for another player to join`;
            this.messageText.html(message);

            playerObj.addPlayer();
        })
    }
    hide(){
        this.messageText.hide();
    }
    display(){
        this.setELementPosition();
        this.setElementStyle();
        this.handleButtonPressed();
    }
}