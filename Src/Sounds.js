let killSound;

export default class Sound {

    constructor(src) {
        this.src = src;
    }

    // Create a sound - expect path to sound
    createAudio(src) {
        killSound = document.createElement("audio");
        killSound.src = src;
        killSound.setAttribute("preload", "auto");
        killSound.setAttribute("controls", "none");
    
        killSound.style.display = "none";
    
        document.body.appendChild(this.killSound);
    }

    play() {
        killSound.play();
    }
    stop() {
        killSound.pause();
    }

}

