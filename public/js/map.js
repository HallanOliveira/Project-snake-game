
export class Map {
    constructor(w,h, canvas) {
        this.width = w;
        this.height = h;
        this.canvas = document.querySelector(`#${canvas}`);
        this.canvas.style.width = this.width + 'px';
        this.canvas.style.height = this.height + 'px';
        this.canvas.style.backgroundColor = 'black';
    }

    setSnake(snake) {
        this.snake = snake;
        this.canvas.appendChild(snake.getHtml());
    }

    setFood(food) {
        this.canvas.appendChild(food.getHtml());
    }

    resetElements() {
        this.canvas.innerHTML = '';
    }

    getLimit(side, offsetObj) {
        switch(side) {
            case 'top':
                return this.canvas.getBoundingClientRect().top;
            case 'right':
                return this.canvas.getBoundingClientRect().right - offsetObj;
            case 'bottom':
                return this.canvas.offsetHeight - offsetObj;
            case 'left':
                return this.canvas.offsetLeft;
        }
    }
}