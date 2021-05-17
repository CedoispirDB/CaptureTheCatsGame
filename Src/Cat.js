var catFrame = 1;
// Image measurements 
var catWidth = 175;
var catHeight = 191;

let image;
let ctx;

// Cat Object 
export default class Cat {

    constructor(catSize, ctx, windowWidth, windowHeight, sound, playerSize) {
        // Set the cat's width and height
        this.enemyWidth = catSize;
        this.enemyHeight = catSize;

        this.windowWidth = windowWidth
        this.windowHeight = windowHeight;

        // Set the cat's velocity and position
        this.x = giveXPOS(this.enemyWidth, this.windowWidth);
        this.y = giveYPOS(this.enemyHeight, this.windowHeight);
        // this.x = 500;
        // this.y =  300;
        this.dx = 1;
        this.dy = 1;

        this.ctx = ctx;

        this.catSize = catSize;
        this.sound = sound;
  
        this.playerSize = playerSize;
    }

   
   


    animateCat(cat, playerX, playerY) {

        for (var i = 0; i < cat.length; i++) {
            update(cat[i], this.ctx);
    
            cat[i].x += cat[i].dx;
            cat[i].y += cat[i].dy;
    
            if (cat[i].x + this.catSize >= this.windowWidth - 10) {
                cat[i].dx = cat[i].dx * (- 1);
            }
    
            if (cat[i].x <= 0) {
                cat[i].dx = cat[i].dx * (- 1);
            }
    
            if (cat[i].y <= 10) {
                cat[i].dy = cat[i].dy * (-1);
            }
    
            if (cat[i].y + this.catSize >= this.windowHeight - 15) {
                cat[i].dy = cat[i].dy * (-1);
            }
    
            // Kill cats with mouse, future game mode
    
            // if (mouseX > cat[i].x && mouseX < cat[i].x + catSize &&
            //     mouseY > cat[i].y && mouseY < cat[i].y + catSize) {
            //     cat[i].radius += 5;
            //     cat[i].kill();
            //     sound.play();
            // }
    
            checkCollision(cat[i].x, cat[i].y ,this.catSize, this.catSize, playerX, playerY, this.playerSize, 70, cat[i], this.sound, cat)
            
        }
        
    }

}

// Draw the cat 
function update(cat, ctx) {
    // Get Cat image
    image = new Image();
    image.src = "Images/SpriteSheet.png";


    if (cat.dx < 0) {
        ctx.drawImage(image, catFrame * catWidth, 0,
            catWidth, catHeight,
            cat.x, cat.y,
            cat.enemyWidth, cat.enemyHeight);
        if (catFrame < 3) {
            catFrame++;
        } else {
            catFrame = 1;
        }
    } else if (cat.dx > 0) {
        cat.ctx.drawImage(image, catFrame * catWidth, 191,
            catWidth, catHeight,
            cat.x, cat.y,
            cat.enemyWidth, cat.enemyHeight);
        if (catFrame < 3) {
            catFrame++;
        } else {
            catFrame = 1;
        }
    }

}

// Give a random x position, avoiding overflow
function giveXPOS(width, windowWidth) {
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
function giveYPOS(height, windowHeight) {
    var pos = Math.random() * windowHeight;

    if (pos + height + 10 >= windowHeight) {
        return pos - height - 10
    } else if (pos - height <= 0) {
        return pos + 10;
    } else {
        return pos;
    }

}


function checkCollision(catX, catY, catW, catH, pX, pY, pW, pH, cat, sound, cats) {

    if (catX + catW >= pX && pX + pW >= catX && catY + catH >= pY & catY <= pY + pH) {
        // Make the cat dissapear 
        cats.splice(cats.indexOf(cat), 1);
        sound.play();
    
    }
}