const canvas = document.getElementById("gameCanvas");
const restartButton = document.getElementById("btn");
restartButton.addEventListener("click", () => window.location.reload());
const ctx = canvas.getContext("2d");

/**number of frames per second */
const SPEED = 7;
/**number of rows and colums in the grid/tilemap */
const TILE_COUNT = 30;
/**size of each cell in the grid/tilemap */
const TILE_SIZE = canvas.width / TILE_COUNT;
/**horizontal cell number of snake`s head  */
let HEAD_X = 15;
/**vertical cell number of snake`s head  */
let HEAD_Y = 15;
/**number of cell snake moves  in horizontal direction per each frame*/
let X_VELOCITY = 0;
/**number of cell snake moves  in vertical direction per each frame*/
let Y_VELOCITY = 0;

/**horizontal cell number of food  */
let FOOD_X = 2;
/**vertical cell number of food*/
let FOOD_Y = 2;

let SCORE = 0;

const eatFoodSound = new Audio("gulp.mp3");

const snakeParts = [];
let TAIL_LENGTH = 2;

class SnakeParts {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

function drawGame() {
  changeSnakePosition();

  if (gameOver()) {
    return;
  }
  clearScreen();

  checkFoodCollision();
  drawFood();
  drawSnake();
  drawScore();
  setTimeout(drawGame, 1000 / SPEED);
}

function gameOver() {
  let gameOver = false;
  /** collision with wall */
  if (
    HEAD_X * TILE_SIZE > canvas.width - TILE_SIZE ||
    HEAD_X * TILE_SIZE < 0 ||
    HEAD_Y * TILE_SIZE > canvas.height - TILE_SIZE ||
    HEAD_Y * TILE_SIZE < 0
  ) {
    gameOver = true;
  }

  /** collision with itself */
  snakeParts.length > 2 &&
    snakeParts.forEach((part) => {
      if (HEAD_X === part.x && HEAD_Y === part.y) {
        gameOver = true;
        return;
      }
    });

  if (gameOver) {
    ctx.fillStyle = "white";
    ctx.font = "30px Wellfleet";
    ctx.fillText("Game Over", canvas.width / 2.5, canvas.height / 2);
  }

  return gameOver;
}

function drawScore() {
  ctx.fillStyle = "white";
  ctx.font = "20px Wellfleet";
  ctx.fillText("Score " + SCORE, canvas.width - 100, 20);
}

function clearScreen() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
  ctx.fillStyle = "green";

  for (let i = 0; i < snakeParts.length; i++) {
    let part = snakeParts[i];
    ctx.fillRect(part.x * TILE_SIZE, part.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }

  snakeParts.push(new SnakeParts(HEAD_X, HEAD_Y));

  if (snakeParts.length > TAIL_LENGTH) {
    snakeParts.shift();
  }

  ctx.fillStyle = "orange";
  ctx.fillRect(HEAD_X * TILE_SIZE, HEAD_Y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
}

drawGame();

window.addEventListener("keydown", keyDown);

function keyDown(e) {
  if (e.keyCode === 38) {
    /** up */
    if (Y_VELOCITY !== 1) {
      Y_VELOCITY = -1;
      X_VELOCITY = 0;
    }
  } else if (e.keyCode === 40) {
    /** down */
    if (Y_VELOCITY !== -1) {
      Y_VELOCITY = 1;
      X_VELOCITY = 0;
    }
  } else if (e.keyCode === 37) {
    /** left */

    if (X_VELOCITY !== 1) {
      Y_VELOCITY = 0;
      X_VELOCITY = -1;
    }
  } else if (e.keyCode === 39) {
    /** right */
    if (X_VELOCITY !== -1) {
      Y_VELOCITY = 0;
      X_VELOCITY = 1;
    }
  }
}

function changeSnakePosition() {
  HEAD_X += X_VELOCITY;
  HEAD_Y += Y_VELOCITY;
}

function drawFood() {
  ctx.fillStyle = "red";
  ctx.fillRect(FOOD_X * TILE_SIZE, FOOD_Y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
}

function checkFoodCollision() {
  if (HEAD_X === FOOD_X && HEAD_Y === FOOD_Y) {
    eatFoodSound.play();
    FOOD_X = Math.floor(Math.random() * TILE_COUNT);
    FOOD_Y = Math.floor(Math.random() * TILE_COUNT);
    SCORE++;
    TAIL_LENGTH++;
  }
}

/**
 * requestAnimationFrame
 * setInterval xtimes per second
 * setTimeout--
 */
