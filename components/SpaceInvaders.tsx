"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/* ============================================================
   SPACE INVADERS — pixel-art HTML5 canvas implementation.
   - Endless waves with rising difficulty.
   - Keyboard (arrows + space) and touch controls.
   - localStorage high-score persistence.
   ============================================================ */

// Logical canvas resolution. The DOM element scales up via CSS with
// `image-rendering: pixelated` so the chunky pixels stay crisp.
const CANVAS_W = 800;
const CANVAS_H = 600;

const PLAYER_SCALE = 4;
const ALIEN_SCALE = 3;
const BULLET_W = 4;
const BULLET_H = 14;

// Sprite data: 1 = filled pixel, 0 = transparent. Drawn via drawSprite().
type SpriteGrid = number[][];
const S = (rows: string[]): SpriteGrid =>
  rows.map((r) => r.split("").map((c) => (c === "X" ? 1 : 0)));

const PLAYER: SpriteGrid = S([
  "....X....",
  "....X....",
  "...XXX...",
  ".XXXXXXX.",
  "XXXXXXXXX",
  "XXXXXXXXX",
  "XXXXXXXXX",
]);

const ALIEN_A_1 = S([
  "..X.....X..",
  "...X...X...",
  "..XXXXXXX..",
  ".XX.XXX.XX.",
  "XXXXXXXXXXX",
  "X.XXXXXXX.X",
  "X.X.....X.X",
  "...XX.XX...",
]);
const ALIEN_A_2 = S([
  "..X.....X..",
  "X..X...X..X",
  "X.XXXXXXX.X",
  "XXX.XXX.XXX",
  "XXXXXXXXXXX",
  ".XXXXXXXXX.",
  "..X.....X..",
  ".X.......X.",
]);

const ALIEN_B_1 = S([
  "...XX...",
  "..XXXX..",
  ".XXXXXX.",
  "XX.XX.XX",
  "XXXXXXXX",
  ".X.XX.X.",
  "X......X",
  ".X....X.",
]);
const ALIEN_B_2 = S([
  "...XX...",
  "..XXXX..",
  ".XXXXXX.",
  "XX.XX.XX",
  "XXXXXXXX",
  "..X..X..",
  ".X.XX.X.",
  "X.X..X.X",
]);

const ALIEN_C_1 = S([
  "..X......X..",
  "X..X....X..X",
  "X.XXXXXXXX.X",
  "XXX.XXXX.XXX",
  "XXXXXXXXXXXX",
  ".XXXXXXXXXX.",
  "..X......X..",
  ".X........X.",
]);
const ALIEN_C_2 = S([
  "..X......X..",
  "...X....X...",
  "..XXXXXXXX..",
  ".XX.XXXX.XX.",
  "XXXXXXXXXXXX",
  "X.XXXXXXXX.X",
  "X.X......X.X",
  "...XX..XX...",
]);

const EXPLOSION = S([
  ".X..X..X.",
  "X.X..X.X.",
  ".X.XX.X..",
  "XX.XXX.XX",
  ".X.XXX.X.",
  "X.XX.XX.X",
  ".X..X..X.",
]);

// Pixel-art heart used for both the lives UI (rendered as SVG in the DOM)
// and as a drop-pickup rendered directly on the canvas.
const HEART_SPRITE = S([
  ".XX.XX.",
  "XXXXXXX",
  "XXXXXXX",
  ".XXXXX.",
  "..XXX..",
  "...X...",
]);
const HEART_SCALE = 4;
const HEART_W = HEART_SPRITE[0].length * HEART_SCALE;
const HEART_H = HEART_SPRITE.length * HEART_SCALE;
const HEART_DROP_CHANCE = 0.05; // ~1 in 20 aliens drops a heart
const HEART_FALL_SPEED = 1.4; // px per frame, slow so it's catchable
const MAX_LIVES = 3;

// Miniboss — a UFO-style ship, appears at the end of every regular wave.
const MINIBOSS = S([
  "....XXXX....",
  "..XXXXXXXX..",
  ".XXXXXXXXXX.",
  "XXX.XXXX.XXX",
  "XXXXXXXXXXXX",
  ".XXXXXXXXXX.",
  "..X.X..X.X..",
  ".X.X.XX.X.X.",
]);

// Big boss — a mothership, appears at the end of every 5th wave.
const BIGBOSS = S([
  ".....XXXXXX.....",
  "...XXXXXXXXXX...",
  "..XXXXXXXXXXXX..",
  ".XX.XXXXXXXX.XX.",
  "XXXXXXXXXXXXXXXX",
  "XXX.XX.XX.XX.XXX",
  "XXXXXXXXXXXXXXXX",
  ".XXXXXXXXXXXXXX.",
  "..X.X.X..X.X.X..",
  "....XX....XX....",
]);

const MINIBOSS_SCALE = 5;
const BIGBOSS_SCALE = 6;
const MINIBOSS_W = MINIBOSS[0].length * MINIBOSS_SCALE;
const MINIBOSS_H = MINIBOSS.length * MINIBOSS_SCALE;
const BIGBOSS_W = BIGBOSS[0].length * BIGBOSS_SCALE;
const BIGBOSS_H = BIGBOSS.length * BIGBOSS_SCALE;

