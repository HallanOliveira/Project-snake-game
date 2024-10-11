import { Location } from './location.js';

export class SnakeBody {
    constructor(snake, lastBody) {
        this.snake = snake;
        this.lastBody = lastBody;
        this.location = this.getLocation();
        this.width = this.snake.width;
        this.height = this.snake.height;
        this.trace = [this.getLocation()];
    }

    getLocation() {
        const x = this.lastBody.trace[0].x;
        const y = this.lastBody.trace[0].y;
        return new Location(x, y);
    }

    getHtml() {
        const snakeBodyEl = document.createElement('img');
        snakeBodyEl.id = 'snakeBody';
        snakeBodyEl.setAttribute('src','public/assets/sunglasses.png')
        snakeBodyEl.width = this.width;
        snakeBodyEl.height = this.height;
        snakeBodyEl.style.position = 'absolute';
        snakeBodyEl.style.top = this.location.y + 'px';
        snakeBodyEl.style.left = this.location.x + 'px';
        return snakeBodyEl;
    }

    setLocation(lastBody) {
        this.lastBody = lastBody;
        this.location = this.getLocation();
        this.saveTrace();
    }

    saveTrace() {
        this.trace.push(this.getLocation());
        if (this.trace.length > 40) {
            this.trace.shift();
        }
    }
}