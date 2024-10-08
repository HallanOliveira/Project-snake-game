import {Snake} from "./snake.js";
import {Food} from "./food.js";
import {Map} from "./map.js";

class Game {
    async initGame(){
        this.map = await this.buildMap();
        this.snake = await this.buildSnake();
        this.food = await this.createFood();
        await this.buildMenuGameOver();
        await this.buildScore();

        document.addEventListener('keydown',(event) => {
            this.snake.setDirection(event.keyCode)
        });

        document.querySelector('#restart-game')
        .addEventListener('click', () => {
            this.restart();
        });
        return Promise.resolve(this);
    }

    async buildScore() {
        const score = document.createElement('h2');
        this.scoreValue = document.createElement('span');
        Promise.all([
            this.scoreValue.id = 'score-value',
            this.scoreValue.textContent = 0,
            score.id = 'score',
            score.textContent = 'score: ',
            score.append(this.scoreValue),
            score.style.paddingTop = '10px',
            score.style.paddingLeft = '20px',
            score.style.color = 'white',
            this.map.canvas.append(score)
        ])
    }
    
    async createFood() {
        const food = new Food(40,40);
        food.sortLocation(this.map);
        return Promise.resolve(food);
    }

    buildSnake() {
        const snake = new Snake(150,150,40,40,100);
        return Promise.resolve(snake);
    }

    buildMenuGameOver() {
        const gameOver = document.createElement('h1');
        return Promise.all([
            gameOver.style.position = 'absolute',
            gameOver.style.color = 'red',
            gameOver.style.top = ((this.heightMap / 2) - 25) + 'px',
            gameOver.style.left = ((this.widthMap / 2) - 70)+ 'px',
            gameOver.style.margin = 0,
            gameOver.style.display = 'none',
            gameOver.id = 'menu',
            gameOver.innerHTML = '<u>Game Over!</u>' +
                '<br>' +
                'Your score: <span id="end-score"></span>' +
                '<button style="width: 70%; background-color: yellow" id="restart-game">' +
                '   Try Again' +
                '</button>',
            this.map.canvas.append(gameOver),
        ])
    }

    buildMap() {
        const map = new Map(1920, 800, 'screen');
        return Promise.resolve(map);
    }

    updateScore(level, score) {
        if (level < 15) {
            score += 2;
        } else if (level < 30) {
            score += 3;
        } else {
            score += 5;
        }
        this.scoreValue.textContent = score;
        return score;
    }

    increaseDifficulty(difficulty) {
        if (difficulty < 15) {
            difficulty += 2;
        } else if (difficulty < 30) {
            difficulty += 3;
        } else {
            difficulty += 5;
        }
        return difficulty
    }

    wasBeaten() {
        return (this.snake.location.x) > this.map.getLimit('right', this.snake.width)
            || this.snake.location.y > this.map.getLimit('bottom', this.snake.height)
            || this.snake.location.x < this.map.getLimit('left', this.snake.width)
            || this.snake.location.y < this.map.getLimit('top', this.snake.height)
    }

    ateFood() {
        var differenceX = this.snake.location.x - this.food.location.x;
        var differenceY = this.snake.location.y - this.food.location.y;
        if (differenceX < 0) {
            differenceX = differenceX * (-1);
        }
        if (differenceY < 0) {
            differenceY = differenceY * (-1);
        }

        return (differenceX <= this.food.width && differenceY <= this.food.height);
    }
    
    gameOver(gameLoop) {
        console.log('Game Over');
        clearInterval(gameLoop);
        document.querySelector('#menu').style.display = 'block';
        document.querySelector('#end-score').textContent = this.scoreValue.innerHTML;
    }

    render() {
        this.map.resetElements(this.snake);
        this.map.setSnake(this.snake);
        this.map.setFood(this.food);
    }

    async start() {
        var score = 0;
        console.log(1 / this.snake.speed);
        var loop = setInterval(() => {
            this.snake.move();
            this.render();
            if (this.wasBeaten()) {
                this.gameOver(loop)
            }
            if (this.ateFood()) {
                stpeSize = this.increaseDifficulty(stpeSize);
                // score = this.updateScore(5, score);
                this.food.sortLocation(this.map);
            }
        }, 50);
    }

    restart() {
        this.canvas.remove();
        const canvas = document.createElement('div');
        canvas.id = 'screen';
        document.body.append(canvas)
        const GAME = new Game();
        GAME.start();
    }
}
const game = new Game();
await game.initGame().then(game => game.start());