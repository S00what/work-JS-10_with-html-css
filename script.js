const start = document.querySelector(".start"),
  box = document.querySelector(".box"),
  modesBtn = document.querySelectorAll(".mode"),
  stop = document.querySelector(".stop");

let hitted = 0,
  losted = 0,
  recursion = false,
  time = 0,
  limit = 0,
  spawnId = null,
  timerId = null;

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function startTheGame() {
  const n = getRandom(1, 3),
    posX = getRandom(20, 480),
    posY = getRandom(20, 280),
    r = getRandom(0, 255),
    g = getRandom(0, 255),
    b = getRandom(0, 255);
  let randomFigure = getRandom(0, 3);
  losted += 1;

  if (randomFigure == 1) {
    box.innerHTML = `
      <div class="wrap__info-game">
          <p class="losted">Losted: ${losted}</p>
          <p class="hitted">Hitted: ${hitted}</p>
          <p class="timer">Time ${time}</p>
      </div>
      <button class="figure" style="position:absolute; bottom:${posX}px; right:${posY}px">
      <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <rect width="20" height="20" fill="rgb(${r}, ${g}, ${b}"/>
      </svg>
      </button>
      `;
  } else if (randomFigure == 2) {
    box.innerHTML = `
      <div class="wrap__info-game">
          <p class="losted">Losted: ${losted}</p>
          <p class="hitted">Hitted: ${hitted}</p>
          <p class="timer">Time ${time}</p>
      </div>
      <button class="figure" style="position:absolute; bottom:${posX}px; right:${posY}px">
      <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://w3.org">
        <circle cx="10" cy="10" r="10" fill="rgb(${r}, ${g}, ${b})" />
      </svg>
      </button>
      `;
  } else {
    box.innerHTML = `
      <div class="wrap__info-game">
          <p class="losted">Losted: ${losted}</p>
          <p class="hitted">Hitted: ${hitted}</p>
          <p class="timer">Time ${time}</p>
      </div>
      <button class="figure" style="position:absolute; bottom:${posX}px; right:${posY}px">
      <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://w3.org">
        <polygon points="10,0 0,20 20,20" fill="rgb(${r}, ${g}, ${b})" />
      </svg>
      </button>
      `;
  }
}

function easyModeGame() {
  if (recursion) {
    startTheGame();
    spawnId = setTimeout(() => easyModeGame(), 1500);
  }
}

function mediumModeGame() {
  if (recursion) {
    startTheGame();
    spawnId = setTimeout(() => mediumModeGame(), 800);
  }
}

function hardModeGame() {
  if (recursion) {
    startTheGame();
    spawnId = setTimeout(() => hardModeGame(), 500);
  }
}

function timer() {
  if (recursion) {
    time++;
    document.querySelector(".timer").innerHTML = `Time ${time}`;
    if (time >= limit) {
      recursion = false;
      clearTimeout(spawnId);
      if (losted > hitted) {
        box.innerHTML = `<p>Game over. Hitted: ${hitted}, Losted: ${losted}</p>`;
      } else {
        box.innerHTML = `<p>WIN . Hitted: ${hitted}, Losted: ${losted}</p>`;
      }
      return;
    }
    timerId = setTimeout(() => timer(), 1000);
  }
}

function begin(limitSec, modeFn) {
  clearTimeout(spawnId);
  clearTimeout(timerId);
  time = 0;
  hitted = 0;
  losted = 0;
  limit = limitSec;
  recursion = true;
  modeFn();
  timerId = setTimeout(() => timer(), 1000);
}

start.addEventListener("click", () => {
  modesBtn.forEach((item) => (item.style.display = "flex"));
  start.style.display = "none";
  stop.style.display = "flex";
});

stop.addEventListener("click", () => {
  modesBtn.forEach((item) => (item.style.display = "none"));
  stop.style.display = "none";
  start.style.display = "flex";
  box.innerHTML = "";
  recursion = false;
  clearTimeout(spawnId);
  clearTimeout(timerId);
});

modesBtn.forEach((item) => {
  item.addEventListener("click", () => {
    if (item.classList.contains("easy")) begin(60, easyModeGame);
    if (item.classList.contains("medium")) begin(30, mediumModeGame);
    if (item.classList.contains("hard")) begin(15, hardModeGame);
  });
});

box.addEventListener("click", (e) => {
  if (e.target.closest(".figure")) {
    hitted += 1;
    losted -= 1;
    document.querySelector(".losted").innerHTML = `Losted: ${losted}`;
    document.querySelector(".hitted").innerHTML = `Hitted: ${hitted}`;
    e.target.closest(".figure").remove();
  }
});
