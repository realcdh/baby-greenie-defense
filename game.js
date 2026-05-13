// ==========================================
// 1. 전역 변수 선언 (오류 방지)
// ==========================================
let canvas, ctx, bgCanvas, bgCtx;
let actx = null;
let isMuted = false;
let isConsoleMode = false;
let state = "INTRO";
let currentTheme = "FARM";
let customDifficulty = 5;
let customTankerHp = 3;
let timeLeft = 0,
  timeElapsed = 0,
  kills = 0,
  lastTime = 0,
  spawnTimer = 0,
  screenShake = 0;
let gameMode = "STORY",
  currentStage = 1;
let bugs = [],
  particles = [];
let cx = 0,
  cy = 0;
let currentStorySequence = [],
  currentStoryIndex = 0;
let storyOverlayHideTimer = null;
const keys = {};

// ==========================================
// 2. 에셋 및 데이터
// ==========================================
const colorMap = {
  0: null,
  1: "#ffffff",
  2: "#4ade80", // 2: Greenie Body (Bright Lime Green)
  3: "#fca5a5",
  4: "#60a5fa",
  5: "#ffffff",
  7: "#ef4444",
  8: "#9333ea", // changed green bug to purple
  9: "#581c87", // dark purple outline
  10: "#d1d5db",
  11: "#4b5563",
  15: "#c084fc", // light purple highlight
  16: "#9ca3af",
  17: "#1f2937",
  30: "#86efac",
  31: "#4ade80",
  32: "#1e3a8a",
  33: "#dc2626",
  34: "#374151",
  35: "#111827",
  40: "#d97736",
  41: "#e5e7eb",
  42: "#fed7aa",
  43: "#fb923c",
  44: "#4b5563",
  45: "#b91c1c",
  46: "#fcd34d",
  47: "#1e3a8a",
  48: "#3b82f6",
  49: "#ffffff",
  50: "#064e3b", // dark green outline for Greenie
};

