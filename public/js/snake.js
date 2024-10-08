import {Location} from "./location.js"

export const DIRECTION_RIGHT = 0,
DIRECTION_DOWN = 1,
DIRECTION_LEFT = 2,
DIRECTION_UP = 3;

export class Snake {
    constructor(x,y,w,h,speed) {
        this.location = new Location(x,y);
        this.speed = speed;
        this.direction = DIRECTION_RIGHT;
        this.width = w;
        this.height = h;
    }

    move() {
        const steps = 5;
        switch(this.direction) {
            case DIRECTION_RIGHT:
                this.location.x += steps;
            break;
            case DIRECTION_DOWN:
                this.location.y += steps;
            break;
            case DIRECTION_LEFT:
                this.location.x -= steps;
            break;
            case DIRECTION_UP:
                this.location.y -= steps;
            break;
        }
    }

    setDirection(key) {
        switch(key) {
            case 39:
                if (this.direction !== DIRECTION_LEFT) {
                    this.direction = DIRECTION_RIGHT;
                }
            break;
            case 40:
                if (this.direction !== DIRECTION_UP) {
                    this.direction = DIRECTION_DOWN;
                }
            break;
            case 37:
                if (this.direction !== DIRECTION_RIGHT) {
                    this.direction = DIRECTION_LEFT;
                }
            break;
            case 38:
                if (this.direction !== DIRECTION_DOWN) {
                    this.direction = DIRECTION_UP;
                }
            break;
        }
    }

    getHtml() {
        const snakeEl = document.createElement('img');
        snakeEl.setAttribute('id','snake')
        snakeEl.setAttribute('src','public/img/sunglasses.png')
        snakeEl.width = this.width;
        snakeEl.height = this.height;
        snakeEl.style.position = 'absolute';
        snakeEl.style.top = this.location.y + 'px';
        snakeEl.style.left = this.location.x + 'px';
        return snakeEl;
    }
}