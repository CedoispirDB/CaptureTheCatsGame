// Create variables
var canvas;
var ctx;

var windowWidth;
var windowHeight;

var sound;

// Mouse variables
var mouseX = 0;
var mouseY = 0;
// gameControl = "mousedown" or = "mousemove"
var gameControl = "mousedown";


// Menu buttons
var playButton;
var helpButton;
var optionsButton;
var storageButton;
var container;

// Cat properties
var cat = [];
var numberOfCats = 5;
var catSize = 50;
var catFrame = 1;
// Image measurements 
var catWidth = 175;
var catHeight = 191;

// Player properties
var player;
var playerSize = 50;
var playerWidth = 140;
var playerHeight = 220;
var playerFrame = 0;
var playerdxInc = 3;
var playerdyInc = 3;

// Movement booleans 
var moveUp;
var moveDown;
var moveLeft;
var moveRight;

// Resize canvas
window.addEventListener("resize", function () {
    canvas.width = window.innerWidth - 15;
    canvas.height = window.innerHeight - 15;
});

window.onload = function () {
    // Set up buttons
    playButton = document.getElementById("playButton");
    helpButton = document.getElementById("helpButton");
    optionsButton = document.getElementById("optionsButton");
    storageButton = document.getElementById("storageButton");
    container = document.getElementById("container");

    // Playe button iniate the game
    playButton.addEventListener("mousedown", function () {
        container.parentNode.removeChild(container);
        document.getElementsByTagName("h1")[0].style.display = "none";
        initGame();
    });

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

// Initiate the game
function initGame() {
    // Set up canvas
    canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    ctx = canvas.getContext("2d");
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
    canvas.width = windowWidth - 15;
    canvas.height = windowHeight - 15;
    document.body.style.backgroundColor = "black";
  
    // Create sound object
    sound = new killSound("Sounds/popSound.mp3");

    canvas.addEventListener(gameControl, function (e) {
        var cRect = canvas.getBoundingClientRect();
        mouseX = Math.round(e.clientX - cRect.left);
        mouseY = Math.round(e.clientY - cRect.top);
        // console.log(`x: ${mouseX}`, `y: ${mouseY}`);

    })

    canvas.addEventListener('mouseup', function () {
        mouseX = 0;
        mouseY = 0;
    });

    // Set up the cats
    for (var i = 0; i < numberOfCats; i++) {
        cat.push(new Cat());
    }
    // cat.push(new Cat());
    
    // Create a player
    player = new Player();
    
    setInterval(animate, 1000 / 300)
}

// Animate Canvas 
function animate() {

    ctx.clearRect(0, 0, windowWidth, windowHeight)

    player.update();

    for (var i = 0; i < cat.length; i++) {
        cat[i].update();

        cat[i].x += cat[i].dx;
        cat[i].y += cat[i].dy;

        if (cat[i].x + catSize >= windowWidth - 10) {
            cat[i].dx = cat[i].dx * (- 1);
        }

        if (cat[i].x <= 0) {
            cat[i].dx = cat[i].dx * (- 1);
        }

        if (cat[i].y <= 10) {
            cat[i].dy = cat[i].dy * (-1);
        }

        if (cat[i].y + catSize >= windowHeight - 15) {
            cat[i].dy = cat[i].dy * (-1);
        }

        // Kill cats with mouse, future game mode

        // if (mouseX > cat[i].x && mouseX < cat[i].x + catSize &&
        //     mouseY > cat[i].y && mouseY < cat[i].y + catSize) {
        //     cat[i].radius += 5;
        //     cat[i].kill();
        //     sound.play();
        // }

        checkCollision(cat[i].x, cat[i].y ,catSize, catSize, player.x, player.y, playerSize, 70, cat[i])
        
    }

    // Change player velocity
    player.x += player.dx;
    player.y += player.dy;

   
    if (moveUp) {
        player.dy = playerdxInc * (-1);
    } else if (moveDown) {
        player.dy = playerdyInc;
    } else {
        player.dy = 0;
    }

    if (moveRight) {
        player.dx = 3;
    } else if (moveLeft) {
        player.dx = playerdxInc * (-1);
    
    } else {
        player.dx = 0;
    }

    if (player.x + playerSize >= windowWidth - 15) {
        player.dx = (player.dx + 3) * -1;
    }

    if (player.x <= 10) {
        player.dx = (player.dx - 3) * -1;
    }

    if (player.y <= 10) {
        player.dy = (player.dy - 3) * -1;
    }

    if (player.y + playerSize >= windowHeight - 35) {
        player.dy = (player.dy + 3) * -1;
    }

    
    
}

// Cat Object 
function Cat() {

    // Set the cat's width and height
    this.enemyWidth = catSize;
    this.enemyHeight = catSize;

    // Set the used image 
    this.image = new Image();
    this.image.src = "Images/SpriteSheet.png";

    // Set the cat's velocity and position
    this.x = giveXPOS(this.enemyWidth);
    this.y = giveYPOS(this.enemyHeight);
    // this.x = 500;
    // this.y =  300;
    this.dx = 1;
    this.dy = 1;


    // Draw the cat 
    this.update = function () {
        if (this.dx < 0) {
            draw(this.image, catFrame * catWidth, 0,
                catWidth, catHeight,
                this.x, this.y,
                this.enemyWidth, this.enemyHeight);
            if (catFrame < 3) {
                catFrame++;
            } else {
                catFrame = 1;
            }
        } else if (this.dx > 0) {
            draw(this.image, catFrame * catWidth, 191,
                catWidth, catHeight,
                this.x, this.y,
                this.enemyWidth, this.enemyHeight);
            if (catFrame < 3) {
                catFrame++;
            } else {
                catFrame = 1;
            }
        }

    }

    // Make the cat dissapear 
    this.kill = function () {
        cat.splice(cat.indexOf(this), 1);
    }


}

// Player Object
function Player() {

    // Set player initial position and velocity
    this.x = 700;
    this.y = 200;
    this.dx = 0;
    this.dy = 0;
    
    // Get player image
    this.image = new Image();
    this.image.src = "Images/PlayerSkin.png";

    // Draw player animation
    this.update = function () {
        draw(this.image, playerFrame * playerWidth, 0,
            playerWidth, playerHeight,
            this.x, this.y,
            playerSize, 70);


        if (this.dx !== 0 || this.dy !== 0){
            if (playerFrame < 2) {
                playerFrame++;
            } else {
                playerFrame = 0;
            }
        }
    }
}

// Give a random color
function randomColor() {
    var color = "rgb(" + (Math.floor(Math.random() * 255) + 1) + ", " + (Math.floor(Math.random() * 255) + 1) + ", " + (Math.floor(Math.random() * 255) + 1) + ")";;
    return color;
}

// Give the x and y coordinates of the mouse
function getMousePosition(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    console.log("Coordinate x: " + x, "Coordinate y: " + y);
}

// Create a sound - expect path to sound
function killSound(src) {
    this.killSound = document.createElement("audio");
    this.killSound.src = src;
    this.killSound.setAttribute("preload", "auto");
    this.killSound.setAttribute("controls", "none");

    this.killSound.style.display = "none";

    document.body.appendChild(this.killSound);
    this.play = function () {
        this.killSound.play();
    }
    this.stop = function () {
        this.killSound.pause();
    }
}


// Give a random x position, avoiding overflow
function giveXPOS(width) {
    var pos = Math.random() * windowWidth;
    if (pos + width >= windowWidth) {
        return pos - width - 15;
    } else if (pos - width <= 0) {
        return pos + 10;
    } else {
        return pos;
    }
}

// Give a random y position, avoiding overflow
function giveYPOS(height) {
    var pos = Math.random() * windowHeight;

    if (pos + height + 10 >= windowHeight) {
        return pos - height - 10
    } else if (pos - height <= 0) {
        return pos + 10;
    } else {
        return pos;
    }

}

// Draw image on canvas
function draw(src, imgX, imgY, imgWidth, imgHeight, objX, objY, objWidth, objHeigth) {
    ctx.drawImage(src, imgX, imgY,
        imgWidth, imgHeight,
        objX, objY,
        objWidth, objHeigth);
}

function checkCollision(catX, catY, catW, catH, pX, pY, pW, pH, cat) {
    // console.log(`catX + catW: ${catX + catW}`, `pX: ${pX}`)
    // console.log(`catX: ${catX}`, `pX + pW: ${pX + pW}`)
     
    if (catX + catW >= pX && pX + pW >= catX && catY + catH >= pY & catY <= pY + pH) {
        cat.kill();
        sound.play();
        }
}