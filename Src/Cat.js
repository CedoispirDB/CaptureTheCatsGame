var catFrame = 1;
// Image measurements 
// var catWidth = 175;
// var catHeight = 191;
var catWidth = 105;
var catHeight = 114;



let image;
let ctx;

let id;

// Cat Object 
export default class Cat {

    constructor(catSize, ctx, windowWidth, windowHeight, sound,
                     playerSize, inventory , type, number) {
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
        this.dx = 0;
        this.dy = 0;

        this.ctx = ctx;

        this.catSize = catSize;
        this.sound = sound;
  
        this.playerSize = playerSize;

        this.inventory = inventory;

        this.type = type;

        this.number = number;

        this.id = this.type + this.number + randomColor();
        
    

    }


    animateCat(cat) {

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
    
           
           
                // checkCollision(cat[i].x, cat[i].y ,this.catSize, this.catSize,
                //     playerX, playerY, this.playerSize, 70, cat[i],
                //     this.sound, cat, this.inventory)
            
            // for (var i = 0; i < 5; i++) {
            //     console.log("cat[" + i + "].id: " + cat[i].getId())
            // }
            
        }
        
    }


    getId() {
        return this.id;
    }



    getNumber() {
        return this.number;
    }
  
    checkCollision(playerX, playerY, cats, cat) {
        if (this.x + catWidth >= playerX && playerX + this.playerSize >= this.x && this.y + this.catSize >= playerY & this.y <= playerY + 70) {
            // Make the cat dissapear 
            if (this.inventory.inventorySize() < 4) {
                cats.splice(cats.indexOf(cat), 1);
                this.sound.play();
                this.inventory.addObject(cat);
            }
        
        }   
    }

}

// Draw the cat 
function update(cat, ctx) {
    // Get Cat image image = new Image();

    image  =new Image();
    image.src = "Images/SpriteSheetBig.png";

    if (cat.getId().includes("red")) {
        walkMovement(cat.x, cat.y, cat.enemyWidth, cat.enemyHeight,  cat.dx, 0 , ctx, catFrame)
    } else if (cat.getId().includes("blue")) {
        walkMovement(cat.x, cat.y, cat.enemyWidth, cat.enemyHeight,  cat.dx, 228 , ctx, catFrame)

    } else if (cat.getId().includes("green")) {
        walkMovement(cat.x, cat.y, cat.enemyWidth, cat.enemyHeight,  cat.dx, 456 , ctx, catFrame)

    } else {
        console.log(cat.getId() + " is not a valid id (Cat.js - line 106)");
    }
    if (catFrame < 3) {
        catFrame++;
    } else {
        catFrame = 1;
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


function checkCollision(catX, catY, catW, catH, pX, pY, pW, pH, cat, sound, cats, inventory) {
   

    if (catX + catW >= pX && pX + pW >= catX && catY + catH >= pY & catY <= pY + pH) {
        // Make the cat dissapear 
        if (inventory.inventorySize() < 4) {
            cats.splice(cats.indexOf(cat), 1);
            sound.play();
            inventory.addObject(cat);
        }
    
    }   
}

let randomColor = () => {
    // let colorOptions = ["red", "green", "blue", "bianca", "violet"]
    let colorOptions = ["red", "green", "blue"];
    return colorOptions[Math.floor(Math.random() * colorOptions.length)];
} 

export function walkMovement(catX, catY, catW, catH ,catDx, imgYPos, ctx, frame){
    if (catDx < 0) {
        // console.log("is going left")

        ctx.drawImage(image, frame * catWidth, imgYPos,
            catWidth, catHeight,
            catX, catY,
            catW,  catH);
       
    } else if (catDx > 0) {
        //191
        // console.log("is going right")
        ctx.drawImage(image, frame * catWidth, imgYPos + catHeight,
            catWidth, catHeight,
            catX, catY,
            catW,  catH);
    
    } else if (catDx === 0 ) {
        ctx.drawImage(image, 0, imgYPos,
        catWidth, catHeight,
        catX, catY,
        catW,  catH);

    }
}