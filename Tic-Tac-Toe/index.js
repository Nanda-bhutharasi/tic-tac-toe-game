let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
let newGameBtn = document.querySelector("#newgame");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;
let gameOver = false;

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

document.querySelector(".game").addEventListener("click", (event) => {
  if (event.target.classList.contains("box")) {
    const box = event.target;

    if (gameOver || box.innerHTML !== "") return;

    if (turnO) {
      box.innerHTML = "O";
      turnO = false;
    } else {
      box.innerHTML = "X";
      turnO = true;
    }
    box.disabled = true;

    checkWinner();
  }
});

const showWinner = (winner) => {
  msg.innerText = `Congratulations, winner is ${winner}`;
  msgContainer.classList.remove("hide");
  gameOver = true;
};

const showDraw = () => {
  msg.innerText = "It's a draw!";
  msgContainer.classList.remove("hide");
  gameOver = true;
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1 = boxes[pattern[0]].innerText;
    let pos2 = boxes[pattern[1]].innerText;
    let pos3 = boxes[pattern[2]].innerText;

    if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
      showWinner(pos1);
      return;
    }
  }

  if ([...boxes].every((box) => box.innerText !== "")) {
    showDraw();
  }
};

const resetGame = () => {
  boxes.forEach((box) => {
    box.innerHTML = "";
    box.disabled = false;
  });
  msgContainer.classList.add("hide");
  turnO = true;
  gameOver = false;
};

reset.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);
