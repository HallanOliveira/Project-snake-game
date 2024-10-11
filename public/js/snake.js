import {Location} from "./location.js"
import {SnakeBody} from "./snakeBody.js"

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
        this.length = 1;
        this.snakeBody = [];
        this.trace = [[new Location(this.location.x, this.location.y)],[]];
    }

    async move() {
        switch(this.direction) {
            case DIRECTION_RIGHT:
                this.location.x += this.speed;
            break;
            case DIRECTION_DOWN:
                this.location.y += this.speed;
            break;
            case DIRECTION_LEFT:
                this.location.x -= this.speed;
            break;
            case DIRECTION_UP:
                this.location.y -= this.speed;
            break;
        }
        this.saveTrace();
    }

    saveTrace() {
        this.trace.push(new Location(this.location.x, this.location.y));
        if (this.trace.length > 40) {
            this.trace.shift();
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
        const snakeContainer = document.createElement('div');
        const snakeEl = document.createElement('img');
        snakeEl.setAttribute('id','snake')
        snakeEl.setAttribute('src','public/assets/sunglasses.png')
        snakeEl.width = this.width;
        snakeEl.height = this.height;
        snakeEl.style.position = 'absolute';
        snakeEl.style.top = this.location.y + 'px';
        snakeEl.style.left = this.location.x + 'px';
        if (this.snakeBody.length >= 1) {
            this.snakeBody.forEach((body, index) => {
                body.setLocation(index == 0 ? this : body.lastBody);
                snakeContainer.appendChild(body.getHtml());
            });
        }
        snakeContainer.appendChild(snakeEl);
        return snakeContainer;
    }

    wasBeaten(map) {
        return this.location.x > map.getLimit('right', this.width)
            || this.location.y > map.getLimit('bottom', this.height)
            || this.location.x < map.getLimit('left', this.width)
            || this.location.y < map.getLimit('top', this.height)
    }

    isFoodEaten(food) {
        var differenceX = this.location.x - food.location.x;
        var differenceY = this.location.y - food.location.y;
        if (differenceX < 0) {
            differenceX = differenceX * (-1);
        }
        if (differenceY < 0) {
            differenceY = differenceY * (-1);
        }

        return (differenceX <= food.width && differenceY <= food.height);
    }

    increaseDifficulty() {
        this.incrementBody();
        // if (this.speed < 10) {
        //     this.speed += 1;
        // }
    }

    incrementBody() {
        var lastBody = this.snakeBody[this.snakeBody.length - 1] || this;
        this.snakeBody.push(new SnakeBody(this, lastBody));
    }
}