let GAME = {
    width: window.innerWidth - 75,
    height: window.innerHeight - 150,
}

let PLAYER = {
    hp: 100,
};

let ENEMY = {
    hp: 100,
    width: 400,
    height: 346,
    x: GAME.width / 2 - 25,
    y: 30,
};

let CARDS = [
    {stars: 1, equation: generateEquation(1)},
    {stars: 2, equation: generateEquation(2)},
    {stars: 3, equation: generateEquation(3)},
];

let ANSWERS = {
    "2 + 3": 5,
    "5 - 1": 4,
    "8 * 2": 16,
    "10 - 4": 6,
    "15 + 6": 21,
    "20 * 5": 100,
};

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
canvas.width = GAME.width - 25;
canvas.height = GAME.height - 25;

let selected = -1;

let checkButton = document.querySelector("#check-answer")
let inputTitle = document.querySelector('#enter-answer')

let enemyImage = new Image();
enemyImage.src = '../static/img/monstr.png';

let s1 = new Image();
s1.src = '../static/img/s1.png'

let s2 = new Image();
s2.src = '../static/img/s2.png'

let s3 = new Image();
s3.src = '../static/img/s3.png'

ctx.font = '20px Montserrat';

function initEventListener() {
    canvas.addEventListener('mousedown', onClick);

    checkButton.addEventListener('click', () => {
        let answer = Number(inputTitle.value);
        if (selected === 0) checkAnswer(answer, 1);
        if (selected === 1) checkAnswer(answer, 2);
        if (selected === 2) checkAnswer(answer, 3);
    })

    window.addEventListener('keydown', onKeyDown)
}

function onClick(event) {
    let clickX = event.clientX;

    if (clickX < GAME.width / 3) {
        selected = 0;
        draw(true, CARDS[0].equation);
    }

    if ((clickX > GAME.width / 3) && (clickX < GAME.width / 3 * 2)) {
        selected = 1;
        draw(true, CARDS[1].equation);
    }

    if (clickX > (GAME.width / 3 * 2)) {
        selected = 2;
        draw(true, CARDS[2].equation);
    }
}

function onKeyDown(event) {
    if (event.key === 'b') resetGame(true);
}

function generateEquation(difficulty) {
    let equationList;

    if (difficulty === 1) {
        equationList = [
            "2 + 3",
            "5 - 1",
        ];
    } else if (difficulty === 2) {
        equationList = [
            "8 * 2",
            "10 - 4",
        ];
    } else if (difficulty === 3) {
        equationList = [
            "15 + 6",
            "20 * 5",
        ];
    }

    return equationList[Math.floor(Math.random() * equationList.length)];
}

function game_over(b) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, GAME.width, GAME.height);

    ctx.fillStyle = 'white';
    if (b === true) ctx.fillText('Вы выиграли', GAME.width / 2 - 80, GAME.height / 2);
    else ctx.fillText('Вы проиграли', GAME.width / 2 - 80, GAME.height / 2);

    ctx.fillText('Нажмите "B" чтобы начать заново', GAME.width / 2 - 180, GAME.height / 2 + 30);
}

function checkAnswer(answer, stars) {
    let equation = CARDS[stars - 1].equation;
    let correctAnswer = ANSWERS[equation];

    if (answer === correctAnswer) {
        ENEMY.hp -= answer;
        CARDS.forEach(card => card.equation = generateEquation(card.stars));
        if (ENEMY.hp <= 0) game_over(true);
        else draw();
    } else {
        PLAYER.hp -= answer;
        CARDS.forEach(card => card.equation = generateEquation(card.stars));
        if (PLAYER.hp <= 0) game_over(false);
        else draw();
    }
}


function resetGame(b) {
    if (b === true) {
        PLAYER.hp = 100;
        ENEMY.hp = 100;

        CARDS.forEach(card => card.equation = generateEquation(card.stars));

        draw();
    }
}


function draw(clicked, eq) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, GAME.width, GAME.height);

    // обводка хп
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(10, 20);
    ctx.lineTo(160, 20);
    ctx.lineTo(160, 40);
    ctx.lineTo(10, 40);
    ctx.lineTo(10, 20);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(10, 50);
    ctx.lineTo(160, 50);
    ctx.lineTo(160, 70);
    ctx.lineTo(10, 70);
    ctx.lineTo(10, 50);
    ctx.stroke();

    // Шкала хп игрока
    let playerHpWidth = Math.min((PLAYER.hp / 100) * 150, 150);
    ctx.fillStyle = '#00de30';
    ctx.fillRect(10, 50, playerHpWidth, 20);

    // Хп врага
    let enemyHpWidth = Math.min((ENEMY.hp / 100) * 150, 150);
    ctx.fillStyle = '#ff003b';
    ctx.fillRect(10, 20, enemyHpWidth, 20);

    // Враг
    ctx.drawImage(enemyImage, ENEMY.x - ENEMY.width / 2, ENEMY.y, ENEMY.width, ENEMY.height);

    ctx.strokeStyle = 'white';
    ctx.fillStyle = 'white';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(100, 400);
    ctx.lineTo(400, 400);
    ctx.lineTo(430, 800);
    ctx.lineTo(10, 600);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(GAME.width / 2 - 150, 400);
    ctx.lineTo(GAME.width / 2 + 150, 400);
    ctx.lineTo(GAME.width / 2 + 150 + 40, 600);
    ctx.lineTo(GAME.width / 2 - 150 - 40, 600);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(GAME.width - 100, 400);
    ctx.lineTo(GAME.width - 400, 400);
    ctx.lineTo(GAME.width - 430, 800)
    ctx.lineTo(GAME.width - 10, 600)
    ctx.lineTo(GAME.width - 100, 400);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // сложность
    ctx.drawImage(s1, 140, GAME.height / 2 + 200 - 80);
    ctx.drawImage(s2, GAME.width / 2 - 110, GAME.height / 2 + 200 - 80);
    ctx.drawImage(s3, GAME.width - 100 - 250, GAME.height / 2 + 200 - 80);

    // Выражение
    ctx.fillStyle = 'black';
    if (clicked === true) {
        if (selected === 0) ctx.fillText(`Вычислите выражение ${eq}`, 100, GAME.height / 2 + 200);
        if (selected === 1) ctx.fillText(`Вычислите выражение ${eq}`, GAME.width / 2 - 150, GAME.height / 2 + 200);
        if (selected === 2) ctx.fillText(`Вычислите выражение ${eq}`, GAME.width - 100 - 290, GAME.height / 2 + 200);
    }
}

function draw_menu() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, GAME.width, GAME.height);
    ctx.fillStyle = 'white';
    ctx.fillText('Нажмите "B" чтобы начать игру', GAME.width / 2 - 150, GAME.height / 2);
}

enemyImage.onload = function () {
    initEventListener();
    draw_menu(true);
};