type AlienType = 0 | 1 | 2;
const ALIEN_FRAMES: Record<AlienType, [SpriteGrid, SpriteGrid]> = {
  0: [ALIEN_A_1, ALIEN_A_2], // top row — 30 pts
  1: [ALIEN_B_1, ALIEN_B_2], // mid rows — 20 pts
  2: [ALIEN_C_1, ALIEN_C_2], // bottom rows — 10 pts
};
const ALIEN_POINTS: Record<AlienType, number> = { 0: 30, 1: 20, 2: 10 };
const ALIEN_COLORS: Record<AlienType, string> = {
  0: "#FF5577",
  1: "#55FFCC",
  2: "#FFCC55",
};

const ALIEN_ROWS = 5;
const ALIEN_COLS = 10;

/* Alien formation patterns, one per wave (cycles after the last one).
   Each row is 10 chars. '.' = empty, '1' = top alien (30 pts),
   '2' = mid alien (20 pts), '3' = bottom alien (10 pts). The visual
   shape of each pattern is preserved in the layout so it's easy to
   tweak / add more. */
const FORMATIONS: string[][] = [
  // Wave 1: Half-size grid — easier opener (25 aliens, centered)
  [
    "...11111..",
    "...22222..",
    "...22222..",
    "...33333..",
    "...33333..",
  ],
  // Wave 2: V-Wedge — sparse, sides reach in
  [
    "1........1",
    "11......11",
    ".22....22.",
    "..2....2..",
    "...3333...",
  ],
  // Wave 3: Pyramid — front-loaded bottom
  [
    "....11....",
    "...2222...",
    "..222222..",
    ".33333333.",
    "3333333333",
  ],
  // Wave 4: Twin pillars — two groups with a corridor between
  [
    "111....111",
    "222....222",
    "222....222",
    "333....333",
    "333....333",
  ],
  // Wave 5: Diamond — flank threat on the wings
  [
    "....11....",
    "..222222..",
    ".22222222.",
    "..333333..",
    "....33....",
  ],
  // Wave 6: Plus — central column + wide horizontal bands
  [
    "....22....",
    "....22....",
    "1111221111",
    "3333223333",
    "....33....",
  ],
];

function getFormation(waveNum: number): string[] {
  return FORMATIONS[(waveNum - 1) % FORMATIONS.length];
}

// Width of each alien in canvas pixels — varies by type because the sprite
// grids have different column counts. We compute it from the sprite at draw
// time too, but pre-storing makes the gameplay code cleaner.
const ALIEN_W: Record<AlienType, number> = {
  0: ALIEN_A_1[0].length * ALIEN_SCALE,
  1: ALIEN_B_1[0].length * ALIEN_SCALE,
  2: ALIEN_C_1[0].length * ALIEN_SCALE,
};
const ALIEN_H = ALIEN_A_1.length * ALIEN_SCALE; // all rows same height

const PLAYER_W = PLAYER[0].length * PLAYER_SCALE;
const PLAYER_H = PLAYER.length * PLAYER_SCALE;
const PLAYER_Y = CANVAS_H - PLAYER_H - 40;

const COLUMN_STRIDE = ALIEN_W[0] + 16; // horizontal spacing per column
const ROW_STRIDE = ALIEN_H + 12;

