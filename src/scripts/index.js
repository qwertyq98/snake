import '../styles/index.css';
import { getRandomInt } from './utils';

let startSpeed = 10;
let count = 0;

const canvas = document.getElementById('game');
const context = canvas.getContext('2d');
const grid = 20;
const cellsCount = 20;
const snake = {
  x: getRandomInt(0, cellsCount) * grid,
  y: getRandomInt(0, cellsCount) * grid,
  dx: grid,
  dy: 0,
  cells: [],
  maxCells: 3
};
const apple = {
  x: getRandomInt(0, cellsCount) * grid,
  y: getRandomInt(0, cellsCount) * grid
};

function loop() {
    requestAnimationFrame(loop);
    //замедляет скорость игры с 60 кадров в секунду до 10. пропускает каждый 10
    if (++count < startSpeed) {
      return;
    }
    count = 0;
    context.clearRect(0, 0, canvas.width, canvas.height);
    snake.x += snake.dx;
    snake.y += snake.dy;
    
    if (snake.x < 0) {
      snake.x = canvas.width - grid;
    }
    else if (snake.x >= canvas.width) {
      snake.x = 0;
    }
    if (snake.y < 0) {
      snake.y = canvas.height - grid;
    }
    else if (snake.y >= canvas.height) {
      snake.y = 0;
    }


    // Продолжаем двигаться в выбранном направлении. Голова всегда впереди, поэтому добавляем её координаты в начало массива, который отвечает за всю змейку.
    snake.cells.unshift({ x: snake.x, y: snake.y });
    // Сразу после этого удаляем последний элемент из массива змейки, потому что она движется и постоянно особождает клетки после себя
    if (snake.cells.length > snake.maxCells) {
      snake.cells.pop();
    }

    context.fillStyle = '#d12527';
    context.fillRect(apple.x, apple.y, grid - 1, grid - 1);
    // Одно движение змейки — один новый нарисованный квадратик 
    context.fillStyle = '#bdda57';
    // Обрабатываем каждый элемент змейки
    snake.cells.forEach(function (cell, index) {
      // Чтобы создать эффект клеточек, делаем зелёные квадратики меньше на один пиксель, чтобы вокруг них образовалась чёрная граница
      context.fillRect(cell.x, cell.y, grid - 1, grid - 1);
      // Если змейка добралась до яблока...
      if (cell.x === apple.x && cell.y === apple.y) {
        // увеличиваем длину змейки
        snake.maxCells++;
        // Рисуем новое яблочко
        // Помним, что размер холста у нас 400x400, при этом он разбит на ячейки — 25 в каждую сторону
        apple.x = getRandomInt(0, cellsCount) * grid;
        apple.y = getRandomInt(0, cellsCount) * grid;
      }
      // Проверяем, не столкнулась ли змея сама с собой
      // Для этого перебираем весь массив и смотрим, есть ли у нас в массиве змейки две клетки с одинаковыми координатами 
      for (let i = index + 1; i < snake.cells.length; i++) {
        // Если такие клетки есть — начинаем игру заново
        if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
          // Задаём стартовые параметры основным переменным
          snake.x = getRandomInt(0, cellsCount) * grid;
          snake.y = getRandomInt(0, cellsCount) * grid;
          snake.cells = [];
          snake.maxCells = 3;
          snake.dx = grid;
          snake.dy = 0;
          // Ставим яблочко в случайное место
          apple.x = getRandomInt(0, cellsCount) * grid;
          apple.y = getRandomInt(0, cellsCount) * grid;
        }
      }
    });
  }

document.addEventListener('keydown', function (e) {
    // Стрелка влево
    // Если нажата стрелка влево, и при этом змейка никуда не движется по горизонтали…
    if (e.key === 'ArrowLeft' && snake.dx === 0) {
        snake.dx = -grid;
        snake.dy = 0;
    }
    // Стрелка вверх
    else if (e.key === 'ArrowUp' && snake.dy === 0) {
        snake.dy = -grid;
        snake.dx = 0;
    }
    // Стрелка вправо
    else if (e.key === 'ArrowRight' && snake.dx === 0) {
        snake.dx = grid;
        snake.dy = 0;
    }
    // Стрелка вниз
    else if (e.key === 'ArrowDown' && snake.dy === 0) {
        snake.dy = grid;
        snake.dx = 0;
    }
    });

requestAnimationFrame(loop);