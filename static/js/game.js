let GAME = {
    width: window.innerWidth,
    height: window.innerHeight,
    fps: 30,
    background: '#004d44',
    playable: true,
}


let BALL = {
    col: '#6fff00', // d0f
    x: 100,
    y: 100,
    rad: 20,
    vel_x: 10,
    vel_y: Math.random() * 10
}


let RACKET = {
    col: '#6fff00',
    x: 0,
    y: 100,
    w: 10,
    h: 150,
    vel_y: 3,
    score: 0,
}

let RACKET_2 = {
    col: '#6fff00',
    x: GAME.width - 35,
    y: 100,
    w: 10,
    h: 150,
    vel_y: 3,
    score: 0,
}


let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
canvas.width = GAME.width - 25;
canvas.height = GAME.height - 25;

let ballImage = new Image();
ballImage.src = '../static/img/shrek.png';

let bolotoImage = new Image();
bolotoImage.src = '../static/img/boloto1.png';

let sssImage = new Image();
sssImage.src = '../static/img/sss.png';

let over = new Audio('../static/sound/over.mp3');
let click = new Audio('../static/sound/click.mp3');


function initEventListener() {
    canvas.addEventListener('mousemove', onCanvasMoveEvent);
    window.addEventListener('keydown', onKeyDownEvent);
}

function onCanvasMoveEvent(event) {
    RACKET.y = event.clientY - RACKET.h / 2;
}

function onKeyDownEvent(event) {
    if (event.key === 's') {
        RACKET_2.y += 75;
    }
    if (event.key === 'w') {
        RACKET_2.y -= 75;
    }
}

function draw_back() {
    ctx.drawImage(bolotoImage, 0, 0);
    ctx.font = '30px Montserrat';
    ctx.fillStyle = '#6fff00';
    ctx.fillText('Счёт левого: ' + RACKET.score, GAME.width - 340, 40);
    ctx.fillText('Счёт правого: ' + RACKET_2.score, GAME.width - 340, 80);
}

function draw_ball() {
    ctx.drawImage(ballImage, BALL.x - BALL.rad, BALL.y - BALL.rad, BALL.rad * 2, BALL.rad * 2);
}

function draw_racket() {
    ctx.fillStyle = RACKET.col;
    ctx.fillRect(RACKET.x, RACKET.y, RACKET.w, RACKET.h);
    ctx.fill();

    ctx.fillStyle = RACKET_2.col;
    ctx.fillRect(RACKET_2.x, RACKET_2.y, RACKET_2.w, RACKET_2.h);
    ctx.fill();
}

function update_racket() {
    if (RACKET.y + RACKET.h >= GAME.height) RACKET.y = GAME.height - RACKET.h;
    if (RACKET.y <= 0) RACKET.y = 0;

    if (RACKET_2.y + RACKET_2.h >= GAME.height) RACKET_2.y = GAME.height - RACKET_2.h;
    if (RACKET_2.y <= 0) RACKET_2.y = 0;
}


function update_ball() {
    BALL.x += BALL.vel_x;
    BALL.y += BALL.vel_y;

    if (BALL.y - BALL.rad <= 0 || BALL.y + BALL.rad >= GAME.height) BALL.vel_y *= -1;

    if (RACKET.y <= BALL.y && BALL.y <= RACKET.y + RACKET.h && BALL.x - BALL.rad <= RACKET.x + RACKET.w) {
        click.play();
        BALL.vel_x *= -1;
        RACKET.score += 1;
    }

    if (RACKET_2.y <= BALL.y + BALL.rad && BALL.y + BALL.rad <= RACKET_2.y + RACKET_2.h && BALL.x >= RACKET_2.x - RACKET_2.w && BALL.x + BALL.rad <= GAME.width + 10) {
        click.play();
        BALL.vel_x *= -1;
        RACKET_2.score += 1;
    }

    if (BALL.x <= -100 || BALL.x >= GAME.width + 30) GAME.playable = false;
}

function draw_frame() {
    draw_back();
    draw_ball();
    draw_racket();
    update_ball();
    update_racket();
}

function game_over() {
    over.play();
    ctx.drawImage(sssImage, GAME.width / 2 - 150, GAME.height / 2 + 25);
    ctx.font = '30px Montserrat'
    ctx.fillText('Игра окончена', GAME.width / 2 - 140, GAME.height / 2 - 135)
    ctx.fillText('Счёт первого: ' + RACKET.score, GAME.width / 2 - 140, GAME.height / 2 - 95)
    ctx.fillText('Счёт второго: ' + RACKET_2.score, GAME.width / 2 - 140, GAME.height / 2 - 55)
    if (RACKET.score > RACKET_2.score) ctx.fillText('Победил первый', GAME.width / 2 - 140, GAME.height / 2 - 15)
    else if (RACKET.score < RACKET_2.score) ctx.fillText('Победил второй', GAME.width / 2 - 140, GAME.height / 2 - 15)
    else ctx.fillText('Ничья', GAME.width / 2 - 140, GAME.height / 2 - 15)

}

``

function play() {
    if (GAME.playable === true) {
        draw_frame();
        requestAnimationFrame(play);
        console.log(GAME.score)
    } else game_over();

}

initEventListener();
play();
