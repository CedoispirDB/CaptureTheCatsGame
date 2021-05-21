import Cat from "/Src/Cat.js"

const objects = [];

export default class Inventory {
    constructor(x, y, w, h, spriteSheet) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.spriteSheet = spriteSheet;

    }

    drawInventory() {
        let div = document.createElement("div");
        document.body.appendChild(div);
        div.setAttribute("id", "inventory")
        
        for (var i = 0; i < 4; i++) {
            let provSlot = document.createElement("div");
            div.appendChild(provSlot);
            provSlot.setAttribute("class", "inventory-slot")
        }        
    }

    addObject(obj) {
        let slots = document.getElementsByClassName("inventory-slot");
        let image = document.createElement("img");
        let imgSrc;
        if (objects.length < 4) {
            console.log("Received Object: " + obj.getId())
            objects.push(obj)
            if (obj.getId().includes("simple")) {
                if (obj.getId().includes("red")) {
                    imgSrc = "/Images/InventoryImages/CatRed.png";
                } else if (obj.getId().includes("green")) {
                    imgSrc = "/Images/InventoryImages/CatGreen.png";
                } else if (obj.getId().includes("blue")) {
                    imgSrc = "/Images/InventoryImages/CatBlue.png";
                }
            }

            image.setAttribute("src", imgSrc);

            if (!(slots[0].hasChildNodes())) {
                slots[0].appendChild(image);
            } else if (!(slots[1].hasChildNodes())) {
                slots[1].appendChild(image);
            } else if (!(slots[2].hasChildNodes())) {
                slots[2].appendChild(image);
            } else if (!(slots[3].hasChildNodes())) {
                slots[3].appendChild(image);
            }

          
        }
    }

    removeObject(obj) {
        objects.splice(objects[obj], 1);
    }

    inventorySize() {
        return objects.length;
    }
}