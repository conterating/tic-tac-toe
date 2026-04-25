function checkGameOver() {
  board = ["x", "o", "x", "x", "o", "o", "x", "o", "o"];
  let filledSquares = 0;

  for (let i = 0; i < board.length; i++) {
    if (board[i] == "x" || board[i] == "o") {
      filledSquares += 1;
      console.log(filledSquares);
    }
  }
}

checkGameOver();