const sprGreeny = {
  normal: [
    [
      [0, 0, 0, 0, 0, 0, 0, 0, 50, 0, 0, 50, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 50, 2, 50, 50, 2, 50, 0, 0, 0],
      [0, 0, 0, 0, 50, 50, 50, 2, 1, 2, 2, 1, 2, 50, 0, 0],
      [0, 0, 0, 50, 2, 1, 2, 2, 1, 1, 1, 1, 1, 1, 2, 50],
      [0, 0, 50, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 50],
      [0, 50, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 50],
      [50, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 50],
      [50, 2, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 2, 50],
      [50, 2, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 2, 50, 0],
      [0, 50, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 50, 0, 0],
      [0, 0, 50, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 50, 0, 0],
      [0, 0, 0, 50, 50, 50, 50, 2, 1, 1, 1, 2, 50, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 50, 2, 1, 2, 2, 2, 50, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 50, 2, 1, 2, 2, 2, 50, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 50, 2, 1, 1, 1, 2, 50, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 50, 2, 2, 2, 1, 2, 50, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 50, 2, 2, 2, 1, 2, 50, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 50, 2, 1, 1, 1, 2, 50, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 50, 2, 1, 2, 2, 2, 50, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 50, 2, 2, 2, 1, 2, 50, 0, 0, 0],
      // Legs frame 1
      [0, 0, 0, 0, 0, 0, 0, 50, 50, 0, 50, 50, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 50, 50, 0, 50, 50, 0, 0, 0, 0],
    ],
    [
      [0, 0, 0, 0, 0, 0, 0, 0, 50, 0, 0, 50, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 50, 2, 50, 50, 2, 50, 0, 0, 0],
      [0, 0, 0, 0, 50, 50, 50, 2, 1, 2, 2, 1, 2, 50, 0, 0],
      [0, 0, 0, 50, 2, 1, 2, 2, 1, 1, 1, 1, 1, 1, 2, 50],
      [0, 0, 50, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 50],
      [0, 50, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 50],
      [50, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 50],
      [50, 2, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 2, 50],
      [50, 2, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 2, 50, 0],
      [0, 50, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 50, 0, 0],
      [0, 0, 50, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 50, 0, 0],
      [0, 0, 0, 50, 50, 50, 50, 2, 1, 1, 1, 2, 50, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 50, 2, 1, 2, 2, 2, 50, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 50, 2, 1, 2, 2, 2, 50, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 50, 2, 1, 1, 1, 2, 50, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 50, 2, 2, 2, 1, 2, 50, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 50, 2, 2, 2, 1, 2, 50, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 50, 2, 1, 1, 1, 2, 50, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 50, 2, 1, 2, 2, 2, 50, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 50, 2, 2, 2, 1, 2, 50, 0, 0, 0],
      // Legs frame 2
      [0, 0, 0, 0, 0, 0, 50, 50, 0, 0, 50, 50, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 50, 0, 0, 0, 50, 0, 0, 0, 0],
    ],
  ],
  scared: [
    [0, 0, 0, 0, 0, 0, 0, 0, 50, 0, 0, 50, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 0, 0, 2, 1, 2, 2, 1, 2, 0, 0, 0],
    [0, 0, 0, 2, 1, 2, 2, 1, 1, 1, 1, 1, 1, 2, 2, 0],
    [0, 0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
    [0, 2, 1, 1, 2, 2, 1, 1, 2, 2, 1, 1, 1, 1, 1, 2],
    [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0],
    [2, 1, 1, 1, 1, 2, 2, 1, 4, 1, 4, 1, 1, 2, 0, 0],
    [2, 1, 1, 1, 1, 2, 2, 1, 1, 4, 1, 1, 2, 0, 0, 0],
    [0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 4, 2, 0, 0, 0, 0],
    [0, 0, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 2, 1, 2, 2, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 2, 1, 2, 2, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 1, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 1, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 2, 1, 2, 2, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 2, 1, 2, 2, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 1, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 1, 2, 0, 0, 0, 0],
  ],
  dead: [
    [0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 0, 0, 2, 1, 2, 2, 1, 2, 0, 0, 0],
    [0, 0, 0, 2, 1, 2, 2, 1, 1, 1, 1, 1, 1, 2, 2, 0],
    [0, 0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
    [0, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2],
    [2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 0],
    [2, 1, 1, 2, 1, 2, 2, 2, 1, 2, 1, 1, 1, 2, 0, 0],
    [2, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 2, 0, 0, 0],
    [0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0],
    [0, 0, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 2, 1, 2, 2, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 2, 1, 2, 2, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 1, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 1, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 2, 1, 2, 2, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 2, 1, 2, 2, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 1, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 1, 2, 0, 0, 0, 0],
  ],
  win: [
    [0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 0, 0, 2, 1, 2, 2, 1, 2, 0, 0, 0],
    [0, 0, 0, 2, 1, 2, 2, 1, 1, 1, 1, 1, 1, 2, 2, 0],
    [0, 0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
    [0, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 1, 1, 1, 1, 2],
    [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0],
    [2, 1, 1, 3, 3, 2, 2, 1, 3, 3, 1, 1, 1, 2, 0, 0],
    [2, 1, 1, 3, 3, 2, 2, 1, 3, 3, 1, 1, 2, 0, 0, 0],
    [0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0],
    [0, 0, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 2, 1, 2, 2, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 2, 1, 2, 2, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 1, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 1, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 2, 1, 2, 2, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 2, 1, 2, 2, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 1, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 1, 2, 0, 0, 0, 0],
  ],
};

const sprHeart = {
  full: [
    [0, 35, 35, 35, 0, 35, 35, 35, 0],
    [35, 3, 33, 33, 35, 3, 33, 33, 35],
    [35, 33, 33, 33, 33, 33, 33, 33, 35],
    [0, 35, 33, 33, 33, 33, 45, 35, 0],
    [0, 0, 35, 33, 33, 45, 35, 0, 0],
    [0, 0, 0, 35, 33, 35, 0, 0, 0],
    [0, 0, 0, 0, 35, 0, 0, 0, 0],
  ],
  empty: [
    [0, 35, 35, 35, 0, 35, 35, 35, 0],
    [35, 10, 16, 16, 35, 10, 16, 16, 35],
    [35, 16, 16, 16, 16, 16, 16, 16, 35],
    [0, 35, 16, 16, 16, 16, 34, 35, 0],
    [0, 0, 35, 16, 16, 34, 35, 0, 0],
    [0, 0, 0, 35, 16, 35, 0, 0, 0],
    [0, 0, 0, 0, 35, 0, 0, 0, 0],
  ],
};

const sprBug = [
  [
    [0, 17, 17, 17, 0, 0, 0, 0, 17, 17, 17, 0],
    [17, 16, 16, 10, 17, 0, 0, 17, 10, 16, 16, 17],
    [17, 16, 10, 10, 10, 17, 17, 10, 10, 10, 16, 17],
    [0, 17, 10, 10, 17, 11, 11, 17, 10, 10, 17, 0],
    [0, 0, 17, 17, 11, 11, 11, 11, 17, 17, 0, 0],
    [0, 0, 0, 17, 17, 7, 11, 7, 17, 17, 0, 0],
    [0, 0, 0, 17, 17, 11, 11, 11, 17, 17, 0, 0],
    [0, 0, 0, 17, 17, 17, 17, 17, 17, 17, 0, 0],
    [0, 0, 0, 0, 17, 17, 17, 17, 17, 0, 0, 0],
    [0, 0, 0, 0, 0, 17, 17, 17, 0, 0, 0, 0],
  ],
  [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [17, 17, 17, 17, 0, 0, 0, 0, 17, 17, 17, 17],
    [17, 16, 16, 10, 17, 17, 17, 17, 10, 16, 16, 17],
    [0, 17, 17, 10, 17, 11, 11, 17, 10, 17, 17, 0],
    [0, 0, 0, 17, 17, 7, 11, 7, 17, 17, 0, 0],
    [0, 0, 0, 17, 17, 11, 11, 11, 17, 17, 0, 0],
    [0, 0, 0, 17, 17, 17, 17, 17, 17, 17, 0, 0],
    [0, 0, 0, 0, 17, 17, 17, 17, 17, 0, 0, 0],
    [0, 0, 0, 0, 0, 17, 17, 17, 0, 0, 0, 0],
  ],
];

const sprTanker = [
  [
    [0, 0, 0, 0, 0, 0, 17, 17, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 17, 8, 8, 17, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 17, 8, 15, 15, 8, 17, 0, 0, 0, 0],
    [0, 0, 0, 17, 8, 8, 15, 8, 8, 8, 17, 0, 0, 0],
    [0, 0, 17, 8, 8, 8, 8, 8, 8, 8, 8, 17, 0, 0],
    [0, 17, 8, 8, 17, 8, 8, 8, 8, 17, 8, 8, 17, 0],
    [17, 8, 8, 17, 5, 17, 8, 8, 17, 5, 17, 8, 8, 17],
    [17, 8, 8, 8, 17, 17, 8, 8, 8, 17, 17, 8, 8, 17],
    [17, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 17],
    [17, 9, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 9, 17],
    [0, 17, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 17, 0],
    [0, 0, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 0, 0],
  ],
  [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 17, 17, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 17, 8, 8, 17, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 17, 8, 15, 15, 8, 17, 0, 0, 0, 0],
    [0, 0, 0, 17, 8, 8, 15, 8, 8, 8, 17, 0, 0, 0],
    [0, 0, 17, 8, 8, 8, 8, 8, 8, 8, 8, 17, 0, 0],
    [0, 17, 8, 8, 17, 8, 8, 8, 8, 17, 8, 8, 17, 0],
    [17, 8, 8, 17, 5, 17, 8, 8, 17, 5, 17, 8, 8, 17],
    [17, 8, 8, 8, 17, 17, 8, 8, 8, 17, 17, 8, 8, 17],
    [17, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 17],
    [17, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 17],
    [0, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 0],
  ],
];

const sprZombieNormal = [
  [
    [0, 0, 17, 17, 17, 17, 0, 0, 0, 0, 0, 0],
    [0, 17, 30, 30, 30, 30, 17, 0, 0, 0, 0, 0],
    [17, 30, 33, 30, 30, 30, 30, 17, 0, 0, 0, 0],
    [17, 30, 30, 30, 30, 30, 30, 17, 17, 17, 0, 0],
    [0, 17, 30, 30, 30, 30, 30, 30, 30, 17, 0, 0],
    [0, 0, 17, 32, 32, 32, 32, 17, 17, 17, 0, 0],
    [0, 0, 17, 32, 32, 32, 32, 17, 0, 0, 0, 0],
    [0, 0, 17, 32, 32, 32, 32, 17, 0, 0, 0, 0],
    [0, 0, 17, 32, 17, 17, 32, 17, 0, 0, 0, 0],
    [0, 0, 17, 17, 0, 0, 17, 17, 0, 0, 0, 0],
  ],
  [
    [0, 0, 17, 17, 17, 17, 0, 0, 0, 0, 0, 0],
    [0, 17, 30, 30, 30, 30, 17, 0, 0, 0, 0, 0],
    [17, 30, 33, 30, 30, 30, 30, 17, 0, 0, 0, 0],
    [17, 30, 30, 30, 30, 30, 30, 17, 17, 17, 0, 0],
    [0, 17, 30, 30, 30, 30, 30, 30, 30, 17, 0, 0],
    [0, 0, 17, 32, 32, 32, 32, 17, 17, 17, 0, 0],
    [0, 0, 17, 32, 32, 32, 32, 17, 0, 0, 0, 0],
    [0, 0, 17, 32, 32, 32, 32, 17, 0, 0, 0, 0],
    [0, 0, 17, 32, 17, 17, 32, 17, 0, 0, 0, 0],
    [0, 0, 0, 17, 17, 17, 17, 0, 0, 0, 0, 0],
  ],
];

const sprZombieTanker = [
  [
    [0, 0, 0, 0, 17, 17, 17, 17, 17, 0, 0, 0, 0, 0],
    [0, 0, 0, 17, 34, 34, 34, 34, 34, 17, 0, 0, 0, 0],
    [0, 0, 17, 34, 33, 33, 34, 33, 33, 34, 17, 0, 0, 0],
    [0, 17, 34, 34, 34, 34, 34, 34, 34, 34, 34, 17, 0, 0],
    [17, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 17, 0],
    [17, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 17, 0],
    [17, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 17, 0],
    [0, 17, 17, 34, 34, 34, 34, 34, 34, 34, 34, 17, 17, 0],
    [0, 0, 0, 17, 32, 32, 32, 32, 32, 32, 17, 0, 0, 0],
    [0, 0, 0, 17, 32, 32, 32, 32, 32, 32, 17, 0, 0, 0],
    [0, 0, 0, 17, 32, 32, 17, 17, 32, 32, 17, 0, 0, 0],
    [0, 0, 0, 17, 17, 17, 17, 0, 17, 17, 17, 17, 0, 0],
  ],
  [
    [0, 0, 0, 0, 17, 17, 17, 17, 17, 0, 0, 0, 0, 0],
    [0, 0, 0, 17, 34, 34, 34, 34, 34, 17, 0, 0, 0, 0],
    [0, 0, 17, 34, 33, 33, 34, 33, 33, 34, 17, 0, 0, 0],
    [0, 17, 34, 34, 34, 34, 34, 34, 34, 34, 34, 17, 0, 0],
    [17, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 17, 0],
    [17, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 17, 0],
    [17, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 17, 0],
    [0, 17, 17, 34, 34, 34, 34, 34, 34, 34, 34, 17, 17, 0],
    [0, 0, 0, 17, 32, 32, 32, 32, 32, 32, 17, 0, 0, 0],
    [0, 0, 0, 17, 32, 32, 32, 32, 32, 32, 17, 0, 0, 0],
    [0, 0, 0, 17, 32, 32, 17, 17, 32, 32, 17, 0, 0, 0],
    [0, 0, 0, 0, 17, 17, 17, 0, 17, 17, 17, 0, 0, 0],
  ],
];

const STAGE_DURATIONS = [15.0, 20.0, 25.0];
const STORY_CONTENT = {
  FARM: [
    [
      {
        speaker: "그린이",
        text: "휴, 드디어 씨앗을 다 심었네. 올해도 농사가 풍년이 들면 좋겠다!",
      },
      {
        speaker: "이장님",
        text: "그린아, 큰일 났다! 네 농장의 달콤한 새싹 냄새를 맡고 해충 떼가 몰려오고 있어!",
      },
      {
        speaker: "그린이",
        text: "앗, 안 돼! 갓 심은 내 소중한 작물들을 지켜야 해!",
      },
    ],
    [
      { speaker: "그린이", text: "휴... 해충들은 겨우 막아냈어요." },
      {
        speaker: "이장님",
        text: "아직 안심하긴 이르다! 소란 때문에 땅속에 잠들어 있던 초록 슬라임들까지 깨어났어!",
      },
      {
        speaker: "그린이",
        text: "슬라임이라고요? 끈적거려서 밭이 엉망이 될 텐데... 절대 못 들어오게 막겠어요!",
      },
    ],
    [
      {
        speaker: "이장님",
        text: "그린아... 모든 해충과 몬스터들이 총공격을 준비하고 있다. 마지막 고비야!",
      },
      {
        speaker: "그린이",
        text: "이렇게 포기할 순 없어요. 여태껏 땀 흘려 일군 농장인걸요!",
      },
      {
        speaker: "이장님",
        text: "행운을 빈다. 이 웨이브만 막아내면 농장은 영원히 안전할 거다!",
      },
    ],
  ],
  ZOMBIE: [
    [
      {
        speaker: "그린이",
        text: "밤이 되니 안개가 너무 짙네... 어쩐지 으스스한걸.",
      },
      {
        speaker: "생존자",
        text: "거기 꼬마! 당장 도망치시오! 무덤가에서 굶주린 좀비들이 깨어나고 있소!",
      },
      {
        speaker: "그린이",
        text: "도망칠 곳은 없어요... 제가 막아보겠어요!",
      },
    ],
    [
      {
        speaker: "그린이",
        text: "헉... 헉... 좀비 수가 너무 많아. 끝이 안 보여.",
      },
      {
        speaker: "생존자",
        text: "조심하시오! 땅이 울리고 있소... 거대 헐크 좀비가 다가오고 있다는 증거요!",
      },
      {
        speaker: "그린이",
        text: "저렇게 거대한 녀석이... 하지만 물러서지 않겠어!",
      },
    ],
    [
      {
        speaker: "생존자",
        text: "사방이 좀비로 뒤덮였소... 우린 이제 끝이야...",
      },
      {
        speaker: "그린이",
        text: "포기하지 마세요! 저 멀리 동이 트고 있어요. 햇빛이 비치면 녀석들은 물러갈 거예요.",
      },
      {
        speaker: "그린이",
        text: "새벽이 밝아올 때까지... 끝까지 버텨요!",
      },
    ],
  ],
};

// ==========================================
// 3. 엔진 코어 함수 (렌더링 & 오디오)
// ==========================================
function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  cx = canvas.width / 2;
  cy = canvas.height / 2;
  createMap();
}

function createMap() {
  const buffer = 300;
  bgCanvas.width = window.innerWidth + buffer * 2;
  bgCanvas.height = window.innerHeight + buffer * 2;

  const isZombie = currentTheme === "ZOMBIE";
  const colorBaseGrass = isZombie ? "#374151" : "#5c9f42";
  const colorAltGrass = isZombie ? "#1f2937" : "#528f3b";
  const colorDirtLight = isZombie ? "#4b5563" : "#a06a35";
  const colorDirtDark = isZombie ? "#111827" : "#8b5a2b";
  const colorTuft = isZombie ? "#4b5563" : "#41752b";
  const colorFlowerW = isZombie ? "#991b1b" : "#ffffff";
  const colorFlowerY = isZombie ? "#7f1d1d" : "#fde047";
  const colorPebble = isZombie ? "#000000" : "#9ca3af";

  bgCtx.fillStyle = colorBaseGrass;
  bgCtx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);

  const tileSize = 40;
  for (let x = 0; x < bgCanvas.width; x += tileSize) {
    for (let y = 0; y < bgCanvas.height; y += tileSize) {
      if ((x / tileSize + y / tileSize) % 2 === 0) {
        bgCtx.fillStyle = colorAltGrass;
        bgCtx.fillRect(x, y, tileSize, tileSize);
      }
    }
  }

  const area = bgCanvas.width * bgCanvas.height;
  for (let i = 0; i < area / 60000; i++) {
    let px = Math.random() * bgCanvas.width;
    let py = Math.random() * bgCanvas.height;
    let radius = 30 + Math.random() * 80;
    for (let j = 0; j < 40; j++) {
      let ox = (Math.random() - 0.5) * radius;
      let oy = (Math.random() - 0.5) * radius;
      let size = 10 + Math.random() * 20;
      if (Math.sqrt(ox * ox + oy * oy) < radius * 0.5)
        bgCtx.fillStyle = colorDirtDark;
      else bgCtx.fillStyle = colorDirtLight;
      bgCtx.fillRect(
        Math.floor((px + ox) / 4) * 4,
        Math.floor((py + oy) / 4) * 4,
        Math.floor(size / 4) * 4 || 4,
        Math.floor(size / 4) * 4 || 4,
      );
    }
  }

  bgCtx.fillStyle = colorTuft;
  for (let i = 0; i < area / 3000; i++) {
    let px = Math.floor((Math.random() * bgCanvas.width) / 4) * 4;
    let py = Math.floor((Math.random() * bgCanvas.height) / 4) * 4;
    bgCtx.fillRect(px, py, 4, 12);
    bgCtx.fillRect(px + 4, py + 4, 4, 8);
  }

  for (let i = 0; i < area / 15000; i++) {
    let px = Math.floor((Math.random() * bgCanvas.width) / 4) * 4;
    let py = Math.floor((Math.random() * bgCanvas.height) / 4) * 4;
    let isWhite = Math.random() > 0.5;
    bgCtx.fillStyle = isWhite ? colorFlowerW : colorFlowerY;
    bgCtx.fillRect(px, py - 4, 4, 12);
    bgCtx.fillRect(px - 4, py, 12, 4);
    bgCtx.fillStyle = isWhite ? "#fbbf24" : isZombie ? "#450a0a" : "#ea580c";
    bgCtx.fillRect(px, py, 4, 4);
  }

  bgCtx.fillStyle = colorPebble;
  for (let i = 0; i < area / 20000; i++) {
    let px = Math.floor((Math.random() * bgCanvas.width) / 4) * 4;
    let py = Math.floor((Math.random() * bgCanvas.height) / 4) * 4;
    bgCtx.fillRect(px, py, 8, 6);
    bgCtx.fillStyle = isZombie ? "#111827" : "#4b5563";
    bgCtx.fillRect(px, py + 6, 8, 2);
    bgCtx.fillStyle = colorPebble;
  }
}

