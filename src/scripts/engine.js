const state = {
  view: {
      squares: document.querySelectorAll(".square"),
      enemy: document.querySelector(".enemy"),
      timeLeft: document.querySelector("#time-left"),
      score: document.querySelector("#score"),
      gameOver: document.querySelector("#game-over"),
      resultScore: document.querySelector("#result-score"),
      restartButton: document.querySelector("#restart-button")
  },
  values: {
      gameVelocity: 1000,
      hitPosition: 0,
      result: 0,
      currentTime: 60,
  },
  actions: {
      timerId: null,
      countDownTimeId: null,
  },
};

function countDown() {
  state.values.currentTime--;
  state.view.timeLeft.textContent = state.values.currentTime;

  if (state.values.currentTime <= 0) {
      clearInterval(state.actions.countDownTimeId);
      clearInterval(state.actions.timerId);
      showGameOver();
  }
}

function showGameOver() {
  state.view.resultScore.textContent = state.values.result;
  state.view.gameOver.style.display = "block";
}

function playSound(audioName) {
  let audio = new Audio(`./src/sounds/${audioName}.m4a`);
  audio.volume = 0.2;
  audio.play();
}

function randomSquare() {
  state.view.squares.forEach((square) => {
      square.classList.remove("enemy");
  });

  let randomNumber = Math.floor(Math.random() * 9);
  let randomSquare = state.view.squares[randomNumber];
  randomSquare.classList.add("enemy");
  state.values.hitPosition = randomSquare.id;
}

function addListenerHitBox() {
  state.view.squares.forEach((square) => {
      ['mousedown', 'touchstart'].forEach(eventName => {
          square.addEventListener(eventName, (e) => {
              e.preventDefault();
              if (square.id === state.values.hitPosition) {
                  state.values.result++;
                  state.view.score.textContent = state.values.result;
                  state.values.hitPosition = null;
                  playSound("hit");
              }
          });
      });
  });
}

function restartGame() {
  // Reset all values
  state.values.currentTime = 60;
  state.values.result = 0;
  state.values.hitPosition = 0;
  
  // Reset display
  state.view.timeLeft.textContent = state.values.currentTime;
  state.view.score.textContent = state.values.result;
  state.view.gameOver.style.display = "none";
  
  // Clear any remaining enemies
  state.view.squares.forEach((square) => {
      square.classList.remove("enemy");
  });
  
  // Start new timers
  state.actions.timerId = setInterval(randomSquare, state.values.gameVelocity);
  state.actions.countDownTimeId = setInterval(countDown, 1000);
}

function init() {
  addListenerHitBox();
  state.view.restartButton.addEventListener("click", restartGame);
  state.actions.timerId = setInterval(randomSquare, state.values.gameVelocity);
  state.actions.countDownTimeId = setInterval(countDown, 1000);
}

init();