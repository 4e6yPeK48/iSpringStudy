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

let monsterImages = [
    '../static/img/bbb1.png',
    '../static/img/bbb3.png',
    '../static/img/bbb3.1.png',
];

let CARDS = [
    {stars: 1, imagePath: '../static/img/easy/card_easy_1.png', answer: 10},
    {stars: 1, imagePath: '../static/img/easy/card_easy_2.png', answer: 10},
    {stars: 1, imagePath: '../static/img/easy/card_easy_3.png', answer: 10},
    {stars: 1, imagePath: '../static/img/easy/card_easy_4.png', answer: 10},
    {stars: 1, imagePath: '../static/img/easy/card_easy_5.png', answer: 10},
    {stars: 1, imagePath: '../static/img/easy/card_easy_6.png', answer: 10},

    {stars: 2, imagePath: '../static/img/medium/card_medium_1.png', answer: 20},
    {stars: 2, imagePath: '../static/img/medium/card_medium_2.png', answer: 20},
    {stars: 2, imagePath: '../static/img/medium/card_medium_3.png', answer: 20},
    {stars: 2, imagePath: '../static/img/medium/card_medium_4.png', answer: 20},
    {stars: 2, imagePath: '../static/img/medium/card_medium_5.png', answer: 20},
    {stars: 2, imagePath: '../static/img/medium/card_medium_6.png', answer: 20},

    {stars: 3, imagePath: '../static/img/hard/card_hard_1.png', answer: 30},
    {stars: 3, imagePath: '../static/img/hard/card_hard_2.png', answer: 30},
    {stars: 3, imagePath: '../static/img/hard/card_hard_3.png', answer: 30},
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
deckOpen.src = '../static/img/dC1.png';

let deckClose = new Image(372, 312);
deckClose.src = '../static/img/dBh1.png';

let ph = new Image();
ph.src = '../static/img/ph.png';

let f = new FontFace('Comic', 'url(../static/font/zlu.ttf)');

ph.onload = function () {
    f.load().then(function (font) {
        console.log('font ready');
        document.fonts.add(font);
        ctx.font = 'bold 50px Comic';
        drawMenu(true);
        initEventListener();
    });
};

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

    let loadImagePromises = [];

    if (clickX < GAME.width / 3) {
        selected = 0;
        loadImagePromises.push(loadImage(generateEquation(1).imagePath));
    }

    if ((clickX > GAME.width / 3) && (clickX < GAME.width / 3 * 2)) {
        selected = 1;
        loadImagePromises.push(loadImage(generateEquation(2).imagePath));
    }

    if (clickX > (GAME.width / 3 * 2)) {
        selected = 2;
        loadImagePromises.push(loadImage(generateEquation(3).imagePath));
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

        draw();
    }
}

function generateEquation(difficulty) {
    let cardOptions = CARDS.filter(card => card.stars === difficulty);
    let selectedCard = cardOptions[Math.floor(Math.random() * cardOptions.length)];
    currentCardImagePath = selectedCard.imagePath;
    return selectedCard;
}

let currentCardImagePath = '';

function redirectToWin(score, record) {
    window.location.href = `/win?score=${score}&record=${record}`;
}

function redirectToLose(score, record) {
    window.location.href = `/lose?score=${score}&record=${record}`;
}

function checkAnswer(answer) {
    let correctAnswer = ANSWERS[currentCardImagePath];
    console.log(typeof answer, answer, typeof correctAnswer, correctAnswer, 'ans');

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
        PLAYER.hp -= answer;
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
    let barWidth = 150;
    let barHeight = 20;
    let numSegments = 5;
    let segmentWidth = barWidth / numSegments;
    let segmentPercentage = 20;

    ctx.fillStyle = 'black';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.rect(10, 20, barWidth, barHeight);
    ctx.stroke();

    for (let i = 0; i < numSegments; i++) {
        let segmentX = 10 + i * segmentWidth;
        let alpha = Math.max(0, Math.min(1, (ENEMY.hp - i * segmentPercentage) / segmentPercentage));

        ctx.fillStyle = `rgba(255, 0, 77, ${alpha})`;
        ctx.fillRect(segmentX, 20, segmentWidth, barHeight);
    }
}

function drawPlayerHealthBar() {
    let barWidth = 150;
    let barHeight = 20;
    let numSegments = 5;
    let segmentWidth = barWidth / numSegments;
    let segmentPercentage = 20;

    ctx.fillStyle = 'black';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.rect(10, 50, barWidth, barHeight);
    ctx.stroke();

    for (let i = 0; i < numSegments; i++) {
        let segmentX = 10 + i * segmentWidth;
        let alpha = Math.max(0, Math.min(1, (PLAYER.hp - i * segmentPercentage) / segmentPercentage));

        ctx.fillStyle = `rgba(0, 72, 255, ${alpha})`;
        ctx.fillRect(segmentX, 50, segmentWidth, barHeight);
    }
}

let currentBackgroundImage = '';

let backgroundImages = [
    '../static/img/pxxx1.png',
    '../static/img/pxxx2.png',
    '../static/img/pxxx3.png',
];

function draw(clicked, card) {
    ctx.fillStyle = '#2b2b2b';

    if (loadedImages[currentBackgroundImage]) {
        ctx.drawImage(loadedImages[currentBackgroundImage], 0, 0, canvas.width, canvas.height);
    } else {
    }

    // ХП врага и игрока
    drawEnemyHealthBar();
    drawPlayerHealthBar();

    // Враг
    ctx.drawImage(enemyImage, ENEMY.x - ENEMY.width / 2, ENEMY.y + 39, ENEMY.width, ENEMY.height);

    // Карты неизвестные
    ctx.drawImage(deckClose, 25, GAME.height / 2 + 30, 372, 312);
    ctx.drawImage(deckClose, GAME.width / 2 - 186, GAME.height / 2 + 30, 372, 312);
    ctx.drawImage(deckClose, GAME.width - 372 - 25, GAME.height / 2 + 30, 372, 312);

    // Сложность на картах
    drawTextWithOutline('Легко', 160, GAME.height / 2 + 180, 'white', 'black');
    drawTextWithOutline('Средне', GAME.width / 2 - 70, GAME.height / 2 + 180, 'white', 'black');
    drawTextWithOutline('Сложно', GAME.width - 280, GAME.height / 2 + 180, 'white', 'black');

    // Счёт
    ctx.font = 'bold 50px Comic';
    ctx.fillStyle = 'white';
    ctx.fillText(`Счёт: ${GAME.score}`, GAME.width - 200, 50)
    ctx.fillText(`Рекорд: ${GAME.record}`, GAME.width - 200, 90)

    // Выражение на карте
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

let imagesToLoad = [
    '../static/img/bbb1.png',
    '../static/img/bbb3.png',
    '../static/img/bbb3.1.png',

    '../static/img/dC1.png',
    '../static/img/dBh1.png',
    '../static/img/ph.png',

    // Добавляем изображения для карточек
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
    startGame();
});
// TODO: добавить таймер
// TODO: добавить рекорды
// TODO: ровно подписать + расширить вниз канвас
// TODO: не давать возможность сменить карточку