function initAudio() {
  if (!actx) actx = new (window.AudioContext || window.webkitAudioContext)();
  if (actx.state === "suspended") actx.resume();
}

function playSound(type) {
  if (isMuted || !actx) return;
  const osc = actx.createOscillator(),
    gain = actx.createGain();
  osc.connect(gain);
  gain.connect(actx.destination);
  const now = actx.currentTime;

  if (type === "hit") {
    osc.type = "sine";
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(300, now + 0.1);
    gain.gain.setValueAtTime(0.5, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
    osc.start(now);
    osc.stop(now + 0.1);
  } else if (type === "tankerHit") {
    osc.type = "triangle";
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.exponentialRampToValueAtTime(150, now + 0.15);
    gain.gain.setValueAtTime(0.6, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
    osc.start(now);
    osc.stop(now + 0.15);
  } else if (type === "kill") {
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(1000, now);
    osc.frequency.linearRampToValueAtTime(100, now + 0.1);
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.linearRampToValueAtTime(0.01, now + 0.1);
    osc.start(now);
    osc.stop(now + 0.1);
  } else if (type === "gameover") {
    osc.type = "square";
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.exponentialRampToValueAtTime(50, now + 1.5);
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.linearRampToValueAtTime(0.01, now + 1.5);
    osc.start(now);
    osc.stop(now + 1.5);
  } else if (type === "win") {
    osc.type = "sine";
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.setValueAtTime(554, now + 0.1);
    osc.frequency.setValueAtTime(659, now + 0.2);
    osc.frequency.setValueAtTime(880, now + 0.3);
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.5, now + 0.05);
    gain.gain.setValueAtTime(0.5, now + 0.3);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 1.0);
    osc.start(now);
    osc.stop(now + 1.0);
  }
}

