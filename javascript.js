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
            board[i].push(0);
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
    
    const getBoard = () =>  {
        return board;
    };

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
    const player1 = createPlayer("human", "1");
    const player2 = createPlayer("computer", "2");
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
            // Reset board?
        }
        switchPlayer();
        printNewRound();
    }

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
            if(b[i][0] === b[i][1] && b[i][1] === b[i][2]){
                return true;
            }
            // Check columns
            if(b[0][i] === b[1][i] && b[1][i] === b[2][i]){
                return true;
            }
        }
        // Check diagonals
        if(b[0][0] === b[1][1] && b[1][1] === b[2][2]) {
            return true;
        }
        if(b[0][2] === b[1][1] && b[1][1] === b[2][0]) {
            return true;
        }
        return false;
    }

    function printWinner() {
        console.log(`The Winner is ${activePlayer.name}`);
    }


    return { playRound };
}





const board = Gameboard();
const game = Gamecontroller();