console.log("JavaScript is running!");

const cells = document.querySelectorAll("[data-cell]");
const winnerMessage = document.getElementById("winner-message");
const restartButton = document.getElementById("restart-button");

let isPlayerTurn = true;
const board = Array(9).fill(null);

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
function handlePlayerTurn(cell, index) {
    console.log("Player clicked cell:", index); 
    if (!isPlayerTurn || board[index] !== null) {
      console.log("Invalid move. Either not player's turn or cell is already taken.");
      return;
    }
  
    board[index] = "X";
    cell.textContent = "X"; 
    cell.classList.add("taken");
  
    console.log("Board state after player move:", board); 
  
    if (checkWin("X")) {
      winnerMessage.textContent = "You Win!";
      console.log("Player wins!"); 
      disableBoard();
      return;
    }
  
    if (board.every(cell => cell !== null)) {
      winnerMessage.textContent = "It's a Draw!";
      console.log("Game ended in a draw."); 
      return;
    }
  
    isPlayerTurn = false;
    setTimeout(computerTurn, 500); 
  }
  
  function computerTurn() {
    const availableCells = board
      .map((value, index) => (value === null ? index : null))
      .filter(index => index !== null);
  
    if (availableCells.length === 0) {
      console.log("No available cells for AI. Game over.");
      return;
    }

    const randomIndex = Math.floor(Math.random() * availableCells.length);
    const aiChoice = availableCells[randomIndex];
    console.log("AI chooses cell:", aiChoice); 
  
    board[aiChoice] = "O";
    cells[aiChoice].textContent = "O"; 
    cells[aiChoice].classList.add("taken");
  
    console.log("Board state after AI move:", board); 
  
    if (checkWin("O")) {
      winnerMessage.textContent = "Computer Wins!";
      console.log("Computer wins!"); 
      disableBoard();
      return;
    }
  
    if (board.every(cell => cell !== null)) {
      winnerMessage.textContent = "It's a Draw!";
      console.log("Game ended in a draw.");
      return;
    }
  
    isPlayerTurn = true;
  }
  
function checkWin(player) {
  return winningCombinations.some(combination => {
    const [a, b, c] = combination;
    return board[a] === player && board[b] === player && board[c] === player;
  });
}

function disableBoard() {
  cells.forEach(cell => cell.classList.add("taken"));
}

function restartGame() {
  board.fill(null);
  isPlayerTurn = true;
  winnerMessage.textContent = "";
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("taken");
  });
}

cells.forEach((cell, index) =>
  cell.addEventListener("click", () => handlePlayerTurn(cell, index))
);
restartButton.addEventListener("click", restartGame);
