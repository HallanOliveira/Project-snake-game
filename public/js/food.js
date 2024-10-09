import {Location} from './location.js';

export class Food {
    constructor(w,h) {
        this.width = w;
        this.height = h;
    }

    sortLocation(map) {
        this.location = Location.sort(map, this.width, this.height);
    }

    getHtml() {
        const food = document.createElement('img');
        food.setAttribute('id','food');
        food.setAttribute('src','public/assets/apple.png');
        food.width = this.width;
        food.height = this.height;
        food.style.position = 'absolute';
        food.style.top = this.location.y + 'px';
        food.style.left = this.location.x + 'px';
        return food;
    }
}