function drawPixelArt(ctx, sprite, size) {
  if (!sprite) return;
  const rCount = sprite.length,
    cCount = sprite[0].length;
  const ox = Math.floor(-(cCount * size) / 2),
    oy = Math.floor(-(rCount * size) / 2);
  for (let r = 0; r < rCount; r++) {
    for (let c = 0; c < cCount; c++) {
      const code = sprite[r][c];
      if (colorMap[code]) {
        ctx.fillStyle = colorMap[code];
        ctx.fillRect(ox + c * size, oy + r * size, size, size);
      }
    }
  }
}

function drawPixelArtAt(ctx, sprite, size, x, y) {
  ctx.save();
  ctx.translate(Math.floor(x), Math.floor(y));
  drawPixelArt(ctx, sprite, size);
  ctx.restore();
}

function drawEnemyHealthBar(ctx, currentHp, maxHp, width, y) {
  const barWidth = Math.floor(width);
  const barHeight = 7;
  const border = 2;
  const fillRatio = Math.max(0, Math.min(1, currentHp / Math.max(1, maxHp)));
  const x = Math.floor(-barWidth / 2);
  const innerWidth = barWidth - border * 2;
  const innerHeight = barHeight - border * 2;
  const fillWidth = Math.floor(innerWidth * fillRatio);

  ctx.fillStyle = "#111827";
  ctx.fillRect(x, Math.floor(y), barWidth, barHeight);

  ctx.fillStyle = "#374151";
  ctx.fillRect(x + border, Math.floor(y) + border, innerWidth, innerHeight);

  ctx.fillStyle = "#84cc16";
  ctx.fillRect(x + border, Math.floor(y) + border, fillWidth, innerHeight);
}

