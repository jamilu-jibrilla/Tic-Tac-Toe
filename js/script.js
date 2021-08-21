let Gameboard = (function () {
  let gameArray = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  let render = (player) => {
    let nextTurn = document.querySelector(".controller");
    let col = document.querySelectorAll("tr");
    for (let i = 0; i < col.length; i++) {
      const element = Array.from(col[i].children);
      element.forEach((item) => {
        let data = +item.getAttribute("data-row");
        if (gameArray[i][data] === "") {
          item.addEventListener("click", add);
        }
        function add(e) {
          if (
            nextTurn.textContent === "PLAYER ONE WINS" ||
            nextTurn.textContent === "PLAYER TWO WINS"
          ) {
            item.removeEventListener("click", add);
          } else {
            gameArray[i].splice(data, 1, player.marker);
            item.textContent = gameArray[i][data];
          }
        }
      });
    }
  };

  let makeAI = () => {
    let random = Math.floor(Math.random());
  };

  return {
    render,
    gameArray,
  };
})();

let game = (function () {
  let player1 = Player("player1", "x");
  let player2 = Player("player2", "o");

  let checkWinner = (marker) => {
    let gameArray = Gameboard.gameArray;
    /** win at 
         * array1 index[012], array2 index[012] and array3 index[012]
          
         * array1 index[0],array2 index[0],array3 index[0]
         * ""   1  ""  [1],""   2  ""  [1],""   3  ""  [1]
         * ""   1  ""  [2],""   2  ""  [2],""   3  ""  [2]
         
        * array1 index[0],array2 index[1],array3 index[2]
           array1 index[2],array2 index[1], array3 index[0]
        */

    if (
      (gameArray[0][0] === marker &&
        gameArray[0][1] === marker &&
        gameArray[0][2] === marker) ||
      (gameArray[1][0] === marker &&
        gameArray[1][1] === marker &&
        gameArray[1][2] === marker) ||
      (gameArray[2][0] === marker &&
        gameArray[2][1] === marker &&
        gameArray[2][2] === marker) ||
      (gameArray[0][0] === marker &&
        gameArray[1][0] === marker &&
        gameArray[2][0] === marker) ||
      (gameArray[0][1] === marker &&
        gameArray[1][1] === marker &&
        gameArray[2][1] === marker) ||
      (gameArray[0][2] === marker &&
        gameArray[1][2] === marker &&
        gameArray[2][2] === marker) ||
      (gameArray[0][0] === marker &&
        gameArray[1][1] === marker &&
        gameArray[2][2] === marker) ||
      (gameArray[0][2] === marker &&
        gameArray[1][1] === marker &&
        gameArray[2][0] === marker)
    ) {
      return true;
    }
  };
  function checkTie(params) {
    if (params > 8) {
      return true;
    }
  }

  let table = Array.from(document.querySelectorAll("td"));
  let nextTurn = document.querySelector(".controller");
  nextTurn.classList.add("player1");

  table.forEach((element) => {
    element.addEventListener("mousedown", gameFlow);
  });

  function stopEvent() {
    table.forEach((element) => {
      element.removeEventListener("mousedown", gameFlow);
    });
  }

  function gameFlow(e) {
    if (nextTurn.classList.contains("player1")) {
      if (e.target.textContent === "") {
        nextTurn.classList.remove("player1");
        nextTurn.textContent = "PLAYER TWO'S TURN";
        player1.turn++;
      }
      Gameboard.render(player1);
      setTimeout(() => {
        if (checkWinner(player1.marker)) {
          nextTurn.textContent = "PLAYER ONE WINS";
          document.querySelector(".header").innerHTML += `
                        <button class="winBtn">play again</button>
                        `;
          stopEvent();
        } else {
          if (checkTie(player1.turn + player2.turn)) {
            document.querySelector(".header").innerHTML += `
                        <h3 "class="winTitle"> TIE. </h3/>
                        <button class="winBtn">play again</button>
                    `;
            stopEvent();
          }
        }
      }, 200);
    } else if (!nextTurn.classList.contains("player1")) {
      if (e.target.textContent === "") {
        nextTurn.classList.add("player1");
        nextTurn.textContent = "PLAYER ONE'S TURN";
        player2.turn++;
      }
      Gameboard.render(player2);
      setTimeout(() => {
        if (checkWinner(player2.marker)) {
          nextTurn.textContent = "PLAYER TWO WINS";
          document.querySelector(".header").innerHTML += `
                        <button class="winBtn">play again</button>
                        `;
          stopEvent();
        } else {
          if (checkTie(player1.turn + player2.turn)) {
            document.querySelector(".header").innerHTML += `
                        <h3 "class="winTitle"> TIE. </h3/>
                        <button class="winBtn">play again</button>
                    `;
            stopEvent();
          }
        }
      }, 200);
    }
  }
})();

function Player(playerName, playermarker) {
  let name = playerName;
  let marker = playermarker;
  let turn = 0;
  return {
    name,
    marker,
    turn,
  };
}
