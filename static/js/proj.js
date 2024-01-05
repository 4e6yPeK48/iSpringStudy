let GAME = {
    width: window.innerWidth,
    height: window.innerHeight,
}

let PLAYER = {
    hp: 10,
    damage: 0,
};

let ENEMY = {
    hp: 10,
    width: 50,
    height: 50,
    x: GAME.width / 2 - 25,
    y: 50,
};

let CARDS = [
    {stars: 1, equation: generateEquation(1)},
    {stars: 2, equation: generateEquation(2)},
    {stars: 3, equation: generateEquation(3)},
];

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
canvas.width = GAME.width - 25;
canvas.height = GAME.height - 25;


let inputField = document.createElement('input');
inputField.type = 'number';
inputField.placeholder = 'Введите ответ';
document.body.appendChild(inputField);

canvas.addEventListener('click', onClick);

function onClick(event) {
    let clickX = event.clientX - canvas.offsetLeft;
    let clickY = event.clientY - canvas.offsetTop;

    for (let i = 0; i < CARDS.length; i++) {
        let card = CARDS[i];
        if (
            clickX > i * (GAME.width / CARDS.length) &&
            clickX < (i + 1) * (GAME.width / CARDS.length) &&
            clickY > GAME.height - 100 &&
            clickY < GAME.height
        ) {
            let answer = prompt(`Решите : ${card.equation}`);
            if (answer !== null) {
                checkAnswer(parseInt(answer), card.stars);
            }
        }
    }
}

function generateEquation(difficulty) {
    let operators = ['+', '-', '*'];
    let operator = operators[Math.floor(Math.random() * operators.length)];
    let num1 = Math.floor(Math.random() * 10 * difficulty);
    let num2 = Math.floor(Math.random() * 10 * difficulty);
    return `${num1} ${operator} ${num2}`;
}

function checkAnswer(answer, stars) {
    let result = eval(CARDS[stars - 1].equation);
    if (answer === result) {
        ENEMY.hp -= answer;
        console.log(ENEMY.hp)
        PLAYER.damage += answer;
        if (ENEMY.hp <= 0) {
            alert('Ты выиграл');
            resetGame();
        } else {
            draw();
        }
    } else {
        PLAYER.hp -= result;
        console.log(PLAYER.hp)
        if (PLAYER.hp <= 0) {
            alert('Ты проиграл');
            resetGame();
        } else {
            draw();
        }
    }
}

function resetGame() {
    PLAYER.hp = 10;
    PLAYER.damage = 0;
    ENEMY.hp = 10;
    CARDS.forEach(card => card.equation = generateEquation(card.stars));
    draw();
}

function draw() {
    ctx.clearRect(0, 0, GAME.width, GAME.height);

    // хп игрока
    ctx.fillStyle = 'green';
    ctx.fillRect(10, GAME.height - 30, PLAYER.hp, 20);

    // хп врага
    ctx.fillStyle = 'red';
    ctx.fillRect(ENEMY.x, ENEMY.y, ENEMY.width, ENEMY.height);

    // дамаг игрока
    ctx.fillStyle = 'blue';
    ctx.fillText(`Дамаг игрока: ${PLAYER.damage}`, 10, GAME.height - 40);

    // карты
    for (let i = 0; i < CARDS.length; i++) {
        let card = CARDS[i];
        ctx.font = '20px Montserrat'
        ctx.fillStyle = 'lightgray';
        ctx.fillRect(i * (GAME.width / CARDS.length), GAME.height - 100, GAME.width / CARDS.length, 100);
        ctx.fillStyle = 'black';
        ctx.fillText(`Сложность: ${card.stars}`, i * (GAME.width / CARDS.length) + 10, GAME.height - 80);
    }
}

resetGame();