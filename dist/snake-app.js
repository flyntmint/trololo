(function () {
  const OPPOSITES = {
    up: "down",
    down: "up",
    left: "right",
    right: "left",
  };

  function pointsEqual(a, b) {
    return a.x === b.x && a.y === b.y;
  }

  function stepPoint(point, direction) {
    if (direction === "up") return { x: point.x, y: point.y - 1 };
    if (direction === "down") return { x: point.x, y: point.y + 1 };
    if (direction === "left") return { x: point.x - 1, y: point.y };
    return { x: point.x + 1, y: point.y };
  }

  function isOutOfBounds(point, config) {
    return point.x < 0 || point.y < 0 || point.x >= config.width || point.y >= config.height;
  }

  function isOnSnake(point, body) {
    return body.some((part) => pointsEqual(part, point));
  }

  function spawnFood(config, body, rng) {
    const available = [];
    for (let y = 0; y < config.height; y += 1) {
      for (let x = 0; x < config.width; x += 1) {
        const candidate = { x, y };
        if (!isOnSnake(candidate, body)) {
          available.push(candidate);
        }
      }
    }
    if (available.length === 0) {
      return null;
    }
    const randomIndex = Math.floor(rng() * available.length);
    return available[Math.max(0, Math.min(available.length - 1, randomIndex))];
  }

  function createInitialState(config, rng = Math.random) {
    const startX = Math.max(2, Math.floor(config.width / 2));
    const startY = Math.floor(config.height / 2);
    const body = [
      { x: startX, y: startY },
      { x: startX - 1, y: startY },
      { x: startX - 2, y: startY },
    ];
    const food = spawnFood(config, body, rng) ?? { x: 0, y: 0 };
    return {
      snake: {
        body,
        direction: "right",
        pendingDirection: null,
      },
      food,
      score: 0,
      isGameOver: false,
      isPaused: false,
    };
  }

  function queueDirection(state, nextDirection) {
    if (state.isGameOver) {
      return state;
    }
    const currentDirection = state.snake.direction;
    if (nextDirection === currentDirection || OPPOSITES[currentDirection] === nextDirection) {
      return state;
    }
    return {
      ...state,
      snake: {
        ...state.snake,
        pendingDirection: nextDirection,
      },
    };
  }

  function tick(state, config, rng = Math.random) {
    if (state.isGameOver || state.isPaused) {
      return state;
    }
    const direction = state.snake.pendingDirection ?? state.snake.direction;
    const head = state.snake.body[0];
    const nextHead = stepPoint(head, direction);

    if (isOutOfBounds(nextHead, config)) {
      return {
        ...state,
        snake: {
          ...state.snake,
          direction,
          pendingDirection: null,
        },
        isGameOver: true,
      };
    }

    const willGrow = pointsEqual(nextHead, state.food);
    const collisionBody = willGrow ? state.snake.body : state.snake.body.slice(0, -1);
    if (isOnSnake(nextHead, collisionBody)) {
      return {
        ...state,
        snake: {
          ...state.snake,
          direction,
          pendingDirection: null,
        },
        isGameOver: true,
      };
    }

    const nextBody = willGrow ? [nextHead, ...state.snake.body] : [nextHead, ...state.snake.body.slice(0, -1)];
    const nextFood = willGrow ? spawnFood(config, nextBody, rng) : state.food;

    return {
      ...state,
      snake: {
        body: nextBody,
        direction,
        pendingDirection: null,
      },
      food: nextFood ?? nextHead,
      score: willGrow ? state.score + 1 : state.score,
      isGameOver: nextFood === null,
    };
  }

  function togglePause(state) {
    if (state.isGameOver) {
      return state;
    }
    return {
      ...state,
      isPaused: !state.isPaused,
    };
  }

  function restart(config, rng = Math.random) {
    return createInitialState(config, rng);
  }

  const config = {
    width: 20,
    height: 20,
  };
  const tickMs = 140;

  const board = document.getElementById("snake-board");
  const scoreLabel = document.getElementById("snake-score");
  const statusLabel = document.getElementById("snake-status");
  const restartButton = document.getElementById("snake-restart");
  const pauseButton = document.getElementById("snake-pause");
  const muteSongButton = document.getElementById("snake-mute-song");
  const snakeColorSelect = document.getElementById("snake-color");
  const snakeFruitSelect = document.getElementById("snake-fruit");
  const snakeSong = document.getElementById("snake-song");
  const loseOverlay = document.getElementById("snake-lose-overlay");
  const loseCloseButton = document.getElementById("snake-lose-close");
  const rageIndicator = document.getElementById("snake-rage-indicator");
  const mobileControls = Array.from(document.querySelectorAll("[data-dir]"));

  if (!board || !scoreLabel || !statusLabel || !restartButton || !pauseButton) {
    return;
  }

  board.style.gridTemplateColumns = `repeat(${config.width}, 1fr)`;
  board.style.gridTemplateRows = `repeat(${config.height}, 1fr)`;

  const cells = [];
  for (let i = 0; i < config.width * config.height; i += 1) {
    const cell = document.createElement("div");
    cell.className = "snake-cell";
    board.appendChild(cell);
    cells.push(cell);
  }

  let state = createInitialState(config);

  const defaultCellStyle = {
    background: "radial-gradient(circle at 35% 30%, #f3f6f4 0%, #d5ddd8 100%)",
    borderRadius: "6px",
    boxShadow: "inset 0 1px 1px rgba(255, 255, 255, 0.45)",
  };
  const snakeMugaImageUrl = "./src/muga.png";

  const snakeStyles = {
    forest: {
      body: {
        background: "radial-gradient(circle at 35% 30%, #9fe09f 0%, #4d9650 78%)",
        borderRadius: "40%",
        boxShadow: "inset 0 2px 3px rgba(255, 255, 255, 0.4), inset 0 -2px 4px rgba(0, 0, 0, 0.2)",
      },
      head: {
        background: "radial-gradient(circle at 30% 28%, #b6f2ab 0%, #2f7e38 76%)",
        borderRadius: "42%",
        boxShadow: "inset 0 2px 3px rgba(255, 255, 255, 0.45), inset 0 -2px 4px rgba(0, 0, 0, 0.28)",
      },
    },
    ocean: {
      body: {
        background: "radial-gradient(circle at 35% 30%, #9bd8f0 0%, #2e6f99 78%)",
        borderRadius: "40%",
        boxShadow: "inset 0 2px 3px rgba(255, 255, 255, 0.4), inset 0 -2px 4px rgba(0, 0, 0, 0.22)",
      },
      head: {
        background: "radial-gradient(circle at 30% 28%, #b5e7f8 0%, #1f5d85 76%)",
        borderRadius: "42%",
        boxShadow: "inset 0 2px 3px rgba(255, 255, 255, 0.45), inset 0 -2px 4px rgba(0, 0, 0, 0.3)",
      },
    },
    amber: {
      body: {
        background: "radial-gradient(circle at 35% 30%, #f3d896 0%, #b07a2a 78%)",
        borderRadius: "40%",
        boxShadow: "inset 0 2px 3px rgba(255, 255, 255, 0.35), inset 0 -2px 4px rgba(0, 0, 0, 0.2)",
      },
      head: {
        background: "radial-gradient(circle at 30% 28%, #ffe9ba 0%, #956114 76%)",
        borderRadius: "42%",
        boxShadow: "inset 0 2px 3px rgba(255, 255, 255, 0.4), inset 0 -2px 4px rgba(0, 0, 0, 0.28)",
      },
    },
  };

  const fruitStyles = {
    apple: {
      background: "radial-gradient(circle at 35% 30%, #ff9b9b 0%, #b42323 82%)",
      borderRadius: "50%",
      boxShadow: "inset 0 1px 2px rgba(255, 255, 255, 0.45), 0 0 4px rgba(134, 15, 15, 0.35)",
    },
    orange: {
      background: "radial-gradient(circle at 35% 30%, #ffd7a1 0%, #cb6d12 82%)",
      borderRadius: "50%",
      boxShadow: "inset 0 1px 2px rgba(255, 255, 255, 0.45), 0 0 4px rgba(149, 87, 14, 0.3)",
    },
    plum: {
      background: "radial-gradient(circle at 35% 30%, #d5b6f4 0%, #5f2e8d 82%)",
      borderRadius: "50%",
      boxShadow: "inset 0 1px 2px rgba(255, 255, 255, 0.45), 0 0 4px rgba(78, 38, 116, 0.35)",
    },
  };

  let selectedSnakeColor = "forest";
  let selectedFruit = "apple";
  let songMuted = false;
  let deathFaceShownForCurrentLife = false;
  let rageActive = false;
  let ragePart = Math.random() < 0.5 ? "regular" : "moving";
  let regularSpikes = [];
  let movingSpikes = [];
  const rageScoreThreshold = 8;

  function showLoseOverlay() {
    loseOverlay?.classList.add("visible");
  }

  function hideLoseOverlay() {
    loseOverlay?.classList.remove("visible");
  }

  function updateSongButtonLabel() {
    if (!muteSongButton) {
      return;
    }
    muteSongButton.textContent = songMuted ? "Unmute Song" : "Mute Song";
  }

  function tryPlaySong() {
    if (!snakeSong || songMuted) {
      return;
    }
    snakeSong.play().catch(() => {
      // Ignore autoplay blocks; next user gesture will retry.
    });
  }

  function pointKey(x, y) {
    return `${x},${y}`;
  }

  function toIndex(x, y) {
    return y * config.width + x;
  }

  function setDirection(direction) {
    state = queueDirection(state, direction);
  }

  function isPointOnSnake(point) {
    return state.snake.body.some((part) => part.x === point.x && part.y === point.y);
  }

  function isPointOnSpikes(point) {
    const onRegular = regularSpikes.some((spike) => spike.x === point.x && spike.y === point.y);
    const onMoving = movingSpikes.some((spike) => spike.x === point.x && spike.y === point.y);
    return onRegular || onMoving;
  }

  function randomCell(excludeSnake, excludeSpikes) {
    const openCells = [];
    for (let y = 0; y < config.height; y += 1) {
      for (let x = 0; x < config.width; x += 1) {
        const point = { x, y };
        if (excludeSnake && isPointOnSnake(point)) {
          continue;
        }
        if (excludeSpikes && isPointOnSpikes(point)) {
          continue;
        }
        openCells.push(point);
      }
    }
    if (openCells.length === 0) {
      return null;
    }
    return openCells[Math.floor(Math.random() * openCells.length)];
  }

  function generateRegularSpikes() {
    regularSpikes = [];
    const targetCount = 24;
    let attempts = 0;
    while (regularSpikes.length < targetCount && attempts < 800) {
      attempts += 1;
      const candidate = { x: Math.floor(Math.random() * config.width), y: Math.floor(Math.random() * config.height) };
      if (isPointOnSnake(candidate)) {
        continue;
      }
      if (candidate.x === state.food.x && candidate.y === state.food.y) {
        continue;
      }
      if (regularSpikes.some((spike) => spike.x === candidate.x && spike.y === candidate.y)) {
        continue;
      }
      regularSpikes.push(candidate);
    }
  }

  function generateMovingSpikes() {
    movingSpikes = [];
    const targetCount = 6;
    let attempts = 0;
    while (movingSpikes.length < targetCount && attempts < 600) {
      attempts += 1;
      const candidate = {
        x: Math.floor(Math.random() * config.width),
        y: Math.floor(Math.random() * config.height),
        vx: Math.random() < 0.5 ? -1 : 1,
        vy: Math.random() < 0.5 ? -1 : 1,
      };
      if (isPointOnSnake(candidate)) {
        continue;
      }
      if (candidate.x === state.food.x && candidate.y === state.food.y) {
        continue;
      }
      if (movingSpikes.some((spike) => spike.x === candidate.x && spike.y === candidate.y)) {
        continue;
      }
      movingSpikes.push(candidate);
    }
  }

  function updateRageIndicator() {
    if (!rageIndicator) {
      return;
    }
    if (!rageActive) {
      rageIndicator.textContent = "Rage: Off";
      return;
    }
    rageIndicator.textContent = ragePart === "regular" ? "Rage: Regular Spikes" : "Rage: Moving Spikes";
  }

  function activateRageIfNeeded() {
    if (rageActive || state.isGameOver || state.score < rageScoreThreshold) {
      return;
    }
    rageActive = true;
    ragePart = Math.random() < 0.5 ? "regular" : "moving";
    regularSpikes = [];
    movingSpikes = [];
    if (ragePart === "regular") {
      generateRegularSpikes();
    } else {
      generateMovingSpikes();
    }
    if (isPointOnSpikes(state.food)) {
      const safeFood = randomCell(true, true);
      if (safeFood) {
        state = { ...state, food: safeFood };
      }
    }
  }

  function moveSpikes() {
    if (!rageActive || ragePart !== "moving" || state.isPaused || state.isGameOver) {
      return;
    }
    movingSpikes = movingSpikes.map((spike) => {
      let nextX = spike.x + spike.vx;
      let nextY = spike.y + spike.vy;
      let nextVx = spike.vx;
      let nextVy = spike.vy;
      if (nextX < 0 || nextX >= config.width) {
        nextVx *= -1;
        nextX = spike.x + nextVx;
      }
      if (nextY < 0 || nextY >= config.height) {
        nextVy *= -1;
        nextY = spike.y + nextVy;
      }
      return { x: nextX, y: nextY, vx: nextVx, vy: nextVy };
    });
  }

  function applyRageCollisionsAndFood() {
    if (!rageActive || state.isGameOver) {
      return;
    }
    if (isPointOnSpikes(state.snake.body[0])) {
      state = { ...state, isGameOver: true };
      return;
    }
    if (isPointOnSpikes(state.food)) {
      const safeFood = randomCell(true, true);
      if (safeFood) {
        state = { ...state, food: safeFood };
      }
    }
  }

  function updateStatus() {
    updateRageIndicator();
    if (state.isGameOver) {
      statusLabel.textContent = "Game Over";
      pauseButton.disabled = true;
      pauseButton.textContent = "Pause";
      if (!deathFaceShownForCurrentLife) {
        showLoseOverlay();
        deathFaceShownForCurrentLife = true;
      }
      return;
    }
    hideLoseOverlay();
    statusLabel.textContent = state.isPaused ? "Paused" : "Running";
    pauseButton.disabled = false;
    pauseButton.textContent = state.isPaused ? "Resume" : "Pause";
  }

  function render() {
    scoreLabel.textContent = String(state.score);
    updateStatus();
    const fruitSkin = fruitStyles[selectedFruit];
    const snakeKeys = new Set(state.snake.body.map((part) => pointKey(part.x, part.y)));
    const headKey = pointKey(state.snake.body[0].x, state.snake.body[0].y);
    const foodKey = pointKey(state.food.x, state.food.y);

    for (let y = 0; y < config.height; y += 1) {
      for (let x = 0; x < config.width; x += 1) {
        const index = toIndex(x, y);
        const key = pointKey(x, y);
        const cell = cells[index];
        cell.className = "snake-cell";
        cell.style.background = defaultCellStyle.background;
        cell.style.backgroundImage = "";
        cell.style.backgroundSize = "";
        cell.style.backgroundPosition = "";
        cell.style.backgroundRepeat = "";
        cell.style.borderRadius = defaultCellStyle.borderRadius;
        cell.style.boxShadow = defaultCellStyle.boxShadow;
        const hasRegularSpike = regularSpikes.some((spike) => spike.x === x && spike.y === y);
        const hasMovingSpike = movingSpikes.some((spike) => spike.x === x && spike.y === y);
        if (hasRegularSpike || hasMovingSpike) {
          cell.classList.add("snake-spike");
          cell.style.background = hasMovingSpike
            ? "radial-gradient(circle at 45% 25%, #ffc7c7 0%, #cc2a2a 75%)"
            : "linear-gradient(180deg, #ffd2d2 0%, #a82020 100%)";
          cell.style.borderRadius = "18%";
          cell.style.boxShadow = "inset 0 1px 2px rgba(255,255,255,0.4), 0 0 0 1px rgba(93, 8, 8, 0.55)";
        }
        if (snakeKeys.has(key)) {
          cell.classList.add("snake-body");
          cell.style.background = "#f7f7f7";
          cell.style.backgroundImage = `url("${snakeMugaImageUrl}")`;
          cell.style.backgroundSize = "cover";
          cell.style.backgroundPosition = "center";
          cell.style.backgroundRepeat = "no-repeat";
          cell.style.borderRadius = "24%";
          cell.style.boxShadow = "inset 0 1px 2px rgba(255,255,255,0.45), 0 0 0 1px rgba(0,0,0,0.22)";
        }
        if (key === headKey) {
          cell.classList.add("snake-head");
          cell.style.background = "#fff2c2";
          cell.style.backgroundImage = `url("${snakeMugaImageUrl}")`;
          cell.style.backgroundSize = "cover";
          cell.style.backgroundPosition = "center";
          cell.style.backgroundRepeat = "no-repeat";
          cell.style.borderRadius = "18%";
          cell.style.boxShadow =
            "inset 0 1px 3px rgba(255,255,255,0.55), 0 0 0 2px rgba(255,205,40,0.85), 0 0 4px rgba(0,0,0,0.35)";
        }
        if (key === foodKey) {
          cell.classList.add("snake-food");
          cell.style.background = fruitSkin.background;
          cell.style.borderRadius = fruitSkin.borderRadius;
          cell.style.boxShadow = fruitSkin.boxShadow;
        }
      }
    }
  }

  function doRestart() {
    state = restart(config);
    deathFaceShownForCurrentLife = false;
    rageActive = false;
    ragePart = Math.random() < 0.5 ? "regular" : "moving";
    regularSpikes = [];
    movingSpikes = [];
    hideLoseOverlay();
    updateRageIndicator();
    render();
  }

  function mapKeyToDirection(key) {
    if (key === "ArrowUp" || key === "w" || key === "W") return "up";
    if (key === "ArrowDown" || key === "s" || key === "S") return "down";
    if (key === "ArrowLeft" || key === "a" || key === "A") return "left";
    if (key === "ArrowRight" || key === "d" || key === "D") return "right";
    return null;
  }

  window.addEventListener("keydown", (event) => {
    const direction = mapKeyToDirection(event.key);
    if (direction) {
      event.preventDefault();
      setDirection(direction);
      return;
    }
    if (event.key === "p" || event.key === "P") {
      event.preventDefault();
      state = togglePause(state);
      render();
      return;
    }
    if (event.key === "r" || event.key === "R") {
      event.preventDefault();
      doRestart();
    }
  });

  restartButton.addEventListener("click", doRestart);
  pauseButton.addEventListener("click", () => {
    state = togglePause(state);
    render();
  });

  if (loseCloseButton) {
    loseCloseButton.addEventListener("click", () => {
      hideLoseOverlay();
    });
  }

  if (muteSongButton) {
    muteSongButton.addEventListener("click", () => {
      songMuted = !songMuted;
      if (snakeSong) {
        snakeSong.muted = songMuted;
      }
      updateSongButtonLabel();
      if (!songMuted) {
        tryPlaySong();
      }
    });
  }

  for (const button of mobileControls) {
    button.addEventListener("click", () => {
      const direction = button.dataset.dir;
      if (!direction) {
        return;
      }
      setDirection(direction);
    });
  }

  if (snakeColorSelect) {
    snakeColorSelect.addEventListener("change", () => {
      const value = snakeColorSelect.value;
      if (!snakeStyles[value]) {
        return;
      }
      selectedSnakeColor = value;
      render();
    });
  }

  if (snakeFruitSelect) {
    snakeFruitSelect.addEventListener("change", () => {
      const value = snakeFruitSelect.value;
      if (!fruitStyles[value]) {
        return;
      }
      selectedFruit = value;
      render();
    });
  }

  window.addEventListener("pointerdown", tryPlaySong, { once: true });
  window.addEventListener("keydown", tryPlaySong, { once: true });

  updateSongButtonLabel();
  tryPlaySong();
  updateRageIndicator();

  setInterval(() => {
    state = tick(state, config);
    activateRageIfNeeded();
    moveSpikes();
    applyRageCollisionsAndFood();
    render();
  }, tickMs);

  render();
})();
