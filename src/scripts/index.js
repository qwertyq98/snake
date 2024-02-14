import '../styles/index.css';
import { getRandomInt } from './utils';

let startSpeed = 20;
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

function checkOverflow() {     
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
};

function renderApple() {
  apple.x = getRandomInt(0, cellsCount) * grid;
  apple.y = getRandomInt(0, cellsCount) * grid;

  for (let i = 0; i < snake.cells.length; i++) {
    if (apple.x === snake.cells[i].x && apple.y === snake.cells[i].y) {
      renderApple();
      break;
    }
  }
};

function loop() {
    requestAnimationFrame(loop);
    //замедляет скорость игры с 60 кадров в секунду до 3. пропускает каждый 20
    if (++count < startSpeed) {
      return;
    }
    count = 0;
    context.clearRect(0, 0, canvas.width, canvas.height);
    snake.x += snake.dx;
    snake.y += snake.dy;

    checkOverflow(); 
    snake.cells.unshift({ x: snake.x, y: snake.y });
    if (snake.cells.length > snake.maxCells) {
      snake.cells.pop();
    }

    context.fillStyle = '#d12527';
    context.fillRect(apple.x, apple.y, grid - 1, grid - 1);
    context.fillStyle = '#bdda57';

    snake.cells.forEach(function (cell) {
      context.fillRect(cell.x, cell.y, grid - 1, grid - 1);
    });

    for (let i = 1; i < snake.cells.length; i++) {
      if (snake.x === snake.cells[i].x && snake.y === snake.cells[i].y) {
        snake.x = getRandomInt(0, cellsCount) * grid;
        snake.y = getRandomInt(0, cellsCount) * grid;
        snake.cells = [];
        snake.maxCells = 3;
        snake.dx = grid;
        snake.dy = 0;

        renderApple();
      }
    }

    if (snake.x === apple.x && snake.y === apple.y) {
      snake.maxCells++;
      renderApple();
    }
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