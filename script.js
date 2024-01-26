console.log('helo')


function gameBoard(){

    // Initialize board
    const board = [];
    for (let i = 0; i<9; i++){
        board.push(Cell());
    
    }
    // I use this to check if all is working
    const printBoard =() => {
        const values = board.map(cell=>cell.checkValue())
        console.log(values)
    }

    const makeMove = (player, spot) =>{
        if(board[spot].checkValue()!==player && board[spot].checkValue() === 0){
        board[spot].addValue(player)
        return true
        }
        return false
    }
    //
    const checkWin = () => {
        for (let i = 0; i < 3; i++) {
            // Check horizontal (row) and vertical (column) in each iteration
            if ((board[i * 3].checkValue() === board[i * 3 + 1].checkValue() &&
                 board[i * 3 + 1].checkValue() === board[i * 3 + 2].checkValue() &&
                 board[i * 3].checkValue() !== 0) ||
                (board[i].checkValue() === board[i + 3].checkValue() &&
                 board[i + 3].checkValue() === board[i + 6].checkValue() &&
                 board[i].checkValue() !== 0)) {
                return true;
            }
        }
    
        // Check diagonals
        if ((board[0].checkValue() === board[4].checkValue() &&
             board[4].checkValue() === board[8].checkValue() &&
             board[0].checkValue() !== 0) ||
            (board[2].checkValue() === board[4].checkValue() &&
             board[4].checkValue() === board[6].checkValue() &&
             board[2].checkValue() !== 0)) {
            return true;
        }
    
        return false;
    };
    const reset = () =>{
        for (let i = 0 ; i<9 ; i++){
            board[i].removeValue();
        }
    }

    return{
        printBoard,
        makeMove,
        checkWin,
        reset
    }
}

function Cell(){
    let value = 0;
    const addValue = (player) =>{
        if(value===0){
        value = player;
        }
    }
    const removeValue = () => {
        value = 0;
    }
    const checkValue = () => value
    
    return {
        addValue,
        checkValue,
        removeValue
    }
}

function gameController() {
    const game = gameBoard();
    const playerx = {
        token : 1,
        mark : 'x',
        name : 'Player x'
    }
    const playero = {
        token : 2,
        mark : 'o',
        name : 'Player o'
    }
    const players = [playerx,playero]
    let activePlayer = players[0]

    const switchPlayer = () =>{
        if(activePlayer === players[0]){
            activePlayer=players[1]
        }else
        activePlayer = players[0]
    }
    let gameState = false;
    const playRound = (spot) =>{
        console.log("Spot:", spot);
        if(game.makeMove(activePlayer.token,spot)){
        if(game.checkWin()){
            game.printBoard()
            console.log(`${activePlayer.name} won`)
            alert(`${activePlayer} won`)
            game.reset()
            gameState = true ;
        }else{
            game.printBoard()
            switchPlayer();
            gameState = false
        }
        }
    }
    const printBoar = () => game.printBoard()
    const getMarker = () => activePlayer.mark;
    const resetGame = () => {
        game.reset();
    };
    const getGameState = () => gameState
  return{
    playRound,
    printBoar,
    getMarker,
    getGameState,
    resetGame
  }
    
}
function screenControler() {
    const game = gameController()
    const squareArr = document.querySelectorAll('.game-square');
    const resetBtn = document.querySelector('.reset-button')
    squareArr.forEach(square => {
        square.addEventListener('click', () => {
            const spot = parseInt(square.id.split('-')[1]);
            game.playRound(spot);
            if(square.textContent==''){
            square.textContent=game.getMarker()
            }
            if(game.getGameState()){
                reset();
            }
        })
        
    });
    resetBtn.addEventListener('click', () => {
        reset();
        game.resetGame();
    });
        const reset = () =>{
    squareArr.forEach(square => {
        square.textContent = ''
    })}


}
screenControler();


