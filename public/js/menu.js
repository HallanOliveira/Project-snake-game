export class Menu {
    constructor() {
        this.html = document.createElement('div');
        this.html.id = 'menu';
        this.html.classList.add('text-center');
        this.html.style.width = '100%';
        this.html.style.height = '100%';
        this.html.style.backgroundImage = "url('public/assets/menu4.png')";
        this.html.style.zIndex = '100';
    }

    getGameOver() {
        const title = this.getTitle('Game Over!', '#b0343e');
        const button = this.getButtonTryAgain();
        this.html.appendChild(title);
        this.html.appendChild(button);
        return this.html;
    }

    getPause() {
        const title = this.getTitle('Jogo Pausado', 'white');
        this.html.appendChild(title);
        return this.html;
    }

    getTitle(title, color) {
        const titleHtml = document.createElement('div');
        titleHtml.innerHTML = `<b>${title}</b>`;
        titleHtml.style.color = color;
        titleHtml.style.fontSize = `45pt`;
        titleHtml.style.backgroundColor = 'black';
        titleHtml.style.opacity = '0.7';
        titleHtml.style.textAlign = `center`;
        return titleHtml;
    }

    static removeMenu() {
        document.querySelector('#menu').remove();
    }

    getButtonTryAgain() {
        const button = document.createElement('button');
        button.id = 'restart';
        button.innerHTML = `Tentar novamente`;
        button.style.marginTop = '20px';
        button.classList.add('btn', 'btn-outline-light');
        return button;
    }
}