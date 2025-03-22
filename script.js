let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

updateScoreElement();

let isAutoPlaying = false;
let intervalID;

function autoPlay() {
  const autoPlayButton = document.querySelector(".auto-play-button");
  if (!isAutoPlaying) {
    intervalID = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1500);
    isAutoPlaying = true;
    autoPlayButton.textContent = "⏹ Stop Playing";
  } else {
    clearInterval(intervalID);
    isAutoPlaying = false;
    autoPlayButton.textContent = "▶ Auto Play";
  }
}

function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = "";

  if (playerMove === "scissors") {
    if (computerMove === "rock") {
      result = "You lose.";
    } else if (computerMove === "paper") {
      result = "You win.";
    } else if (computerMove === "scissors") {
      result = "Tie.";
    }
  } else if (playerMove === "paper") {
    if (computerMove === "rock") {
      result = "You win.";
    } else if (computerMove === "paper") {
      result = "Tie.";
    } else if (computerMove === "scissors") {
      result = "You lose.";
    }
  } else if (playerMove === "rock") {
    if (computerMove === "rock") {
      result = "Tie.";
    } else if (computerMove === "paper") {
      result = "You lose.";
    } else if (computerMove === "scissors") {
      result = "You win.";
    }
  }

  // Update score
  if (result === "You win.") {
    score.wins += 1;
  } else if (result === "You lose.") {
    score.losses += 1;
  } else if (result === "Tie.") {
    score.ties += 1;
  }

  localStorage.setItem("score", JSON.stringify(score));
  updateScoreElement();

  const resultElement = document.querySelector(".js-result");
  resultElement.innerHTML = result;

  if (result === "You win.") {
    resultElement.setAttribute("data-result", "win");
  } else if (result === "You lose.") {
    resultElement.setAttribute("data-result", "loss");
  } else if (result === "Tie.") {
    resultElement.setAttribute("data-result", "tie");
  }

  document.querySelector(".js-moves").innerHTML = `
    <div class="player-move">
      YOU
      <img src="images/${playerMove}-emoji.png" class="move-icon">
    </div>
    <div class="vs-text">VS</div>
    <div class="computer-move">
      CPU
      <img src="images/${computerMove}-emoji.png" class="move-icon">
    </div>
  `;
}

function updateScoreElement() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `Wins: ${score.wins} | Losses: ${score.losses} | Ties: ${score.ties}`;
}

function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = "";

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "paper";
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = "scissors";
  }

  return computerMove;
}

function updateScoreElement() {
  document.querySelector(".js-score").innerHTML = `
    <span class="score-item score-wins">Wins: ${score.wins}</span> | 
    <span class="score-item score-losses">Losses: ${score.losses}</span> | 
    <span class="score-item score-ties">Ties: ${score.ties}</span>
  `;
}
