/*--   Snake Game  -- */

// Retrieven the Canvas And Create the context
let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');
// other Elements
let n = document.getElementById('new');
let pause = document.getElementById('pause');
let score = document.getElementById('score');
//so far so good

// More vars that will be needed
// Creating a Snake (array)
let snake = [];
let size = 10;
let key = '';
let snakeMove;
let oldHead = {};
let pauseState = false;
let startState = false;
let apple = {};
let scoreValue = 0;
let X, Y;

// eventEventlistener
n.addEventListener('click', newGame);
pause.addEventListener('click', pauseGame);

if (pause == false) {
    document.addEventListener('keydown', directSnake);
}

// function to start the game
function newGame() {
    scoreValue = 0;
    if (startState == false) {
        n.innerText = "New play Game";
        startState = true;

    } else {
        //we should clear the canvas (not done ,not working why ?  )
        context.clearRect(0, 0, canvas.width, canvas.height);
        pauseState = false;
        document.addEventListener('keydown', directSnake);
    }
    //clear the snake 
    snake = [];
    //new snake 
    snake[0] = {
        x: canvas.width / 2,
        y: canvas.height / 2
    };

    //draw th first snake 
    drawSnake();
    //draw the First  apple 
    drawApple();
}

function pauseGame() {}

function directSnake(e) {}


//drawsnake;
function drawSnake() {
    for (let i = 0; i < snake.length; i++) {
        context.fillStyle = 'green';
        context.fillRect(snake[i].x, snake[i].y, size, size);
    }
}
//drawApple;
function drawApple() {
    apple = {
        x: Math.round((Math.random() * 490) / 10) * 10,
        y: Math.round((Math.random() * 490) / 10) * 10
    };
    context.fillStyle = 'blue';
    context.fillRect(apple.x, apple.y, size, size);
}