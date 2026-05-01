const Gameboard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => board;

  const addMoveToBoard = (index, side) => {
    const availableCells = board.filter((element) => {
      element != "" ? true : false;
    });

    if (availableCells) {
      board.splice(index, 1, side);
    } else {
      return;
    }
  };

  return { getBoard, addMoveToBoard };
})();


function createPlayer(name, team) {
  return {name, team}
}

function GameController() {
  player1 = createPlayer("Player 1", "x");
  player2 = createPlayer("Player 2", "o");

  const board = Game
}