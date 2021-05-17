


// Resize canvas

window.onload = function () {
  

    
}

// Initiate the game
function initGame() {

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



