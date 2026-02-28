export type Direction = "up" | "down" | "left" | "right";

export type Point = {
  x: number;
  y: number;
};

export type SnakeState = {
  body: Point[];
  direction: Direction;
  pendingDirection: Direction | null;
};

export type GameState = {
  snake: SnakeState;
  food: Point;
  score: number;
  isGameOver: boolean;
  isPaused: boolean;
};

export type GameConfig = {
  width: number;
  height: number;
};

type RandomFn = () => number;

const OPPOSITES: Record<Direction, Direction> = {
  up: "down",
  down: "up",
  left: "right",
  right: "left",
};

function pointsEqual(a: Point, b: Point): boolean {
  return a.x === b.x && a.y === b.y;
}

function stepPoint(point: Point, direction: Direction): Point {
  if (direction === "up") {
    return { x: point.x, y: point.y - 1 };
  }
  if (direction === "down") {
    return { x: point.x, y: point.y + 1 };
  }
  if (direction === "left") {
    return { x: point.x - 1, y: point.y };
  }
  return { x: point.x + 1, y: point.y };
}

function isOutOfBounds(point: Point, config: GameConfig): boolean {
  return point.x < 0 || point.y < 0 || point.x >= config.width || point.y >= config.height;
}

function isOnSnake(point: Point, body: Point[]): boolean {
  return body.some((part) => pointsEqual(part, point));
}

function spawnFood(config: GameConfig, body: Point[], rng: RandomFn): Point | null {
  const available: Point[] = [];
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

export function createInitialState(config: GameConfig, rng: RandomFn = Math.random): GameState {
  const startX = Math.max(2, Math.floor(config.width / 2));
  const startY = Math.floor(config.height / 2);
  const body: Point[] = [
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

export function queueDirection(state: GameState, nextDirection: Direction): GameState {
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

export function tick(state: GameState, config: GameConfig, rng: RandomFn = Math.random): GameState {
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

export function togglePause(state: GameState): GameState {
  if (state.isGameOver) {
    return state;
  }

  return {
    ...state,
    isPaused: !state.isPaused,
  };
}

export function restart(config: GameConfig, rng: RandomFn = Math.random): GameState {
  return createInitialState(config, rng);
}
