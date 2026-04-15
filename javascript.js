// Store gameboard as an array inside of a gameboard object
// Store players in objects
// Controlflow is an object
// Goal: as little global code as possible (use factory functions)
    // If you only need one instance, use IIFE


function Player(name, marker) {
    return { name, marker};
}

function Gameboard() {
    const board = createEmptyBoard();
    
    // Create 3x3 board
    function createEmptyBoard() {
        const board = [];
        for (let i=0; i<3; i++) {
            board[i] = []
            for(j=0; j<3; j++){
                board[i].push(" ");
            }
        }
        return board;
    }

    // Player places token
    function placeMark(row, col, mark) {
        if (!validCell(row, col)) {
            return false;
        }
        board[row][col] = mark;
        return true;
    }
    
    function getBoard() {
        return board;
    }

    // Check if chosen cell is valid
    function validCell(row, col) {
        if (!(onBoard(row)) || !(onBoard(col)) || board[row][col] != 0){
            return false;
        }
        return true;

        function onBoard(line) {
            return line >= 0 && line < 3 ? true : false; 
        }
    }

    return { placeMark, getBoard };
}


function Gamecontroller() {
    const board = Gameboard();
    const player1 = Player("Player1", "X");
    const player2 = Player("Player2", "O");
    let activePlayer = player1;

    function playRound(row, col) {
        // If cell is invalid
        if (!board.placeMark(row, col, activePlayer.mark)){
            return;
        }
        if (gameOver()) {
            return;
        }
        switchPlayer();
    }

    function getActivePlayer(){
        return activePlayer;
    }

    function getPlayers() {
        return [player1, player2];
    }

    function setPlayers(name1, mark1, name2, mark2) {
        player1.name = name1;
        player1.mark = mark1;
        player2.name = name2;
        player2.mark = mark2;
    }

    function gameOver() {
        if(checkTie() || checkWinner()){
            return true;
        }
        return false;
    }

    function switchPlayer() {
        activePlayer = activePlayer === player1 ? player2 : player1;
    }

    function checkWinner() {
        const b = board.getBoard();
        for (let i=0; i<3; i++) {
            // Check rows
            if(b[i][0] === b[i][1] && b[i][1] === b[i][2] && b[i][0] != " ") {
                return true;
            }
            // Check columns
            if(b[0][i] === b[1][i] && b[1][i] === b[2][i] && b[0][i] != " ") {
                return true;
            }
        }
        // Check diagonals
        if(b[0][0] === b[1][1] && b[1][1] === b[2][2] && b[0][0] != " ") {
            return true;
        }
        if(b[0][2] === b[1][1] && b[1][1] === b[2][0] && b[1][1] != " ") {
            return true;
        }
        return false;
    };

    // Tie if no cell is empty
    function checkTie() {
        const b = board.getBoard();
        for (let i=0; i<3; i++ ){
            for (let j=0; j<3; j++){
                if (b[i][j] == " "){
                    return false;
                }
            }
        }
        return true;
    }

    return { playRound, getActivePlayer, getPlayers, setPlayers, getBoard: board.getBoard(), gameOver, checkWinner };
}


function displayGame() {
    let game = Gamecontroller();
    const turnDiv = document.querySelector(".turn");
    const boardDiv = document.querySelector(".board");
    const restartBtn = document.querySelector(".reset button");
    updateScreen();
    restartBtn.addEventListener("click", () => interact());


    function interact() {
        // Play
        // Use Eventlistener to change cell
        boardDiv.addEventListener("click", (e) => {
            if( !game.gameOver()){
                const currentBtn = e.target;
                const [row, col] = currentBtn.dataset.index.split(" ");
                game.playRound(row, col);
                updateScreen();
                if ( game.gameOver()) {
                    displayResult();
                }
            }
        });
        restartBtn.addEventListener("click", () => resetGame());
    }

    function updateScreen() {
        // Clear the board...
        boardDiv.textContent = "";

        definePlayers();
        
        // Display who's turn
        turnDiv.textContent = `It's ${game.getActivePlayer().name}'s turn: `;
        
        // Display board
        const board = game.getBoard;
        board.forEach( (row, r_index) => {
            row.forEach( (cell, c_index) => {
                const cellBtn = document.createElement("button");
                cellBtn.className = "cell";
                cellBtn.setAttribute("data-index", `${r_index} ${c_index}`)
                cellBtn.textContent = cell; 
                boardDiv.appendChild(cellBtn);
            });
        });
    }

    function definePlayers() {
        inputs = document.querySelectorAll("input");
        const name1 = inputs[0].value;
        const mark1 = inputs[1].value;
        const name2 = inputs[2].value;
        const mark2 = inputs[3].value;
        game.setPlayers(name1, mark1, name2, mark2);
    }

    function displayResult() {
        const result= document.querySelector(".result div");

        if (game.checkWinner()) {
            const activePlayer = game.getActivePlayer().name;
            result.textContent = `The winner is ${activePlayer}!`;
        }
        else {
            result.textContent = "It's a tie!"
        }

        // Remove turn's content
        const turn = document.querySelector(".turn");
        turn.innerHTML = "";
    }

    function resetGame(){
        game = Gamecontroller();
        updateScreen();
        const result = document.querySelector(".result div");
        result.textContent = "";
    }
}


displayGame();