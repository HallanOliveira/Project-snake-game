import {Location} from "./location.js"

export const DIRECTION_RIGHT = 0,
DIRECTION_DOWN = 1,
DIRECTION_LEFT = 2,
DIRECTION_UP = 3;

export class Snake extends Location {
    constructor(x,y,canvas,w,h) {
        super(x,y,canvas)
        this.direction = DIRECTION_RIGHT;
        this.width = w;
        this.height = h;
    }

    newSnake() {
        const snake = document.createElement('img');
        snake.setAttribute('id','snake')
        snake.setAttribute('src','public/img/sunglasses.png')
        snake.width = this.width;
        snake.height = this.height;
        snake.style.position = 'absolute';
        snake.style.top = this.positionY + 'px';
        snake.style.left = this.positionX + 'px';
        this.canvas.append(snake);
    }

    move(distance) {
        Promise.resolve(this.setPosition(distance)).then(()=>{
            const snake = this.getSnake();
            snake.style.top = this.positionY + 'px';
            snake.style.left = this.positionX + 'px';
        })
    }

    getSnake() {
        return document.querySelector('#snake');
    }

    setPosition(distance) {
        switch(this.direction) {
            case DIRECTION_RIGHT:
                this.positionX += distance;
            break;
            case DIRECTION_DOWN:
                this.positionY += distance;
            break;
            case DIRECTION_LEFT:
                this.positionX -= distance;
            break;
            case DIRECTION_UP:
                this.positionY -= distance;
            break;
        }
    }
}