// ==========================================
// 4. 객체 클래스 (Greeny, Bug, Particle)
// ==========================================
const Greeny = {
  x: 0,
  y: 0,
  vx: 0,
  vy: 0,
  tx: 0,
  ty: 0,
  scaleX: 1,
  dirX: 1,
  hp: 3,
  maxHp: 3,
  invincible: 0,
  update(dt) {
    if (this.invincible > 0) this.invincible -= dt;

    if (gameMode !== "MOVING") {
      this.tx = cx;
      this.ty = cy;
    } else {
      let dx = 0,
        dy = 0;
      if (keys.ArrowUp || keys.w || keys.W || keys["ㅈ"]) dy -= 1;
      if (keys.ArrowDown || keys.s || keys.S || keys["ㄴ"]) dy += 1;
      if (keys.ArrowLeft || keys.a || keys.A || keys["ㅁ"]) dx -= 1;
      if (keys.ArrowRight || keys.d || keys.D || keys["ㅇ"]) dx += 1;
      if (dx !== 0 && dy !== 0) {
        const len = Math.sqrt(dx * dx + dy * dy);
        dx /= len;
        dy /= len;
      }
      if (dx !== 0) this.dirX = dx > 0 ? 1 : -1;

      this.tx += dx * 300 * dt;
      this.ty += dy * 300 * dt;
    }

    this.tx = Math.max(35, Math.min(canvas.width - 35, this.tx));
    this.ty = Math.max(35, Math.min(canvas.height - 35, this.ty));

    // Second-order dynamics spring physics
    const springF = 200;
    const dampF = 15;
    const ax = (this.tx - this.x) * springF - this.vx * dampF;
    const ay = (this.ty - this.y) * springF - this.vy * dampF;

    this.vx += ax * dt;
    this.vy += ay * dt;
    this.x += this.vx * dt;
    this.y += this.vy * dt;

    // Smooth direction turning
    this.scaleX += (this.dirX - this.scaleX) * 15 * dt;
  },
  takeDamage() {
    if (this.invincible > 0 || state !== "PLAYING") return;
    this.hp--;
    this.invincible = 1.0;
    screenShake = 15;
    playSound("hit");
    updateHeartsUI();

    const overlay = document.getElementById("damageOverlay");
    overlay.style.opacity = 1;
    setTimeout(() => (overlay.style.opacity = 0), 300);

    if (this.hp <= 0) {
      triggerGameOver();
    }
  },
  draw(ctx, time) {
    if (this.invincible > 0 && Math.floor(time * 10) % 2 === 0) return; // Blink

    ctx.save();
    ctx.translate(Math.floor(this.x), Math.floor(this.y));

    if (screenShake > 0) {
      ctx.translate(
        Math.floor((Math.random() - 0.5) * screenShake),
        Math.floor((Math.random() - 0.5) * screenShake),
      );
    }

    // --- 체력 하트를 픽셀 스프라이트로 렌더링 ---
    const heartSize = 4;
    const heartGap = 8;
    const heartStride = sprHeart.full[0].length * heartSize + heartGap;
    const heartY = -72;
    for (let i = 0; i < this.maxHp; i++) {
      const hx = (i - (this.maxHp - 1) / 2) * heartStride;
      const sprite = i < this.hp ? sprHeart.full : sprHeart.empty;
      drawPixelArtAt(ctx, sprite, heartSize, hx, heartY);
    }
    // -------------------------------------------

    ctx.save(); // Scale 적용을 위한 별도 Context Save
    // Squash and stretch based on velocity
    const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
    const stretch = 1.0 + Math.min(speed * 0.001, 0.3);
    const squeeze = 1.0 - Math.min(speed * 0.001, 0.3);

    ctx.scale(this.scaleX * stretch, squeeze);

    let sprite = sprGreeny.normal[Math.floor(time * 10) % 2];
    if (state === "GAMEOVER") sprite = sprGreeny.dead;
    else if (state === "WIN") sprite = sprGreeny.win;
    else if (timeLeft < 5 && gameMode === "STORY") {
      sprite = sprGreeny.scared;
      ctx.translate(
        Math.floor((Math.random() - 0.5) * 4),
        Math.floor((Math.random() - 0.5) * 4),
      );
    }
    drawPixelArt(ctx, sprite, 5);
    ctx.restore(); // Scale 해제
    ctx.restore(); // Position 해제
  },
};

