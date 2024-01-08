let GAME = {
    width: window.innerWidth - 100,
    height: window.innerHeight + 50,
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
    {stars: 1, imagePath: '../static/img/easy/card_easy_1.png', answer: 7},
    {stars: 1, imagePath: '../static/img/easy/card_easy_2.png', answer: 6},
    {stars: 1, imagePath: '../static/img/easy/card_easy_3.png', answer: 7},
    {stars: 1, imagePath: '../static/img/easy/card_easy_4.png', answer: 8},
    {stars: 1, imagePath: '../static/img/easy/card_easy_5.png', answer: 8},
    {stars: 1, imagePath: '../static/img/easy/card_easy_6.png', answer: 6},

    {stars: 2, imagePath: '../static/img/medium/card_medium_1.png', answer: 9},
    {stars: 2, imagePath: '../static/img/medium/card_medium_2.png', answer: 9},
    {stars: 2, imagePath: '../static/img/medium/card_medium_3.png', answer: 11},
    {stars: 2, imagePath: '../static/img/medium/card_medium_4.png', answer: 12},
    {stars: 2, imagePath: '../static/img/medium/card_medium_5.png', answer: 12},
    {stars: 2, imagePath: '../static/img/medium/card_medium_6.png', answer: 10},

    {stars: 3, imagePath: '../static/img/hard/card_hard_1.png', answer: 16},
    {stars: 3, imagePath: '../static/img/hard/card_hard_2.png', answer: 18},
    {stars: 3, imagePath: '../static/img/hard/card_hard_3.png', answer: 16},
];

let ANSWERS = {
    '../static/img/easy/card_easy_1.png': 1,
    '../static/img/easy/card_easy_2.png': 2,
    '../static/img/easy/card_easy_3.png': 3,
    '../static/img/easy/card_easy_4.png': 4,
    '../static/img/easy/card_easy_5.png': 5,
    '../static/img/easy/card_easy_6.png': 6,

    '../static/img/medium/card_medium_1.png': 11,
    '../static/img/medium/card_medium_2.png': 12,
    '../static/img/medium/card_medium_3.png': 13,
    '../static/img/medium/card_medium_4.png': 14,
    '../static/img/medium/card_medium_5.png': 15,
    '../static/img/medium/card_medium_6.png': 16,

    '../static/img/hard/card_hard_1.png': 21,
    '../static/img/hard/card_hard_2.png': 22,
    '../static/img/hard/card_hard_3.png': 23,
};

let monsterImages = [
    '../static/img/bbb1.png',
    '../static/img/bbb3.png',
    '../static/img/bbb3.1.png',
];

enemyImage = new Image();
enemyImage.src = 'static/img/monstr1.png';

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
canvas.width = GAME.width;
canvas.height = GAME.height - 25;

let selected = -1;

let checkButton = document.querySelector("#check-answer")
let inputTitle = document.querySelector('#enter-answer')

let deckOpen = new Image(372, 312);
deckOpen.src = '../static/img/deck_w1.png';

let deckClose = new Image(372, 312);
deckClose.src = '../static/img/deck1.png';

let ph = new Image();
ph.src = '../static/img/ph.png';

let r0 = new Image();
r0.src = '../static/img/r0.png';

let r1 = new Image();
r1.src = '../static/img/r1.png';

let r2 = new Image();
r2.src = '../static/img/r2.png';

let r3 = new Image();
r3.src = '../static/img/r3.png';

let r4 = new Image();
r4.src = '../static/img/r4.png';

let r5 = new Image();
r5.src = '../static/img/r5.png';

let p0 = new Image();
p0.src = '../static/img/p0.png';

let p1 = new Image();
p1.src = '../static/img/p1.png';

let p2 = new Image();
p2.src = '../static/img/p2.png';

let p3 = new Image();
p3.src = '../static/img/p3.png';

let p4 = new Image();
p4.src = '../static/img/p4.png';

let p5 = new Image();
p5.src = '../static/img/p5.png';

