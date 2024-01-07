let GAME = {
    width: window.innerWidth - 50,
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
    '../static/img/monstr1.png',
    '../static/img/monstr2.png',
    '../static/img/monstr3.png',
];

enemyImage = new Image();
enemyImage.src = 'static/img/monstr1.png';

let CARDS = [
    {stars: 1, imagePath: '../static/img/easy/card_easy_1.png', answer: 1.1},
    {stars: 1, imagePath: '../static/img/easy/card_easy_2.png', answer: 1.2},
    {stars: 1, imagePath: '../static/img/easy/card_easy_3.png', answer: 1.3},
    {stars: 1, imagePath: '../static/img/easy/card_easy_4.png', answer: 1.4},
    {stars: 1, imagePath: '../static/img/easy/card_easy_5.png', answer: 1.5},
    {stars: 1, imagePath: '../static/img/easy/card_easy_6.png', answer: 1.6},

    {stars: 2, imagePath: '../static/img/medium/card_medium_1.png', answer: 2.1},
    {stars: 2, imagePath: '../static/img/medium/card_medium_2.png', answer: 2.2},
    {stars: 2, imagePath: '../static/img/medium/card_medium_3.png', answer: 2.3},
    {stars: 2, imagePath: '../static/img/medium/card_medium_4.png', answer: 2.4},
    {stars: 2, imagePath: '../static/img/medium/card_medium_5.png', answer: 2.5},
    {stars: 2, imagePath: '../static/img/medium/card_medium_6.png', answer: 2.6},

    {stars: 3, imagePath: '../static/img/hard/card_hard_1.png', answer: 3.1},
    {stars: 3, imagePath: '../static/img/hard/card_hard_2.png', answer: 3.2},
    {stars: 3, imagePath: '../static/img/hard/card_hard_3.png', answer: 3.3},
];

let ANSWERS = {
    1.1: 2,
    1.2: 4,

    2.1: 16,
    2.2: 6,

    3.1: 21,
    3.2: 100,
};

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
    if (event.key === 'b') resetGame(true);
}

function drawMenu() {
    ctx.fillStyle = '#2b2b2b';
    ctx.drawImage(ph, 0, 0);
    ctx.fillStyle = 'white';
    ctx.fillText('Нажмите «B» чтобы начать игру', GAME.width / 2 - 250, GAME.height / 2);
}

function gameOver(b) {
    ctx.fillStyle = '#2b2b2b';
    ctx.drawImage(ph, 0, 0);

    ctx.fillStyle = 'white';
    if (b === true) {
        ctx.fillText(`Вы выиграли! Счёт: ${GAME.score}`, GAME.width / 2 - 140, GAME.height / 2);
        if (GAME.score > GAME.record) GAME.record = GAME.score;
    } else ctx.fillText('Вы проиграли', GAME.width / 2 - 80, GAME.height / 2);

    // выбор гифки игрока заново

    ctx.fillText('Нажмите «B» чтобы начать заново', GAME.width / 2 - 230, GAME.height / 2 + 60);
}

function resetGame(b) {
    if (b === true) {
        let randomMonsterIndex = Math.floor(Math.random() * monsterImages.length);
        enemyImage.src = monsterImages[randomMonsterIndex];

        PLAYER.hp = 100;
        ENEMY.hp = 100;
        GAME.score = 0;

        CARDS.forEach(card => card.equation = generateEquation(card.stars));

        draw();
    }
}

function generateEquation(difficulty) {
    let cardOptions = CARDS.filter(card => card.stars === difficulty);
    return cardOptions[Math.floor(Math.random() * cardOptions.length)];
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

        ctx.fillStyle = `rgba(255, 0, 59, ${alpha})`;
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

        ctx.fillStyle = `rgba(0, 222, 48, ${alpha})`;
        ctx.fillRect(segmentX, 50, segmentWidth, barHeight);
    }
}

function draw(clicked, card) {
    ctx.fillStyle = '#2b2b2b';
    ctx.drawImage(ph, 0, 0);

    // ХП врага и игрока
    drawEnemyHealthBar();
    drawPlayerHealthBar();

    ctx.drawImage(enemyImage, ENEMY.x - ENEMY.width / 2, ENEMY.y, ENEMY.width, ENEMY.height);


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
    '../static/img/monster1.png',
    '../static/img/monster2.png',
    '../static/img/monster3.png',
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