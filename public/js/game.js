import {Snake} from "./snake.js";
import {Score} from "./score.js";
import {Food} from "./food.js";
import {Menu} from "./menu.js";
import {Map} from "./map.js";

class Game {
    async initGame(){
        this.map = await this.buildMap();
        this.snake = await this.buildSnake();
        this.food = await this.createFood();
        this.score = await this.buildScore();
        this.paused = false;

        document.addEventListener('keydown',(event) => {
            this.snake.setDirection(event.keyCode)
        });
        document.querySelector('#pause').addEventListener('click',(event) => {
            this.pause()
        });
        document.querySelector('#restart-a').addEventListener('click',(event) => {
            this.restart()
        });

        return Promise.resolve(this);
    }

    buildMenu() {
        const menu = new Menu();
        this.map.html.appendChild(menu.getOptions());
        return Promise.resolve(menu);
    }

    buildScore() {
        const score = new Score();
        score.build();
        return Promise.resolve(score);
    }
    
    async createFood() {
        const food = new Food(40,40);
        food.sortLocation(this.map);
        return Promise.resolve(food);
    }

    buildSnake() {
        const snakeWidth = 40;
        const snakeHeight = 40;
        const startPositionX = this.map.getLimit('left', snakeWidth) + 100;
        const startPositionY = this.map.getLimit('top', snakeHeight) + 100;
        const speed = 1;
        const snake = new Snake(startPositionX,startPositionY,snakeWidth,snakeWidth,speed);
        return Promise.resolve(snake);
    }

    showGameOver() {
        this.map.resetElements();
        const menu = new Menu();
        this.map.html.appendChild(menu.getGameOver());
        return Promise.resolve(true);
    }

    showPause() {
        const menu = new Menu();
        this.map.html.appendChild(menu.getPause());
    }

    changeButtonPause() {
        const button = document.querySelector('#pause');
        button.textContent = this.paused ? 'Continuar' : 'Pausar';
    }

    buildMap() {
        const map = new Map(720, 500, 'map');
        map.build();
        return Promise.resolve(map);
    }

    async gameOver() {
        await this.showGameOver();
        document.querySelector('#restart')
            .addEventListener('click', () => {
                this.restart();
            });
    }

    render() {
        return Promise.all([
            this.map.resetElements(),
            this.map.setSnake(this.snake),
            this.map.setFood(this.food)
        ]);
    }

    pause() {
        this.paused = !this.paused;
        this.changeButtonPause();
        if (this.paused) {
            return this.showPause();
        }
        Menu.removeMenu();
        this.run();
    }

    async run() {
        if (this.paused) {
            return false;
        }
        this.snake.move();
        console.log(this.snake);
        this.render();
        if (this.snake.wasBeaten(this.map)) {
            this.gameOver();
            return false;
        }
        if (this.snake.isFoodEaten(this.food)) {
            this.snake.increaseDifficulty();
            this.score.update(this.snake.speed);
            this.food.sortLocation(this.map);
        }
        setTimeout(() => {this.run()}, 10);
    }

    restart() {
        document.querySelector('#screen').innerHTML = '';
        Game.start();
    }

    static start() {
        const game = new Game();
        game.initGame().then(game => game.run());
    }
}

Game.start();