let f = new FontFace('Comic', 'url(../static/font/zlu.ttf)');

let imagesToLoad = [
    '../static/img/bbb1.png',
    '../static/img/bbb3.png',
    '../static/img/bbb3.1.png',

    '../static/img/dC1.png',
    '../static/img/dBh1.png',
    '../static/img/ph.png',

    '../static/img/easy/card_easy_1.png',
    '../static/img/easy/card_easy_2.png',
    '../static/img/easy/card_easy_3.png',
    '../static/img/easy/card_easy_4.png',
    '../static/img/easy/card_easy_5.png',
    '../static/img/easy/card_easy_6.png',

    '../static/img/medium/card_medium_1.png',
    '../static/img/medium/card_medium_2.png',
    '../static/img/medium/card_medium_3.png',
    '../static/img/medium/card_medium_4.png',
    '../static/img/medium/card_medium_5.png',
    '../static/img/medium/card_medium_6.png',

    '../static/img/hard/card_hard_1.png',
    '../static/img/hard/card_hard_2.png',
    '../static/img/hard/card_hard_3.png',

    '../static/img/pxxx1.png',
    '../static/img/pxxx2.png',
    '../static/img/pxxx3.png',
];

let loadedImages = {};

let currentCardImagePath = '';

let currentBackgroundImage = '';

let backgroundImages = [
    '../static/img/pxxx1.png',
    '../static/img/pxxx2.png',
    '../static/img/pxxx3.png',
];

let timer;
let timerDuration = 120;

ph.onload = function () {
    f.load().then(function (font) {
        console.log('font ready');
        document.fonts.add(font);
        ctx.font = 'bold 50px Comic';
        drawMenu(true);
        initEventListener();
    });
};

function startTimer(start) {
    if (start) {
        timer = setInterval(() => {
            timerDuration--;
            drawTimer(timerDuration);

            if (timerDuration <= 0) {
                clearInterval(timer);
                redirectToLose(GAME.score, GAME.record);
            }
        }, 1000);
    }
}

function stopTimer() {
    clearInterval(timer);
}

function resetTimer() {
    stopTimer();
    timerDuration = 120;
    drawTimer(timerDuration);
}

function drawTimer(seconds) {
    ctx.font = 'bold 50px Comic';
    ctx.fillStyle = 'white';
    ctx.clearRect(20, 199, 200, 52);
    ctx.fillText(`Время: ${seconds}с`, 30, 240);
}

function initEventListener() {
    canvas.addEventListener('mousedown', onClick);

    checkButton.addEventListener('click', () => {
        let answer = Number(inputTitle.value);
        if (selected === 0 || selected === 1 || selected === 2) {
            stopTimer();
            checkAnswer(answer, selected + 1);
            enableCardSelection();
        }
    });

    window.addEventListener('keydown', onKeyDown);
}

function disableCardSelection() {
    canvas.removeEventListener('mousedown', onClick);
}

function enableCardSelection() {
    canvas.addEventListener('mousedown', onClick);
}

function onClick(event) {
    disableCardSelection();
    resetTimer();

    let clickX = event.clientX;

    let loadImagePromises = [];

    if (clickX < GAME.width / 3) {
        selected = 0;
        loadImagePromises.push(loadImage(generateEquation(1).imagePath));
        startTimer(true);
    }

    if ((clickX > GAME.width / 3) && (clickX < GAME.width / 3 * 2)) {
        selected = 1;
        loadImagePromises.push(loadImage(generateEquation(2).imagePath));
        startTimer(true);
    }

    if (clickX > (GAME.width / 3 * 2)) {
        selected = 2;
        loadImagePromises.push(loadImage(generateEquation(3).imagePath));
        startTimer(true);
    }

    Promise.all(loadImagePromises)
        .then(() => {
            draw(true, generateEquation(selected + 1));
        })
        .catch(error => {
            console.error('Ошибка загрузки изображения:', error);
        });
}


