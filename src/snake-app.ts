import {
  createInitialState,
  queueDirection,
  restart,
  tick,
  togglePause,
  type Direction,
  type GameConfig,
  type GameState,
  type Point,
} from "./snake-logic.js";

const config: GameConfig = {
  width: 20,
  height: 20,
};

const tickMs = 140;

const board = document.getElementById("snake-board") as HTMLDivElement | null;
const scoreLabel = document.getElementById("snake-score") as HTMLSpanElement | null;
const statusLabel = document.getElementById("snake-status") as HTMLSpanElement | null;
const restartButton = document.getElementById("snake-restart") as HTMLButtonElement | null;
const pauseButton = document.getElementById("snake-pause") as HTMLButtonElement | null;
const muteSongButton = document.getElementById("snake-mute-song") as HTMLButtonElement | null;
const snakeColorSelect = document.getElementById("snake-color") as HTMLSelectElement | null;
const snakeFruitSelect = document.getElementById("snake-fruit") as HTMLSelectElement | null;
const snakeSong = document.getElementById("snake-song") as HTMLAudioElement | null;
const loseOverlay = document.getElementById("snake-lose-overlay") as HTMLDivElement | null;
const loseCloseButton = document.getElementById("snake-lose-close") as HTMLButtonElement | null;
const rageIndicator = document.getElementById("snake-rage-indicator") as HTMLDivElement | null;
const mobileControls = Array.from(document.querySelectorAll<HTMLButtonElement>("[data-dir]"));

if (!board || !scoreLabel || !statusLabel || !restartButton || !pauseButton) {
  throw new Error("Snake UI elements are missing.");
}

board.style.gridTemplateColumns = `repeat(${config.width}, 1fr)`;
board.style.gridTemplateRows = `repeat(${config.height}, 1fr)`;

const cells: HTMLDivElement[] = [];
for (let i = 0; i < config.width * config.height; i += 1) {
  const cell = document.createElement("div");
  cell.className = "snake-cell";
  board.appendChild(cell);
  cells.push(cell);
}

let state: GameState = createInitialState(config);
type SnakeColorKey = "forest" | "ocean" | "amber";
type FruitKey = "apple" | "orange" | "plum";
type CellStyle = {
  background: string;
  borderRadius: string;
  boxShadow: string;
};
type RagePart = "regular" | "moving";
type MovingSpike = {
  x: number;
  y: number;
  vx: -1 | 1;
  vy: -1 | 1;
};

const defaultCellStyle: CellStyle = {
  background: "radial-gradient(circle at 35% 30%, #f3f6f4 0%, #d5ddd8 100%)",
  borderRadius: "6px",
  boxShadow: "inset 0 1px 1px rgba(255, 255, 255, 0.45)",
};
const snakeMugaImageUrl = "./src/muga.png";

const snakeStyles: Record<SnakeColorKey, { body: CellStyle; head: CellStyle }> = {
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

const fruitStyles: Record<FruitKey, CellStyle> = {
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

let selectedSnakeColor: SnakeColorKey = "forest";
let selectedFruit: FruitKey = "apple";
let songMuted = false;
let deathFaceShownForCurrentLife = false;
let rageActive = false;
let ragePart: RagePart = Math.random() < 0.5 ? "regular" : "moving";
let regularSpikes: Point[] = [];
let movingSpikes: MovingSpike[] = [];
const rageScoreThreshold = 8;

function showLoseOverlay(): void {
  loseOverlay?.classList.add("visible");
}

function hideLoseOverlay(): void {
  loseOverlay?.classList.remove("visible");
}

function updateSongButtonLabel(): void {
  if (!muteSongButton) {
    return;
  }
  muteSongButton.textContent = songMuted ? "Unmute Song" : "Mute Song";
}

function tryPlaySong(): void {
  if (!snakeSong || songMuted) {
    return;
  }
  snakeSong.play().catch(() => {
    // Ignore autoplay blocks; next user gesture will retry.
  });
}

function pointKey(x: number, y: number): string {
  return `${x},${y}`;
}

function toIndex(x: number, y: number): number {
  return y * config.width + x;
}

function setDirection(direction: Direction): void {
  state = queueDirection(state, direction);
}

function isPointOnSnake(point: Point): boolean {
  return state.snake.body.some((part) => part.x === point.x && part.y === point.y);
}

function isPointOnSpikes(point: Point): boolean {
  const onRegular = regularSpikes.some((spike) => spike.x === point.x && spike.y === point.y);
  const onMoving = movingSpikes.some((spike) => spike.x === point.x && spike.y === point.y);
  return onRegular || onMoving;
}

function randomCell(excludeSnake: boolean, excludeSpikes: boolean): Point | null {
  const openCells: Point[] = [];
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

function generateRegularSpikes(): void {
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

function generateMovingSpikes(): void {
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
    } as MovingSpike;
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

function updateRageIndicator(): void {
  if (!rageIndicator) {
    return;
  }
  if (!rageActive) {
    rageIndicator.textContent = "Rage: Off";
    return;
  }
  rageIndicator.textContent = ragePart === "regular" ? "Rage: Regular Spikes" : "Rage: Moving Spikes";
}

function activateRageIfNeeded(): void {
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

function moveSpikes(): void {
  if (!rageActive || ragePart !== "moving" || state.isPaused || state.isGameOver) {
    return;
  }
  movingSpikes = movingSpikes.map((spike) => {
    let nextX = spike.x + spike.vx;
    let nextY = spike.y + spike.vy;
    let nextVx = spike.vx;
    let nextVy = spike.vy;
    if (nextX < 0 || nextX >= config.width) {
      nextVx = (nextVx * -1) as -1 | 1;
      nextX = spike.x + nextVx;
    }
    if (nextY < 0 || nextY >= config.height) {
      nextVy = (nextVy * -1) as -1 | 1;
      nextY = spike.y + nextVy;
    }
    return { x: nextX, y: nextY, vx: nextVx, vy: nextVy };
  });
}

function applyRageCollisionsAndFood(): void {
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

function updateStatus(): void {
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

function render(): void {
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

function doRestart(): void {
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

function mapKeyToDirection(key: string): Direction | null {
  if (key === "ArrowUp" || key === "w" || key === "W") {
    return "up";
  }
  if (key === "ArrowDown" || key === "s" || key === "S") {
    return "down";
  }
  if (key === "ArrowLeft" || key === "a" || key === "A") {
    return "left";
  }
  if (key === "ArrowRight" || key === "d" || key === "D") {
    return "right";
  }
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

restartButton.addEventListener("click", () => {
  doRestart();
});

pauseButton.addEventListener("click", () => {
  state = togglePause(state);
  render();
});

loseCloseButton?.addEventListener("click", () => {
  hideLoseOverlay();
});

muteSongButton?.addEventListener("click", () => {
  songMuted = !songMuted;
  if (snakeSong) {
    snakeSong.muted = songMuted;
  }
  updateSongButtonLabel();
  if (!songMuted) {
    tryPlaySong();
  }
});

for (const button of mobileControls) {
  button.addEventListener("click", () => {
    const direction = button.dataset.dir as Direction | undefined;
    if (!direction) {
      return;
    }
    setDirection(direction);
  });
}

snakeColorSelect?.addEventListener("change", () => {
  const value = snakeColorSelect.value as SnakeColorKey;
  if (!snakeStyles[value]) {
    return;
  }
  selectedSnakeColor = value;
  render();
});

snakeFruitSelect?.addEventListener("change", () => {
  const value = snakeFruitSelect.value as FruitKey;
  if (!fruitStyles[value]) {
    return;
  }
  selectedFruit = value;
  render();
});

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
