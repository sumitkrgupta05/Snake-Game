//GAME CONSTANTS

let inputDir = { x: 0, y: 0 };
const foodSound = new Audio("move.mp3");
const gameOverSound = new Audio("Dead_Snake.wav");
const moveSound = new Audio("Snake_Eat.mp3");
const musicSound = new Audio("bgSound.mp3");
let speed = 14; //speed of snake
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }];
food = { x: 7, y: 9 };
let score = 0;

//GAME FUNCTIONS

//creating game loop
function main(ctime) {
  //ctime -> current time
  window.requestAnimationFrame(main);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
}

function isCollide(snake) {
  //apne me ghusna (maut)
  for (let i = 1; i < snakeArr.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }

  // diwar se takrana
  if (
    snake[0].x >= 18 ||
    snake[0].x <= 0 ||
    snake[0].y >= 18 ||
    snake[0].y <= 0
  ) {
    return true;
  }

  return false;
}

function gameEngine() {
  //part 1: updating the snake and food
  if (isCollide(snakeArr)) {
    gameOverSound.play();
    musicSound.pause();
    inputDir = { x: 0, y: 0 };
    alert("Game Over!! Press (CTRL + R) 4 times quickly play again");
    let snakeArr = [{ x: 13, y: 15 }];
    // musicSound.play();
    score = 0;
  }

  //random food and score increament
  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    foodSound.play();
    score += 1;
    scoreBox.innerHTML = "Score: " + score;
    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,
    });
    let a = 1;
    let b = 17;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }

  //Moving the snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }

  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;

  //part 2: show the esnake and food
  //snake
  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });

  //food
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

//MAIN LOGIC HERE
window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  inputDir = { x: 0, y: 1 }; //game start
  moveSound.play();
  musicSound.play();
  switch (e.key) {
    case "ArrowUp":
      // console.log("arrowup");
      inputDir.x = 0;
      inputDir.y = -1;
      break;

    case "ArrowDown":
      // console.log("arrowDown");
      inputDir.x = 0;
      inputDir.y = 1;
      break;

    case "ArrowRight":
      // console.log("arrowRight");
      inputDir.x = 1;
      inputDir.y = 0;
      break;

    case "ArrowLeft":
      // console.log("arrowLeft");
      inputDir.x = -1;
      inputDir.y = 0;
      break;

    default:
      break;
  }
});
