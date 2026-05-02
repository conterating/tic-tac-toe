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

  const getBoard = () => {
    return Gameboard.getBoard();
  };

  return {
    playRound,
    getActivePlayer,
    getBoard,
  };
}

function ScreenController() {
  const game = GameController();
  const boardDiv = document.querySelector(".board");
  const turnDiv = document.querySelector(".turn");

  function updateScreen() {
    boardDiv.textContent = "";

    const board = game.getBoard();
    let activePlayer = game.getActivePlayer();

    turnDiv.textContent = activePlayer.getName();

    for (let i = 0; i < board.length; i++) {
      const gridSquare = document.createElement("button");
      gridSquare.classList.add("square");
      gridSquare.setAttribute("square-id", i);

      boardDiv.append(gridSquare);
    }
  }

  function clickHandlerBoard() {
    //next here
  }

  return { updateScreen };
}

const screen = ScreenController();
screen.updateScreen();
