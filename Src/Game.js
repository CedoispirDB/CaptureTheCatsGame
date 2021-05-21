import Cat from "/Src/Cat.js";
import Player from "/Src/Player.js"
import Sound from "/Src/Sounds.js"
import Inventory from "/Src/Inventory.js"


let player; 

let inventory;

let cat;
let cats = [];
let numberOfCats = 5;

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


window.addEventListener("resize", function () {
    canvas.width = window.innerWidth - 15;
    canvas.height = window.innerHeight - 15;
});


export function initGame() {
    // Set up canvas
    canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    ctx = canvas.getContext("2d");
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
    canvas.width = windowWidth - 15;
    canvas.height = windowHeight - 15;
    document.body.style.backgroundColor = "black";

    sound = new Sound();
    sound.createAudio("Sounds/popSound.mp3");
    
    player = new Player(700, 200, 0, 0, ctx, windowWidth, windowHeight);
    player.createImage();

    inventory = new Inventory();
    inventory.drawInventory();

    cat = new Cat(50, ctx, windowWidth, windowHeight, sound, 50, inventory, "simple", 0);
    // Set up the cats
    for (var i = 0; i < numberOfCats; i++) {
        cats.push(new Cat(50, ctx, windowWidth, windowHeight, sound, 50, inventory, "simple", i));
    }     
    // for (var i = 0; i < numberOfCats; i++) {
    //     console.log("cat[" + i + "].id: " + cats[i].getId())
    //     console.log("cat number " + cats[i].getNumber())
    // }

    

    setInterval(animate, 1000 / 300);

}

function animate() {
    ctx.clearRect(0, 0, windowWidth, windowHeight)
    player.playerAnimation();
    cat.animateCat(cats, player.getX(), player.getY());
}