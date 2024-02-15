import '../styles/index.css';
import { getRandomInt } from './utils';

let startSpeed = 20;
let count = 0;
let scorePoints = 0;
let myReq;
let mode = 'low';
const startButton = document.querySelector('.start');
const stopButton = document.querySelector('.stop');
const score = document.querySelector('.score');
const canvas = document.getElementById('game');
const context = canvas.getContext('2d');
const speeds = document.querySelectorAll('.speed');
const low = document.querySelector('.speed_low');
const medium = document.querySelector('.speed_medium');
const hard = document.querySelector('.speed_hard');
const finishGame = document.querySelector('.container__finish-game');
const finishScore = document.querySelector('.finish-score');
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

score.innerHTML = `score: ${scorePoints}`;
low.classList.add('active');

function changeSpeed(evt) {
  if (mode !== evt.target.innerHTML) {
    startNewGame();
  }
  const selectedSpeed = evt.target;
  const border = document.querySelector('.border');
  speeds.forEach(item => {
    item.classList.remove('active');
  })
  border.classList.remove('border-red');
  
  switch (selectedSpeed.innerHTML) {
    case 'medium': 
      startSpeed = 6;
      mode = 'medium';
      selectedSpeed.classList.add('active');
      break;
    case 'low': 
      startSpeed = 20;
      mode = 'low';
      selectedSpeed.classList.add('active');
      break;
    case 'hard': 
      startSpeed = 6;
      mode = 'hard';

      border.classList.add('border-red');
      selectedSpeed.classList.add('active');
      break;
  }
}

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

function startNewGame() {
  scorePoints = 0;
  score.innerHTML = `score: ${scorePoints}`
  snake.x = getRandomInt(0, cellsCount) * grid;
  snake.y = getRandomInt(0, cellsCount) * grid;
  snake.cells = [];
  snake.maxCells = 3;
  snake.dx = grid;
  snake.dy = 0;

  renderApple();
  cancelAnimationFrame(myReq);
  stopButton.style.display = 'none';
  startButton.style.display = 'block';
};

function checkHardOverflow() {
  if (snake.x < 0 || snake.x >= canvas.width || snake.y < 0 || snake.y >= canvas.height) {
    finishGame.style.display = 'flex';
    finishScore.innerHTML = `your score: ${scorePoints}`;
    startNewGame();
  }
}

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
    myReq = requestAnimationFrame(loop);
    //замедляет скорость игры с 60 кадров в секунду до 3. пропускает каждый 20
    if (++count < startSpeed) {
      return;
    }
    count = 0;
    context.clearRect(0, 0, canvas.width, canvas.height);
    snake.x += snake.dx;
    snake.y += snake.dy;

    mode === 'hard' ? checkHardOverflow() : checkOverflow(); 
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
        finishGame.style.display = 'flex';
        finishScore.innerHTML = `your score: ${scorePoints}`;
        startNewGame();
      }
    }

    if (snake.x === apple.x && snake.y === apple.y) {
      snake.maxCells++;
      score.innerHTML = `score: ${++scorePoints}`;
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

low.addEventListener('click', changeSpeed);
medium.addEventListener('click', changeSpeed);
hard.addEventListener('click', changeSpeed);

startButton.addEventListener('click', () => {
  requestAnimationFrame(loop);
  finishGame.style.display = 'none';
  stopButton.style.display = 'block';
  startButton.style.display = 'none';
})

stopButton.addEventListener('click', () => {
  cancelAnimationFrame(myReq);
  stopButton.style.display = 'none';
  startButton.style.display = 'block';
})