function updateHeartsUI() {
  // 이제 캔버스(Greeny.draw)에서 하트를 직접 렌더링하므로 이 DOM 함수는 비워둡니다.
}

class Bug {
  constructor(isTanker) {
    const angle = Math.random() * 6.28,
      d = Math.max(cx, cy) + 100;
    this.x = cx + Math.cos(angle) * d;
    this.y = cy + Math.sin(angle) * d;
    this.isTanker = isTanker;
    this.hp = isTanker ? customTankerHp : 1;
    this.maxHp = this.hp;
    this.radius = isTanker ? 28 : 20;
    this.sprites =
      currentTheme === "ZOMBIE"
        ? isTanker
          ? sprZombieTanker
          : sprZombieNormal
        : isTanker
          ? sprTanker
          : sprBug;
    this.speed = (isTanker ? 50 : 100) * (1 + customDifficulty * 0.1);
  }
  update(dt) {
    const dx = Greeny.x - this.x,
      dy = Greeny.y - this.y,
      dist = Math.sqrt(dx * dx + dy * dy);
    if (dist > 0) {
      this.x += (dx / dist) * this.speed * dt;
      this.y += (dy / dist) * this.speed * dt;
    }
    if (dist < 35 && Greeny.invincible <= 0) {
      this.kill();
      const index = bugs.indexOf(this);
      if (index > -1) bugs.splice(index, 1);
      Greeny.takeDamage();
    }
  }
  kill() {
    playSound("kill");
    createHitParticles(this.x, this.y, true, this.isTanker);
    kills++;
    document.getElementById("hud-kills").innerText = kills;
  }
  draw(ctx, time) {
    ctx.save();
    ctx.translate(Math.floor(this.x), Math.floor(this.y));
    const frame = Math.floor(time * 10) % 2;
    const sprite = this.sprites[frame];
    const spriteSize = this.isTanker ? 5 : 4;

    if (this.hp < this.maxHp) ctx.globalAlpha = 0.6;
    drawPixelArt(ctx, sprite, spriteSize);
    ctx.globalAlpha = 1;

    if (this.isTanker) {
      const spriteHeight = sprite.length * spriteSize;
      const spriteWidth = sprite[0].length * spriteSize;
      drawEnemyHealthBar(
        ctx,
        this.hp,
        this.maxHp,
        Math.max(34, spriteWidth - 10),
        Math.floor(spriteHeight / 2) + 8,
      );
    }

    ctx.restore();
  }
}

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.life = 1.0;
    const a = Math.random() * 6.28,
      s = 50 + Math.random() * 100;
    this.vx = Math.cos(a) * s;
    this.vy = Math.sin(a) * s;
  }
  update(dt) {
    this.x += this.vx * dt;
    this.y += this.vy * dt;
    this.life -= dt * 2;
  }
  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = Math.max(0, this.life);
    ctx.fillStyle = this.color;
    ctx.fillRect(Math.floor(this.x), Math.floor(this.y), 4, 4);
    ctx.restore();
  }
}

function createHitParticles(x, y, isKill, isTanker) {
  let color =
    currentTheme === "ZOMBIE"
      ? isTanker
        ? "#111827"
        : "#7f1d1d"
      : isTanker
        ? "#22c55e"
        : "#9ca3af";
  for (let i = 0; i < (isKill ? 10 : 4); i++)
    particles.push(new Particle(x, y, color));
}

// ==========================================
// 5. 게임 흐름 컨트롤
// ==========================================
function clearInputState() {
  Object.keys(keys).forEach((key) => {
    keys[key] = false;
  });
}

function resetGreenyState() {
  Greeny.hp = Greeny.maxHp;
  Greeny.invincible = 0;
  Greeny.tx = cx;
  Greeny.ty = cy;
  Greeny.x = cx;
  Greeny.y = cy;
  Greeny.vx = 0;
  Greeny.vy = 0;
  Greeny.scaleX = 1;
  Greeny.dirX = 1;
  updateHeartsUI();
}

function clearStoryOverlayHideTimer() {
  if (storyOverlayHideTimer) {
    clearTimeout(storyOverlayHideTimer);
    storyOverlayHideTimer = null;
  }
}

function hideStorySynopsis(immediate = false) {
  clearStoryOverlayHideTimer();
  document.getElementById("story-overlay").classList.add("opacity-0");
  document
    .getElementById("ui-story-dialog-box")
    .classList.add("translate-y-full");

  if (immediate) {
    document.getElementById("story-overlay").classList.add("hidden");
    document.getElementById("ui-story-dialog-box").classList.add("hidden");
    return;
  }

  storyOverlayHideTimer = setTimeout(() => {
    document.getElementById("story-overlay").classList.add("hidden");
    document.getElementById("ui-story-dialog-box").classList.add("hidden");
    storyOverlayHideTimer = null;
  }, 300);
}

function hideTransientUi() {
  document.getElementById("ui-gameover").classList.add("hidden");
  document.getElementById("ui-win").classList.add("hidden");
  document.getElementById("ui-pause-modal").classList.add("hidden");
}

function resetRunPresentation() {
  bugs = [];
  particles = [];
  screenShake = 0;
  clearInputState();
  resetGreenyState();
  document.getElementById("damageOverlay").style.opacity = 0;
}

