let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
canvas.width = GAME.width - 25;
canvas.height = GAME.height - 25;

const PLAYER = {
    hp: 100,
    damage: 0,
};

const ENEMY = {
    hp: 100,
    width: 50,
    height: 50,
    x: canvas.width / 2 - 25,
    y: 50,
};

const CARDS = [
    {stars: 1, equation: generateEquation(1)},
    {stars: 2, equation: generateEquation(2)},
    {stars: 3, equation: generateEquation(3)},
];

const inputField = document.createElement('input');
inputField.type = 'number';
inputField.placeholder = 'Введите ответ';
document.body.appendChild(inputField);

canvas.addEventListener('click', onClick);

function onClick(event) {
    const clickX = event.clientX - canvas.offsetLeft;
    const clickY = event.clientY - canvas.offsetTop;

    for (let i = 0; i < CARDS.length; i++) {
        const card = CARDS[i];
        if (
            clickX > i * (canvas.width / CARDS.length) &&
            clickX < (i + 1) * (canvas.width / CARDS.length) &&
            clickY > canvas.height - 100 &&
            clickY < canvas.height
        ) {
            const answer = prompt(`Решите : ${card.equation}`);
            if (answer !== null) {
                checkAnswer(parseInt(answer), card.stars);
            }
        }
    }
}

function generateEquation(difficulty) {
    const operators = ['+', '-', '*'];
    const operator = operators[Math.floor(Math.random() * operators.length)];
    const num1 = Math.floor(Math.random() * 10 * difficulty);
    const num2 = Math.floor(Math.random() * 10 * difficulty);
    return `${num1} ${operator} ${num2}`;
}

function checkAnswer(answer, stars) {
    const result = eval(CARDS[stars - 1].equation);
    if (answer === result) {
        ENEMY.hp -= answer;
        PLAYER.damage += answer;
        if (ENEMY.hp <= 0) {
            alert('You defeated the enemy!');
            resetGame();
        } else {
            draw();
        }
    } else {
        PLAYER.hp -= result;
        if (PLAYER.hp <= 0) {
            alert('Game over! You lost.');
            resetGame();
        } else {
            draw();
        }
    }
}

function resetGame() {
    PLAYER.hp = 100;
    PLAYER.damage = 0;
    ENEMY.hp = 100;
    CARDS.forEach(card => card.equation = generateEquation(card.stars));
    draw();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw player HP
    ctx.fillStyle = 'green';
    ctx.fillRect(10, canvas.height - 30, PLAYER.hp, 20);

    // Draw enemy HP
    ctx.fillStyle = 'red';
    ctx.fillRect(ENEMY.x, ENEMY.y, ENEMY.width, ENEMY.height);

    // Draw player damage
    ctx.fillStyle = 'blue';
    ctx.fillText(`Player Damage: ${PLAYER.damage}`, 10, canvas.height - 40);

    // Draw cards
    for (let i = 0; i < CARDS.length; i++) {
        const card = CARDS[i];
        ctx.fillStyle = 'lightgray';
        ctx.fillRect(i * (canvas.width / CARDS.length), canvas.height - 100, canvas.width / CARDS.length, 100);
        ctx.fillStyle = 'black';
        ctx.fillText(`Stars: ${card.stars}`, i * (canvas.width / CARDS.length) + 10, canvas.height - 80);
    }
}

resetGame();