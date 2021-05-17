let captureSound;

export default class Sound {

    constructor() {
    }

    // Create a sound - expect path to sound
    createAudio(src) {
        captureSound = document.createElement("audio");
        captureSound.src = src;
        captureSound.setAttribute("preload", "auto");
        captureSound.setAttribute("controls", "none");
    
        captureSound.style.display = "none";
    
        document.body.appendChild(captureSound);
    }

    play() {
        captureSound.play();
    }
    stop() {
        captureSound.pause();
    }

}

