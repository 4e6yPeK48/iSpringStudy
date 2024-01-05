let canvas = document.getElementById("canvas");
let canvasContext = canvas.getContext("2d");
c_width = window.innerWidth / 2;
c_height = window.innerHeight / 2;
canvas.width = c_width;
canvas.height = c_height;

// небо
let gradient = canvasContext.createLinearGradient(0, 0, 0, canvas.height);
gradient.addColorStop(0, '#4a71ff');
gradient.addColorStop(0.5, '#c2cffc');
gradient.addColorStop(1, '#a8806f');
canvasContext.fillStyle = gradient;
canvasContext.fillRect(0, 0, c_width, c_height / 2);

// солнце
canvasContext.fillStyle = '#f0baa3';
canvasContext.beginPath();
canvasContext.arc(c_width / 2, c_height / 2 - 30, 40, 0, 2 * Math.PI)
canvasContext.closePath();
canvasContext.fill();

canvasContext.fillStyle = '#e08863';
canvasContext.beginPath();
canvasContext.arc(c_width / 2, c_height / 2 - 30, 35, 0, 2 * Math.PI)
canvasContext.closePath();
canvasContext.fill();

canvasContext.fillStyle = '#ff6929';
canvasContext.beginPath();
canvasContext.arc(c_width / 2, c_height / 2 - 30, 30, 0, 2 * Math.PI)
canvasContext.closePath();
canvasContext.fill();

// трава
let gradient_green = canvasContext.createLinearGradient(0, 0, 0, canvas.height);
gradient_green.addColorStop(0, '#007d04');
gradient_green.addColorStop(0.5, '#00ba06');
gradient_green.addColorStop(1, '#67bf7a');
canvasContext.fillStyle = gradient_green;
canvasContext.fillRect(0, c_height / 2 - 20, c_width, c_height);

// тело дома
canvasContext.fillStyle = '#382821';
canvasContext.fillRect(60, 250 - 50, 100, 100)

// крыша
canvasContext.fillStyle = '#382821';
canvasContext.beginPath();
canvasContext.moveTo(40, 250 - 50);
canvasContext.lineTo(180, 250 - 50);
canvasContext.lineTo(110, 200 - 50);
canvasContext.closePath();
canvasContext.fill();

// обводка дома
canvasContext.strokeStyle = 'black';
canvasContext.lineWidth = 2;
canvasContext.beginPath();
canvasContext.moveTo(40, 250 - 50);
canvasContext.lineTo(110, 200 - 50);
canvasContext.closePath();
canvasContext.stroke();

canvasContext.beginPath();
canvasContext.moveTo(110, 200 - 50);
canvasContext.lineTo(180, 250 - 50);
canvasContext.closePath();
canvasContext.stroke();

canvasContext.beginPath();
canvasContext.moveTo(40, 250 - 50);
canvasContext.lineTo(60, 250 - 50);
canvasContext.closePath();
canvasContext.stroke();

canvasContext.beginPath();
canvasContext.moveTo(180, 250 - 50);
canvasContext.lineTo(160, 250 - 50);
canvasContext.closePath();
canvasContext.stroke();

canvasContext.beginPath();
canvasContext.moveTo(160, 250 - 50);
canvasContext.lineTo(160, 350 - 50);
canvasContext.closePath();
canvasContext.stroke();

canvasContext.beginPath();
canvasContext.moveTo(60, 250 - 50);
canvasContext.lineTo(60, 350 - 50);
canvasContext.closePath();
canvasContext.stroke();

canvasContext.beginPath();
canvasContext.moveTo(60, 350 - 50);
canvasContext.lineTo(160, 350 - 50);
canvasContext.closePath();
canvasContext.stroke();

// окно
canvasContext.fillStyle = '#63acff';
canvasContext.beginPath();
canvasContext.arc(110, 235 - 50, 12, 0, 2 * Math.PI)
canvasContext.closePath();
canvasContext.fill();
canvasContext.stroke();

// окно черное
canvasContext.fillRect(102, 270 - 50, 16, 16);
canvasContext.fill();

canvasContext.strokeStyle = 'black';
canvasContext.lineWidth = 1;
canvasContext.beginPath();
canvasContext.moveTo(102, 270 - 50);
canvasContext.lineTo(118, 270 - 50);
canvasContext.lineTo(118, 286 - 50);
canvasContext.lineTo(102, 286 - 50);
canvasContext.lineTo(102, 270 - 50);

canvasContext.moveTo(110, 270 - 50);
canvasContext.lineTo(110, 286 - 50);

canvasContext.moveTo(102, 278 - 50);
canvasContext.lineTo(118, 278 - 50);
canvasContext.closePath()
canvasContext.stroke();

// мишень
canvasContext.fillStyle = '#382821';
canvasContext.fillRect(220 + 60, 180, 60, 70);

canvasContext.beginPath();
canvasContext.moveTo(220 + 60, 250);
canvasContext.lineTo(210 + 60, 280);
canvasContext.closePath();
canvasContext.stroke();

canvasContext.beginPath();
canvasContext.moveTo(220 + 60, 250);
canvasContext.lineTo(235 + 60, 275);
canvasContext.closePath();
canvasContext.stroke();

canvasContext.beginPath();
canvasContext.moveTo(280 + 60, 250);
canvasContext.lineTo(270 + 60, 280);
canvasContext.closePath();
canvasContext.stroke();

canvasContext.beginPath();
canvasContext.moveTo(280 + 60, 250);
canvasContext.lineTo(295 + 60, 275);
canvasContext.closePath();
canvasContext.stroke();

function draw_circle(color, radius) {
    canvasContext.fillStyle = color;
    canvasContext.beginPath();
    canvasContext.arc(250 + 60, 210, radius, 0, 2 * Math.PI)
    canvasContext.closePath();
    canvasContext.fill();
}

draw_circle('red', 25);
draw_circle('blue', 20);
draw_circle('#15ff00', 15);
draw_circle('red', 10);
draw_circle('blue', 5);


// цветки на небе
function drawFlower(x, y, z) {
    for (let i = 0; i < 6; i++) {
        canvasContext.beginPath();
        canvasContext.translate(x, y);
        canvasContext.rotate((60 * i * Math.PI) / 180 + z);
        canvasContext.translate(-100, -100);
        canvasContext.moveTo(100, 100);
        canvasContext.quadraticCurveTo(115, 75, 100, 50);
        canvasContext.quadraticCurveTo(85, 75, 100, 100);
        canvasContext.fillStyle = '#b34fff';
        canvasContext.fill();
        canvasContext.setTransform(1, 0, 0, 1, 0, 0);
    }

    canvasContext.beginPath();
    canvasContext.arc(x, y, 10, 0, Math.PI * 2);
    canvasContext.fillStyle = '#540094';
    canvasContext.fill();

}

drawFlower(50, 30, 70);
drawFlower(250, 80, 20);
drawFlower(375, 10, 50);
drawFlower(500, 100, -10);
drawFlower(650, 50, -30);