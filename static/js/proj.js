let GAME = {
    width: window.innerWidth, height: window.innerHeight,
}

let PLAYER = {
    hp: 100, damage: 0,
};

let ENEMY = {
    hp: 100, width: 50, height: 50, x: GAME.width / 2 - 25, y: 50,
};

let selected = -1;

let CARDS = [{stars: 1, equation: generateEquation(1)}, {stars: 2, equation: generateEquation(2)}, {
    stars: 3,
    equation: generateEquation(3)
},];

console.log(CARDS[0].equation)
console.log(CARDS[1].equation)
console.log(CARDS[2].equation)

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
canvas.width = GAME.width - 25;
canvas.height = GAME.height - 25;

let checkButton = document.querySelector("#btn")
let inputTitle = document.querySelector('#enter')

function initEventListener() {
    canvas.addEventListener('mousedown', onClick);
    checkButton.addEventListener('click', () => {
        let answer = Number(inputTitle.value);
        console.log(selected)
        if (selected === 0) {
            checkAnswer(answer, 1);
            console.log(answer, CARDS[0].equation);
        }
        if (selected === 1) {
            checkAnswer(answer, 2);
            console.log(answer, CARDS[1].equation);
        }
        if (selected === 2) {
            checkAnswer(answer, 3);
            console.log(answer, CARDS[2].equation);
        }

    })
}


function onClick(event) {
    let clickX = event.clientX;

    if (clickX < GAME.width / 3) {
        selected = 0;
        draw(true, CARDS[0].equation);
        console.log(CARDS[0].equation)
    }
    if ((clickX > GAME.width / 3) && (clickX < GAME.width / 3 * 2)) {
        selected = 1;
        draw(true, CARDS[1].equation);
        console.log(CARDS[1].equation)
    }
    if (clickX > (GAME.width / 3 * 2)) {
        selected = 2;
        draw(true, CARDS[2].equation);
        console.log(CARDS[2].equation)
    }
}

function generateEquation(difficulty) {
    let operators = ['+', '-', '*'];
    let operator = operators[Math.floor(Math.random() * operators.length)];
    let num1 = Math.floor(Math.random() * 10 * difficulty);
    let num2 = Math.floor(Math.random() * 10 * difficulty);
    return `${num1} ${operator} ${num2}`;
}

function game_over(b){
    if (b === true){
        ctx.clearRect(0, 0, GAME.width, GAME.height);
        ctx.font = '20px Montserrat';
        ctx.fillText('')
    }
}

function checkAnswer(answer, stars) {
    console.log('stars', stars - 1)
    let result = eval(CARDS[stars - 1].equation);
    console.log(answer, result, 'ansssss')
    if (answer === result) {
        ENEMY.hp -= answer;
        CARDS.forEach(card => card.equation = generateEquation(card.stars));
        console.log('player', PLAYER.hp, 'enemy', ENEMY.hp);
        if (ENEMY.hp <= 0) {
            game_over(true);
            resetGame();
        } else {
            draw();
        }
    } else {
        PLAYER.hp -= answer;
        CARDS.forEach(card => card.equation = generateEquation(card.stars));
        console.log('player', PLAYER.hp, 'enemy', ENEMY.hp);
        if (PLAYER.hp <= 0) {
            game_over(false);
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

function draw(clicked, eq) {
    ctx.clearRect(0, 0, GAME.width, GAME.height);

    // хп игрока
    ctx.font = '20px Montserrat';
    ctx.fillText(`ХП игрока: ${PLAYER.hp}`, 10, 40)

    // хп врага
    ctx.fillText(`ХП врага: ${ENEMY.hp}`, 10, 60)

    // карты
    for (let i = 0; i < CARDS.length; i++) {
        let card = CARDS[i];
        ctx.fillStyle = 'lightgray';
        ctx.fillRect(i * (GAME.width / CARDS.length), GAME.height - 100, GAME.width / CARDS.length, 100);
        ctx.fillStyle = 'black';
        ctx.fillText(`Сложность: ${card.stars}`, i * (GAME.width / CARDS.length) + 10, GAME.height - 80);
    }

    // выражение
    if (clicked === true) {
        ctx.fillText(`Вычислите выражение ${eq}`, 100, 100)
    }
}

initEventListener();
resetGame();