const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

document.addEventListener("keydown", buttonMoves);

let x = 10;
let y = 10;
let size = 18;
let position = 20;
let speed = 10;
let moveX = 0;
let moveY = 0;
let timeOut;
let appleX = 5;
let appleY = 5;
let heightSnake = 3;
let piecesSnake = [];
let score = 0;

class PieceSnake {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

function drawGame() {
    clearScreen();
    drawSnake();
    updateSnakeMove();
    drawapple();
    updateApplePosition();
    drawScore();
    drawSpeed();

    let result = isGameOver();
    if (result) {
        return;
    }

    timeOut = setTimeout(drawGame, 1000 / speed)
}

function newGame() {
    document.location.reload()
}

function clearScreen() {
    ctx.fillStyle = "#a03300";
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
}

function drawSnake() {
    ctx.fillStyle = "#8bc951"
    for (let i = 0; i < piecesSnake.length; i++) {
        let part = piecesSnake[i];
        ctx.fillRect(part.x * position, part.y * position, size, size)
    }

    piecesSnake.push(new PieceSnake(x, y));

    if (piecesSnake.length > heightSnake)
        piecesSnake.shift()

    ctx.fillStyle = "white";
    ctx.fillRect(x * position, y * position, size, size);
}

function updateSnakeMove() {
    let resultX = x + moveX;
    let resultY = y + moveY;
    if (resultX > 19) {
        x = 0;
    } else if (resultX < 0) {
        x = 19;
    } else {
        x = resultX;
    }

    if (resultY > 19) {
        y = 0;
    } else if (resultY < 0) {
        y = 19;
    } else {
        y = resultY;
    }
}

function drawapple() {
    ctx.fillStyle = "#6e1100";
    ctx.fillRect(appleX * position, appleY * position, size, size);
}

function updateApplePosition() {

    if (appleX == x & appleY == y) {
        appleX = Math.floor(Math.random() * position)
        appleY = Math.floor(Math.random() * position)

        let isAppleLocationAvaliable = false;

        while (!isAppleLocationAvaliable) {
            isAppleLocationAvaliable = true;
            piecesSnake.forEach(element => {
                if (element.x === appleX && element.y === appleY) {
                    appleX = Math.floor(Math.random() * position);
                    appleY = Math.floor(Math.random() * position);
                    isAppleLocationAvaliable = false;
                }
            })
        }

        heightSnake++;
        score += 10;

        if (heightSnake % 3 == 0) {
            speed++;
        }
    }
}

function isGameOver() {
    let gameOver = false;

    if (moveX === 0 & moveY === 0) {
        return;
    }

    for (let i = 0; i < piecesSnake.length; i++) {
        let part = piecesSnake[i];
        if (part.x === x && part.y === y) {
            gameOver = true;
            break;
        }
    }

    if (gameOver) {
        ctx.fillStyle = "white"
        ctx.font = "50px verdana";
        ctx.fillText("Game Over!", canvas.clientWidth / 6.5, canvas.clientHeight / 2);
    }

    return gameOver;
}

function drawScore() {
    ctx.fillStyle = "#88aa5b";
    ctx.font = "16px verdana";
    ctx.fillText(`Score: ${score}`, canvas.clientWidth - 80, 30);
}

function drawSpeed() {
    ctx.fillStyle = "#f0e371"
    ctx.font = "16px verdana";
    ctx.fillText(`Speed: ${speed}`, 10, 30)
}

function buttonMoves(e) {
    switch (e.keyCode) {
        case 37:
            if (moveX == 1) return;
            moveX = -1;
            moveY = 0;
            break;
        case 38:
            if (moveY == 1) return;
            moveX = 0;
            moveY = -1;
            break;
        case 39:
            if (moveX == -1) return;
            moveX = 1;
            moveY = 0;
            break;
        case 40:
            if (moveY == -1) return;
            moveX = 0;
            moveY = 1;
            break;
    }
}

function newGame() {
    document.location.reload()
}

drawGame();