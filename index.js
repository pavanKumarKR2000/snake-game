const canvas = document.getElementById("gameCanvas");
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
let FOOD_X = 5;
/**vertical cell number of food*/
let FOOD_Y = 5;

function drawGame() {
  clearScreen();
  changeSnakePosition();
  drawFood();
  drawSnake();
  setTimeout(drawGame, 1000 / SPEED);
}

function clearScreen() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
  ctx.fillStyle = "green";
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

function drawFood() {}

/**
 * requestAnimationFrame
 * setInterval xtimes per second
 * setTimeout--
 */
