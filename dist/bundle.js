/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(1);

document.addEventListener('DOMContentLoaded', () => {
    const gameCanvas = document.getElementById('game-canvas');
    const gameCanvasContext = gameCanvas.getContext('2d');

    const backgroundCanvas = document.getElementById('background-canvas');
    const backgroundCanvasContext = backgroundCanvas.getContext('2d');

    const foregroundCanvas = document.getElementById('foreground-canvas');
    const foregroundCanvasContext = foregroundCanvas.getContext('2d');

    const game = new Game(
        gameCanvasContext,
        gameCanvas,
        backgroundCanvasContext,
        foregroundCanvasContext);
    
    game.draw();
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Background = __webpack_require__(2);
const Player = __webpack_require__(3)

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


/***/ }),
/* 2 */
/***/ (function(module, exports) {

class Background {
    constructor(ctx, image, posY, imageLength, speed) {
        this.image = image;
        this.speed = speed;
        this.x = 0;
        this.y = posY;
        this.imageLength = imageLength;
        this.ctx = ctx;
    }

    draw() {
        this.ctx.clearRect(0, 0, 800, 600);
        // this.image.width = 100
        // this.image.height = 100
        this.ctx.drawImage(this.image, this.x, this.y, 820, 600);
        this.ctx.drawImage(this.image, this.x + this.imageLength, this.y, 820, 600);
        this.ctx.drawImage(this.image, this.x + this.imageLength * 2, this.y, 820, 600);
        if (this.x <= -this.imageLength) {
            this.x = 0;
        }
        this.scrollImage();
    }

    scrollImage() {
        this.x -= this.speed;
    }

}

module.exports = Background;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

class Player {
    constructor(ctx, image, posY,speed) {
        this.ctx = ctx;
        this.image = image;
        this.speed = speed;
        this.isJump = true
        this.x = 0;
        this.y = posY;
        this.jumping = false;
        this.jumpCount = 0;
        this.position = [100,100];

        this.update = this.update.bind(this);
        this.jump = this.jump.bind(this);

    }

    draw(ctx) {
        this.ctx.clearRect(0, 0, 800, 600);
        this.ctx.drawImage(this.image, this.x, this.y, this.position[0], this.position[1]);
        setInterval(() => {
            this.jumpImage();
            this.isJump = !this.isJump
        },1000)
        this.walkImage()
    }

    walkImage() {
        this.x += 0.1
    }

    jumpImage() {
        if (this.isJump) {
            this.y -= this.speed;
        } else {
            this.y += this.speed;
        }
    }

    jump() {
        const gravity = 0.40;
        const initialSpeed = 12;
        if (this.jumping) {
            if (this.jumpCount === 0 || !this.onGround()) {
                this.position[1] -= initialSpeed - gravity * this.jumpCount;
                this.jumpCount += 1;
            } else {
                this.position[1] = 100;
                this.jumpCount = 0;
                this.jumping = false;
            }
        }
    }

    update(ctx) {
        this.jump();
        this.draw(ctx);
    }


    onGround() {
        return this.position[0] === 100 && this.position[1] >= 100;
    }
}

module.exports = Player;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map