let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 400;

// Устанавливаем центр вращения в центр изображения
ctx.translate(canvas.width / 2, canvas.height / 2);

// Создаем матрицу трансформации
let perspectiveMatrix = [
    [1, 0, 0],
    [0, 0.5, 0],
    [0.005, 0.005, 1]
];

// Применяем матрицу трансформации
ctx.transform(perspectiveMatrix[0][0], perspectiveMatrix[0][1],
              perspectiveMatrix[1][0], perspectiveMatrix[1][1],
              perspectiveMatrix[2][0], perspectiveMatrix[2][1]);

// Рисуем объект (например, прямоугольник)
ctx.fillRect(-50, -50, 100, 100);