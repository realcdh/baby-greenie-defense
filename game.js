// ==========================================
// 1. 전역 변수 선언 (오류 방지)
// ==========================================
let canvas, ctx, bgCanvas, bgCtx;
let actx = null;
let isMuted = false;
let isConsoleMode = false;
let showLeaderboard = true;
let state = "INTRO";
let currentTheme = "FARM";
let customDifficulty = 5;
let customMonsterSpeed = 1.0;
let customTankerHp = 3;
let customMovingLives = 1;
let customActionBombInterval = 3.0;
let customActionBombDamage = 1.5;
let customActionBombRadius = 150;
let timeLeft = 0,
  timeElapsed = 0,
  kills = 0,
  lastTime = 0,
  spawnTimer = 0,
  screenShake = 0;
let gameMode = "STORY",
  currentStage = 1;
let configuredStartMode = "MOVING";
let actionBombCount = 0,
  actionBombCharge = 0,
  actionBombShockwave = 0;
let bugs = [],
  particles = [];
let cx = 0,
  cy = 0;
let currentStorySequence = [],
  currentStoryIndex = 0;
let storyOverlayHideTimer = null;
let draftSettings = null;
let currentUser = null;
let authModalLocked = false;
let pendingPostAuthAction = null;
let leaderboardRequestId = 0;
const keys = {};
const API_BASE_URL =
  "https://7y8yhdx6vf.execute-api.ap-northeast-2.amazonaws.com/";
const API_KEY = "tempgreedy";
const LEADERBOARD_GAME_NAME = "protect-baby-green";

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

const sprBomb = [
  [0, 0, 0, 46, 46, 0, 0, 0, 0],
  [0, 0, 46, 45, 46, 46, 0, 0, 0],
  [0, 0, 0, 46, 0, 0, 0, 0, 0],
  [0, 0, 35, 35, 35, 35, 35, 0, 0],
  [0, 35, 41, 41, 41, 42, 41, 35, 0],
  [35, 41, 41, 41, 42, 41, 41, 41, 35],
  [35, 41, 42, 41, 41, 41, 42, 41, 35],
  [0, 35, 41, 41, 41, 42, 41, 35, 0],
  [0, 0, 35, 35, 35, 35, 35, 0, 0],
];

const sprSettingsGear = [
  [0, 0, 0, 35, 35, 35, 0, 0, 0],
  [0, 0, 35, 42, 41, 42, 35, 0, 0],
  [0, 35, 42, 41, 17, 41, 42, 35, 0],
  [35, 42, 41, 17, 41, 17, 41, 42, 35],
  [35, 41, 17, 41, 49, 41, 17, 41, 35],
  [35, 42, 41, 17, 41, 17, 41, 42, 35],
  [0, 35, 42, 41, 17, 41, 42, 35, 0],
  [0, 0, 35, 42, 41, 42, 35, 0, 0],
  [0, 0, 0, 35, 35, 35, 0, 0, 0],
];

const sprCursorSwatter = {
  FARM: [
    [0, 0, 35, 35, 35, 35, 35, 0, 0, 0, 0, 0, 0, 0],
    [0, 35, 31, 31, 1, 31, 31, 35, 0, 0, 0, 0, 0, 0],
    [35, 31, 1, 0, 1, 0, 1, 31, 35, 0, 0, 0, 0, 0],
    [35, 31, 0, 1, 0, 1, 0, 31, 35, 0, 0, 0, 0, 0],
    [35, 31, 1, 0, 1, 0, 1, 31, 35, 0, 0, 0, 0, 0],
    [0, 35, 31, 31, 1, 31, 31, 35, 40, 35, 0, 0, 0, 0],
    [0, 0, 35, 35, 35, 35, 35, 42, 40, 42, 35, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 35, 40, 42, 40, 42, 35, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 35, 40, 42, 40, 42, 35, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 35, 40, 42, 40, 42, 35],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 35, 40, 42, 40, 35],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 35, 40, 42, 35],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 35, 40, 35],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 35, 0],
  ],
  ZOMBIE: [
    [0, 0, 35, 35, 35, 35, 35, 0, 0, 0, 0, 0, 0, 0],
    [0, 35, 44, 44, 45, 44, 44, 35, 0, 0, 0, 0, 0, 0],
    [35, 44, 41, 0, 45, 0, 41, 44, 35, 0, 0, 0, 0, 0],
    [35, 44, 0, 45, 0, 45, 0, 44, 35, 0, 0, 0, 0, 0],
    [35, 44, 41, 0, 45, 0, 41, 44, 35, 0, 0, 0, 0, 0],
    [0, 35, 44, 44, 45, 44, 44, 35, 41, 35, 0, 0, 0, 0],
    [0, 0, 35, 35, 35, 35, 35, 44, 41, 44, 35, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 35, 41, 44, 41, 44, 35, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 35, 41, 44, 41, 44, 35, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 35, 41, 44, 41, 44, 35],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 35, 41, 44, 41, 35],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 35, 41, 44, 35],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 35, 41, 35],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 35, 0],
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

