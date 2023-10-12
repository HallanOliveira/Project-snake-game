import {Snake, DIRECTION_RIGHT, DIRECTION_DOWN, DIRECTION_LEFT, DIRECTION_UP} from "/snake.js";
import {Food} from "/food.js";

class Game {
    constructor(speed) {
        this.speed = speed;
        this.level = 1;
        this.widthMap = 1850;
        this.heightMap = 850;
        this.canvas = document.querySelector('#screen');
    }

    async initGame(){
        document.addEventListener('keydown',(event) => {
            this.setDirection(event.keyCode)
        });
        await this.buildMenuGameOver();
        await this.buildScore();
        document.querySelector('#restart-game')
            .addEventListener('click', () => {
                this.restart();
            });
        await this.buildMap();
        await this.createSnake().then((snake) => {
            this.snake = snake
        });
        this.createFood().then((food) => {
            this.food = food
        })
        return Promise.resolve(true)
    }

    buildScore() {
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
            score.style.color = 'blue',
            this.canvas.append(score)
        ])
    }

    sortLocation() {
        var postionX = Math.floor(Math.random() * (this.widthMap));
        var postionY = Math.floor(Math.random() * (this.heightMap));
        if ((this.widthMap - postionX) < 10) {
            postionX -= 10;
        }
        
        if (postionX < 10) {
            postionX += 10
        }

        if ((this.heightMap - postionY) < 10) {
            postionY -= 10;
        }

        if (postionY < 10) {
            postionY += 10
        }

        return Promise.resolve({
            x: postionX,
            y: postionY
        });
    }
    
    async createFood() {
        const {x,y} = await this.sortLocation()
        const food = new Food(x,y,this.canvas,40,40);
        food.newFood()
        return Promise.resolve(food);
    }

    createSnake() {
        const snake = new Snake(100,100, this.canvas,40,40);
        snake.newSnake()
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
            this.canvas.append(gameOver),
        ])
    }

    buildMap() {
        return Promise.all([
            this.canvas.style.width = this.widthMap + 'px',
            this.canvas.style.height = this.heightMap + 'px',
            this.canvas.style.backgroundColor = 'black',
        ])
    }

    async loop() {
        var stpeSize = 5;
        var score = 0;
        var loop = setInterval(() => {
            this.snake.move(stpeSize);
            if (this.collided()) {
                this.gameOver(loop)
            } 
            if (this.ateFood()) {
                stpeSize = this.increaseDifficulty(stpeSize);
                score = this.updateScore(stpeSize, score);
                this.food.updatePosition(this.sortLocation());
            } 

        }, this.speed)
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

    collided() {
        return this.snake.positionX >= (this.widthMap - (this.snake.width - 10))
            || this.snake.positionY >= (this.heightMap - (this.snake.height - 10))
            || this.snake.positionX <= (0 + 5)
            || this.snake.positionY <= (0 + 5)
    }

    ateFood() {
        var differenceX = this.snake.positionX - this.food.positionX;
        var differenceY = this.snake.positionY - this.food.positionY;
        if (differenceX < 0) {
            differenceX = differenceX * (-1);
        }
        if (differenceY < 0) {
            differenceY = differenceY * (-1);
        }

        return (differenceX <= 20 && differenceY <= 20 );
    }

    setDirection(key) {
        switch(key) {
            case 39:
                if (this.snake.direction !== DIRECTION_LEFT) {
                    this.snake.direction = DIRECTION_RIGHT;
                }
            break;
            case 40:
                if (this.snake.direction !== DIRECTION_UP) {
                    this.snake.direction = DIRECTION_DOWN;
                }
            break;
            case 37:
                if (this.snake.direction !== DIRECTION_RIGHT) {
                    this.snake.direction = DIRECTION_LEFT;
                }
            break;
            case 38:
                if (this.snake.direction !== DIRECTION_DOWN) {
                    this.snake.direction = DIRECTION_UP;
                }
            break;
        }
    }
    
    gameOver(gameLoop) {
        clearInterval(gameLoop);
        document.querySelector('#menu').style.display = 'block';
        document.querySelector('#end-score').textContent = this.scoreValue.innerHTML;
    }

    async start() {
        await this.initGame();
        this.loop();
    }

    restart() {
        this.canvas.remove();
        const canvas = document.createElement('div');
        canvas.id = 'screen';
        document.body.append(canvas)
        const GAME = new Game(30);
        GAME.start();
    }
}
(new Game(30)).start();
