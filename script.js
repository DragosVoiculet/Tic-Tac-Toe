


function Gameboard(){
    const board = [];
    for(let i = 0 ; i<3 ;i++){
        board[i]=[]
        for(let j =0 ;j<3;j++){
            board[i].push(Cell());
        }
    }
    const getBoard = () => board
    const printBoard = () => {
        const boardWithCellValues = board.map((row) =>row.map((cell)=>cell.getValue()))
        console.log(boardWithCellValues);
      };
      const checkMove = (row, column) => {
        return board[row][column].getValue() === 0;
    };
    const makeMove = (row, column, player) =>{
        if(checkMove(row,column)){
            board[row][column].addMove(player)
        }
    }
    const checkForWin = () => {
        // Check Rows
        for (let i = 0; i < 3; i++) {
          if (
            board[i][0].getValue() === board[i][1].getValue() &&
            board[i][1].getValue() === board[i][2].getValue() &&
            board[i][0].getValue() !== 0
          ) {
            return board[i][0].getValue();
          }
        }
      
        // Check Columns
        for (let i = 0; i < 3; i++) {
          if (
            board[0][i].getValue() === board[1][i].getValue() &&
            board[1][i].getValue() === board[2][i].getValue() &&
            board[0][i].getValue() !== 0
          ) {
            return board[0][i].getValue();
          }
        }
      
        // Check Diagonals
        if (
          (board[0][0].getValue() === board[1][1].getValue() &&
            board[1][1].getValue() === board[2][2].getValue()) ||
          (board[0][2].getValue() === board[1][1].getValue() &&
            board[1][1].getValue() === board[2][0].getValue())
        ) {
          if (board[1][1].getValue() !== 0) {
            return board[1][1].getValue();
          }
        }
      
        return 0; // No winner yet
      };

    return {
        getBoard,
        printBoard,
        makeMove,
        checkForWin
    };
}

function Cell(){
    let value = 0;

    const addMove = (player) =>{
        value = player;
    };
    
    const getValue = () => value;
    
    return{
        addMove,
        getValue
    };
}
function gameController(
    playerOneName = "Player One",
    playerTwoName = "Player Two"
){
    const players =[
        {
            name: playerOneName,
            token:1
        },
        {
            name:playerTwoName,
            token:2
        }
    ]
    const board = Gameboard();
    let activePlayer = players[0];

    const switchPlayer =() =>{
        activePlayer = activePlayer ===players[0] ? players[1] : players[0]
    };

    const getActivePlayer = () => activePlayer;
    
    const playRound = (row,column)=>{
        board.makeMove(row,column,activePlayer.token)
        board.printBoard()
        switchPlayer();
        if(board.checkForWin()){
            console.log('done')
        }
    }
   
    return{
        playRound,
        activePlayer
    }
}
const game = gameController();







/*
const gameSquareNodeArr = document.querySelectorAll('.game-square')
gameSquareNodeArr.forEach(square => {
    square.addEventListener('click',()=>{
        square.textContent = 'o'
        Gameboard.addToGame('o')
    })
});
*/
