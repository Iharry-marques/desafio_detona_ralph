const state = {
  view: {
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
  },
  values: {
    gameVelocity: 1000,
    hitPosition: 0,
    result: 0,
    currentTime: 60,
  },
  actions: {
    timerId: setInterval(randomSquare, 1000),
    countDownTimeId: setInterval(countDown, 1000),
  },
};

function countDown() {
  state.values.currentTime--;
  state.view.timeLeft.textContent = state.values.currentTime;

  if (state.values.currentTime <= 0) {
    clearInterval(state.actions.countDownTimeId);
    clearInterval(state.actions.timerId);
    alert("Game Over ! O seu resultado foi: " + state.values.result);
  }
}

function playSound(audioName){
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
    square.addEventListener("mousedown", () => {
      if (square.id === state.values.hitPosition) {
        state.values.result++;
        state.view.score.textContent = state.values.result;
        state.values.hitPosition = null;
        playSound("hit");
      }
    });
  });
}

// Previne comportamentos indesejados de toque em dispositivos móveis
document.addEventListener('touchmove', function(e) {
  e.preventDefault();
}, { passive: false });

// Adapta o evento de clique para dispositivos móveis
function addListenerHitBox() {
  state.view.squares.forEach((square) => {
      ['mousedown', 'touchstart'].forEach(eventName => {
          square.addEventListener(eventName, (e) => {
              e.preventDefault(); // Previne comportamento padrão em dispositivos móveis
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

function init() {
  addListenerHitBox();
}

init();
