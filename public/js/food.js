import {Location} from './location.js';

export class Food {
    constructor(w,h) {
        this.width = w;
        this.height = h;
    }

    sortLocation(map) {
        var x = Math.floor(Math.random() * (map.getLimit('right', this.width) - map.getLimit('left', this.width)) + map.getLimit('left', this.width));
        var y = Math.floor(Math.random() * (map.getLimit('bottom', this.height - map.getLimit('top', this.height)) - map.getLimit('top', this.height)));
        this.location = new Location(x,y);
    }

    getHtml() {
        const food = document.createElement('img');
        food.setAttribute('id','food');
        food.setAttribute('src','public/img/apple.png');
        food.width = this.width;
        food.height = this.height;
        food.style.position = 'absolute';
        food.style.top = this.location.y + 'px';
        food.style.left = this.location.x + 'px';
        return food;
    }
}