function onKeyDown(event) {
    if (event.key === 'b') {
        resetGame(true);
    }
}

function drawMenu() {
    ctx.fillStyle = '#2b2b2b';
    ctx.drawImage(ph, 0, 0);
    ctx.fillStyle = 'white';
    ctx.fillText('Нажмите «B» чтобы начать игру', GAME.width / 2 - 250, GAME.height / 2);
}

function resetGame(b) {
    GAME.record = parseInt(new URLSearchParams(window.location.search).get('record')) || 0;
    if (b === true) {
        let randomMonsterIndex = Math.floor(Math.random() * monsterImages.length);
        if (monsterImages[randomMonsterIndex] === '../static/img/bbb3.png') {
            ENEMY.width = 300;
        }
        if (monsterImages[randomMonsterIndex] === '../static/img/bbb3.1.png') {
            ENEMY.width = 400;
        }
        if (monsterImages[randomMonsterIndex] === '../static/img/bbb1.png') {
            ENEMY.width = 350;
        }

        enemyImage.src = monsterImages[randomMonsterIndex];
        console.log(monsterImages[randomMonsterIndex]);

        PLAYER.hp = 100;
        ENEMY.hp = 100;
        GAME.score = 0;

        CARDS.forEach(card => card.equation = generateEquation(card.stars));
        startTimer();
        enableCardSelection();

        draw();
    }
}

function generateEquation(difficulty) {
    let cardOptions = CARDS.filter(card => card.stars === difficulty);
    let selectedCard = cardOptions[Math.floor(Math.random() * cardOptions.length)];
    currentCardImagePath = selectedCard.imagePath;
    return selectedCard;
}

function redirectToWin(score, record) {
    window.location.href = `/win?score=${score}&record=${record}`;
}

function redirectToLose(score, record) {
    window.location.href = `/lose?score=${score}&record=${record}`;
}

function checkAnswer(answer) {
    let correctAnswer = ANSWERS[currentCardImagePath];

    if (answer === correctAnswer) {
        ENEMY.hp -= answer;
        GAME.score += (selected + 1);
        if (GAME.record <= GAME.score) GAME.record = GAME.score;
        CARDS.forEach(card => card.equation = generateEquation(card.stars));
        if (ENEMY.hp <= 0) {
            redirectToWin(GAME.score, GAME.record);
        } else {
            draw();
        }
    } else {
        PLAYER.hp -= correctAnswer;
        CARDS.forEach(card => card.equation = generateEquation(card.stars));
        if (PLAYER.hp <= 0) {
            redirectToLose(GAME.score, GAME.record);
        } else {
            draw();
        }
    }
}

function drawTextWithOutline(text, x, y, fillStyle, strokeStyle) {
    ctx.font = 'bold 70px Comic';
    ctx.fillStyle = fillStyle;
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = 5;
    ctx.strokeText(text, x, y);
    ctx.fillText(text, x, y);
}

function drawEnemyHealthBar() {
    let barWidth = 208;
    let barHeight = 72;
    let numSegments = 5;

    ctx.imageSmoothingEnabled = false;

    for (let i = 0; i < numSegments; i++) {
        let spriteToDraw;
        if (ENEMY.hp === 100) {
            spriteToDraw = r5;
        } else if (ENEMY.hp > 80) {
            spriteToDraw = r4;
        } else if (ENEMY.hp > 60) {
            spriteToDraw = r3;
        } else if (ENEMY.hp > 40) {
            spriteToDraw = r2;
        } else if (ENEMY.hp > 20) {
            spriteToDraw = r1;
        } else {
            spriteToDraw = r0;
        }

        ctx.drawImage(spriteToDraw, 10, 20, barWidth, barHeight);
    }
}