function goHome() {
  state = "INTRO";
  hideTransientUi();
  document.getElementById("ui-hud").classList.add("hidden");
  document.getElementById("ui-dpad").classList.add("hidden");
  hideStorySynopsis();
  document.getElementById("ui-intro").classList.remove("hidden");
  document.getElementById("btn-settings-fab").classList.remove("hidden");
  resetRunPresentation();
}

function updateStoryDialog() {
  const content = currentStorySequence[currentStoryIndex];
  document.getElementById("story-speaker").innerText = `[${content.speaker}]`;
  document.getElementById("story-text").innerText = content.text;
  document.getElementById("btn-start-stage").innerText =
    currentStoryIndex === currentStorySequence.length - 1
      ? "전투 시작!"
      : "다음 ▶";
}

function showStorySynopsis() {
  state = "INTRO";
  hideTransientUi();
  resetRunPresentation();
  document.getElementById("ui-hud").classList.add("hidden");
  document.getElementById("ui-dpad").classList.add("hidden");
  document.getElementById("ui-intro").classList.add("hidden");
  document.getElementById("btn-settings-fab").classList.add("hidden");
  clearStoryOverlayHideTimer();
  document.getElementById("story-overlay").classList.remove("hidden");
  document.getElementById("ui-story-dialog-box").classList.remove("hidden");
  setTimeout(() => {
    document.getElementById("story-overlay").classList.remove("opacity-0");
    document
      .getElementById("ui-story-dialog-box")
      .classList.remove("translate-y-full");
  }, 10);
  currentStorySequence = STORY_CONTENT[currentTheme][currentStage - 1];
  currentStoryIndex = 0;
  updateStoryDialog();
}

function startGame(mode) {
  initAudio();
  hideTransientUi();
  hideStorySynopsis();
  state = "PLAYING";
  gameMode = mode;
  timeElapsed = 0;
  kills = 0;
  spawnTimer = 0;
  timeLeft = mode === "STORY" ? STAGE_DURATIONS[currentStage - 1] : 60.0;
  resetRunPresentation();
  document.getElementById("hud-kills").innerText = "0";
  document.getElementById("ui-intro").classList.add("hidden");
  document.getElementById("btn-settings-fab").classList.add("hidden");
  document.getElementById("ui-hud").classList.remove("hidden");
  lastTime = performance.now();
}

function triggerGameOver() {
  state = "GAMEOVER";
  playSound("gameover");
  document.getElementById("ui-hud").classList.add("hidden");
  document.getElementById("ui-gameover").classList.remove("hidden");
  document.getElementById("result-time-lose").innerText =
    timeElapsed.toFixed(1) + "초";
  document.getElementById("result-kills-lose").innerText = kills;
}

function triggerWin() {
  state = "WIN";
  playSound("win");
  document.getElementById("ui-hud").classList.add("hidden");
  document.getElementById("ui-win").classList.remove("hidden");
  document.getElementById("result-score").innerText = (
    kills * 100
  ).toLocaleString();
}

function pauseGame() {
  if (state === "PLAYING") {
    state = "PAUSED";
    document.getElementById("ui-pause-modal").classList.remove("hidden");
  }
}
function resumeGame() {
  if (state === "PAUSED") {
    state = "PLAYING";
    document.getElementById("ui-pause-modal").classList.add("hidden");
    lastTime = performance.now();
  }
}

function handleInput(clientX, clientY) {
  if (state !== "PLAYING" || isConsoleMode) return;
  const rect = canvas.getBoundingClientRect();
  const x = clientX - rect.left;
  const y = clientY - rect.top;

  // 빈 공간 터치 피드백 (타격감)
  createHitParticles(x, y, false, false);

  let hit = false;
  for (let i = bugs.length - 1; i >= 0; i--) {
    const b = bugs[i];
    const dx = x - b.x,
      dy = y - b.y;
    // 몬스터 터치 Hitbox를 2.5배 넉넉하게 보정!
    if (dx * dx + dy * dy <= (b.radius * 2.5) ** 2) {
      b.hp--;
      if (b.hp <= 0) {
        b.kill();
        bugs.splice(i, 1);
      } else {
        playSound("tankerHit");
        createHitParticles(b.x, b.y, false, b.isTanker);
      }
      hit = true;
      break; // 한 번에 한 마리만 타격
    }
  }
}

// ==========================================
// 6. 게임 메인 루프 (Update & Draw)
// ==========================================
function update(dt) {
  if (state !== "PLAYING") {
    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].update(dt);
      if (particles[i].life <= 0) particles.splice(i, 1);
    }
    if (screenShake > 0) {
      screenShake -= dt * 60;
      if (screenShake < 0) screenShake = 0;
    }
    return;
  }

  Greeny.update(dt);

  if (gameMode === "STORY") {
    timeLeft -= dt;
    if (timeLeft <= 0) triggerWin();
    document.getElementById("hud-time").innerText = Math.max(
      0,
      timeLeft,
    ).toFixed(1);
  } else {
    timeElapsed += dt;
    document.getElementById("hud-time").innerText = timeElapsed.toFixed(1);
  }

  spawnTimer += dt;
  let difficultyMod = 1 + timeElapsed / 30.0;
  let currentSpawnWait = Math.max(
    0.3,
    (1.2 - customDifficulty * 0.1) / difficultyMod,
  );
  if (gameMode === "STORY") {
    currentSpawnWait = Math.max(0.3, 1.2 - currentStage * 0.2);
  }

  if (spawnTimer > currentSpawnWait) {
    spawnTimer = 0;
    let newBug = new Bug(Math.random() < 0.2);
    // 30초마다 템포 및 유닛 다채롭게 스폰
    if (timeElapsed > 30 || currentStage >= 2) {
      if (Math.random() < 0.3) {
        newBug.speed *= 2.5;
        newBug.hp = 1;
        newBug.radius = 15;
        newBug.isTanker = false; // Fast bugs
      }
    }
    bugs.push(newBug);
  }

  // 역순 반복으로 배열 조작 간섭 방지
  for (let i = bugs.length - 1; i >= 0; i--) {
    const b = bugs[i];
    b.update(dt);
    if (isConsoleMode) {
      b.hp -= dt * 0.25;
      if (b.hp <= 0) {
        b.kill();
        bugs.splice(i, 1);
      }
    }
  }

  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update(dt);
    if (particles[i].life <= 0) particles.splice(i, 1);
  }
}

