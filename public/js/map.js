
export class Map {
    constructor(w,h) {
        this.width = w;
        this.height = h;
        this.color = '#0b2f4d';
    }

    build() {
        this.html = document.createElement(`div`);
        this.html.id = 'map';
        this.html.style.width = '100%';
        this.html.style.height = this.height + 'px';
        this.html.style.marginTop = '10px';
        this.html.style.padding = '10px';
        this.html.style.backgroundColor = this.color;
        this.html.style.border = `solid #070f63 2px`;
        document.querySelector('#screen').appendChild(this.html);
    }

    setSnake(snake) {
        this.snake = snake;
        this.html.appendChild(snake.getHtml());
    }

    setFood(food) {
        this.html.appendChild(food.getHtml());
    }

    resetElements() {
        this.html.innerHTML = '';
    }

    getLimit(side, offsetObj) {
        switch(side) {
            case 'top':
                return this.html.getBoundingClientRect().top;
            case 'right':
                return this.html.getBoundingClientRect().right - offsetObj;
            case 'bottom':
                return this.html.getBoundingClientRect().bottom - offsetObj;
            case 'left':
                return this.html.offsetLeft;
        }
    }
}