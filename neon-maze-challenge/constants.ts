
import { Level } from './types';

export const LEVELS: Level[] = [
  {
    id: 1,
    name: "The Long Road",
    difficulty: "Easy",
    // A long horizontal zigzag
    path: "M 50 150 L 250 150 L 250 80 L 550 80 L 550 220 L 750 220",
    startPos: { x: 50, y: 150 },
    endPos: { x: 750, y: 220 },
    viewBox: "0 0 800 300",
    pathWidth: 90,
    obstacles: [
      { type: 'rect', x: 150, y: 135, width: 20, height: 30 },
      { type: 'circle', x: 400, y: 80, r: 20 },
      { type: 'rect', x: 650, y: 205, width: 30, height: 30 }
    ]
  },
  {
    id: 2,
    name: "Serpentine Ascent",
    difficulty: "Easy",
    // S-curve stretching across the map
    path: "M 100 250 C 100 50, 700 250, 700 50",
    startPos: { x: 100, y: 250 },
    endPos: { x: 700, y: 50 },
    viewBox: "0 0 800 300",
    pathWidth: 80,
    obstacles: [
      { type: 'circle', x: 250, y: 180, r: 20 },
      { type: 'circle', x: 400, y: 150, r: 25 },
      { type: 'circle', x: 550, y: 120, r: 20 }
    ]
  },
  {
    id: 3,
    name: "The Grand Spiral",
    difficulty: "Medium",
    // Spiral inward and back out
    path: "M 50 50 L 750 50 L 750 250 L 200 250 L 200 150 L 600 150",
    startPos: { x: 50, y: 50 },
    endPos: { x: 600, y: 150 },
    viewBox: "0 0 800 300",
    pathWidth: 70,
    obstacles: [
      { type: 'rect', x: 300, y: 35, width: 150, height: 30 },
      { type: 'rect', x: 735, y: 100, width: 30, height: 80 },
      { type: 'circle', x: 450, y: 250, r: 25 },
      { type: 'rect', x: 185, y: 180, width: 30, height: 40 }
    ]
  },
  {
    id: 4,
    name: "Data Flow Network",
    difficulty: "Medium",
    // Multi-turn angular path
    path: "M 50 150 L 150 150 L 150 50 L 350 50 L 350 250 L 550 250 L 550 50 L 750 50",
    startPos: { x: 50, y: 150 },
    endPos: { x: 750, y: 50 },
    viewBox: "0 0 800 300",
    pathWidth: 75,
    obstacles: [
      { type: 'circle', x: 150, y: 100, r: 15 },
      { type: 'rect', x: 335, y: 120, width: 30, height: 60 },
      { type: 'circle', x: 550, y: 180, r: 15 },
      { type: 'rect', x: 650, y: 35, width: 40, height: 30 }
    ]
  },
  {
    id: 5,
    name: "The Marathon Gauntlet",
    difficulty: "Hard",
    // Very long winding path with tight obstacle placements
    path: "M 50 250 L 50 50 L 200 50 L 200 250 L 350 250 L 350 50 L 500 50 L 500 250 L 650 250 L 650 50 L 750 50",
    startPos: { x: 50, y: 250 },
    endPos: { x: 750, y: 50 },
    viewBox: "0 0 800 300",
    pathWidth: 70,
    obstacles: [
      { type: 'rect', x: 35, y: 120, width: 30, height: 60 },
      { type: 'circle', x: 200, y: 150, r: 20 },
      { type: 'rect', x: 335, y: 120, width: 30, height: 60 },
      { type: 'circle', x: 500, y: 150, r: 20 },
      { type: 'rect', x: 635, y: 120, width: 30, height: 60 },
      { type: 'circle', x: 700, y: 50, r: 15 }
    ]
  },
  {
    id: 6,
    name: "Omega Protocol",
    difficulty: "Extreme",
    // Perimeter loop with a mandatory center detour
    path: "M 100 150 L 100 50 L 700 50 L 700 250 L 400 250 L 400 150 L 250 150",
    startPos: { x: 100, y: 150 },
    endPos: { x: 250, y: 150 },
    viewBox: "0 0 800 300",
    pathWidth: 60,
    obstacles: [
      { type: 'rect', x: 85, y: 80, width: 30, height: 40 },
      { type: 'circle', x: 400, y: 35, r: 20 },
      { type: 'rect', x: 715, y: 120, width: 30, height: 60 },
      { type: 'circle', x: 550, y: 250, r: 20 },
      { type: 'rect', x: 385, y: 180, width: 30, height: 40 },
      { type: 'circle', x: 300, y: 150, r: 15 }
    ]
  }
];
