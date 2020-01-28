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