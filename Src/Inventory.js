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
        if (objects.length < 4) {
            console.log("Received Object: " + obj.getId())
            objects.push(obj)
        
        }
    }

    removeObject(obj) {
        objects.splice(objects[obj], 1);
    }

    inventorySize() {
        return objects.length;
    }



}