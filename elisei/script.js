let GAME = {
    height: 600,
    width: 600,
    bgc: "Linen",
}

let PLAYER = {
    currentQuestion: null,
}

let canvas = document.getElementById("canvas")
canvas.width = GAME.width;
canvas.height = GAME.height;

let ctx = canvas.getContext("2d");

class Card {
    constructor(text, num, count=3, onClick=()=>{}) {
        this.text = text;
        this.num = num;
        this.count = count;

        this.height = 100;
        this.width = GAME.width / this.count;
        this.x = this.width * this.num;
        this.y = GAME.height - this.height;
        
        this.onClick = onClick;
        
        this.bgc = "grey";
        this.font = {
            color: "black",
            size: 30,
            family: "serif",
        }
    }
    draw() {
        ctx.fillStyle = this.bgc;
        ctx.fillRect(
            this.x,
            this.y,
            this.width,
            this.height,
        );
        ctx.fillStyle = this.font.color;
        ctx.textAlign = "center";
        ctx.font = `${this.font.size}px ${this.font.family}`;
        ctx.fillText(
            this.text, 
            this.x + this.width / 2, 
            this.y + this.font.size
        );
    }
    initEventListeners() {
        canvas.addEventListener("click", e => {
            if (this._inside(e.clientX, e.clientY)) {
                this.onClick();
            }
        })
    }
    _inside(x, y) {
        return this.x < x && x < this.x + this.width
            && this.y < y && y < this.y + this.height
    }
}

let card1 = new Card("Сложность 1", 0, 3);
card1.draw();
card1.initEventListeners();
let card2 = new Card("Сложность 2", 1, 3);
card2.draw();
let card3 = new Card("Сложность 3", 2, 3);
card3.draw();



card1.onClick = () => {
    ctx.textAlign = "center";
    if (PLAYER.currentQuestion == null) {
        let question = getRandomQuestion();
        ctx.fillText(question, GAME.width / 2, GAME.height / 2);
        PLAYER.currentQuestion = question;
    }
}