function draw(time) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let bgX = -300,
    bgY = -300;

  // 홈 화면(INTRO)에서 넓은 맵을 부드럽게 패닝(이동)
  if (state === "INTRO") {
    bgX += Math.sin(time * 0.3) * 150;
    bgY += Math.cos(time * 0.2) * 150;
  }

  ctx.drawImage(bgCanvas, Math.floor(bgX), Math.floor(bgY));

  particles.forEach((p) => p.draw(ctx));
  bugs.forEach((b) => b.draw(ctx, time));

  if ((state !== "WIN" && state !== "GAMEOVER") || state === "INTRO")
    Greeny.draw(ctx, time);
}

function gameLoop(time) {
  requestAnimationFrame(gameLoop);
  if (!lastTime) lastTime = time;
  const dt = (time - lastTime) / 1000;
  lastTime = time;
  if (state === "PAUSED") return;
  update(dt);
  draw(time / 1000);
}

// ==========================================
// 7. 이벤트 리스너 바인딩 및 최초 실행
// ==========================================
window.onload = () => {
  canvas = document.getElementById("gameCanvas");
  ctx = canvas.getContext("2d");
  bgCanvas = document.createElement("canvas");
  bgCtx = bgCanvas.getContext("2d");

  window.addEventListener("resize", resize);

  window.addEventListener("keydown", (e) => {
    keys[e.key] = true;
    if (e.key === "Escape") state === "PLAYING" ? pauseGame() : resumeGame();
  });
  window.addEventListener("keyup", (e) => {
    keys[e.key] = false;
  });
  canvas.addEventListener("mousedown", (e) =>
    handleInput(e.clientX, e.clientY),
  );
  canvas.addEventListener(
    "touchstart",
    (e) => {
      e.preventDefault();
      for (let t of e.changedTouches) handleInput(t.clientX, t.clientY);
    },
    { passive: false },
  );

  document.getElementById("btn-settings-fab").onclick = () =>
    document.getElementById("ui-settings-modal").classList.remove("hidden");
  document.getElementById("btn-close-settings").onclick = () =>
    document.getElementById("ui-settings-modal").classList.add("hidden");
  document.getElementById("theme-toggle").onchange = (e) => {
    currentTheme = e.target.checked ? "ZOMBIE" : "FARM";
    createMap();
    document.getElementById("desc-theme-title").innerText =
      currentTheme === "ZOMBIE" ? "그린이의 좀비 방어" : "그린이의 농장 방어";
  };
  document.getElementById("mute-toggle").onchange = (e) =>
    (isMuted = e.target.checked);
  document.getElementById("console-toggle").onchange = (e) => {
    isConsoleMode = e.target.checked;
    document.getElementById("btn-mode-story").style.opacity = isConsoleMode
      ? 0.4
      : 1;
    document.getElementById("btn-mode-ranking").style.opacity = isConsoleMode
      ? 0.4
      : 1;
  };
  document.getElementById("btn-hp-plus").onclick = () => {
    if (customTankerHp < 20) customTankerHp++;
    document.getElementById("val-tanker-hp").innerText = customTankerHp;
  };
  document.getElementById("btn-hp-minus").onclick = () => {
    if (customTankerHp > 1) customTankerHp--;
    document.getElementById("val-tanker-hp").innerText = customTankerHp;
  };
  document.getElementById("btn-diff-plus").onclick = () => {
    if (customDifficulty < 10) customDifficulty++;
    document.getElementById("val-difficulty").innerText = customDifficulty;
  };
  document.getElementById("btn-diff-minus").onclick = () => {
    if (customDifficulty > 1) customDifficulty--;
    document.getElementById("val-difficulty").innerText = customDifficulty;
  };
  document.getElementById("btn-mode-story").onclick = () => {
    if (!isConsoleMode) {
      currentStage = 1;
      showStorySynopsis();
    }
  };
  document.getElementById("btn-mode-ranking").onclick = () => {
    if (!isConsoleMode) startGame("RANKING");
  };
  document.getElementById("btn-mode-moving").onclick = () => {
    startGame("MOVING");
    if (isConsoleMode)
      document.getElementById("ui-dpad").classList.remove("hidden");
  };
  document.getElementById("btn-start-stage").onclick = () => {
    currentStoryIndex++;
    if (currentStoryIndex < currentStorySequence.length) updateStoryDialog();
    else startGame("STORY");
  };
  document.getElementById("btn-resume-game").onclick = resumeGame;
  document.getElementById("btn-quit-game").onclick = goHome;
  document.getElementById("btn-home-lose").onclick = goHome;
  document.getElementById("btn-home-win").onclick = goHome;
  document.getElementById("btn-restart-lose").onclick = () =>
    startGame(gameMode);
  document.getElementById("btn-restart-win").onclick = () => {
    if (gameMode === "STORY" && currentStage < 3) {
      currentStage++;
      showStorySynopsis();
    } else startGame(gameMode);
  };

  const dpadIds = {
    "btn-up": "ArrowUp",
    "btn-down": "ArrowDown",
    "btn-left": "ArrowLeft",
    "btn-right": "ArrowRight",
  };
  Object.keys(dpadIds).forEach((id) => {
    const btn = document.getElementById(id);
    btn.ontouchstart = (e) => {
      e.preventDefault();
      keys[dpadIds[id]] = true;
    };
    btn.ontouchend = (e) => {
      e.preventDefault();
      keys[dpadIds[id]] = false;
    };
    btn.onmousedown = () => (keys[dpadIds[id]] = true);
    btn.onmouseup = () => (keys[dpadIds[id]] = false);
  });

  // 화면 및 캔버스 초기 설정
  resize();
  requestAnimationFrame(gameLoop);
};
