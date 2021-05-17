import Cat from "/Src/Cat.js";
import Player from "/Src/Player.js"
import Sound from "/Src/Sounds.js"

let player;
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
    console.log("first sound" + sound)
    player = new Player(700, 200, 0, 0, ctx, windowWidth, windowHeight);
    player.createImage();
    cat = new Cat(50, ctx, windowWidth, windowHeight, sound, 50);
    // Set up the cats
    for (var i = 0; i < numberOfCats; i++) {
        cats.push(new Cat(50, ctx, windowWidth, windowHeight, sound, 50));
    }     
    

    setInterval(animate, 1000/300);

}

function animate() {
    ctx.clearRect(0, 0, windowWidth, windowHeight)
    player.playerAnimation();
    cat.animateCat(cats, player.getX(), player.getY());
}