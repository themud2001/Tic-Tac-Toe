function initGame() {
    const container = document.getElementById("tictactoe-container");
    const __X = "X";
    const __O = "O";
    const board = [];
    let clickCount = 0;
    let turn = 0;
    let sign = (turn && __O) || __X;
    const textElement = container.getElementsByClassName("game-text")[0];
    const buttonElement = container.getElementsByClassName("restart-game")[0];
    textElement.innerHTML = sign + "\'s turn.";

    function restartGame() {
        container.removeEventListener("click", handleTicTacToeClick);
    
        const rows = document.getElementById("tictactoe-container").getElementsByClassName("game")[0].children;
        for (let i=0; i<3; i++) {
            const columns = rows[i].getElementsByClassName("col");
            for (let j=0; j<3; j++) {
                columns[j].innerHTML = "";
            }
        }

        initGame();
    }

    function handleTicTacToeClick(event) {
        if (event.target.getAttribute("class") !== "col") return;
        if (event.target.innerHTML && event.target.innerHTML.trim() !== "") return;

        board[Number(event.target.id) - 1] = sign;
        event.target.innerHTML = sign;
        clickCount++;

        if (checkWin(board)) {
            container.removeEventListener("click", handleTicTacToeClick);
            textElement.innerHTML = "Player " + sign + " wins!";
            return;
        }
        
        if (clickCount === 9) {
            container.removeEventListener("click", handleTicTacToeClick);
            textElement.innerHTML = "Draw!";
            return;
        }

        turn = !turn;
        sign = (turn && __O) || __X;
        textElement.innerHTML = sign + "\'s turn.";
    }

    function checkVerticalWin(board) {
        for (let i=0; i<=2; i++) {
            if (board[i]) {
                if (
                    board[i] === board[i + 3] &&
                    board[i + 3] === board[i + 6]
                ) return true;
            }
        }
    };
    
    function checkHorizontalWin(board) {
        for (let i=0; i<=6; i+=3) {
            if (board[i]) {
                if (
                    board[i] === board[i + 1] &&
                    board[i + 1] === board[i + 2]
                ) return true;
            }
        }
    }
    
    function checkDiagonalWin(board) {
        for (let i=0; i<=2; i+=2) {
            if (board[i]) {
                if (
                    board[i] === board[4] &&
                    board[4] === board[8 - i]
                ) return true;
            }
        }
    }

    function checkWin(board) {
        return checkVerticalWin(board) || checkHorizontalWin(board) || checkDiagonalWin(board);
    }

    buttonElement.addEventListener("click", restartGame);
    container.addEventListener("click", handleTicTacToeClick);
}

document.addEventListener("DOMContentLoaded", initGame);