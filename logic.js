const board = document.getElementById("board");
const status = document.getElementById("status");
let currentPlayer = "X";
let cells = [];
let gameOver = false;


for (let i = 0; i < 9; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cell.addEventListener("click", () => makeMove(i));
  board.appendChild(cell);
  cells.push(cell);
}

function makeMove(index) {
  if (cells[index].textContent === "" && !gameOver) {
    cells[index].textContent = currentPlayer;
    if (checkWinner()) {
      status.textContent = `Player ${currentPlayer} wins! 🎉`;
      gameOver = true;
    } else if (cells.every(cell => cell.textContent !== "")) {
      status.textContent = "It's a draw! 🤝";
      gameOver = true;
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      status.textContent = `Player ${currentPlayer}'s turn`;
    }
  }
}

function checkWinner() {
  const winningCombos = [
    [0,1,2], [3,4,5], [6,7,8], 
    [0,3,6], [1,4,7], [2,5,8], 
    [0,4,8], [2,4,6]            
  ];

  for (let combo of winningCombos) {
    const [a, b, c] = combo;
    if (
      cells[a].textContent &&
      cells[a].textContent === cells[b].textContent &&
      cells[a].textContent === cells[c].textContent
    ) {
      cells[a].classList.add("winner");
      cells[b].classList.add("winner");
      cells[c].classList.add("winner");
      return true;
    }
  }
  return false;
}

function resetGame() {
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("winner");
  });
  currentPlayer = "X";
  gameOver = false;
  status.textContent = `Player ${currentPlayer}'s turn`;
}
