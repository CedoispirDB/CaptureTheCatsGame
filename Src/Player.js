// Player properties
var player;
var playerSize = 50;
var playerWidth = 140;
var playerHeight = 240;
var playerFrame = 0;
var playerdxInc = 3;
var playerdyInc = 3;

// Movement booleans 
var moveUp;
var moveDown;
var moveLeft;
var moveRight;

let image;


// Player Object
export default class Player {

    
    // Set player initial position and velocity
    constructor(x, y, dx, dy, ctx, windowWidth, windowHeight) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.ctx = ctx;
        this.windowWidth = windowWidth
        this.windowHeight = windowHeight;

    }

    createImage() {
        // Get player image
        image = new Image();
        image.src = "Images/PlayerSkin.png";
    }

    playerAnimation() {
        playerMove();
        this.ctx.drawImage(image, playerFrame * playerWidth, 0,
            playerWidth, playerHeight,
            this.x, this.y,
            playerSize, 70);


        if (this.dx !== 0 || this.dy !== 0) {
            if (playerFrame < 2) {
                playerFrame++;
            } else {
                playerFrame = 0;
            }
        }

        // Change player velocity
        this.x += this.dx;
        this.y += this.dy;


        if (moveUp) {
            this.dy = playerdxInc * (-1);
        } else if (moveDown) {
            this.dy = playerdyInc;
        } else {
            this.dy = 0;
        }

        if (moveRight) {
            this.dx = 3;
        } else if (moveLeft) {
            this.dx = playerdxInc * (-1);
        } else {
            this.dx = 0;
        }

        //x = 796  y = 488
        if (this.x >= this.windowWidth - 80) {
            this.dx = (this.dx + 3) * -1;
        }

        if (this.x <= 10) {
            this.dx = (this.dx - 3) * -1;
        }

        if (this.y <= 10) {
            this.dy = (this.dy - 3) * -1;
        }

        if (this.y >= this.windowHeight - 80) {
            this.dy = (this.dy + 3) * -1;
        }

    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;

    }

    id() {
        return "player";
    }


}

function playerMove() {
    // Key input 
    document.onkeydown = function (e) {
        if (e.key === "w" || e.key === "ArrowUp") {
            moveUp = true;
        } else if (e.key === "s" || e.key === "ArrowDown") {
            moveDown = true;
        } else if (e.key === "d" || e.key === "ArrowRight") {
            moveRight = true;
        } else if (e.key === "a" || e.key === "ArrowLeft") {
            moveLeft = true;
        }
    }

    document.onkeyup = function (e) {
        if (e.key === "w" || e.key === "ArrowUp") {
            moveUp = false;
        } else if (e.key === "s" || e.key === "ArrowDown") {
            moveDown = false;
        } else if (e.key === "d" || e.key === "ArrowRight") {
            moveRight = false;
        } else if (e.key === "a" || e.key === "ArrowLeft") {
            moveLeft = false;
        }
    }
}


