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

    // const foregroundCanvas = document.getElementById('foreground-canvas');
    // const foregroundCanvasContext = foregroundCanvas.getContext('2d');

    const game = new Game(
        gameCanvasContext,
        gameCanvas,
        backgroundCanvasContext)
    
    game.draw();
    window.addEventListener('keydown', game.jump);
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Background = __webpack_require__(2);
const Player = __webpack_require__(3);
const Mushroom = __webpack_require__(4);

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
        this.x = 100;
        this.y = posY;
        this.jumping = false;
        this.size = [100,100];

        this.jumpImage = this.jumpImage.bind(this);
        this.jumping = false;
        this.selfJumpImg = this.selfJumpImg.bind(this);
        this.sefJumping = false;
        this.getPosition = this.getPosition.bind(this);

    }

    draw() {
        this.ctx.clearRect(0, 0, 800, 600);
        this.ctx.drawImage(this.image, this.x, this.y, this.size[0], this.size[1]);
    }

    selfJump() {
        this.jumping = true;
        this.jumpImage()
    }

    selfJumpImg() {
        const gravity = 0.40;
        const initialSpeed = 12;
        if (this.y > 600 && this.jumping) {
            this.y -= initialSpeed - gravity;
            requestAnimationFrame(this.selfJumpImg)
        } else {
            this.jumping = false
            if (this.y >= 440) {
                return
            } else {
                this.y += this.speed;
                requestAnimationFrame(this.selfJumpImg)
            }
        }
    }

    performJump() {
        this.jumping = true;
        this.jumpImage()
    }

    jumpImage() {
        const gravity = 0.40;
        const initialSpeed = 12;
        if (this.y > 200 && this.jumping) {
            this.y -= initialSpeed - gravity ;
            requestAnimationFrame(this.jumpImage)
        } else {
            this.jumping = false
            if (this.y >= 440) {
                return
            } else {
                this.y += this.speed;
                requestAnimationFrame(this.jumpImage)
            }
        }
    }

    getPosition() {
        return [this.x, this.y];
    }
}

module.exports = Player;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

class Mushroom {
    constructor(ctx, image,x, y, speed) {
        this.ctx = ctx;
        this.image = image;
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.size = [100, 100];
        this.getPosition = this.getPosition.bind(this);
    }  

    move() {
        this.x -= this.speed;
        setInterval(() => {
            this.speed += 0.0001
        },50000)
        if(this.x < -100) {
            this.x = 800
        } 
    }

    draw(ctx) {
        // this.ctx.clearRect(0, 0, 800, 600);
        this.ctx.drawImage(this.image, this.x, this.y, this.size[0], this.size[1]);
        this.move()
    }

    getPosition() {
        return [this.x, this.y];
    }
}

module.exports = Mushroom;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map