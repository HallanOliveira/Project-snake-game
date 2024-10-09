export class Score {

    constructor() {
        this.value = 0;
    }

    build() {
        const score = document.createElement('div');
        score.style.color = 'white';
        score.style.backgroundColor = `#333`;
        score.style.padding = `10px`;
        score.style.display = `flex`;
        score.style.width = `100%`;
        score.style.border = `solid black 2px`;
        score.id = 'score';
        score.innerHTML = `<b>Pontuação:&nbsp;<span id="score-points">${this.value}</span></b>`;
        document.querySelector('#screen').prepend(score);
    }

    get() {
        return this.value;
    }

    update(speed) {
        let score = this.get();
        if (speed > 8) {
            score += 25;
        } else if (speed > 4) {
            score += 15;
        } else {
            score += 5;
        }
        this.value = score;
        this.setContent();
    }

    setContent() {
        document.querySelector('#score-points').textContent = this.value;
    }
}