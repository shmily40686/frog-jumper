const Background = require('./background.js');
const Player = require('./player')

class Game {
    constructor(ctx, gameCanvas, backgroundCtx, foregroundCtx) {
        this.ctx = ctx;
        this.gameCanvas = gameCanvas;
        this.backgroundCtx = backgroundCtx;
        this.foregroundCtx = foregroundCtx;
        
        this.jump = this.jump.bind(this);
        this.draw = this.draw.bind(this);
        // this.resetGame = this.resetGame.bind(this);

        this.createBackground(backgroundCtx, foregroundCtx);
        this.createPlayer(ctx)

        this.setButtonListeners();
    }

    jump(event) {
        if (event.code === 32 ) {
            event.preventDefault();
            console.log("hi")
            this.player.jump() 
        }
    }

    setButtonListeners() {
        this.gameCanvas.addEventListener('keydown', this.jump);
        // this.gameCanvas.addEventListener('keydown', this.resetGame);
    }

    createBackground(backgroundCtx, foregroundCtx) {
        const backgroundImage = new Image();
        backgroundImage.src = './assets/images/background.png';
        // backgroundImage.src = 'https://freedesignfile.com/upload/2016/03/Grass-with-blue-sky-spring-vectors-01.jpg'
        this.background = new Background(backgroundCtx, backgroundImage, 0, 750, 0.8);

        // const foregroundImage = new Image();
        // foregroundImage.src = './assets/images/grass_bg.png';
        // this.foreground = new Background(foregroundCtx, foregroundImage, 0, 750, 6);
    }

    createPlayer(ctx) {
        const frogImage = new Image()
        frogImage.src = './assets/images/frog.png'
        this.player = new Player(ctx,frogImage,500,5)
    }

    draw() {
        requestAnimationFrame(this.draw);
        this.background.draw();
        this.player.update(this.ctx);
        // this.foreground.draw();
    }

}

module.exports = Game;