function drawPlayerHealthBar() {
    let barWidth = 208;
    let barHeight = 72;
    let numSegments = 5;

    ctx.imageSmoothingEnabled = false;

    for (let i = 0; i < numSegments; i++) {
        let spriteToDraw;
        if (PLAYER.hp === 100) {
            spriteToDraw = p5;
        } else if (PLAYER.hp > 80) {
            spriteToDraw = p4;
        } else if (PLAYER.hp > 60) {
            spriteToDraw = p3;
        } else if (PLAYER.hp > 40) {
            spriteToDraw = p2;
        } else if (PLAYER.hp > 20) {
            spriteToDraw = p1;
        } else {
            spriteToDraw = p0;
        }

        ctx.drawImage(spriteToDraw, GAME.width - 240, 20, barWidth, barHeight);
    }
}

function draw(clicked, card) {
    ctx.fillStyle = '#2b2b2b';

    if (loadedImages[currentBackgroundImage]) {
        ctx.drawImage(loadedImages[currentBackgroundImage], 0, 0, canvas.width, canvas.height);
    } else {
    }

    drawEnemyHealthBar();
    drawPlayerHealthBar();

    ctx.drawImage(enemyImage, ENEMY.x - ENEMY.width / 2, ENEMY.y + 39, ENEMY.width, ENEMY.height);

    ctx.drawImage(deckClose, 25, GAME.height / 2 + 30, 372, 312);
    ctx.drawImage(deckClose, GAME.width / 2 - 186, GAME.height / 2 + 30, 372, 312);
    ctx.drawImage(deckClose, GAME.width - 372 - 25, GAME.height / 2 + 30, 372, 312);

    drawTextWithOutline('Легко', 160, GAME.height / 2 + 180, 'white', 'black');
    drawTextWithOutline('Средне', GAME.width / 2 - 70, GAME.height / 2 + 180, 'white', 'black');
    drawTextWithOutline('Сложно', GAME.width - 280, GAME.height / 2 + 180, 'white', 'black');

    ctx.font = 'bold 50px Comic';
    ctx.fillStyle = 'white';
    ctx.fillText(`Счёт: ${GAME.score}`, 30, 150)
    ctx.fillText(`Рекорд: ${GAME.record}`, 30, 190)

    ctx.fillStyle = 'black';
    ctx.imageSmoothingEnabled = false;
    if (clicked === true) {
        if (selected === 0) {
            let pic = new Image();
            pic.src = card.imagePath;
            ctx.drawImage(deckOpen, 25, GAME.height / 2 + 30, 372, 312);
            ctx.drawImage(pic, 60, GAME.height / 2 + 70, 280, 175);
            console.log(card.imagePath);
        }
        if (selected === 1) {
            let pic = new Image();
            pic.src = card.imagePath;
            ctx.drawImage(deckOpen, GAME.width / 2 - 186, GAME.height / 2 + 30, 372, 312);
            ctx.drawImage(pic, GAME.width / 2 - 140, GAME.height / 2 + 70, 280, 175);
            console.log(card.imagePath);
        }
        if (selected === 2) {
            let pic = new Image();
            pic.src = card.imagePath;
            ctx.drawImage(deckOpen, GAME.width - 372 - 25, GAME.height / 2 + 30, 372, 312);
            ctx.drawImage(pic, GAME.width - 350, GAME.height / 2 + 70, 280, 175);
            console.log(card.imagePath);
        }
    }
}

async function loadImage(src) {
    return new Promise((resolve, reject) => {
        let image = new Image();
        image.onload = () => resolve(image);
        image.onerror = reject;
        image.src = src;
    });
}

async function loadImages(imagePaths) {
    let loadedImages = {};
    for (let path of imagePaths) {
        loadedImages[path] = await loadImage(path);
    }
    return loadedImages;
}

async function startGame() {
    try {
        loadedImages = await loadImages(imagesToLoad);
        currentBackgroundImage = backgroundImages[Math.floor(Math.random() * backgroundImages.length)];
    } catch (error) {
        console.error('Ошибка загрузки изображений:', error);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    startGame().then(_ => {
        drawTimer(timerDuration);
        enableCardSelection();
    });
});