const START_MODE_ORDER = ["STORY", "RANKING", "MOVING"];
const START_MODE_LABELS = {
  STORY: "스토리 모드",
  RANKING: "무한 생존",
  MOVING: "액션 모드",
};
const DEFAULT_TOUCH_MODE_LIVES = 3;
const ACTION_BOMB_BLAST_DURATION = 0.35;
const SETTINGS_FIELD_CONFIG = {
  customMovingLives: {
    inputId: "val-moving-life",
    min: 1,
    max: 9,
    integer: true,
    precision: 0,
    delta: 1,
  },
  customActionBombInterval: {
    inputId: "val-bomb-interval",
    min: 0.5,
    max: 10,
    integer: false,
    precision: 2,
    delta: 0.5,
  },
  customActionBombDamage: {
    inputId: "val-bomb-damage",
    min: 0.5,
    max: 10,
    integer: false,
    precision: 2,
    delta: 0.5,
  },
  customActionBombRadius: {
    inputId: "val-bomb-range",
    min: 60,
    max: 320,
    integer: false,
    precision: 2,
    delta: 10,
  },
  customTankerHp: {
    inputId: "val-tanker-hp",
    min: 1,
    max: 20,
    integer: false,
    precision: 2,
    delta: 1,
  },
  customDifficulty: {
    inputId: "val-difficulty",
    min: 1,
    max: 10,
    integer: false,
    precision: 2,
    delta: 1,
  },
  customMonsterSpeed: {
    inputId: "val-monster-speed",
    min: 0.5,
    max: 3,
    integer: false,
    precision: 2,
    delta: 0.1,
  },
};
const CURSOR_PIXEL_SCALE = 3;
const CURSOR_HOTSPOT = { x: 4, y: 3 };
const CURSOR_STYLE_CACHE = {};

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
  } else if (type === "bomb") {
    osc.type = "square";
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.exponentialRampToValueAtTime(55, now + 0.35);
    gain.gain.setValueAtTime(0.4, now);
    gain.gain.linearRampToValueAtTime(0.15, now + 0.12);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
    osc.start(now);
    osc.stop(now + 0.35);
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

function drawPixelArtTopLeft(ctx, sprite, size, offsetX = 0, offsetY = 0) {
  if (!sprite) return;

  for (let r = 0; r < sprite.length; r++) {
    for (let c = 0; c < sprite[r].length; c++) {
      const code = sprite[r][c];
      if (!colorMap[code]) continue;

      ctx.fillStyle = colorMap[code];
      ctx.fillRect(offsetX + c * size, offsetY + r * size, size, size);
    }
  }
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
    if (state === "PLAYING" && this.maxHp > 1) {
      const heartSize = 4;
      const heartGap = 8;
      const heartStride = sprHeart.full[0].length * heartSize + heartGap;
      const heartY = -72;
      for (let i = 0; i < this.maxHp; i++) {
        const hx = (i - (this.maxHp - 1) / 2) * heartStride;
        const sprite = i < this.hp ? sprHeart.full : sprHeart.empty;
        drawPixelArtAt(ctx, sprite, heartSize, hx, heartY);
      }
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
    this.speed =
      (isTanker ? 50 : 100) *
      (1 + customDifficulty * 0.1) *
      customMonsterSpeed;
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
  kill(playSfx = true) {
    if (playSfx) playSound("kill");
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

function formatActionStat(value) {
  return Number.isInteger(value) ? value.toFixed(0) : value.toFixed(1);
}

function getActionBombChargeTime() {
  return Math.max(0.5, customActionBombInterval);
}

function renderBombHudIcon() {
  const iconCanvas = document.getElementById("hud-bomb-icon");
  if (!iconCanvas) return;

  const iconCtx = iconCanvas.getContext("2d");
  iconCtx.imageSmoothingEnabled = false;
  iconCtx.clearRect(0, 0, iconCanvas.width, iconCanvas.height);
  iconCtx.save();
  iconCtx.translate(iconCanvas.width / 2, iconCanvas.height / 2);
  drawPixelArt(iconCtx, sprBomb, 3);
  iconCtx.restore();
}

function renderSettingsFabIcon() {
  const iconCanvas = document.getElementById("settings-fab-icon");
  if (!iconCanvas) return;

  const iconCtx = iconCanvas.getContext("2d");
  iconCtx.imageSmoothingEnabled = false;
  iconCtx.clearRect(0, 0, iconCanvas.width, iconCanvas.height);
  iconCtx.save();
  iconCtx.translate(iconCanvas.width / 2, iconCanvas.height / 2);
  drawPixelArt(iconCtx, sprSettingsGear, 4);
  iconCtx.restore();
}

function getCursorStyleForTheme(theme) {
  if (CURSOR_STYLE_CACHE[theme]) return CURSOR_STYLE_CACHE[theme];

  const sprite = sprCursorSwatter[theme] || sprCursorSwatter.FARM;
  const cursorCanvas = document.createElement("canvas");
  cursorCanvas.width = sprite[0].length * CURSOR_PIXEL_SCALE;
  cursorCanvas.height = sprite.length * CURSOR_PIXEL_SCALE;

  const cursorCtx = cursorCanvas.getContext("2d");
  cursorCtx.imageSmoothingEnabled = false;
  drawPixelArtTopLeft(cursorCtx, sprite, CURSOR_PIXEL_SCALE);

  CURSOR_STYLE_CACHE[theme] = `url("${cursorCanvas.toDataURL("image/png")}") ${
    CURSOR_HOTSPOT.x * CURSOR_PIXEL_SCALE
  } ${CURSOR_HOTSPOT.y * CURSOR_PIXEL_SCALE}, auto`;
  return CURSOR_STYLE_CACHE[theme];
}

function updateCursorPresentation() {
  document.body.classList.add("custom-cursor");
  document.body.style.setProperty(
    "--game-cursor",
    getCursorStyleForTheme(currentTheme),
  );
}

function createBombBurst(x, y) {
  const colors =
    currentTheme === "ZOMBIE"
      ? ["#f59e0b", "#ef4444", "#7f1d1d", "#fcd34d"]
      : ["#fbbf24", "#fb923c", "#ef4444", "#fde047"];

  for (let i = 0; i < 26; i++) {
    const particle = new Particle(
      x,
      y,
      colors[Math.floor(Math.random() * colors.length)],
    );
    particle.life = 0.8;
    particle.vx *= 1.5;
    particle.vy *= 1.5;
    particles.push(particle);
  }
}

function clampNumber(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function normalizeSettingNumber(settingKey, rawValue, fallbackValue) {
  const config = SETTINGS_FIELD_CONFIG[settingKey];
  const parsedValue = Number.parseFloat(
    String(rawValue ?? "")
      .trim()
      .replace(",", "."),
  );

  if (!Number.isFinite(parsedValue)) return fallbackValue;

  const clampedValue = clampNumber(parsedValue, config.min, config.max);
  if (config.integer) return Math.round(clampedValue);
  return Number(clampedValue.toFixed(config.precision));
}

function formatSettingInputValue(settingKey, value) {
  const config = SETTINGS_FIELD_CONFIG[settingKey];
  const normalizedValue = normalizeSettingNumber(settingKey, value, config.min);

  if (config.integer) return String(normalizedValue);
  return String(Number(normalizedValue.toFixed(config.precision)));
}

function normalizePhone(value) {
  return String(value || "").trim();
}

function normalizeUserId(value) {
  return String(value || "").trim().slice(0, 4);
}

function normalizeTextValue(value) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeFetchedUserProfile(profile, fallbackUserId = "") {
  const source =
    profile?.user ?? profile?.profile ?? profile?.data ?? profile?.result ?? profile;
  if (!source || typeof source !== "object") return null;

  const userId = normalizeUserId(source.userId ?? source.id ?? fallbackUserId);
  if (userId.length !== 4) return null;

  return {
    userId,
    displayName: normalizeTextValue(
      source.nickname ?? source.name ?? source.userName ?? source.username,
    ),
    phone: normalizePhone(source.phone),
  };
}

function formatScoreValue(score) {
  const numericScore = Number(score) || 0;
  const maximumFractionDigits = Number.isInteger(numericScore) ? 0 : 1;
  return numericScore.toLocaleString("ko-KR", {
    minimumFractionDigits: 0,
    maximumFractionDigits,
  });
}

function getRunScore() {
  return kills * 100;
}

function setStatusMessage(elementId, message, tone = "neutral") {
  const el = document.getElementById(elementId);
  if (!el) return;

  el.textContent = message || "";
  el.classList.toggle("hidden", !message);

  const toneColorMap = {
    error: "#b91c1c",
    success: "#15803d",
    info: "#1d4ed8",
    neutral:
      elementId === "result-submit-status-lose"
        ? "#7f1d1d"
        : elementId === "result-submit-status-win"
          ? "#166534"
          : "#713f12",
  };

  el.style.color = toneColorMap[tone] || toneColorMap.neutral;
}

function renderCurrentUser() {
  const nameEl = document.getElementById("intro-user-name");
  const idEl = document.getElementById("intro-user-id");
  const buttonEl = document.getElementById("btn-open-auth");
  if (!nameEl || !idEl || !buttonEl) return;

  if (currentUser?.userId) {
    nameEl.innerText = currentUser.displayName || `${currentUser.userId}번 플레이어`;
    const details = [`userId: ${currentUser.userId}`];
    if (currentUser.phone) details.push(`전화번호: ${currentUser.phone}`);
    idEl.innerText = details.join(" · ");
    buttonEl.innerText = "다시 조회";
  } else {
    nameEl.innerText = "조회된 플레이어 없음";
    idEl.innerText = "시작 전에 userId 4자리를 입력해주세요.";
    buttonEl.innerText = "조회";
  }
}

function fillAuthForm() {
  document.getElementById("auth-user-id").value = currentUser?.userId || "";
}

function setAuthFormDisabled(disabled) {
  authModalLocked = disabled;
  [
    "auth-user-id",
    "btn-submit-auth",
    "btn-cancel-auth",
    "btn-close-auth",
  ].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.disabled = disabled;
  });
}

function showAuthModal() {
  fillAuthForm();
  setStatusMessage("auth-status", "", "neutral");
  document.getElementById("ui-auth-modal").classList.remove("hidden");
  document.getElementById("auth-user-id").focus();
}

function openAuthModal() {
  pendingPostAuthAction = null;
  showAuthModal();
}

function openAuthModalForAction(action) {
  pendingPostAuthAction = typeof action === "function" ? action : null;
  showAuthModal();
}

function closeAuthModal(resetPendingStart = false) {
  document.getElementById("ui-auth-modal").classList.add("hidden");
  setAuthFormDisabled(false);
  if (resetPendingStart) pendingPostAuthAction = null;
}

function cancelAuthFlow() {
  closeAuthModal(true);
}

function runWithAuthenticatedPlayer(action) {
  if (currentUser?.userId) {
    action();
    return;
  }

  openAuthModalForAction(action);
}

async function requestJson(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
  const rawText = await response.text();

  let data = null;
  if (rawText) {
    try {
      data = JSON.parse(rawText);
    } catch (error) {
      data = rawText;
    }
  }

  if (!response.ok) {
    const errorMessage =
      typeof data === "string"
        ? data
        : data?.message || `요청 실패 (${response.status})`;
    throw new Error(errorMessage);
  }

  return data;
}

async function fetchUserProfileById(userId) {
  const lookupAttempts = [
    () =>
      requestJson("/api/users", {
        method: "POST",
        body: JSON.stringify({
          userId,
          apiKey: API_KEY,
        }),
      }),
    () =>
      requestJson(
        `/api/users/${encodeURIComponent(userId)}?apiKey=${encodeURIComponent(API_KEY)}`,
        {
          method: "GET",
        },
      ),
    () =>
      requestJson(
        `/api/users?userId=${encodeURIComponent(userId)}&apiKey=${encodeURIComponent(API_KEY)}`,
        {
          method: "GET",
        },
      ),
  ];

  let lastError = null;
  for (const attempt of lookupAttempts) {
    try {
      return await attempt();
    } catch (error) {
      if (!lastError) lastError = error;
    }
  }

  throw lastError || new Error("유저 정보를 불러오지 못했습니다.");
}

function renderLeaderboard(rankings = []) {
  const listEl = document.getElementById("leaderboard-list");
  if (!listEl) return;

  listEl.innerHTML = "";

  if (rankings.length === 0) {
    const emptyItem = document.createElement("li");
    emptyItem.className =
      "rounded-lg border border-orange-200 bg-white/40 px-3 py-3 text-[11px] text-yellow-900/80";
    emptyItem.innerText = "아직 등록된 점수가 없습니다.";
    listEl.appendChild(emptyItem);
    return;
  }

  rankings.forEach((entry) => {
    const item = document.createElement("li");
    item.className =
      "flex items-center justify-between gap-3 rounded-lg border border-orange-200 bg-white/50 px-3 py-2";

    const left = document.createElement("div");
    left.className = "flex items-center gap-3 min-w-0";

    const rank = document.createElement("span");
    rank.className = "text-sm font-bold text-orange-700 shrink-0";
    rank.innerText = `#${entry.rank}`;

    const nickname = document.createElement("span");
    nickname.className = "truncate font-bold text-orange-900";
    nickname.innerText = entry.nickname || "익명";

    const score = document.createElement("span");
    score.className = "shrink-0 font-bold text-green-700";
    score.innerText = `${formatScoreValue(entry.score)}점`;

    left.append(rank, nickname);
    item.append(left, score);
    listEl.appendChild(item);
  });
}

function renderLeaderboardNotice(message) {
  const listEl = document.getElementById("leaderboard-list");
  if (!listEl) return;

  listEl.innerHTML = "";
  const item = document.createElement("li");
  item.className =
    "rounded-lg border border-orange-200 bg-white/40 px-3 py-3 text-[11px] text-yellow-900/80";
  item.innerText = message;
  listEl.appendChild(item);
}

function updateLeaderboardVisibility() {
  const box = document.getElementById("intro-leaderboard-box");
  if (!box) return;
  box.classList.toggle("hidden", !showLeaderboard);
}

async function fetchLeaderboard() {
  if (!showLeaderboard) return;

  const requestId = ++leaderboardRequestId;
  setStatusMessage(
    "leaderboard-status",
    "리더보드를 불러오는 중입니다...",
    "neutral",
  );

  try {
    const data = await requestJson(`/api/leader-board/${LEADERBOARD_GAME_NAME}`, {
      method: "GET",
    });
    if (requestId !== leaderboardRequestId) return;

    const rankings = Array.isArray(data?.rankings) ? data.rankings : [];
    renderLeaderboard(rankings);
    setStatusMessage(
      "leaderboard-status",
      rankings.length > 0 ? "상위 기록 5개를 표시합니다." : "아직 등록된 점수가 없습니다.",
      "neutral",
    );
  } catch (error) {
    if (requestId !== leaderboardRequestId) return;

    renderLeaderboardNotice("리더보드 정보를 가져오지 못했습니다.");
    setStatusMessage(
      "leaderboard-status",
      `리더보드를 불러오지 못했습니다: ${error.message}`,
      "error",
    );
  }
}

function setResultSubmitStatus(outcome, message, tone = "neutral") {
  const elementId =
    outcome === "lose" ? "result-submit-status-lose" : "result-submit-status-win";
  setStatusMessage(elementId, message, tone);
}

async function submitGameResult(outcome) {
  const score = getRunScore();
  const scoreElId = outcome === "lose" ? "result-score-lose" : "result-score-win";
  const scoreEl = document.getElementById(scoreElId);
  if (scoreEl) scoreEl.innerText = formatScoreValue(score);
  const submittingUser = currentUser ? { ...currentUser } : null;

  if (!submittingUser?.userId) {
    setResultSubmitStatus(
      outcome,
      "플레이어 정보가 없어 점수를 전송하지 못했습니다.",
      "error",
    );
    return;
  }

  setResultSubmitStatus(outcome, "점수를 서버에 등록하는 중입니다...", "info");

  try {
    const data = await requestJson("/api/result", {
      method: "POST",
      body: JSON.stringify({
        gameName: LEADERBOARD_GAME_NAME,
        userId: submittingUser.userId,
        score,
        apiKey: API_KEY,
      }),
    });

    const statusPrefix = data?.status ? `[${data.status}] ` : "";
    setResultSubmitStatus(
      outcome,
      `${statusPrefix}${data?.message || "점수가 등록되었습니다."}`,
      "success",
    );
    if (showLeaderboard) void fetchLeaderboard();
  } catch (error) {
    setResultSubmitStatus(
      outcome,
      `점수 등록 실패: ${error.message}`,
      "error",
    );
  }
}

async function submitAuthForm() {
  if (authModalLocked) return;

  const userId = normalizeUserId(document.getElementById("auth-user-id").value);

  if (userId.length !== 4) {
    setStatusMessage(
      "auth-status",
      "userId는 4글자로 입력해주세요.",
      "error",
    );
    return;
  }

  setAuthFormDisabled(true);
  setStatusMessage("auth-status", "플레이어 정보를 조회하는 중입니다...", "info");

  try {
    const profile = normalizeFetchedUserProfile(
      await fetchUserProfileById(userId),
      userId,
    );
    if (!profile) throw new Error("유저 정보를 받지 못했습니다.");

    currentUser = profile;
    renderCurrentUser();

    const postAuthAction = pendingPostAuthAction;
    closeAuthModal(true);
    if (typeof postAuthAction === "function") postAuthAction();
  } catch (error) {
    setStatusMessage(
      "auth-status",
      `플레이어 조회 실패: ${error.message}`,
      "error",
    );
    setAuthFormDisabled(false);
  }
}

function handleStartGameRequest() {
  runWithAuthenticatedPlayer(startConfiguredMode);
}

function getCurrentSettingsSnapshot() {
  return {
    currentTheme,
    isMuted,
    isConsoleMode,
    showLeaderboard,
    customDifficulty,
    customMonsterSpeed,
    customTankerHp,
    customMovingLives,
    customActionBombInterval,
    customActionBombDamage,
    customActionBombRadius,
    configuredStartMode,
  };
}

function updateThemePresentation() {
  document.getElementById("desc-theme-title").innerText =
    currentTheme === "ZOMBIE" ? "그린이의 좀비 방어" : "그린이의 농장 방어";
}

function getAvailableStartModes(settings = getCurrentSettingsSnapshot()) {
  return settings.isConsoleMode ? ["MOVING"] : START_MODE_ORDER;
}

function syncConfiguredStartMode(settings) {
  const availableModes = getAvailableStartModes(settings);
  if (!availableModes.includes(settings.configuredStartMode)) {
    settings.configuredStartMode = availableModes[0];
  }
  return settings;
}

function renderStartModeControl(settings) {
  const label = START_MODE_LABELS[settings.configuredStartMode];
  const prevBtn = document.getElementById("btn-start-mode-prev");
  const nextBtn = document.getElementById("btn-start-mode-next");
  const isFixed = getAvailableStartModes(settings).length === 1;

  document.getElementById("val-start-mode").innerText = label;
  prevBtn.disabled = isFixed;
  nextBtn.disabled = isFixed;
  prevBtn.style.opacity = isFixed ? 0.4 : 1;
  nextBtn.style.opacity = isFixed ? 0.4 : 1;
}

function updateIntroStartModeHint() {
  const hintEl = document.getElementById("intro-start-mode-hint");
  if (!hintEl) return;
  hintEl.innerText = `현재 시작 모드: ${START_MODE_LABELS[configuredStartMode]}`;
}

function syncDraftSettingsFromForm() {
  if (!draftSettings) return;

  Object.keys(SETTINGS_FIELD_CONFIG).forEach((settingKey) => {
    const { inputId } = SETTINGS_FIELD_CONFIG[settingKey];
    const input = document.getElementById(inputId);
    if (!input) return;

    draftSettings[settingKey] = normalizeSettingNumber(
      settingKey,
      input.value,
      draftSettings[settingKey],
    );
  });
}

function renderSettingsModal(settings) {
  document.getElementById("theme-toggle").checked =
    settings.currentTheme === "ZOMBIE";
  document.getElementById("leaderboard-toggle").checked = settings.showLeaderboard;
  document.getElementById("mute-toggle").checked = settings.isMuted;
  document.getElementById("console-toggle").checked = settings.isConsoleMode;
  Object.keys(SETTINGS_FIELD_CONFIG).forEach((settingKey) => {
    const { inputId } = SETTINGS_FIELD_CONFIG[settingKey];
    const input = document.getElementById(inputId);
    if (!input) return;

    input.value = formatSettingInputValue(settingKey, settings[settingKey]);
  });
  renderStartModeControl(settings);
}

function applySettingsSnapshot(settings) {
  currentTheme = settings.currentTheme;
  isMuted = settings.isMuted;
  isConsoleMode = settings.isConsoleMode;
  showLeaderboard = settings.showLeaderboard;
  customDifficulty = settings.customDifficulty;
  customMonsterSpeed = settings.customMonsterSpeed;
  customTankerHp = settings.customTankerHp;
  customMovingLives = settings.customMovingLives;
  customActionBombInterval = settings.customActionBombInterval;
  customActionBombDamage = settings.customActionBombDamage;
  customActionBombRadius = settings.customActionBombRadius;
  configuredStartMode = settings.configuredStartMode;

  createMap();
  updateThemePresentation();
  updateCursorPresentation();
  updateLeaderboardVisibility();
  if (showLeaderboard) void fetchLeaderboard();
  updateIntroStartModeHint();
  updateActionBombHud();
}

function openSettingsModal() {
  draftSettings = syncConfiguredStartMode({ ...getCurrentSettingsSnapshot() });
  renderSettingsModal(draftSettings);
  document.getElementById("ui-settings-modal").classList.remove("hidden");
}

function closeSettingsModal() {
  document.getElementById("ui-settings-modal").classList.add("hidden");
}

function applySettingsChanges() {
  if (!draftSettings) return;
  syncDraftSettingsFromForm();
  applySettingsSnapshot(syncConfiguredStartMode({ ...draftSettings }));
  draftSettings = null;
  closeSettingsModal();
}

function cancelSettingsChanges() {
  draftSettings = null;
  closeSettingsModal();
}

function updateActionBombHud() {
  const hud = document.getElementById("ui-action-bomb");
  if (!hud) return;

  const shouldShow = state === "PLAYING" && gameMode === "MOVING";
  hud.classList.toggle("hidden", !shouldShow);
  if (!shouldShow) return;

  const chargeTime = getActionBombChargeTime();
  const progress = Math.max(0, Math.min(1, actionBombCharge / chargeTime));
  const remaining = Math.max(0, chargeTime - actionBombCharge);

  document.getElementById("hud-bomb-count").innerText = `${actionBombCount}개`;
  document.getElementById("hud-bomb-timer").innerText =
    actionBombCount > 0
      ? `다음 충전 ${remaining.toFixed(1)}초`
      : `충전 중 ${remaining.toFixed(1)}초`;
  document.getElementById("hud-bomb-progress").style.width =
    `${progress * 100}%`;
}

function resetActionBombState() {
  actionBombCount = 0;
  actionBombCharge = 0;
  actionBombShockwave = 0;
  updateActionBombHud();
}

function detonateActionBomb() {
  if (state !== "PLAYING" || gameMode !== "MOVING" || actionBombCount <= 0)
    return;

  actionBombCount--;
  actionBombShockwave = ACTION_BOMB_BLAST_DURATION;
  screenShake = Math.max(screenShake, 18);
  playSound("bomb");
  createBombBurst(Greeny.x, Greeny.y);

  let hits = 0;
  for (let i = bugs.length - 1; i >= 0; i--) {
    const bug = bugs[i];
    const dx = bug.x - Greeny.x;
    const dy = bug.y - Greeny.y;
    const radius = customActionBombRadius + bug.radius;

    if (dx * dx + dy * dy > radius * radius) continue;

    hits++;
    bug.hp -= customActionBombDamage;

    if (bug.hp <= 0) {
      bug.kill(false);
      bugs.splice(i, 1);
    } else {
      createHitParticles(bug.x, bug.y, false, bug.isTanker);
    }
  }

  if (hits === 0) createHitParticles(Greeny.x, Greeny.y, false, false);
  updateActionBombHud();
}

function drawActionBombShockwave(ctx) {
  if (actionBombShockwave <= 0) return;

  const progress = 1 - actionBombShockwave / ACTION_BOMB_BLAST_DURATION;
  const alpha = Math.max(0, 1 - progress);
  const radius = 40 + customActionBombRadius * progress;

  ctx.save();
  ctx.globalAlpha = alpha * 0.8;
  for (let i = 0; i < 24; i++) {
    const angle = (i / 24) * Math.PI * 2;
    const px = Greeny.x + Math.cos(angle) * radius;
    const py = Greeny.y + Math.sin(angle) * radius;

    ctx.fillStyle = i % 2 === 0 ? "#fde047" : "#fb923c";
    ctx.fillRect(Math.floor(px / 4) * 4, Math.floor(py / 4) * 4, 8, 8);
  }
  ctx.restore();
}

function cycleConfiguredStartMode(direction) {
  if (!draftSettings) return;

  syncDraftSettingsFromForm();
  const availableModes = getAvailableStartModes(draftSettings);
  const currentIndex = availableModes.indexOf(draftSettings.configuredStartMode);
  const nextIndex =
    (currentIndex + direction + availableModes.length) % availableModes.length;
  draftSettings.configuredStartMode = availableModes[nextIndex];
  renderStartModeControl(draftSettings);
}

function adjustDraftSetting(settingKey, direction) {
  if (!draftSettings) return;

  syncDraftSettingsFromForm();
  const config = SETTINGS_FIELD_CONFIG[settingKey];
  draftSettings[settingKey] = normalizeSettingNumber(
    settingKey,
    draftSettings[settingKey] + config.delta * direction,
    draftSettings[settingKey],
  );
  renderSettingsModal(draftSettings);
}

function startConfiguredMode() {
  if (configuredStartMode === "STORY") {
    currentStage = 1;
    showStorySynopsis();
    return;
  }

  startGame(configuredStartMode);
}

function getGreenyLivesForMode(mode) {
  return mode === "MOVING" ? customMovingLives : DEFAULT_TOUCH_MODE_LIVES;
}

function decayScreenShake(dt) {
  if (screenShake <= 0) return;

  screenShake -= dt * 60;
  if (screenShake < 0) screenShake = 0;
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
  setResultSubmitStatus("lose", "", "neutral");
  setResultSubmitStatus("win", "", "neutral");
}

function resetRunPresentation() {
  bugs = [];
  particles = [];
  screenShake = 0;
  clearInputState();
  resetGreenyState();
  resetActionBombState();
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
  updateActionBombHud();
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
  updateActionBombHud();
}

function startGame(mode) {
  initAudio();
  hideTransientUi();
  hideStorySynopsis();
  state = "PLAYING";
  gameMode = mode;
  Greeny.maxHp = getGreenyLivesForMode(mode);
  timeElapsed = 0;
  kills = 0;
  spawnTimer = 0;
  timeLeft = mode === "STORY" ? STAGE_DURATIONS[currentStage - 1] : 60.0;
  resetRunPresentation();
  document.getElementById("hud-kills").innerText = "0";
  document.getElementById("ui-intro").classList.add("hidden");
  document.getElementById("btn-settings-fab").classList.add("hidden");
  document.getElementById("ui-hud").classList.remove("hidden");
  document
    .getElementById("ui-dpad")
    .classList.toggle("hidden", !(isConsoleMode && mode === "MOVING"));
  updateActionBombHud();
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
  document.getElementById("result-score-lose").innerText = formatScoreValue(
    getRunScore(),
  );
  void submitGameResult("lose");
  updateActionBombHud();
}

function triggerWin() {
  state = "WIN";
  playSound("win");
  document.getElementById("ui-hud").classList.add("hidden");
  document.getElementById("ui-win").classList.remove("hidden");
  document.getElementById("result-score-win").innerText = formatScoreValue(
    getRunScore(),
  );
  void submitGameResult("win");
  updateActionBombHud();
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
    if (actionBombShockwave > 0) {
      actionBombShockwave -= dt;
      if (actionBombShockwave < 0) actionBombShockwave = 0;
    }
    decayScreenShake(dt);
    updateActionBombHud();
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

  if (gameMode === "MOVING") {
    const chargeTime = getActionBombChargeTime();
    actionBombCharge += dt;
    while (actionBombCharge >= chargeTime) {
      actionBombCharge -= chargeTime;
      actionBombCount++;
    }
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

  if (actionBombShockwave > 0) {
    actionBombShockwave -= dt;
    if (actionBombShockwave < 0) actionBombShockwave = 0;
  }

  decayScreenShake(dt);
  updateActionBombHud();
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
  drawActionBombShockwave(ctx);

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
    if (e.code === "Space") {
      e.preventDefault();
      if (!e.repeat) detonateActionBomb();
    }
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

  document.getElementById("btn-settings-fab").onclick = openSettingsModal;
  document.getElementById("btn-open-auth").onclick = openAuthModal;
  document.getElementById("btn-refresh-leaderboard").onclick = () =>
    void fetchLeaderboard();
  document.getElementById("btn-close-auth").onclick = cancelAuthFlow;
  document.getElementById("btn-cancel-auth").onclick = cancelAuthFlow;
  document.getElementById("btn-submit-auth").onclick = () => void submitAuthForm();
  document.getElementById("auth-user-id").addEventListener("input", (e) => {
    e.target.value = normalizeUserId(e.target.value);
  });
  document.getElementById("auth-user-id").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      void submitAuthForm();
    }
  });
  document.getElementById("btn-close-settings").onclick = cancelSettingsChanges;
  document.getElementById("btn-cancel-settings").onclick =
    cancelSettingsChanges;
  document.getElementById("btn-apply-settings").onclick = applySettingsChanges;
  document.getElementById("theme-toggle").onchange = (e) => {
    if (!draftSettings) return;
    draftSettings.currentTheme = e.target.checked ? "ZOMBIE" : "FARM";
  };
  document.getElementById("leaderboard-toggle").onchange = (e) => {
    if (!draftSettings) return;
    draftSettings.showLeaderboard = e.target.checked;
  };
  document.getElementById("mute-toggle").onchange = (e) => {
    if (!draftSettings) return;
    draftSettings.isMuted = e.target.checked;
  };
  document.getElementById("console-toggle").onchange = (e) => {
    if (!draftSettings) return;
    syncDraftSettingsFromForm();
    draftSettings.isConsoleMode = e.target.checked;
    syncConfiguredStartMode(draftSettings);
    renderSettingsModal(draftSettings);
  };
  Object.keys(SETTINGS_FIELD_CONFIG).forEach((settingKey) => {
    const { inputId } = SETTINGS_FIELD_CONFIG[settingKey];
    document.getElementById(inputId).addEventListener("change", () => {
      if (!draftSettings) return;
      syncDraftSettingsFromForm();
      renderSettingsModal(draftSettings);
    });
  });
  document.getElementById("btn-start-mode-prev").onclick = () =>
    cycleConfiguredStartMode(-1);
  document.getElementById("btn-start-mode-next").onclick = () =>
    cycleConfiguredStartMode(1);
  document.getElementById("btn-moving-life-plus").onclick = () => {
    adjustDraftSetting("customMovingLives", 1);
  };
  document.getElementById("btn-moving-life-minus").onclick = () => {
    adjustDraftSetting("customMovingLives", -1);
  };
  document.getElementById("btn-bomb-interval-plus").onclick = () => {
    adjustDraftSetting("customActionBombInterval", 1);
  };
  document.getElementById("btn-bomb-interval-minus").onclick = () => {
    adjustDraftSetting("customActionBombInterval", -1);
  };
  document.getElementById("btn-bomb-damage-plus").onclick = () => {
    adjustDraftSetting("customActionBombDamage", 1);
  };
  document.getElementById("btn-bomb-damage-minus").onclick = () => {
    adjustDraftSetting("customActionBombDamage", -1);
  };
  document.getElementById("btn-bomb-range-plus").onclick = () => {
    adjustDraftSetting("customActionBombRadius", 1);
  };
  document.getElementById("btn-bomb-range-minus").onclick = () => {
    adjustDraftSetting("customActionBombRadius", -1);
  };
  document.getElementById("btn-hp-plus").onclick = () => {
    adjustDraftSetting("customTankerHp", 1);
  };
  document.getElementById("btn-hp-minus").onclick = () => {
    adjustDraftSetting("customTankerHp", -1);
  };
  document.getElementById("btn-diff-plus").onclick = () => {
    adjustDraftSetting("customDifficulty", 1);
  };
  document.getElementById("btn-diff-minus").onclick = () => {
    adjustDraftSetting("customDifficulty", -1);
  };
  document.getElementById("btn-monster-speed-plus").onclick = () => {
    adjustDraftSetting("customMonsterSpeed", 1);
  };
  document.getElementById("btn-monster-speed-minus").onclick = () => {
    adjustDraftSetting("customMonsterSpeed", -1);
  };
  document.getElementById("btn-start-game").onclick = handleStartGameRequest;
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
    runWithAuthenticatedPlayer(() => startGame(gameMode));
  document.getElementById("btn-restart-win").onclick = () => {
    runWithAuthenticatedPlayer(() => {
      if (gameMode === "STORY" && currentStage < 3) {
        currentStage++;
        showStorySynopsis();
      } else startGame(gameMode);
    });
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
  renderBombHudIcon();
  renderSettingsFabIcon();
  currentUser = null;
  renderCurrentUser();
  updateThemePresentation();
  updateCursorPresentation();
  updateLeaderboardVisibility();
  updateIntroStartModeHint();
  renderSettingsModal(syncConfiguredStartMode(getCurrentSettingsSnapshot()));
  updateActionBombHud();
  if (showLeaderboard) void fetchLeaderboard();
  requestAnimationFrame(gameLoop);
};
