export class Score {

    constructor() {
        this.value = 0;
    }

    build() {
        const score = document.createElement('div');
        score.classList.add('d-flex', 'justify-content-between');
        score.style.color = 'white';
        score.style.backgroundColor = `#333`;
        score.style.padding = `10px`;
        score.style.display = `flex`;
        score.style.width = `100%`;
        score.style.border = `solid black 2px`;
        score.id = 'score';
        score.innerHTML = `<div>
            <b>Pontuação:&nbsp;<span id="score-points">${this.get()}</span></b>
        </div>
        <div class="btn-group" role="group" aria-label="Basic example">
            <button type="button" class="btn btn-outline-primary btn-sm" id="pause">Pausar</button>
            <button type="button" class="btn btn-outline-primary btn-sm" id="restart-a">Recomeçar</button>
        </div>`;
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