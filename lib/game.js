const Background = require('./background.js');
const Player = require('./player');
const Mushroom = require('./mushroom');

class Game {
    constructor(ctx, gameCanvas, backgroundCtx, foregroundCtx) {
        this.ctx = ctx;
        this.gameCanvas = gameCanvas;
        this.backgroundCtx = backgroundCtx;
        this.foregroundCtx = foregroundCtx;
        this.start = "stop"
        
        this.jump = this.jump.bind(this);
        this.draw = this.draw.bind(this);
        // this.resetGame = this.resetGame.bind(this);

        this.createBackground(backgroundCtx, foregroundCtx);
        this.createPlayer(ctx)
        this.createMushroom(ctx)
        // setInterval(() => {
        //     this.player.selfJump()
        // }, 1500);

        // this.setButtonListeners();
    }

    jump(event) {
        if (event.code === "Space" ) {
            event.preventDefault();
            this.player.performJump()
            this.start = "start"
        }
    }

    // setButtonListeners() {
    //     console.log(this.gameCanvas); 
    //     this.gameCanvas.addEventListener('click', () => console.log('hi')); 
    //     this.gameCanvas.addEventListener('keydown', this.jump);
    //     // window.addEventListener('click', () => console.log('hello'))
    //     // this.gameCanvas.addEventListener('keydown', this.resetGame);
    // }

    createBackground(backgroundCtx, foregroundCtx) {
        const backgroundImage = new Image();
        // backgroundImage.src = './assets/images/sky.jpg';
        backgroundImage.src = './assets/images/background.png';
        // backgroundImage.src = 'https://freedesignfile.com/upload/2016/03/Grass-with-blue-sky-spring-vectors-01.jpg'
        this.background = new Background(backgroundCtx, backgroundImage, 0, 750, 0.8);
        this.preBackground = new Background(backgroundCtx, backgroundImage, 0, 750, 0)

        // const foregroundImage = new Image();
        // foregroundImage.src = './assets/images/grass_bg.png';
        // this.foreground = new Background(foregroundCtx, foregroundImage, 0, 750, 6);
    }

    createPlayer(ctx) {
        const frogImage = new Image()
        frogImage.src = './assets/images/frog.png'
        this.player = new Player(ctx,frogImage,440,5)
    }

    createMushroom(ctx) {
       const mushroomImage = new Image()
       mushroomImage.src = './assets/images/mushroom.png';
       this.mushroom1 = new Mushroom(ctx,mushroomImage,800,440, 4)
       this.mushroom2 = new Mushroom(ctx, mushroomImage, 1200, 440, 4)
    }

    draw() {
        requestAnimationFrame(this.draw);
        if(this.start === "stop") {
            this.preBackground.draw() 
            this.player.draw();
        } else if (this.start === "start") {
            this.background.draw();
            this.player.draw();
            this.mushroom1.draw();
            this.mushroom2.draw(); 
            // calculate was there collision
            //
            // player position
            const player = this.player.getPosition();
            // mushroom positions
            const mushrooms = [
                this.mushroom1.getPosition(),
                this.mushroom2.getPosition(),
            ];

            // .some on [mushrooms] was there collision?
            if (mushrooms.some(mushroom => {
                let spacing = 70;
                let tolerance = 50;

               if (mushroom[0] > player[0] + spacing || player[0] - mushroom[0] >= spacing) {
                   // collision not possible
                   return false;
               } else {
                   // player can collide with mushroom
                   if (mushroom[0] > player[0]) {
                       // Mushroom is to the right, player can run into mushroom or land on it.
                       return mushroom[0] + mushroom[1] < player[0] + player[1] + spacing;
                   } else {
                       // Frog is to the right of the mushroom.
                       return Math.abs(player[0] - mushroom[0]) + Math.abs(player[1] - mushroom[1]) + (tolerance / 8) < spacing;
                   }
               }
            })) {
                // stop
                this.stopPlaying();
            }
        } else if (this.start === "die") {
            return 
        }

    }

    stopPlaying() {
        this.start = "die";
        const cover = document.createElement("div")
        const button = document.createElement("button")
        const dom = document.getElementsByClassName("main-div")[0]
        cover.classList.add("cover-die");
        button.classList.add("cover-die-button");
        button.innerText = "Restart"
        cover.appendChild(button)
        dom.appendChild(cover)

        button.addEventListener("click", () => {
            console.log("dom",dom)
            console.log("cover", cover)
            dom.removeChild(cover)
            this.start = "start"
        })
    }
}

module.exports = Game;
