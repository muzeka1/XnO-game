const size = 3;
const winBox = document.querySelector(".win-box");
const currentWinnerTextEl = document.querySelector(".current-winner");
let currentState = true;
let board = [];

function restartGame() {
  currentSign = true;
  initializeGame();
}

function initializeGame() {
  board = [
    ...Array(size)
      .fill()
      .map((e) => Array(size).fill("")),
  ];
  renderBoard();
}

function renderBoard() {
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const cell = document.querySelector(`[data-row="${i}"][data-col="${j}"]`);
      cell.textContent = cell.dataset.value;
    }
  }
}

function placeSign(element) {
  const cellElement = element.target;
  coordY = Number(cellElement.dataset.row);
  coordX = Number(cellElement.dataset.col);

  if (currentState) {
    cellElement.dataset.value = "X";
    board[coordY][coordX] = "X";
  } else {
    cellElement.dataset.value = "O";
    board[coordY][coordX] = "O";
  }

  renderBoard();
  checkWinner(coordX, coordY);
  //   checkEmptyCells();
  currentState = !currentState;
  cellElement.removeEventListener("click", placeSign);
}

function checkWinner(coordX, coordY) {
  if (board[coordY].every((e) => e === board[coordY][0])) {
    callWinner();
    return;
  }

  let checkArr = [];
  for (let i = 0; i < size; i++) {
    checkArr.push(board[i][coordX]);
  }
  if (checkArr.every((e) => e === checkArr[0])) {
    callWinner();
    return;
  } else {
    checkArr = [];
  }

  if (
    (coordX === 0 && coordY === 0) ||
    (coordX === size - 1 && coordY === size - 1) ||
    (coordX === 1 && coordY === 1)
  ) {
    for (let i = 0; i < size; i++) {
      checkArr.push(board[i][i]);
    }
    if (checkArr.every((e) => e === checkArr[0])) {
      callWinner();
      return;
    } else {
      checkArr = [];
    }
  }

  if (
    (coordX === 0 && coordY === size - 1) ||
    (coordX === size - 1 && coordY === 0) ||
    (coordX === 1 && coordY === 1)
  ) {
    for (let i = 0; i < size; i++) {
      let j = size - 1;
      checkArr.push(board[j - i][i]);
    }
    if (checkArr.every((e) => e === checkArr[0])) {
      callWinner();
      return;
    }
  }
}

function callWinner() {
  if (currentState) {
    currentWinnerTextEl.textContent = "Крестики";
  } else {
    currentWinnerTextEl.textContent = "Нолики";
  }
  winBox.style.display = "flex";
}

document
  .querySelectorAll(".cell")
  .forEach((e) => e.addEventListener("click", placeSign));

initializeGame();
