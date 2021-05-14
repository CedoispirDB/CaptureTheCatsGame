// Create variables
var canvas;
var ctx;

var windowWidth;
var windowHeight;

var cat = [];
var mouseX = 0;
var mouseY = 0;
var sound;
// gameControl = "mousedown" or = "mousemove"
var gameControl = "mousedown";
var numberOfCats = 10;

// Menu buttons
var playButton;
var helpButton;
var optionsButton;
var storageButton;
var container;     

var catSize = 70;
var catFrame = 1;
var catWidth;
var catHeight;



window.addEventListener("resize" , function () {
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

    playButton.addEventListener("mousedown", function () {
        container.parentNode.removeChild(container);
        document.getElementsByTagName("h1")[0].style.display = "none";
        initGame();
    });
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

    canvas.addEventListener(gameControl, function (e){
        var cRect = canvas.getBoundingClientRect();
        mouseX = Math.round(e.clientX - cRect.left);
        mouseY = Math.round(e.clientY - cRect.top);
        // console.log(`x: ${mouseX}`, `y: ${mouseY}`);

    })

    canvas.addEventListener('mouseup', function(){ 
        mouseX = 0;
        mouseY = 0;
    });

    // Set up the cats
    for (var i = 0; i < numberOfCats; i++) {
        cat.push(new Cat());
    }
    // cat.push(new Cat());
    setInterval(animate, 1000/300)
}

// Animate the cat walking around
function animate() {
    console.log(`x: ${mouseX}`, `y: ${mouseY}`);

    ctx.clearRect(0, 0, windowWidth, windowHeight)

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

        if (cat[i].y  <= 10) {
            cat[i].dy = cat[i].dy * (-1);
        }

        if (cat[i].y + catSize >= windowHeight - 15) {
            cat[i].dy = cat[i].dy * (-1);
        }

        if (mouseX > cat[i].x && mouseX < cat[i].x + catSize &&
            mouseY > cat[i].y && mouseY < cat[i].y + catSize) {
            cat[i].radius += 5;
            cat[i].kill();
            sound.play();
        

        }
    }
}

// Cat Object 
catWidth = 175;
catHeight = 191;
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
        if (this.dx < 0){
            ctx.drawImage(this.image, catFrame * catWidth, 0, 
                            catWidth, catHeight,
                            this.x, this.y,
                            this.enemyWidth, this.enemyHeight);
            if (catFrame < 3) {
                catFrame ++;
            } else {
                catFrame = 1;
            }
        } else if (this.dx > 0) {
            ctx.drawImage(this.image, catFrame * catWidth, 191, 
                catWidth, catHeight,
                this.x, this.y,
                this.enemyWidth, this.enemyHeight);
            if (catFrame < 3) {
                catFrame ++;
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
function giveYPOS (height) {
    var pos = Math.random() * windowHeight;

    if (pos + height + 10 >= windowHeight) {
        return pos - height - 10
    } else if (pos - height <= 0) {
        return pos + 10;
    } else {
        return pos;
    }

}