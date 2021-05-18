import { initGame } from "/Src/Game.js"

// Menu buttons
var playButton;
var helpButton;
var optionsButton;
var storageButton;

var container;
var header;



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
    header = document.getElementsByTagName("h1")[0];

    // Iniate the game
    playButton.addEventListener("mousedown", () => {
        container.parentNode.removeChild(container);
        header.style.display = "none";
        initGame();
    });

    // Help menu
    helpButton.addEventListener("mousedown", () => {
        removeButtons();

        let div = document.createElement("div")
        let p = document.createElement("p");
        let backButton = document.createElement("button");


        header.innerText = "Help";
        
        container.appendChild(div);        
        div.appendChild(p);
        div.appendChild(backButton);

        p.setAttribute("id", "helpText");
        backButton.setAttribute("id", "backButton");
        backButton.innerText = "Back";
        p.innerText = " Your cats have escaped your pet store. \n \
        They are not used in the life in the wild, you must find them as soon as possible. \n \
        Use W-A-S-D or the arrow keys to walk around the florest. \n \
        Use the space bar to pick the cats."
        
        let back = document.getElementById("backButton");
        back.addEventListener("mousedown", () => {
            initialState(div);
        });         
    });

    // Options button
    optionsButton.addEventListener("mousedown", () => {
        let div = document.createElement("div");
        let p = document.createElement("p");
        let backButton = document.createElement("button");

        console.log(div, p)
        
        removeButtons();
        header.innerText = "Options";
        
        container.appendChild(div);
        div.appendChild(p);

        div.appendChild(backButton);
        backButton.setAttribute("id", "backButton");
        backButton.innerText = "Back";
        backButton.style.top = "36%";

        p.setAttribute("id", "optionsText")
        p.innerText = "For now there is no extra options. \n Sorry :("
        
        let back = document.getElementById("backButton");
        back.addEventListener("mousedown", () => {
            initialState(div);
        });     

    });

    // Storage button
    storageButton.addEventListener("mousedown", () => {

        let divContainer = document.createElement("div");
        let backButton = document.createElement("button");


        removeButtons();

        document.body.removeChild(container);
        // let gridSlotes = documet.createElement("div")

        for (var i = 0; i < 9; i++) {
            var provDiv = document.createElement("div");
            divContainer.appendChild(provDiv);
            provDiv.setAttribute("class", "slots")
            provDiv.innerText = "slot " + (i + 1);
        }

        document.body.appendChild(divContainer)

        divContainer.setAttribute("class", "storage-container")

        header.innerText = "Storage"

        divContainer.appendChild(backButton);

        backButton.setAttribute("id", "backButton");
        backButton.innerText = "Back";
        backButton.style.top = "118%";


        let back = document.getElementById("backButton");
        back.addEventListener("mousedown", () => {
            initialState(divContainer);
        });   


    });
    

}


let removeButtons = () => {
    container.removeChild(playButton);
    container.removeChild(helpButton);
    container.removeChild(optionsButton);
    container.removeChild(storageButton);
}

let initialState = (div) => {
    if (div.parentNode !== "<body>") {
        document.body.appendChild(container);
    }
    div.parentNode.removeChild(div);
    container.appendChild(playButton);
    container.appendChild(helpButton);
    container.appendChild(optionsButton);
    container.appendChild(storageButton);
    header.innerText = "Capture the cats"

}

