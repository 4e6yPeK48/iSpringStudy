let GAME = {
    width: window.innerWidth - 75,
    height: window.innerHeight - 150,
    score: 0,
    record: 0,
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

let deckOpen = new Image(248, 208);
deckOpen.src = '../static/img/dC1.png';

let deckClose = new Image(248, 208);
deckClose.src = '../static/img/dBh1.png';

let f = new FontFace('Comic', 'url(../static/font/zlu.ttf)');

f.load().then(function (font) {
    console.log('font ready');
    document.fonts.add(font);
    ctx.font = 'bold 50px Comic';
    drawMenu(true);
});


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

function gameOver(b) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, GAME.width, GAME.height);

    ctx.fillStyle = 'white';
    if (b === true) {
        ctx.fillText(`Вы выиграли! Счёт: ${GAME.score}`, GAME.width / 2 - 140, GAME.height / 2);
        if (GAME.score > GAME.record) GAME.record = GAME.score;
    } else ctx.fillText('Вы проиграли', GAME.width / 2 - 80, GAME.height / 2);

    ctx.fillText('Нажмите «B» чтобы начать заново', GAME.width / 2 - 230, GAME.height / 2 + 60);
}

function checkAnswer(answer, stars) {
    let equation = CARDS[stars - 1].equation;
    let correctAnswer = ANSWERS[equation];

    if (answer === correctAnswer) {
        ENEMY.hp -= answer;
        GAME.score += (selected + 1)
        CARDS.forEach(card => card.equation = generateEquation(card.stars));
        if (ENEMY.hp <= 0) gameOver(true);
        else draw();
    } else {
        PLAYER.hp -= answer;
        CARDS.forEach(card => card.equation = generateEquation(card.stars));
        if (PLAYER.hp <= 0) gameOver(false);
        else draw();
    }
}

function resetGame(b) {
    if (b === true) {
        PLAYER.hp = 100;
        ENEMY.hp = 100;
        GAME.score = 0;

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

    // карты
    ctx.drawImage(deckClose, 50, 330, 248, 208);
    ctx.drawImage(deckClose, GAME.width / 2 - 124, 330, 248, 208);
    ctx.drawImage(deckClose, GAME.width - 248 - 50, 330, 248, 208);

    // сложность
    ctx.fillStyle = 'black';
    ctx.fillText('Легко', 180, GAME.height / 2 + 200 - 40)
    ctx.fillText('Средне', GAME.width / 2 - 70, GAME.height / 2 + 200 - 40)
    ctx.fillText('Сложно', GAME.width - 100 - 210, GAME.height / 2 + 200 - 40)

    // счет
    ctx.fillStyle = 'white';
    ctx.fillText(`Счёт: ${GAME.score}`, GAME.width - 200, 50)
    ctx.fillText(`Рекорд: ${GAME.record}`, GAME.width - 200, 90)

    // Выражение
    ctx.fillStyle = 'black';
    ctx.imageSmoothingEnabled = false;
    if (clicked === true) {
        if (selected === 0) {
            ctx.drawImage(deckOpen, 50, 330, 248, 208);
            ctx.fillText(`Вычислите ${eq}`, 120, GAME.height / 2 + 220);
        }
        if (selected === 1) {
            ctx.drawImage(deckOpen, GAME.width / 2 - 124, 330, 248, 208);
            ctx.fillText(`Вычислите ${eq}`, GAME.width / 2 - 130, GAME.height / 2 + 220);
        }
        if (selected === 2) {
            ctx.drawImage(deckOpen, GAME.width - 248 - 50, 330, 248, 208);
            ctx.fillText(`Вычислите ${eq}`, GAME.width - 100 - 270, GAME.height / 2 + 220);
        }
    }
}

function drawMenu() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, GAME.width, GAME.height);
    ctx.fillStyle = 'white';
    ctx.fillText('Нажмите «B» чтобы начать игру', GAME.width / 2 - 250, GAME.height / 2);
}

enemyImage.onload = function () {
    initEventListener();
};


// TODO: добавить таймер
// TODO: добавить рекорды
// TODO: ровно подписать + расширить вниз канвас