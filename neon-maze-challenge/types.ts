
export enum GameStatus {
  IDLE = 'IDLE',
  SELECTING = 'SELECTING',
  READY = 'READY',
  PLAYING = 'PLAYING',
  GAMEOVER = 'GAMEOVER',
  LEVEL_COMPLETE = 'LEVEL_COMPLETE',
  ALL_COMPLETE = 'ALL_COMPLETE'
}

export interface Obstacle {
  type: 'rect' | 'circle';
  x: number;
  y: number;
  width?: number;
  height?: number;
  r?: number;
}

export interface Level {
  id: number;
  name: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Extreme';
  path: string;
  startPos: { x: number; y: number };
  endPos: { x: number; y: number };
  viewBox: string;
  pathWidth: number;
  obstacles: Obstacle[];
}

export interface GameState {
  currentLevelIndex: number;
  status: GameStatus;
  commentary: string;
  isAIThinking: boolean;
}
