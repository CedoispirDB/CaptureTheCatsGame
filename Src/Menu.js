import { initGame } from "/Src/Game.js"

// Menu buttons
var playButton;
var helpButton;
var optionsButton;
var storageButton;
var container;



window.onload = function () {
    initButtons();
}

function initButtons() {

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

}

