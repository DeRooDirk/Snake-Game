/*--   Snake Game  -- */

// Retrieven the Canvas And Create the context
let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

// other Elements
let n = document.getElementById('new');
//let pause = document.getElementById('pause');
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
    score.innerText = " score :  ";
    if (startState == false) {
        n.innerText = "New play Game";
        startState = true;
    }

    clearInterval(snakeMove);
    context.clearRect(0, 0, canvas.width, canvas.height);


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
    //move the snake ? 

    pauseState = false;
    document.addEventListener('keydown', directSnake);

}



function directSnake(e) {
    //clear intervals ? is this needed ? 
    clearInterval(snakeMove);
    // snake shoud go forward only i guess- 

    //37 = L , 38=U ,39=R,40=D

    if ((key == "U" && e.keyCode != 40) || (key == "D" && e.keyCode != 38) || (key == "L" && e.keyCode != 39) || (key == "R" && e.keyCode != 37) || (key == "")) {
        //here we need to change the direction of the snake (trying with switch/case)
        switch (e.keyCode) {
            case 37:
                key = "L";
                break;
            case 38:
                key = "U";
                break;
            case 39:
                key = "R";
                break;
            case 40:
                key = "D";
                break;
        }
    }
    snakeMove = setInterval(moveSnake, 200);
}

//Moving the snake 
function moveSnake() {
    //need to know where snake is the Value of it 
    X = snake[0].x;
    Y = snake[0].y;
    switch (key) {
        case "U":
            Y -= size;
            break;
        case "D":
            Y += size;
            break;
        case "L":
            X -= size;
            break;
        case "R":
            X += size;
            break;
    }
    if (collisionChecker()) {
        return;
    }




    let head = {
        x: X,
        y: Y
    };
    snake.unshift(head);

    //need to know if snake ate apple  and oldhead stays or delete it if it has not , otherwise would keep growing

    if (snake[0].x == apple.x && snake[0].y == apple.y) {
        scoreValue++;
        score.innerText = "score: " + scoreValue;
        //needs to draw a new apple (it was eaten)
        drawApple();
        //draw an extra head 
        drawSnake();
    } else {
        oldHead = snake.pop();
        clearoldHead(oldHead);
        drawSnake();
    }
}

function clearoldHead(oldHead) {
    context.clearRect(oldHead.x, oldHead.y, size, size);
}
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
//Collision checker

function collisionChecker() {

    //checks for a hit with a wall hence height and widt 
    if (X < 0 || X > (canvas.width - 10) || Y < 0 || Y > (canvas.height - 10)) {
        alert("Game Over, you hit something hard!! ");
        newGame();
        return true;
    }

    // Body Collision
    for (i = 0; i < snake.length; i++)
        if (X == snake[i].x && Y == snake[i].y) {
            alert("Game Over , you ate yourself !! : ");
            newGame();
            return true;
        }
}