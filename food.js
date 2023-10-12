import {Location} from './location.js';

export class Food extends Location {
    constructor(x,y,canvas,w,h) {
        super(x,y,canvas);
        this.width = w;
        this.height = h;
    }

    newFood() {
        const food = document.createElement('img');
        food.setAttribute('id','food');
        food.setAttribute('src','assets/apple.png');
        food.width = this.width;
        food.height = this.height;
        food.style.position = 'absolute';
        food.style.top = this.positionY + 'px';
        food.style.left = this.positionX + 'px';
        this.canvas.append(food);
    }

    updatePosition(newPosition) {
        Promise.resolve(this.setPosition(newPosition)).then(()=>{
            const food = this.getFood();
            food.style.top = this.positionY + 'px';
            food.style.left = this.positionX + 'px';
        })
    }

    setPosition(obj) {
        obj.then((postion) => {
            this.positionX = postion.x;
            this.positionY = postion.y;
        })
    }

    getFood() {
        return document.querySelector('#food');
    }
}