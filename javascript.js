// Store gameboard as an array inside of a gameboard object
// Store players in objects
// Controlflow is an object
// Goal: as little global code as possible (use factory functions)
    // If you only need one instance, use IIFE



function Gameboard() {
    // Create 3x3 board
    const board = [];
    for (let i=0; i<3; i++) {
        board[i] = []
        for(j=0; j<3; j++){
            board[i].push(" ");
        }
    }

    // Player places token
    const placeMark = (row, col, mark) => {
        const realRow = row - 1;
        const realCol = col - 1;
        if (!validCell(realRow, realCol)) {
            return false;
        }
        board[realRow][realCol] = mark;
        return true;
    }
    
    const getBoard = () => board;

    const printBoard = () => {
        console.log(board);
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

    return { placeMark, getBoard, printBoard };
}


// Gameboard (for console):
// Create 3x3 Array
// Show board
// Create player with name and mark
// Place token of player1 in selected cell
// Show board
// Place token of player2 in selected cell
// Show board

function Gamecontroller() {
    const board = Gameboard();
    const player1 = createPlayer("human", "X");
    const player2 = createPlayer("computer", "O");
    let activePlayer = player1;
    printNewRound();

    const playRound = (row, col) => {
        // If cell is invalid
        if (!board.placeMark(row, col, activePlayer.mark)){
            return;
        }
        console.log(`${activePlayer.name} places ${activePlayer.mark} in row:${row} and column:${col}.`);
        if (checkWinner()){
            printWinner();
            return;
        }
        if (checkTie()) {
            console.log("It'a tie.");
            return;
        }
        switchPlayer();
        printNewRound();
    }

    const getActivePlayer = () => activePlayer;

    function createPlayer(name, mark) {
        return { name, mark };
    }

    function switchPlayer() {
        activePlayer = activePlayer === player1 ? player2 : player1;
    }

    function printNewRound() {
        board.printBoard();
        console.log(`It s ${activePlayer.name}s turn: `);
    }

    function checkWinner() {
        const b = board.getBoard();
        for (let i=0; i<3; i++) {
            // Check rows
            if(b[i][0] === b[i][1] && b[i][1] === b[i][2] && b[i][0] != "0") {
                return true;
            }
            // Check columns
            if(b[0][i] === b[1][i] && b[1][i] === b[2][i] && b[0][i] != "0") {
                return true;
            }
        }
        // Check diagonals
        if(b[0][0] === b[1][1] && b[1][1] === b[2][2] && b[0][0] != "0") {
            return true;
        }
        if(b[0][2] === b[1][1] && b[1][1] === b[2][0] && b[1][1] != "0") {
            return true;
        }
        return false;
    }

    function checkTie() {
        const b = board.getBoard();
        for (let i=0; i<3; i++ ){
            for (let j=0; j<3; j++){
                if (b[i][j] == "0"){
                    return false;
                }
            }
        }
        return true;
    }

    function printWinner() {
        console.log(`The Winner is ${activePlayer.name}`);
    }


    return { playRound, getActivePlayer, getBoard: board.getBoard() };
}



// Display game on webpage
// Display who's turn it is
// Display 
function displayGame() {
    const game = Gamecontroller();
    const turnDiv = document.querySelector(".turn");
    const boardDiv = document.querySelector(".board");
    updateScreen();

    function updateScreen() {
        // Clear the board...

        // Display who's turn
        turnDiv.textContent = `It's ${game.getActivePlayer().name}'s turn: `;
        
        // Display board
        const board = game.getBoard;
        board.forEach( (row, r_index) => {
            row.forEach( (cell, c_index) => {
                const cellBtn = document.createElement("button");
                cellBtn.className = "cell";
                cellBtn.setAttribute("data-index", )
                cellBtn.textContent = cell;
                boardDiv.appendChild(cellBtn);
            });
        });
    }

    // Play
    // Use Eventlistener to get change cell
    boardDiv.addEventListener("click", e => {
        const currentBtn = e.target
    })
}


displayGame();