interface Alien {
  x: number;
  y: number;
  type: AlienType;
  alive: boolean;
  col: number;
}
interface Bullet {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

type BossType = "mini" | "big";

interface Pickup {
  type: "heart";
  x: number;
  y: number;
  vy: number;
  /* Frame at which the pickup spawned, used to animate a subtle twinkle. */
  spawnedFrame: number;
}

interface BossState {
  type: BossType;
  x: number;
  y: number;
  baseY: number;
  vx: number;
  hp: number;
  maxHp: number;
  patternIndex: number;
  // performance.now() timestamps — time-based so timings don't accelerate on
  // 120/144 Hz displays where requestAnimationFrame ticks faster than 60fps.
  nextAttackAt: number;
  rapidFireUntil: number; // when the big-boss rapid burst ends (0 = not bursting)
  rapidFireLastShotAt: number; // last shot fired within the current burst
  flashFrames: number; // visual flash after taking a hit (small, OK to stay frame-based)
  defeatedAt: number; // frame number when HP hit zero, used for exit timing
}
interface Explosion {
  x: number;
  y: number;
  framesLeft: number;
  color: string;
}

type GameStatus = "menu" | "playing" | "gameOver";
type GamePhase = "aliens" | "boss" | "transitioning";

interface GameRefState {
  player: { x: number };
  aliens: Alien[];
  bullets: Bullet[];
  alienBullets: Bullet[];
  explosions: Explosion[];
  keys: Set<string>;
  alienDir: 1 | -1;
  alienMoveTicks: number;
  spriteFrame: 0 | 1;
  invulnUntil: number;
  frame: number;
  waveComplete: boolean;
  flashUntil: number;
  // Total aliens that started this wave — used to compute the speed-up
  // factor as their numbers thin. Set per-wave because formations vary.
  waveInitialCount: number;
  // Phase machine: "aliens" → "boss" → "transitioning" → next wave.
  phase: GamePhase;
  boss: BossState | null;
  // Power-ups granted by defeated bosses. Persist between lives within a run;
  // reset on full game over.
  cannons: number; // 1..MAX_CANNONS
  rapidFire: boolean;
  lastShotFrame: number;
  // Heart drops floating down toward the player.
  pickups: Pickup[];
}

const MAX_CANNONS = 5;
const RAPID_FIRE_MAX_VOLLEYS = 4;
const RAPID_FIRE_COOLDOWN_FRAMES = 6;

const HIGH_SCORE_KEY = "gf:invaders:highscore";

function drawSprite(
  ctx: CanvasRenderingContext2D,
  sprite: SpriteGrid,
  x: number,
  y: number,
  scale: number,
  color: string,
) {
  ctx.fillStyle = color;
  for (let r = 0; r < sprite.length; r++) {
    const row = sprite[r];
    for (let c = 0; c < row.length; c++) {
      if (row[c]) {
        ctx.fillRect(x + c * scale, y + r * scale, scale, scale);
      }
    }
  }
}

// ─── Boss attack-pattern helpers ─────────────────────────────────────────
// All take the live boss + the array to push into so they can be called
// straight from the game loop without setState.

function fireBossAimed(
  boss: BossState,
  playerX: number,
  bullets: Bullet[],
  bossW: number,
  bossH: number,
) {
  const speed = 3.4;
  const cx = boss.x + bossW / 2;
  const cy = boss.y + bossH;
  const tx = playerX + PLAYER_W / 2;
  const ty = PLAYER_Y;
  const dx = tx - cx;
  const dy = ty - cy;
  const len = Math.hypot(dx, dy) || 1;
  bullets.push({
    x: cx - BULLET_W / 2,
    y: cy,
    vx: (dx / len) * speed,
    vy: (dy / len) * speed,
  });
}

function fireBossFan(
  boss: BossState,
  bullets: Bullet[],
  bossW: number,
  bossH: number,
) {
  const numBullets = 5;
  const speed = 2.9;
  const spreadRad = (Math.PI / 180) * 70; // 70° total spread
  const cx = boss.x + bossW / 2;
  const cy = boss.y + bossH;
  for (let i = 0; i < numBullets; i++) {
    const t = i / (numBullets - 1) - 0.5; // -0.5..+0.5
    const angle = Math.PI / 2 + t * spreadRad;
    bullets.push({
      x: cx - BULLET_W / 2,
      y: cy,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
    });
  }
}

function fireBossWall(
  boss: BossState,
  bullets: Bullet[],
  bossW: number,
  bossH: number,
) {
  const numBullets = 7;
  const horizSpread = 260;
  const cx = boss.x + bossW / 2;
  const cy = boss.y + bossH;
  for (let i = 0; i < numBullets; i++) {
    const t = i / (numBullets - 1) - 0.5;
    bullets.push({
      x: cx + t * horizSpread - BULLET_W / 2,
      y: cy,
      vx: 0,
      vy: 2.7,
    });
  }
}

// Quick stable pseudo-random star field — same dots every render.
const STARS = (() => {
  const out: { x: number; y: number; s: number }[] = [];
  let seed = 91;
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  for (let i = 0; i < 60; i++) {
    out.push({ x: rand() * CANVAS_W, y: rand() * CANVAS_H, s: rand() > 0.85 ? 2 : 1 });
  }
  return out;
})();

export default function SpaceInvaders() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState<GameStatus>("menu");
  const [score, setScore] = useState(0);
  const [wave, setWave] = useState(1);
  const [lives, setLives] = useState(3);
  const [highScore, setHighScore] = useState(0);
  const [newHighScore, setNewHighScore] = useState(false);
  // When non-null, a "Wave N" overlay flashes on top of the canvas. Set on
  // wave clear, cleared after the announcement timeout fires.
  const [waveAnnounce, setWaveAnnounce] = useState<number | null>(null);
  // When non-null, a smaller "reward" banner shows what you got after a boss.
  const [rewardAnnounce, setRewardAnnounce] = useState<string | null>(null);
  // When non-null, flashes "Miniboss!" or "Big Boss!" right before the boss arrives.
  const [bossAnnounce, setBossAnnounce] = useState<BossType | null>(null);
  // Mirror cannons + rapidFire as React state so the HUD can show them.
  const [cannons, setCannons] = useState(1);
  const [rapidFire, setRapidFire] = useState(false);
  // Timestamp when the current game-over screen appeared. Keyboard restart is
  // ignored until this much time has passed — so a player holding the fire
  // key when they die doesn't auto-restart instantly.
  const gameOverAtRef = useRef(0);
  const GAME_OVER_RESTART_LOCK_MS = 1500;

  // Per-frame game state lives in a ref so we don't trigger React renders
  // for every alien move / bullet update.
  const refState = useRef<GameRefState>({
    player: { x: CANVAS_W / 2 - PLAYER_W / 2 },
    aliens: [],
    bullets: [],
    alienBullets: [],
    explosions: [],
    keys: new Set(),
    alienDir: 1,
    alienMoveTicks: 0,
    spriteFrame: 0,
    invulnUntil: 0,
    frame: 0,
    waveComplete: false,
    flashUntil: 0,
    waveInitialCount: 0,
    phase: "aliens",
    boss: null,
    cannons: 1,
    rapidFire: false,
    lastShotFrame: -100,
    pickups: [],
  });

  // Mirror lives in a ref so the game loop can read the current value without
  // being keyed on the React state (which would re-create the loop every hit).
  const livesRef = useRef(3);

  const initWave = useCallback((waveNum: number) => {
    const aliens: Alien[] = [];
    const formation = getFormation(waveNum);
    const startX = 70;
    const startY = 60;
    for (let r = 0; r < formation.length; r++) {
      const row = formation[r];
      for (let c = 0; c < row.length; c++) {
        const cell = row[c];
        if (cell === "." || cell === " ") continue;
        // '1' → type 0 (top, 30 pts), '2' → type 1 (mid, 20 pts), '3' → type 2 (bottom, 10 pts)
        const type = (parseInt(cell, 10) - 1) as AlienType;
        aliens.push({
          x: startX + c * COLUMN_STRIDE,
          y: startY + r * ROW_STRIDE,
          type,
          alive: true,
          col: c,
        });
      }
    }
    const s = refState.current;
    s.aliens = aliens;
    s.alienDir = 1;
    s.alienMoveTicks = 0;
    s.alienBullets = [];
    s.bullets = [];
    s.explosions = [];
    s.pickups = [];
    s.waveComplete = false;
    s.spriteFrame = 0;
    s.waveInitialCount = aliens.length;
    s.player.x = CANVAS_W / 2 - PLAYER_W / 2;
    s.phase = "aliens";
    s.boss = null;
  }, []);

