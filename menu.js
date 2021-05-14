var windowWidth;
var windowHeight;
var playButton;
var helpButton;
var optionsButton;
var storageButton;



window.onload = function() {
    // loadScreen();
    // console.log(message());
}

function loadScreen() {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight; 
    playButton = document.getElementById("playButton");
    helpButton = document.getElementById("helpButton");
    optionsButton = document.getElementById("optionsButton");
    storageButton = document.getElementById("storageButton");

    console.log(windowWidth / 2);
    // playButton.style.left = windowWidth / 2 + "px";
    playButton.style.right = windowWidth / 2 + "px";

}