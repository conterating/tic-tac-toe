const Gameboard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];
  const winningIdxs = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  let xIdxs = [];
  let oIdxs = [];
  let winner;

  function getBoard() {
    return board;
  }

  function boardFull() {
    const allFilled = board.every((element) => {
      element != "";
    });

    if (allFilled) {
      return true;
    }
  }

  function addIndices() {
    for (let i = 0; i < board.length; i++) {
      if (board[i] == "x") {
        xIdxs.push(i);
      } else if (board[i] == "o") {
        oIdxs.push(i);
      }
    }
  }

  function declareWinner() {
    addIndices();
    for (let arr in winningIdxs) {
      let xWins = winningIdxs[arr].every((val) => xIdxs.includes(val));
      let oWins = winningIdxs[arr].every((val) => oIdxs.includes(val));

      if (xWins) {
        winner = "X's Win!!!!";
        return winner;
      } else if (oWins) {
        winner = "O's Win!!!";
        return winner;
      } else if (boardFull()) {
        winner = "draw";
      }
    }
  }

  function makeMove(player, index) {
    if (board[index] == "") {
      board.splice(index, 1, player.getSide());
    } else {
      console.log("That spot is already taken");
    }
  }

  return {
    getBoard,
    addIndices,
    declareWinner,
    makeMove,
    boardFull,
  };
})();

function createPlayer(name, side) {
  function getName() {
    return name;
  }

  function getSide() {
    return side;
  }

  return {
    getName,
    getSide,
  };
}

function GameController() {
  const board = Gameboard.getBoard();

  const player1 = createPlayer("Player 1", "x");
  const player2 = createPlayer("Player 2", "o");

  const players = [player1, player2];

  let activePlayer = players[0];

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const getActivePlayer = () => {
    return activePlayer;
  };

  const playRound = (index) => {
    console.log(
      `${getActivePlayer().getName()} put an ${getActivePlayer().getSide()} at ${index}`,
    );

    Gameboard.makeMove(getActivePlayer(), index);
    console.log(Gameboard.getBoard());

    console.log(Gameboard.declareWinner());
    switchPlayerTurn();

    //call the check board full function in here
  };

  return {
    playRound,
    getActivePlayer,
  };
}

const game = GameController();
game.playRound(0);
game.playRound(1);
game.playRound(3);
game.playRound(4);
game.playRound(6);

/*
const GameController = (() => {
  //add GameController.playRound()
  //active player functionality

  const board = Gameboard.getBoard();

  const player1 = createPlayer("x");
  const player2 = createPlayer("o");

  player1.makeMove("0");
  player2.makeMove("3");
  player1.makeMove("5");
  player2.makeMove("4");
  player1.makeMove("8");
  player2.makeMove("6");
  player1.makeMove("7");
  player2.makeMove("2");
  player1.makeMove("1");

  Gameboard.addIndices();

  const filled = board.every((str) => str !== "");
  if (filled) {
    const winner = Gameboard.declareWinner();
    console.log(winner);
  } else {
    console.log("board isnt full");
  }
})();
*/
const ScreenController = () => {
  const board = Gameboard.getBoard();

  function updateScreen() {}

  function clickHandlerBoard() {}
};