  const startGame = useCallback(() => {
    setScore(0);
    setWave(1);
    setLives(3);
    setNewHighScore(false);
    setWaveAnnounce(null);
    setRewardAnnounce(null);
    setCannons(1);
    setRapidFire(false);
    livesRef.current = 3;
    // Power-ups reset on full restart, not on individual deaths.
    refState.current.cannons = 1;
    refState.current.rapidFire = false;
    refState.current.lastShotFrame = -100;
    initWave(1);
    setStatus("playing");
  }, [initWave]);

  // Load saved high score on mount.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(HIGH_SCORE_KEY);
      if (saved) setHighScore(parseInt(saved, 10) || 0);
    } catch {
      /* ignore */
    }
  }, []);

  // Persist high score when a new one is set, and stamp the moment the
  // game-over screen appeared (used to gate keyboard restart below).
  useEffect(() => {
    if (status === "gameOver") {
      gameOverAtRef.current = Date.now();
      setWaveAnnounce(null);
      setBossAnnounce(null);
      setRewardAnnounce(null);
      if (score > highScore) {
        setHighScore(score);
        setNewHighScore(true);
        try {
          localStorage.setItem(HIGH_SCORE_KEY, String(score));
        } catch {
          /* ignore */
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  // Keyboard listeners — always active so menu/game-over screens can also
  // listen for Enter/Space to start.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const k = e.key;
      if (
        k === "ArrowLeft" ||
        k === "ArrowRight" ||
        k === " " ||
        k === "a" ||
        k === "d"
      ) {
        e.preventDefault();
      }
      refState.current.keys.add(k);

      // Allow keyboard restart, but ignore auto-repeat (so a held space key
      // doesn't fire startGame multiple times) and impose a short cooldown
      // after game over so the player gets a beat to read the screen.
      if (
        (k === "Enter" || k === " ") &&
        status !== "playing" &&
        !e.repeat
      ) {
        if (
          status === "gameOver" &&
          Date.now() - gameOverAtRef.current < GAME_OVER_RESTART_LOCK_MS
        ) {
          return;
        }
        startGame();
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      refState.current.keys.delete(e.key);
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [status, startGame]);

  // ───────── game loop ─────────
  useEffect(() => {
    if (status !== "playing") return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    const s = refState.current;

    const loop = () => {
      s.frame++;
      const currentWave = wave;

      // ───── update player ─────
      let vx = 0;
      if (s.keys.has("ArrowLeft") || s.keys.has("a") || s.keys.has("A")) vx -= 2.5;
      if (s.keys.has("ArrowRight") || s.keys.has("d") || s.keys.has("D")) vx += 2.5;
      s.player.x = Math.max(8, Math.min(CANVAS_W - PLAYER_W - 8, s.player.x + vx));

      // ───── shoot ─────
      // One "shot" fires N parallel bullets (one per cannon, evenly spaced
      // across the player width). Without rapid-fire, only one volley can be
      // on screen at a time. With rapid-fire, up to RAPID_FIRE_MAX_VOLLEYS
      // volleys, throttled by a small cooldown between them.
      const firePressed =
        s.keys.has(" ") || s.keys.has("Space") || s.keys.has("Fire");
      const volleysOnScreen = Math.ceil(s.bullets.length / Math.max(1, s.cannons));
      const maxVolleys = s.rapidFire ? RAPID_FIRE_MAX_VOLLEYS : 1;
      const cooldownReady = s.rapidFire
        ? s.frame - s.lastShotFrame >= RAPID_FIRE_COOLDOWN_FRAMES
        : true;
      if (firePressed && volleysOnScreen < maxVolleys && cooldownReady) {
        const n = s.cannons;
        const spacing = (PLAYER_W - 8) / n;
        for (let i = 0; i < n; i++) {
          const cx = s.player.x + 4 + spacing * (i + 0.5);
          s.bullets.push({
            x: cx - BULLET_W / 2,
            y: PLAYER_Y - BULLET_H,
            vx: 0,
            vy: -6,
          });
        }
        s.lastShotFrame = s.frame;
      }

      // ───── bullets ─────
      s.bullets = s.bullets.filter((b) => {
        b.x += b.vx;
        b.y += b.vy;
        return b.y > -BULLET_H && b.x > -20 && b.x < CANVAS_W + 20;
      });
      s.alienBullets = s.alienBullets.filter((b) => {
        b.x += b.vx;
        b.y += b.vy;
        return (
          b.y < CANVAS_H + BULLET_H && b.x > -20 && b.x < CANVAS_W + 20
        );
      });

      // ───── move aliens ─────
      const aliveAliens = s.aliens.filter((a) => a.alive);
      const totalAliens = Math.max(1, s.waveInitialCount);
      // Aliens speed up as their numbers thin and as waves progress.
      const killedFraction = 1 - aliveAliens.length / totalAliens;
      const baseInterval = Math.max(6, 30 - (currentWave - 1) * 3);
      const moveInterval = Math.max(
        4,
        Math.floor(baseInterval * (1 - killedFraction * 0.7)),
      );

      s.alienMoveTicks++;
      if (s.alienMoveTicks >= moveInterval && aliveAliens.length > 0) {
        s.alienMoveTicks = 0;
        s.spriteFrame = s.spriteFrame === 0 ? 1 : 0;

        const step = 10;
        let willHitEdge = false;
        for (const a of aliveAliens) {
          const newX = a.x + s.alienDir * step;
          if (newX < 8 || newX + ALIEN_W[a.type] > CANVAS_W - 8) {
            willHitEdge = true;
            break;
          }
        }

        if (willHitEdge) {
          s.alienDir = (s.alienDir * -1) as 1 | -1;
          for (const a of s.aliens) {
            if (a.alive) a.y += 16;
          }
        } else {
          for (const a of s.aliens) {
            if (a.alive) a.x += s.alienDir * step;
          }
        }

        // Alien firing — pick a random column, fire from its lowest alien.
        const shootChance = 0.18 + (currentWave - 1) * 0.05;
        if (Math.random() < shootChance) {
          const lowestPerCol = new Map<number, Alien>();
          for (const a of s.aliens) {
            if (!a.alive) continue;
            const cur = lowestPerCol.get(a.col);
            if (!cur || a.y > cur.y) lowestPerCol.set(a.col, a);
          }
          const shooters = Array.from(lowestPerCol.values());
          if (shooters.length > 0) {
            const shooter = shooters[Math.floor(Math.random() * shooters.length)];
            s.alienBullets.push({
              x: shooter.x + ALIEN_W[shooter.type] / 2 - BULLET_W / 2,
              y: shooter.y + ALIEN_H,
              vx: 0,
              vy: 2.5 + (currentWave - 1) * 0.3,
            });
          }
        }
      }

      // ───── collisions: player bullet vs aliens ─────
      for (const b of s.bullets) {
        for (const a of s.aliens) {
          if (!a.alive) continue;
          const aw = ALIEN_W[a.type];
          if (
            b.x < a.x + aw &&
            b.x + BULLET_W > a.x &&
            b.y < a.y + ALIEN_H &&
            b.y + BULLET_H > a.y
          ) {
            a.alive = false;
            b.y = -9999;
            const pts = ALIEN_POINTS[a.type];
            setScore((prev) => prev + pts);
            s.explosions.push({
              x: a.x + aw / 2 - (EXPLOSION[0].length * ALIEN_SCALE) / 2,
              y: a.y + ALIEN_H / 2 - (EXPLOSION.length * ALIEN_SCALE) / 2,
              framesLeft: 18,
              color: ALIEN_COLORS[a.type],
            });
            // Rare heart drop — drifts down from where the alien died.
            if (Math.random() < HEART_DROP_CHANCE) {
              s.pickups.push({
                type: "heart",
                x: a.x + aw / 2 - HEART_W / 2,
                y: a.y + ALIEN_H / 2 - HEART_H / 2,
                vy: HEART_FALL_SPEED,
                spawnedFrame: s.frame,
              });
            }
            break;
          }
        }
      }
      s.bullets = s.bullets.filter((b) => b.y > -1000);

      // ───── pickups: drift down, check catch, drop off-screen ─────
      s.pickups = s.pickups.filter((p) => {
        p.y += p.vy;
        // Off-bottom → discard
        if (p.y > CANVAS_H + HEART_H) return false;
        // Caught by player?
        const caught =
          p.x < s.player.x + PLAYER_W &&
          p.x + HEART_W > s.player.x &&
          p.y < PLAYER_Y + PLAYER_H &&
          p.y + HEART_H > PLAYER_Y;
        if (caught) {
          if (livesRef.current < MAX_LIVES) {
            livesRef.current += 1;
            setLives(livesRef.current);
            setRewardAnnounce("+1 HP");
          } else {
            // Already at full HP — small score bonus instead.
            setScore((prev) => prev + 75);
            setRewardAnnounce("FULL HP · +75");
          }
          // small pink explosion at the catch point
          s.explosions.push({
            x: p.x + HEART_W / 2 - (EXPLOSION[0].length * ALIEN_SCALE) / 2,
            y: p.y + HEART_H / 2 - (EXPLOSION.length * ALIEN_SCALE) / 2,
            framesLeft: 14,
            color: "#FF99BB",
          });
          window.setTimeout(() => setRewardAnnounce(null), 1500);
          return false;
        }
        return true;
      });

      // ───── collisions: alien bullet vs player ─────
      if (s.frame > s.invulnUntil) {
        const px = s.player.x;
        const hit = s.alienBullets.find(
          (b) =>
            b.x < px + PLAYER_W &&
            b.x + BULLET_W > px &&
            b.y < PLAYER_Y + PLAYER_H &&
            b.y + BULLET_H > PLAYER_Y,
        );
        if (hit) {
          s.alienBullets = s.alienBullets.filter((b) => b !== hit);
          s.invulnUntil = s.frame + 90; // ~1.5s invuln
          s.flashUntil = s.frame + 30;
          s.explosions.push({
            x: px + PLAYER_W / 2 - (EXPLOSION[0].length * ALIEN_SCALE) / 2,
            y: PLAYER_Y + PLAYER_H / 2 - (EXPLOSION.length * ALIEN_SCALE) / 2,
            framesLeft: 30,
            color: "#FFFFFF",
          });
          livesRef.current -= 1;
          setLives(livesRef.current);
          if (livesRef.current <= 0) setStatus("gameOver");
        }
      }

      // ───── aliens reach the bottom = game over (only during aliens phase) ─────
      if (s.phase === "aliens") {
        const reachedBottom = aliveAliens.some(
          (a) => a.y + ALIEN_H >= PLAYER_Y,
        );
        if (reachedBottom) setStatus("gameOver");
      }

      // ───── aliens cleared → transition to boss phase ─────
      if (
        s.phase === "aliens" &&
        aliveAliens.length === 0 &&
        !s.waveComplete
      ) {
        s.waveComplete = true;
        // Brief beat for the last alien explosion to fade, then spawn the boss.
        window.setTimeout(() => {
          if (
            refState.current.phase === "aliens" &&
            refState.current.waveComplete
          ) {
            const isBig = currentWave % 5 === 0;
            const type: BossType = isBig ? "big" : "mini";
            const bossW = isBig ? BIGBOSS_W : MINIBOSS_W;
            const maxHp = isBig
              ? 25 + currentWave * 5
              : 5 + currentWave * 3;
            refState.current.boss = {
              type,
              x: CANVAS_W / 2 - bossW / 2,
              y: 70,
              baseY: 70,
              vx: isBig ? 1.1 : 1.7,
              hp: maxHp,
              maxHp,
              patternIndex: 0,
              // Hold fire long enough for the announcement banner (1.3s) to
              // fully clear, plus a 0.7s buffer. Time-based so 120/144 Hz
              // displays don't accelerate the wait.
              nextAttackAt: performance.now() + 2000,
              rapidFireUntil: 0,
              rapidFireLastShotAt: 0,
              flashFrames: 0,
              defeatedAt: 0,
            };
            refState.current.phase = "boss";
            refState.current.alienBullets = [];
            refState.current.bullets = [];
            setBossAnnounce(type);
            window.setTimeout(() => setBossAnnounce(null), 1300);
          }
        }, 600);
      }

      // ───── boss phase: movement, attacks, collisions, defeat ─────
      if (s.phase === "boss" && s.boss) {
        const b = s.boss;
        const bossW = b.type === "big" ? BIGBOSS_W : MINIBOSS_W;
        const bossH = b.type === "big" ? BIGBOSS_H : MINIBOSS_H;

        if (b.defeatedAt === 0) {
          // movement — side-to-side with sinusoidal vertical bob
          b.x += b.vx;
          if (b.x < 20) {
            b.x = 20;
            b.vx = Math.abs(b.vx);
          }
          if (b.x + bossW > CANVAS_W - 20) {
            b.x = CANVAS_W - bossW - 20;
            b.vx = -Math.abs(b.vx);
          }
          b.y = b.baseY + Math.sin(s.frame * 0.04) * 8;

          // attack — cycle through patterns (time-based so display refresh
          // rate doesn't change the cadence)
          const now = performance.now();
          if (b.rapidFireUntil > 0 && now < b.rapidFireUntil) {
            // Big-boss rapid burst — fire an aimed shot every 90ms
            if (now - b.rapidFireLastShotAt >= 90) {
              fireBossAimed(b, s.player.x, s.alienBullets, bossW, bossH);
              b.rapidFireLastShotAt = now;
            }
          } else {
            if (b.rapidFireUntil > 0 && now >= b.rapidFireUntil) {
              // Just finished a burst — schedule the next pattern with the
              // normal cooldown gap.
              b.rapidFireUntil = 0;
              b.nextAttackAt = now + (b.type === "big" ? 1150 : 1550);
            }
            if (now >= b.nextAttackAt) {
              const numPatterns = b.type === "big" ? 4 : 3;
              const pat = b.patternIndex;
              if (pat === 0) fireBossAimed(b, s.player.x, s.alienBullets, bossW, bossH);
              else if (pat === 1) fireBossFan(b, s.alienBullets, bossW, bossH);
              else if (pat === 2) fireBossWall(b, s.alienBullets, bossW, bossH);
              else if (pat === 3) {
                b.rapidFireUntil = now + 500; // 0.5s of rapid fire
                b.rapidFireLastShotAt = 0;
              }
              b.patternIndex = (b.patternIndex + 1) % numPatterns;
              // Big boss attacks faster than the miniboss. Minibosses also
              // ramp up their fire rate as they lose HP — at full HP the gap
              // is the full ~1.55s, dropping toward 0.7s when they're nearly
              // dead. Each point of HP lost shortens the cooldown a little.
              if (b.type === "big") {
                b.nextAttackAt = now + 1150;
              } else {
                const baseGap = 1550;
                const minGap = 700;
                const hpLost = b.maxHp - b.hp;
                const stepReduction = (baseGap - minGap) / Math.max(1, b.maxHp);
                const gap = Math.max(minGap, baseGap - hpLost * stepReduction);
                b.nextAttackAt = now + gap;
              }
            }
          }

          if (b.flashFrames > 0) b.flashFrames--;

          // player bullets vs boss
          for (const bullet of s.bullets) {
            if (
              bullet.x < b.x + bossW &&
              bullet.x + BULLET_W > b.x &&
              bullet.y < b.y + bossH &&
              bullet.y + BULLET_H > b.y
            ) {
              b.hp -= 1;
              b.flashFrames = 6;
              bullet.y = -9999; // mark for removal
            }
          }
          s.bullets = s.bullets.filter((bb) => bb.y > -1000);

          // boss defeated?
          if (b.hp <= 0) {
            b.defeatedAt = s.frame;
            // Show a big explosion at the boss center.
            s.explosions.push({
              x: b.x + bossW / 2 - (EXPLOSION[0].length * ALIEN_SCALE) / 2,
              y: b.y + bossH / 2 - (EXPLOSION.length * ALIEN_SCALE) / 2,
              framesLeft: 40,
              color: "#FFFFFF",
            });
            // Score reward
            setScore((prev) => prev + (b.type === "big" ? 500 : 150));

            // Power-up reward
            if (b.type === "mini") {
              const next = Math.min(MAX_CANNONS, s.cannons + 1);
              if (next > s.cannons) {
                s.cannons = next;
                setCannons(next);
                setRewardAnnounce(`+1 CANNON — total ${next}`);
              } else {
                setScore((prev) => prev + 200);
                setRewardAnnounce(`CANNONS MAXED · +200`);
              }
            } else {
              if (!s.rapidFire) {
                s.rapidFire = true;
                setRapidFire(true);
                setRewardAnnounce(`RAPID FIRE UNLOCKED`);
              } else {
                setScore((prev) => prev + 500);
                setRewardAnnounce(`VETERAN BONUS · +500`);
              }
            }
            window.setTimeout(() => setRewardAnnounce(null), 2400);
          }
        } else {
          // Boss already defeated — give the explosion time to play,
          // then transition to the next wave.
          if (s.frame - b.defeatedAt > 80 && s.phase === "boss") {
            const nextWave = currentWave + 1;
            s.phase = "transitioning";
            s.boss = null;
            s.alienBullets = [];
            s.bullets = [];
            setWave(nextWave);
            window.setTimeout(() => {
              setWaveAnnounce(nextWave);
              window.setTimeout(() => {
                setWaveAnnounce(null);
                if (refState.current.phase === "transitioning") {
                  initWave(nextWave);
                }
              }, 1400);
            }, 200);
          }
        }
      }

      // ───── explosions tick down ─────
      s.explosions = s.explosions
        .map((e) => ({ ...e, framesLeft: e.framesLeft - 1 }))
        .filter((e) => e.framesLeft > 0);

      // ─────────── RENDER ───────────
      ctx.fillStyle = "#06060f";
      ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

      // stars
      ctx.fillStyle = "#FFFFFF";
      for (const st of STARS) ctx.fillRect(st.x, st.y, st.s, st.s);

      // aliens
      for (const a of s.aliens) {
        if (!a.alive) continue;
        const sprite = ALIEN_FRAMES[a.type][s.spriteFrame];
        drawSprite(ctx, sprite, a.x, a.y, ALIEN_SCALE, ALIEN_COLORS[a.type]);
      }

      // boss + HP bar
      if (s.boss && s.boss.defeatedAt === 0) {
        const b = s.boss;
        const sprite = b.type === "big" ? BIGBOSS : MINIBOSS;
        const scale = b.type === "big" ? BIGBOSS_SCALE : MINIBOSS_SCALE;
        const bossW = b.type === "big" ? BIGBOSS_W : MINIBOSS_W;
        const baseColor = b.type === "big" ? "#FF55AA" : "#C97BFF";
        const color = b.flashFrames > 0 ? "#FFFFFF" : baseColor;
        drawSprite(ctx, sprite, b.x, b.y, scale, color);

        // HP bar — sits above the boss sprite
        const barX = b.x;
        const barY = b.y - 18;
        const barW = bossW;
        const barH = 8;
        ctx.fillStyle = "rgba(0, 0, 0, 0.55)";
        ctx.fillRect(barX, barY, barW, barH);
        const hpPct = Math.max(0, b.hp / b.maxHp);
        const hpColor =
          hpPct > 0.6 ? "#5DFC5D" : hpPct > 0.3 ? "#F2C568" : "#FF5577";
        ctx.fillStyle = hpColor;
        ctx.fillRect(barX, barY, barW * hpPct, barH);
        ctx.strokeStyle = "rgba(255,255,255,0.7)";
        ctx.lineWidth = 1;
        ctx.strokeRect(barX + 0.5, barY + 0.5, barW - 1, barH - 1);
      }

      // player (blink while invulnerable)
      const blink = s.frame < s.invulnUntil && Math.floor(s.frame / 5) % 2 === 0;
      if (!blink) {
        drawSprite(ctx, PLAYER, s.player.x, PLAYER_Y, PLAYER_SCALE, "#5DFC5D");
      }

      // bullets
      ctx.fillStyle = "#FFFFFF";
      for (const b of s.bullets) ctx.fillRect(b.x, b.y, BULLET_W, BULLET_H);
      ctx.fillStyle = "#FF9A55";
      for (const b of s.alienBullets) ctx.fillRect(b.x, b.y, BULLET_W, BULLET_H);

      // heart pickups — twinkle by alternating between two pinks every 8 frames
      for (const p of s.pickups) {
        const twinkle = Math.floor((s.frame - p.spawnedFrame) / 8) % 2 === 0;
        const color = twinkle ? "#FF5577" : "#FF99BB";
        drawSprite(ctx, HEART_SPRITE, p.x, p.y, HEART_SCALE, color);
      }

      // explosions
      for (const e of s.explosions) {
        drawSprite(ctx, EXPLOSION, e.x, e.y, ALIEN_SCALE, e.color);
      }

      // damage flash
      if (s.frame < s.flashUntil) {
        ctx.fillStyle = `rgba(255, 60, 60, ${(s.flashUntil - s.frame) / 30 * 0.35})`;
        ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
      }

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [status, wave, initWave]);

  // ───────── touch controls ─────────
  const pressKey = (key: string) => {
    refState.current.keys.add(key);
  };
  const releaseKey = (key: string) => {
    refState.current.keys.delete(key);
  };

  return (
    <div className="invaders">
      <div className="invaders-stage">
        <canvas
          ref={canvasRef}
          width={CANVAS_W}
          height={CANVAS_H}
          className="invaders-canvas"
        />

        {status === "playing" && (
          <>
            <div className="onscreen-score" aria-label={`Score ${score}`}>
              <span className="onscreen-label">Score</span>
              <span className="onscreen-value">
                {score.toString().padStart(4, "0")}
              </span>
            </div>
            <div className="onscreen-wave" aria-label={`Wave ${wave}`}>
              <span className="onscreen-label">Wave</span>
              <span className="onscreen-value">{wave}</span>
            </div>
            <div className="onscreen-hi" aria-label={`High score ${highScore}`}>
              <span className="onscreen-label">Hi-score</span>
              <span className="onscreen-value">
                {highScore.toString().padStart(4, "0")}
              </span>
            </div>
            <div className="onscreen-lives" aria-label={`Lives: ${lives}`}>
              {Array.from({ length: 3 }).map((_, i) => (
                <svg
                  key={i}
                  className={`onscreen-heart ${i < lives ? "is-on" : "is-gone"}`}
                  viewBox="0 0 7 6"
                  shapeRendering="crispEdges"
                  aria-hidden="true"
                >
                  <g fill="currentColor">
                    {/* Classic 8-bit heart sprite, 7×6 pixel grid. */}
                    <rect x="1" y="0" width="2" height="1" />
                    <rect x="4" y="0" width="2" height="1" />
                    <rect x="0" y="1" width="7" height="1" />
                    <rect x="0" y="2" width="7" height="1" />
                    <rect x="1" y="3" width="5" height="1" />
                    <rect x="2" y="4" width="3" height="1" />
                    <rect x="3" y="5" width="1" height="1" />
                  </g>
                </svg>
              ))}
            </div>
            <div className="onscreen-cannons" aria-label={`Cannons ${cannons} of ${MAX_CANNONS}`}>
              <span className="onscreen-label">Cannons</span>
              <span className="onscreen-cannon-dots">
                {Array.from({ length: MAX_CANNONS }).map((_, i) => (
                  <span
                    key={i}
                    className={`onscreen-cannon-dot ${i < cannons ? "is-on" : ""}`}
                    aria-hidden="true"
                  />
                ))}
              </span>
              {rapidFire && (
                <span className="onscreen-rapidfire" title="Rapid fire unlocked">
                  ⚡ RF
                </span>
              )}
            </div>
          </>
        )}

        {waveAnnounce !== null && status === "playing" && (
          <div className="invaders-wave-announce" key={waveAnnounce}>
            <span className="wave-announce-label">Wave</span>
            <span className="wave-announce-num">{waveAnnounce}</span>
            <span className="wave-announce-sub">Incoming…</span>
          </div>
        )}

        {bossAnnounce !== null && status === "playing" && (
          <div
            className={`invaders-boss-announce ${bossAnnounce === "big" ? "is-big" : ""}`}
            key={`boss-${bossAnnounce}-${wave}`}
          >
            <span className="boss-announce-label">
              {bossAnnounce === "big" ? "Warning" : "Caution"}
            </span>
            <span className="boss-announce-title">
              {bossAnnounce === "big" ? "BIG BOSS" : "MINIBOSS"}
            </span>
            <span className="boss-announce-sub">approaching</span>
          </div>
        )}

        {rewardAnnounce !== null && status === "playing" && (
          <div className="invaders-reward-announce" key={rewardAnnounce}>
            {rewardAnnounce}
          </div>
        )}

        {status === "menu" && (
          <div className="invaders-overlay">
            <h2>Space Invaders</h2>
            <p className="invaders-hint">
              <span>← → or A / D to move</span>
              <span>Space to shoot</span>
            </p>
            <button className="invaders-cta" onClick={startGame}>
              Start
            </button>
          </div>
        )}

        {status === "gameOver" && (
          <div className="invaders-overlay">
            <h2>Game Over</h2>
            <p className="invaders-score-line">
              Final score: <strong>{score}</strong>
            </p>
            {newHighScore && <p className="invaders-record">New record!</p>}
            <button className="invaders-cta" onClick={startGame}>
              Play again
            </button>
          </div>
        )}
      </div>

      {/* Touch controls — only visible on small screens via CSS. */}
      <div className="invaders-touch" aria-hidden={status !== "playing"}>
        <button
          type="button"
          className="touch-btn touch-arrow"
          onPointerDown={(e) => {
            e.preventDefault();
            pressKey("ArrowLeft");
          }}
          onPointerUp={() => releaseKey("ArrowLeft")}
          onPointerLeave={() => releaseKey("ArrowLeft")}
          onPointerCancel={() => releaseKey("ArrowLeft")}
          aria-label="Move left"
        >
          ◀
        </button>
        <button
          type="button"
          className="touch-btn touch-fire"
          onPointerDown={(e) => {
            e.preventDefault();
            pressKey("Fire");
          }}
          onPointerUp={() => releaseKey("Fire")}
          onPointerLeave={() => releaseKey("Fire")}
          onPointerCancel={() => releaseKey("Fire")}
          aria-label="Fire"
        >
          FIRE
        </button>
        <button
          type="button"
          className="touch-btn touch-arrow"
          onPointerDown={(e) => {
            e.preventDefault();
            pressKey("ArrowRight");
          }}
          onPointerUp={() => releaseKey("ArrowRight")}
          onPointerLeave={() => releaseKey("ArrowRight")}
          onPointerCancel={() => releaseKey("ArrowRight")}
          aria-label="Move right"
        >
          ▶
        </button>
      </div>
    </div>
  );
}
