const canvas = document.getElementById("game") as HTMLCanvasElement;
const hud = document.getElementById("hud") as HTMLDivElement;
const nukeWheelSpinButton = document.getElementById("nuke-wheel-spin") as HTMLButtonElement | null;
const nukeWheelResult = document.getElementById("nuke-wheel-result") as HTMLDivElement | null;
const finish = document.getElementById("finish") as HTMLDivElement;
const finishTitle = document.querySelector("#finish h1") as HTMLHeadingElement;
const finishMessage = document.querySelector("#finish p") as HTMLParagraphElement;
const finishBackButton = document.getElementById("finish-back") as HTMLButtonElement;
const healthLabel = document.getElementById("health-label") as HTMLDivElement;
const healthFill = document.getElementById("health-fill") as HTMLDivElement;
const shopPanel = document.querySelector("aside.shop") as HTMLElement;
const spentLabel = document.getElementById("spent") as HTMLDivElement;
const buyGunButton = document.getElementById("buy-gun") as HTMLButtonElement;
const buyJetpackButton = document.getElementById("buy-jetpack") as HTMLButtonElement;
const buySpeedButton = document.getElementById("buy-speed") as HTMLButtonElement;
const mutePopupsButton = document.getElementById("mute-popups") as HTMLButtonElement;
const avatarDefaultButton = document.getElementById("avatar-default") as HTMLButtonElement;
const avatarMugaButton = document.getElementById("avatar-muga") as HTMLButtonElement;
const avatarConsoleButton = document.getElementById("avatar-console") as HTMLButtonElement;
const avatarSaveButton = document.getElementById("avatar-save") as HTMLButtonElement;
const avatarLoadButton = document.getElementById("avatar-load") as HTMLButtonElement;
const avatarStatus = document.getElementById("avatar-status") as HTMLDivElement;
const bgDefaultButton = document.getElementById("bg-default") as HTMLButtonElement;
const bgMugaButton = document.getElementById("bg-muga") as HTMLButtonElement;
const bgDarkButton = document.getElementById("bg-dark") as HTMLButtonElement;
const bgDonutButton = document.getElementById("bg-donut") as HTMLButtonElement;
const bgStatus = document.getElementById("bg-status") as HTMLDivElement;
const scamButton = document.getElementById("scam-btn") as HTMLButtonElement;
const nukeButton = document.getElementById("nuke-btn") as HTMLButtonElement;
const donatePopup = document.getElementById("donate-popup") as HTMLDivElement;
const donateCloseButton = document.getElementById("donate-close") as HTMLButtonElement;
const donateOptionButtons = Array.from(document.querySelectorAll(".donate-option")) as HTMLButtonElement[];
const robuxPopup = document.getElementById("robux-popup") as HTMLDivElement | null;
const robuxBuyButton = document.getElementById("robux-buy") as HTMLButtonElement | null;
const robuxCloseButton = document.getElementById("robux-close") as HTMLButtonElement | null;
const annoyPopup = document.getElementById("annoy-popup") as HTMLDivElement | null;
const annoyCloseButton = document.getElementById("annoy-close") as HTMLButtonElement | null;
const loadingOverlay = document.getElementById("loading-overlay") as HTMLDivElement | null;
const loadingFill = document.getElementById("loading-fill") as HTMLDivElement | null;
const loadingText = document.getElementById("loading-text") as HTMLParagraphElement | null;
const loadingSkipButton = document.getElementById("loading-skip") as HTMLButtonElement | null;
const loadingPauseButton = document.getElementById("loading-pause") as HTMLButtonElement | null;
const authOverlay = document.getElementById("auth-overlay") as HTMLDivElement | null;
const authTitle = document.getElementById("auth-title") as HTMLHeadingElement | null;
const authHint = document.getElementById("auth-hint") as HTMLParagraphElement | null;
const authUsernameInput = document.getElementById("auth-username") as HTMLInputElement | null;
const authPasswordInput = document.getElementById("auth-password") as HTMLInputElement | null;
const authSubmitButton = document.getElementById("auth-submit") as HTMLButtonElement | null;
const authSavePasswordButton = document.getElementById("auth-save-password") as HTMLButtonElement | null;
const authForgotButton = document.getElementById("auth-forgot") as HTMLButtonElement | null;
const authNewAccountButton = document.getElementById("auth-new-account") as HTMLButtonElement | null;
const authMessage = document.getElementById("auth-message") as HTMLParagraphElement | null;
const serverOverlay = document.getElementById("server-overlay") as HTMLDivElement | null;
const serverHint = document.getElementById("server-hint") as HTMLParagraphElement | null;
const serverNameInput = document.getElementById("server-name") as HTMLInputElement | null;
const serverCreateButton = document.getElementById("server-create") as HTMLButtonElement | null;
const serverJoinButton = document.getElementById("server-join") as HTMLButtonElement | null;
const serverList = document.getElementById("server-list") as HTMLDivElement | null;
const serverMessage = document.getElementById("server-message") as HTMLParagraphElement | null;
const payMethodButtons = Array.from(document.querySelectorAll(".pay-method")) as HTMLButtonElement[];
const muteButton = document.getElementById("mute-btn") as HTMLButtonElement;
const sheepMuteButton = document.getElementById("sheep-mute-btn") as HTMLButtonElement;
const skipRageButton = document.getElementById("skip-rage-btn") as HTMLButtonElement | null;
const modeOverlay = document.getElementById("mode-overlay") as HTMLDivElement;
const modeSuperDuperMugaEasyButton = document.getElementById("mode-super-duper-muga-easy") as HTMLButtonElement | null;
const modeSuperEasyButton = document.getElementById("mode-super-easy") as HTMLButtonElement | null;
const modeEasyButton = document.getElementById("mode-easy") as HTMLButtonElement;
const modeMediumButton = document.getElementById("mode-medium") as HTMLButtonElement;
const modeMugaButton = document.getElementById("mode-muga") as HTMLButtonElement | null;
const modeDangerButton = document.getElementById("mode-danger") as HTMLButtonElement;
const mugaModePopup = document.getElementById("muga-mode-popup") as HTMLDivElement | null;
const mugaModeCloseButton = document.getElementById("muga-mode-close") as HTMLButtonElement | null;
const coolAd = document.getElementById("cool-ad") as HTMLDivElement;
const adminPanel = document.getElementById("admin-panel") as HTMLDivElement;
const adminToggleButton = document.getElementById("admin-toggle") as HTMLButtonElement;
const adminInfiniteButton = document.getElementById("admin-infinite") as HTMLButtonElement;
const adminPowerButton = document.getElementById("admin-power-btn") as HTMLButtonElement;
const adminStatus = document.getElementById("admin-status") as HTMLParagraphElement;
const endingsPanel = document.getElementById("endings-panel") as HTMLDivElement | null;
const endingsButton = document.getElementById("endings-btn") as HTMLButtonElement | null;
const endingsList = document.getElementById("endings-list") as HTMLUListElement | null;
const bankruptButton = document.getElementById("bankrupt-btn") as HTMLButtonElement;
const shopToggleButton = document.getElementById("shop-toggle-btn") as HTMLButtonElement | null;
const ctx = canvas.getContext("2d");

if (!ctx) {
  throw new Error("Canvas 2D context is not available.");
}

type Platform = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type Star = {
  x: number;
  y: number;
  radius: number;
  collected: boolean;
  pulseOffset: number;
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  hue: number;
};

type Bullet = {
  x: number;
  y: number;
  vx: number;
  life: number;
};

type Spike = {
  x: number;
  y: number;
  width: number;
  height: number;
  moveMinX?: number;
  moveMaxX?: number;
  moveSpeed?: number;
  movePhase?: number;
};

type TrollPart = {
  x: number;
  y: number;
  width: number;
  height: number;
  triggered: boolean;
};

type FishAttack = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
};

type EndingId = "good" | "bad" | "fish" | "money" | "impatient" | "boom" | "bankrupt" | "muga";
type AvatarKey = "default" | "muga" | "console";
type BackgroundKey = "default" | "muga" | "dark" | "donut";
type RageVariant = "regular" | "moving_spikes";
type StoredAccount = {
  username: string;
  password: string;
};

type Player = {
  x: number;
  y: number;
  width: number;
  height: number;
  vx: number;
  vy: number;
  speed: number;
  jumpSpeed: number;
  grounded: boolean;
  facing: 1 | -1;
  animTime: number;
  shootCooldown: number;
};

const keys = {
  left: false,
  right: false,
  fire: false,
  spaceHeld: false,
  jumpQueued: false,
};

let gravity = 1900;
const targetStars = 100;
const speedMultipliers = [2, 6, 15, 30, 60];
let starsCollected = 0;
const maxHealth = 100;
let playerHealth = maxHealth;
let moneySpent = 0;
let speedTier = 0;
let nextSpeedCost = 1.99;
let gameOver = false;
let cameraX = 0;
let worldFarX = 0;
let authenticated = false;
let activeUsername = "";
let activeServerName = "";
let donateVisible = false;
let nextDonatePopupAt = 8;
let robuxVisible = false;
let nextRobuxPopupAt = 0;
let annoyVisible = false;
let nextAnnoyPopupAt = 0;
let nextRewardAt = 0;
let rewardText = "";
let rewardTextUntil = 0;
let whiteFlashUntil = 0;
let lastSpikeHitAt = -999;
let fishDamage = 100;
let spikeDamage = 50;
let noDamageMode = false;
let gameStarted = false;
let nukeWheelSpinning = false;
let loadingVisible = true;
let loadingStartAt = performance.now() / 1000;
const loadingDuration = 30;
let rageSkipTeleportPending = false;
let usedLoadingSkipThisRun = false;
let loadingPaused = false;
let loadingPausedAt = 0;
let donatePayMethod: "card" | "cash" | "sad" = "card";
let nextCoolAdAt = 0;
let coolAdUntil = 0;
let adminInfiniteDollars = false;
let popupsMuted = false;
let ragePartTriggered = false;
let ragePartStartX = 0;
let ragePartEndX = 0;
let ragePartSkipped = false;
let currentRageVariant: RageVariant = "regular";
let skipRageUsed = false;
let endingsPanelVisible = false;
let allEndingsMessageShown = false;
const accountStorageKey = "trololo_account_v1";
const savedPasswordsStorageKey = "trololo_saved_passwords_v1";
const serverListStoragePrefix = "trololo_servers_v1_";
const upgrades = {
  gun: false,
  jetpack: false,
};

const endingOrder: EndingId[] = ["good", "bad", "fish", "money", "impatient", "boom", "bankrupt", "muga"];
const endingLabels: Record<EndingId, string> = {
  good: "Good Ending",
  bad: "Bad Ending",
  fish: "Fish Ending",
  money: "Money Ending",
  impatient: "Impatient Ending",
  boom: "BOOM Ending",
  bankrupt: "Bankrupt Ending",
  muga: "Muga Ending",
};
const endingHints: Record<EndingId, string> = {
  good: "Get 100 stars.",
  bad: "Lose all health (without fish hit).",
  fish: "Click Maybe Later on donate, then let fish touch you.",
  money: "Spend more than $1000 in the shop.",
  impatient: "Skip loading, then die.",
  boom: "Press Nuke Game.",
  bankrupt: "Press the huge $99,999,999,999,999 button on the right.",
  muga: "Use Muga skin + Muga background together.",
};
const unlockedEndings: Record<EndingId, boolean> = {
  good: false,
  bad: false,
  fish: false,
  money: false,
  impatient: false,
  boom: false,
  bankrupt: false,
  muga: false,
};

const player: Player = {
  x: 160,
  y: 60,
  width: 62,
  height: 150,
  vx: 0,
  vy: 0,
  speed: 430,
  jumpSpeed: 880,
  grounded: false,
  facing: 1,
  animTime: 0,
  shootCooldown: 0,
};

const platforms: Platform[] = [];
const stars: Star[] = [];
const particles: Particle[] = [];
const bullets: Bullet[] = [];
const spikes: Spike[] = [];
const trollParts: TrollPart[] = [];
let activeFishAttack: FishAttack | null = null;

const headImage = new Image();
headImage.src = "./src/trololo-head.png?v=3";
let processedHeadCanvas: HTMLCanvasElement | null = null;
const mugaAvatarImage = new Image();
mugaAvatarImage.src = "./src/annoy-face.svg?v=1";
const consoleAvatarImage = new Image();
consoleAvatarImage.src = "./src/admin-icon.svg?v=1";
const avatarImages: Record<AvatarKey, HTMLImageElement> = {
  default: headImage,
  muga: mugaAvatarImage,
  console: consoleAvatarImage,
};
const avatarLabels: Record<AvatarKey, string> = {
  default: "Default",
  muga: "Muga",
  console: "Console",
};
const avatarStorageKey = "trololo_saved_avatar_skin";
let currentAvatarKey: AvatarKey = "default";
let currentBackgroundKey: BackgroundKey = "default";
const gunImage = new Image();
gunImage.src = "./src/gun.png?v=2";
const fishImage = new Image();
fishImage.src = "./src/fish-attack.png?v=1";
const gunSprite = {
  offsetX: 34,
  offsetY: -40,
  width: 140,
  height: 110,
  muzzleOffsetX: 132,
  muzzleOffsetY: 40,
};
const songs = [
  "https://cs1.mp3.pm/download/239808637/RDJVY1RGZGk0b2UvRGFZSjdtT0t1QzIwTTZZSFJ6dXdNSVRuRjhEdmtoSFlENjlsbjFzOSs0M05nNmZxS1IrRERsMWkySXI4QzVkL0lhSDk1SXpZVFFBL3hpOUZaTlZWV1k4Q1NycmdmTzlGNXdvaUFjbWk5UUpBK09TdGhkc04/Dion_Timmer_-_Shiawase_VIP_(mp3.pm).mp3",
];
let currentSongIndex = Math.floor(Math.random() * songs.length);
const bgm = new Audio(songs[currentSongIndex]);
bgm.loop = false;
bgm.volume = 0.45;
const trollTrackLocal =
  "https://us-tuna-sounds-files.voicemod.net/03d848af-bf5a-46c9-8411-479001723796-1700231339850.mp3";
const trollTrackUrl =
  "https://us-tuna-sounds-files.voicemod.net/03d848af-bf5a-46c9-8411-479001723796-1700231339850.mp3";
const trollTrackSources = [trollTrackLocal, trollTrackUrl];
const fallSfx = new Audio("./dist/fall-sfx.mp3");
fallSfx.volume = 0.9;
let bgmMuted = false;
let fallSfxMuted = false;

function tryStartMusic(): void {
  if (!bgm.paused) {
    return;
  }
  void bgm.play().catch(() => {
    // Browser blocked autoplay; next interaction will retry.
  });
}

function playFallSfx(): void {
  fallSfx.currentTime = 0;
  void fallSfx.play().catch(() => {
    // Will play after next gesture if blocked.
  });
}

function applyBgmMute(): void {
  bgm.muted = bgmMuted;
}

async function playBgmFromSources(sources: string[], loop: boolean): Promise<boolean> {
  for (const source of sources) {
    bgm.pause();
    bgm.src = source;
    bgm.loop = loop;
    bgm.currentTime = 0;
    applyBgmMute();
    try {
      await bgm.play();
      return true;
    } catch {
      // Try next candidate source.
    }
  }
  return false;
}

function pickNextSongIndex(): number {
  if (songs.length <= 1) {
    return 0;
  }
  let next = currentSongIndex;
  while (next === currentSongIndex) {
    next = Math.floor(Math.random() * songs.length);
  }
  return next;
}

bgm.addEventListener("ended", () => {
  currentSongIndex = pickNextSongIndex();
  bgm.src = songs[currentSongIndex];
  applyBgmMute();
  bgm.currentTime = 0;
  void bgm.play().catch(() => {
    // If blocked, next user interaction starts it.
  });
});

function updateMuteButtonLabel(): void {
  muteButton.textContent = bgmMuted ? "Unmute" : "Mute";
}

function updateSheepMuteButtonLabel(): void {
  sheepMuteButton.textContent = fallSfxMuted ? "Unmute Sheep" : "Mute Sheep";
}

function toggleMute(): void {
  bgmMuted = !bgmMuted;
  applyBgmMute();
  updateMuteButtonLabel();
}

function toggleSheepMute(): void {
  fallSfxMuted = !fallSfxMuted;
  fallSfx.muted = fallSfxMuted;
  updateSheepMuteButtonLabel();
}

function readStoredAccount(): StoredAccount | null {
  const raw = localStorage.getItem(accountStorageKey);
  if (!raw) {
    return null;
  }
  try {
    const parsed = JSON.parse(raw) as StoredAccount;
    if (!parsed.username || !parsed.password) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function writeStoredAccount(account: StoredAccount): void {
  localStorage.setItem(accountStorageKey, JSON.stringify(account));
}

function clearStoredAccount(): void {
  localStorage.removeItem(accountStorageKey);
}

function readSavedPasswords(): string[] {
  const raw = localStorage.getItem(savedPasswordsStorageKey);
  if (!raw) {
    return [];
  }
  try {
    const parsed = JSON.parse(raw) as string[];
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed.filter((value) => typeof value === "string");
  } catch {
    return [];
  }
}

function savePassword(password: string): void {
  if (!password) {
    return;
  }
  const saved = readSavedPasswords();
  saved.push(password);
  const trimmed = saved.slice(-80);
  localStorage.setItem(savedPasswordsStorageKey, JSON.stringify(trimmed));
  setAuthMessage("password saved");
}

function showForgotPasswords(): void {
  const saved = readSavedPasswords();
  if (saved.length === 0) {
    setAuthMessage("no saved passwords yet");
    return;
  }
  alert(`Saved passwords:\n${saved.join("\n")}`);
}

function setAuthMessage(message: string): void {
  if (authMessage) {
    authMessage.textContent = message;
  }
}

function setServerMessage(message: string): void {
  if (serverMessage) {
    serverMessage.textContent = message;
  }
}

function normalizeServerName(name: string): string {
  return name.trim().slice(0, 28);
}

function serverStorageKeyForUser(username: string): string {
  return `${serverListStoragePrefix}${username.toLowerCase()}`;
}

function readServersForUser(username: string): string[] {
  const raw = localStorage.getItem(serverStorageKeyForUser(username));
  if (!raw) {
    return [];
  }
  try {
    const parsed = JSON.parse(raw) as string[];
    if (!Array.isArray(parsed)) {
      return [];
    }
    const cleaned = parsed
      .map((name) => (typeof name === "string" ? normalizeServerName(name) : ""))
      .filter((name) => name.length > 0);
    return cleaned.slice(0, 80);
  } catch {
    return [];
  }
}

function writeServersForUser(username: string, servers: string[]): void {
  localStorage.setItem(serverStorageKeyForUser(username), JSON.stringify(servers.slice(0, 80)));
}

function joinServer(name: string): void {
  const normalized = normalizeServerName(name);
  if (!normalized || !activeUsername) {
    setServerMessage("enter server name");
    return;
  }
  activeServerName = normalized;
  serverOverlay?.classList.add("hidden");
  setServerMessage("");
  startPostAuthFlow();
}

function renderServerList(): void {
  if (!serverList || !activeUsername) {
    return;
  }
  const servers = readServersForUser(activeUsername);
  serverList.innerHTML = "";
  if (servers.length === 0) {
    const empty = document.createElement("div");
    empty.className = "server-empty";
    empty.textContent = "no servers yet. create one.";
    serverList.appendChild(empty);
    return;
  }

  for (const serverName of servers) {
    const button = document.createElement("button");
    button.textContent = `Join ${serverName}`;
    button.addEventListener("click", () => {
      joinServer(serverName);
    });
    serverList.appendChild(button);
  }
}

function showServerSelection(username: string): void {
  activeUsername = username;
  activeServerName = "";
  authOverlay?.classList.add("hidden");
  serverOverlay?.classList.remove("hidden");
  if (serverHint) {
    serverHint.textContent = `Logged in as ${username}. Choose a server.`;
  }
  if (serverNameInput) {
    serverNameInput.value = "";
    serverNameInput.focus();
  }
  setServerMessage("");
  renderServerList();
}

function updateAuthUI(): void {
  const stored = readStoredAccount();
  if (stored) {
    if (authTitle) {
      authTitle.textContent = "Log In";
    }
    if (authHint) {
      authHint.textContent = `Use your account: ${stored.username}`;
    }
    if (authSubmitButton) {
      authSubmitButton.textContent = "Log In";
    }
  } else {
    if (authTitle) {
      authTitle.textContent = "Create Account";
    }
    if (authHint) {
      authHint.textContent = "Create username + password to play.";
    }
    if (authSubmitButton) {
      authSubmitButton.textContent = "Create Account";
    }
  }
}

function startPostAuthFlow(): void {
  authenticated = true;
  if (serverHint) {
    serverHint.textContent = activeServerName
      ? `Server: ${activeServerName}`
      : `Logged in as ${activeUsername}`;
  }
  authOverlay?.classList.add("hidden");
  serverOverlay?.classList.add("hidden");
  setAuthMessage("");
  loadingVisible = true;
  loadingPaused = false;
  loadingStartAt = performance.now() / 1000;
  loadingOverlay?.classList.remove("hidden");
  if (loadingFill) {
    loadingFill.style.width = "0%";
  }
  if (loadingText) {
    loadingText.textContent = "preparing rage content";
  }
  if (loadingPauseButton) {
    loadingPauseButton.textContent = "Pause Loading";
  }
}

function submitAuth(): void {
  const username = authUsernameInput?.value.trim() ?? "";
  const password = authPasswordInput?.value ?? "";
  if (!username || !password) {
    setAuthMessage("enter username and password");
    return;
  }

  const stored = readStoredAccount();
  if (!stored) {
    writeStoredAccount({ username, password });
    showServerSelection(username);
    return;
  }

  if (stored.username === username && stored.password === password) {
    showServerSelection(username);
    return;
  }
  setAuthMessage("wrong username or password");
}

function initAuthGate(): void {
  authenticated = false;
  activeUsername = "";
  activeServerName = "";
  authOverlay?.classList.remove("hidden");
  serverOverlay?.classList.add("hidden");
  updateAuthUI();
  setAuthMessage("");
  setServerMessage("");
  if (authUsernameInput) {
    authUsernameInput.value = "";
    authUsernameInput.focus();
  }
  if (authPasswordInput) {
    authPasswordInput.value = "";
  }
}

function createNewAccountFlow(): void {
  clearStoredAccount();
  activeServerName = "";
  serverOverlay?.classList.add("hidden");
  updateAuthUI();
  setAuthMessage("old account cleared. create a new one.");
  if (authUsernameInput) {
    authUsernameInput.value = "";
    authUsernameInput.focus();
  }
  if (authPasswordInput) {
    authPasswordInput.value = "";
  }
}

function buildTransparentHeadSprite(): void {
  if (!headImage.naturalWidth || !headImage.naturalHeight) {
    return;
  }

  const sprite = document.createElement("canvas");
  sprite.width = headImage.naturalWidth;
  sprite.height = headImage.naturalHeight;
  const sctx = sprite.getContext("2d");
  if (!sctx) {
    return;
  }

  sctx.drawImage(headImage, 0, 0);
  const img = sctx.getImageData(0, 0, sprite.width, sprite.height);
  const px = img.data;
  for (let i = 0; i < px.length; i += 4) {
    const r = px[i];
    const g = px[i + 1];
    const b = px[i + 2];
    const isLight = r > 188 && g > 188 && b > 188;
    const isNeutral = Math.max(Math.abs(r - g), Math.abs(g - b), Math.abs(r - b)) < 18;
    if (isLight && isNeutral) {
      px[i + 3] = 0;
    }
  }
  sctx.putImageData(img, 0, 0);

  const thick = document.createElement("canvas");
  thick.width = sprite.width;
  thick.height = sprite.height;
  const tctx = thick.getContext("2d");
  if (!tctx) {
    processedHeadCanvas = sprite;
    return;
  }

  // Slightly thicken the face linework by drawing nearby pixel offsets.
  tctx.drawImage(sprite, 0, 0);
  tctx.drawImage(sprite, 1, 0);
  tctx.drawImage(sprite, -1, 0);
  tctx.drawImage(sprite, 0, 1);
  tctx.drawImage(sprite, 0, -1);
  tctx.drawImage(sprite, 0, 0);
  processedHeadCanvas = thick;
}

headImage.addEventListener("load", buildTransparentHeadSprite);

function getAvatarKeyFromStorage(value: string | null): AvatarKey {
  if (value === "muga" || value === "console" || value === "default") {
    return value;
  }
  return "default";
}

function updateAvatarStatus(): void {
  avatarStatus.textContent = `Skin: ${avatarLabels[currentAvatarKey]}`;
}

function setAvatarSkin(skin: AvatarKey): void {
  currentAvatarKey = skin;
  updateAvatarStatus();
  rewardText = `skin set: ${avatarLabels[skin]}`;
  rewardTextUntil = performance.now() / 1000 + 1.8;
  maybeTriggerMugaEnding();
}

function saveAvatarSkin(): void {
  localStorage.setItem(avatarStorageKey, currentAvatarKey);
  rewardText = `saved skin: ${avatarLabels[currentAvatarKey]}`;
  rewardTextUntil = performance.now() / 1000 + 2.2;
}

function loadSavedAvatarSkin(): void {
  const saved = getAvatarKeyFromStorage(localStorage.getItem(avatarStorageKey));
  setAvatarSkin(saved);
  rewardText = `loaded skin: ${avatarLabels[saved]}`;
  rewardTextUntil = performance.now() / 1000 + 2.2;
}

function getCurrentAvatarDrawable(): CanvasImageSource {
  if (currentAvatarKey === "default") {
    return processedHeadCanvas ?? headImage;
  }

  const img = avatarImages[currentAvatarKey];
  if (img.complete && img.naturalWidth > 0 && img.naturalHeight > 0) {
    return img;
  }
  return processedHeadCanvas ?? headImage;
}

function updateBackgroundStatus(): void {
  const label =
    currentBackgroundKey === "default"
      ? "Sky Default"
      : currentBackgroundKey === "muga"
        ? "Muga"
        : currentBackgroundKey === "dark"
          ? "Black Flames+Skulls"
          : "Pink Rainbow Donuts";
  bgStatus.textContent = `Background: ${label}`;
}

function setBackgroundTheme(theme: BackgroundKey): void {
  currentBackgroundKey = theme;
  updateBackgroundStatus();
  rewardText = `background: ${bgStatus.textContent?.replace("Background: ", "") ?? theme}`;
  rewardTextUntil = performance.now() / 1000 + 1.8;
  maybeTriggerMugaEnding();
}

function maybeTriggerMugaEnding(): void {
  if (currentAvatarKey !== "muga" || currentBackgroundKey !== "muga") {
    return;
  }
  unlockEnding("muga");
  if (!gameStarted || gameOver) {
    rewardText = "Muga Ending unlocked";
    rewardTextUntil = performance.now() / 1000 + 1.8;
    return;
  }
  gameOver = true;
  showEnding("muga");
}

function random(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

function circleIntersectsRect(
  circleX: number,
  circleY: number,
  circleRadius: number,
  rectX: number,
  rectY: number,
  rectW: number,
  rectH: number
): boolean {
  const closestX = Math.max(rectX, Math.min(circleX, rectX + rectW));
  const closestY = Math.max(rectY, Math.min(circleY, rectY + rectH));
  const dx = circleX - closestX;
  const dy = circleY - closestY;
  return dx * dx + dy * dy <= circleRadius * circleRadius;
}

function resizeCanvas(): void {
  const parent = canvas.parentElement;
  if (!parent) {
    return;
  }

  const rect = parent.getBoundingClientRect();
  canvas.width = Math.max(680, Math.floor(rect.width));
  canvas.height = Math.max(420, Math.floor(rect.height));
}

function setupWorld(): void {
  platforms.length = 0;
  stars.length = 0;
  trollParts.length = 0;

  const groundY = canvas.height - 50;
  const firstGround: Platform = {
    x: -300,
    y: groundY,
    width: 1300,
    height: 120,
  };

  platforms.push(firstGround);
  trollParts.push({
    x: 280,
    y: groundY - 12,
    width: 46,
    height: 12,
    triggered: false,
  });
  worldFarX = firstGround.x + firstGround.width;

  while (worldFarX < 2800) {
    spawnChunk();
  }

  player.y = groundY - player.height;
}

function spawnChunk(): void {
  const gap = random(60, 210);
  const width = random(130, 270);
  const height = random(22, 30);
  const minY = canvas.height - 300;
  const maxY = canvas.height - 90;
  const y = random(minY, maxY);

  const platform: Platform = {
    x: worldFarX + gap,
    y,
    width,
    height,
  };

  platforms.push(platform);
  worldFarX = platform.x + platform.width;

  const starChance = Math.random();
  if (starChance > 0.2) {
    const starsOnPlatform = Math.random() > 0.75 ? 2 : 1;
    for (let i = 0; i < starsOnPlatform; i += 1) {
      stars.push({
        x: platform.x + random(25, platform.width - 25),
        y: platform.y - random(38, 76),
        radius: random(13, 17),
        collected: false,
        pulseOffset: random(0, Math.PI * 2),
      });
    }
  }

  if (Math.random() > 0.65) {
    stars.push({
      x: platform.x + random(-40, platform.width + 40),
      y: platform.y - random(110, 165),
      radius: random(11, 15),
      collected: false,
      pulseOffset: random(0, Math.PI * 2),
    });
  }

  if (Math.random() > 0.55 && platform.width > 150) {
    const count = Math.random() > 0.7 ? 2 : 1;
    for (let i = 0; i < count; i += 1) {
      const spikeW = random(22, 34);
      const spikeH = random(18, 28);
      spikes.push({
        x: platform.x + random(18, platform.width - spikeW - 18),
        y: platform.y - spikeH + 2,
        width: spikeW,
        height: spikeH,
      });
    }
  }

  if (Math.random() > 0.82 && platform.width > 130) {
    const trollW = random(34, 48);
    const trollH = random(10, 14);
    trollParts.push({
      x: platform.x + random(18, platform.width - trollW - 18),
      y: platform.y - trollH + 1,
      width: trollW,
      height: trollH,
      triggered: false,
    });
  }
}

function queueWorldGeneration(): void {
  while (worldFarX < cameraX + canvas.width + 700) {
    spawnChunk();
  }
}

function buildRagePart(startX: number): void {
  let x = startX;
  const lanes = [canvas.height - 130, canvas.height - 205, canvas.height - 275];

  for (let i = 0; i < 12; i += 1) {
    const width = random(92, 138);
    const height = random(20, 26);
    const y = lanes[i % lanes.length] + random(-14, 14);
    x += random(92, 128);

    const platform: Platform = { x, y, width, height };
    platforms.push(platform);

    const spikeCount = Math.floor(random(2, 5));
    for (let s = 0; s < spikeCount; s += 1) {
      const spikeW = random(16, 24);
      const spikeH = random(16, 24);
      spikes.push({
        x: platform.x + random(8, Math.max(10, platform.width - spikeW - 8)),
        y: platform.y - spikeH + 2,
        width: spikeW,
        height: spikeH,
      });
    }

    if (Math.random() > 0.35) {
      stars.push({
        x: platform.x + random(22, platform.width - 22),
        y: platform.y - random(44, 72),
        radius: random(11, 15),
        collected: false,
        pulseOffset: random(0, Math.PI * 2),
      });
    }

    x += width;
  }

  ragePartEndX = x + 120;
  worldFarX = Math.max(worldFarX, ragePartEndX + 250);
}

function buildMovingSpikesRagePart(startX: number): void {
  let x = startX;
  const lanes = [canvas.height - 122, canvas.height - 188, canvas.height - 254];

  for (let i = 0; i < 14; i += 1) {
    const width = random(86, 124);
    const height = random(19, 25);
    const y = lanes[i % lanes.length] + random(-12, 12);
    x += random(80, 116);

    const platform: Platform = { x, y, width, height };
    platforms.push(platform);

    const spikeCount = Math.floor(random(3, 6));
    for (let s = 0; s < spikeCount; s += 1) {
      const spikeW = random(15, 23);
      const spikeH = random(14, 22);
      const baseX = platform.x + random(8, Math.max(10, platform.width - spikeW - 8));
      const travel = random(16, 42);
      spikes.push({
        x: baseX,
        y: platform.y - spikeH + 2,
        width: spikeW,
        height: spikeH,
        moveMinX: baseX - travel,
        moveMaxX: baseX + travel,
        moveSpeed: random(1.7, 3.5),
        movePhase: random(0, Math.PI * 2),
      });
    }

    if (Math.random() > 0.42) {
      stars.push({
        x: platform.x + random(20, platform.width - 20),
        y: platform.y - random(40, 70),
        radius: random(11, 15),
        collected: false,
        pulseOffset: random(0, Math.PI * 2),
      });
    }

    x += width;
  }

  ragePartEndX = x + 120;
  worldFarX = Math.max(worldFarX, ragePartEndX + 250);
}

function buildRandomRagePart(startX: number): void {
  currentRageVariant = Math.random() < 0.5 ? "regular" : "moving_spikes";
  if (currentRageVariant === "moving_spikes") {
    buildMovingSpikesRagePart(startX);
    return;
  }
  buildRagePart(startX);
}

function teleportToRagePart(nowSec: number): void {
  if (!ragePartTriggered) {
    ragePartTriggered = true;
    ragePartStartX = worldFarX + 180;
    buildRandomRagePart(ragePartStartX);
  }

  const targetPlatform =
    platforms.find((p) => p.x >= ragePartStartX && p.x <= ragePartEndX) ??
    platforms[platforms.length - 1];

  if (targetPlatform) {
    player.x = targetPlatform.x + 12;
    player.y = targetPlatform.y - player.height;
  } else {
    player.x = ragePartStartX + 20;
    player.y = canvas.height - player.height - 180;
  }

  player.vx = 0;
  player.vy = 0;
  player.grounded = true;
  cameraX = Math.max(0, player.x - canvas.width * 0.35);
  rewardText = "bruh why u so impatient";
  rewardTextUntil = nowSec + 2.8;
}

function maybeTriggerRagePart(nowSec: number): void {
  if (ragePartTriggered || ragePartSkipped || gameOver || !gameStarted) {
    return;
  }
  if (cameraX < 1600 && starsCollected < 18) {
    return;
  }

  ragePartTriggered = true;
  ragePartStartX = worldFarX + 180;
  buildRandomRagePart(ragePartStartX);
  rewardText = currentRageVariant === "moving_spikes" ? "RAGE PART 2 UNLOCKED" : "RAGE PART UNLOCKED";
  rewardTextUntil = nowSec + 3.2;
}

function hideLoadingScreen(): void {
  if (!loadingVisible) {
    return;
  }
  loadingVisible = false;
  loadingPaused = false;
  loadingOverlay?.classList.add("hidden");
  if (loadingPauseButton) {
    loadingPauseButton.textContent = "Pause Loading";
  }
}

function updateLoadingScreen(nowSec: number): void {
  if (!loadingVisible) {
    return;
  }
  if (loadingPaused) {
    return;
  }
  const progress = Math.max(0, Math.min(1, (nowSec - loadingStartAt) / loadingDuration));
  if (loadingFill) {
    loadingFill.style.width = `${Math.round(progress * 100)}%`;
  }
  if (progress >= 1) {
    hideLoadingScreen();
  }
}

function handleLoadingSkip(): void {
  rageSkipTeleportPending = true;
  usedLoadingSkipThisRun = true;
  if (loadingText) {
    loadingText.textContent = "bruh why u so impatient";
  }
  hideLoadingScreen();
}

function toggleLoadingPause(): void {
  if (!loadingVisible) {
    return;
  }
  if (!loadingPaused) {
    loadingPaused = true;
    loadingPausedAt = performance.now() / 1000;
    if (loadingPauseButton) {
      loadingPauseButton.textContent = "Resume Loading";
    }
  } else {
    const nowSec = performance.now() / 1000;
    loadingPaused = false;
    loadingStartAt += nowSec - loadingPausedAt;
    if (loadingPauseButton) {
      loadingPauseButton.textContent = "Pause Loading";
    }
  }
}

function skipRagePart(): void {
  if (!gameStarted || gameOver || skipRageUsed) {
    return;
  }

  skipRageUsed = true;
  if (skipRageButton) {
    skipRageButton.style.display = "none";
  }
  ragePartSkipped = true;
  if (!ragePartTriggered) {
    ragePartTriggered = true;
    ragePartStartX = worldFarX + 180;
    buildRandomRagePart(ragePartStartX);
  }

  while (worldFarX < ragePartEndX + 700) {
    spawnChunk();
  }

  const safeAfterRage = platforms.find((p) => p.x > ragePartEndX + 40) ?? platforms[platforms.length - 1];
  if (safeAfterRage) {
    player.x = safeAfterRage.x + 14;
    player.y = safeAfterRage.y - player.height;
  } else {
    player.x = Math.max(player.x, ragePartEndX + 260);
    player.y = Math.min(player.y, canvas.height - player.height - 140);
  }
  player.vx = 0;
  player.vy = 0;
  player.grounded = true;
  cameraX = Math.max(0, player.x - canvas.width * 0.35);
  rewardText = "RAGE PART SKIPPED";
  rewardTextUntil = performance.now() / 1000 + 2.4;
}

function updatePlayer(dt: number): void {
  const moveX = Number(keys.right) - Number(keys.left);
  const prevX = player.x;
  const prevY = player.y;

  player.vx = moveX * player.speed;

  if (moveX !== 0) {
    player.facing = moveX > 0 ? 1 : -1;
    player.animTime += dt * (1.6 + Math.abs(player.vx) / 280);
  } else {
    player.animTime += dt * 0.55;
  }

  if (keys.jumpQueued && player.grounded) {
    player.vy = -player.jumpSpeed;
    player.grounded = false;
  }
  keys.jumpQueued = false;

  player.vy += gravity * dt;
  if (upgrades.jetpack && keys.spaceHeld && !player.grounded) {
    player.vy -= 2400 * dt;
    player.vy = Math.max(player.vy, -560);
  }

  const nextX = player.x + player.vx * dt;
  const nextY = player.y + player.vy * dt;
  const prevBottom = prevY + player.height;
  const nextBottom = nextY + player.height;

  player.x = Math.max(-220, nextX);

  let landed = false;
  player.y = nextY;

  for (const platform of platforms) {
    const overlapsXAtNext = player.x + player.width > platform.x && player.x < platform.x + platform.width;
    const overlapsXAtPrev = prevX + player.width > platform.x && prevX < platform.x + platform.width;
    const landingTolerance = 10;
    const crossesPlatformTop = prevBottom <= platform.y + landingTolerance && nextBottom >= platform.y;
    const nearTopAtNext = Math.abs(nextBottom - platform.y) <= landingTolerance;

    if (player.vy >= 0 && (overlapsXAtNext || overlapsXAtPrev) && (crossesPlatformTop || nearTopAtNext)) {
      player.y = platform.y - player.height;
      player.vy = 0;
      landed = true;
      break;
    }
  }

  if (player.y > canvas.height + 300) {
    playFallSfx();
    rewardText = "not an endinh";
    rewardTextUntil = performance.now() / 1000 + 2.4;
    const safe = platforms.find((p) => p.x < cameraX + 220 && p.x + p.width > cameraX + 140) ?? platforms[0];
    player.x = safe.x + 36;
    player.y = safe.y - player.height;
    player.vy = 0;
    landed = true;
  }

  player.grounded = landed;
}

function updateCamera(dt: number): void {
  const target = player.x - canvas.width * 0.35;
  cameraX += (target - cameraX) * Math.min(1, dt * 7.5);
  cameraX = Math.max(0, cameraX);
}

function starShapePath(x: number, y: number, outerRadius: number, innerRadius: number): void {
  const points = 5;
  let angle = -Math.PI / 2;
  const step = Math.PI / points;

  ctx.beginPath();
  for (let i = 0; i < points * 2; i += 1) {
    const radius = i % 2 === 0 ? outerRadius : innerRadius;
    const px = x + Math.cos(angle) * radius;
    const py = y + Math.sin(angle) * radius;

    if (i === 0) {
      ctx.moveTo(px, py);
    } else {
      ctx.lineTo(px, py);
    }
    angle += step;
  }
  ctx.closePath();
}

function drawPlatform(platform: Platform): void {
  const x = platform.x - cameraX;
  if (x + platform.width < -80 || x > canvas.width + 80) {
    return;
  }

  ctx.fillStyle = "#7a5e43";
  ctx.fillRect(x, platform.y, platform.width, platform.height);

  ctx.strokeStyle = "#2f2419";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(x + 3, platform.y + 5);
  ctx.lineTo(x + platform.width - 2, platform.y + 5);
  ctx.stroke();
}

function drawStars(nowSec: number): void {
  for (const star of stars) {
    if (star.collected) {
      continue;
    }

    const screenX = star.x - cameraX;
    if (screenX < -60 || screenX > canvas.width + 60) {
      continue;
    }

    const pulse = Math.sin(nowSec * 7 + star.pulseOffset) * 1.4;
    const outer = star.radius + pulse;

    starShapePath(screenX, star.y, outer, outer * 0.45);
    ctx.fillStyle = "#ffe95c";
    ctx.fill();

    ctx.strokeStyle = "#d48600";
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}

function createExplosion(x: number, y: number): void {
  const count = 22;
  for (let i = 0; i < count; i += 1) {
    const angle = random(0, Math.PI * 2);
    const speed = random(70, 390);

    particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: random(0.35, 0.6),
      maxLife: random(0.35, 0.6),
      size: random(2.2, 4.8),
      hue: random(32, 60),
    });
  }
}

function updateSpendLabel(): void {
  spentLabel.textContent = `Spent: $${moneySpent.toFixed(2)}`;
}

function addSpent(amount: number): void {
  if (adminInfiniteDollars) {
    rewardText = "admin: infinite dollars active";
    rewardTextUntil = performance.now() / 1000 + 1.4;
    return;
  }

  moneySpent += amount;
  updateSpendLabel();
  if (!gameOver && moneySpent > 1000) {
    gameOver = true;
    showEnding("money");
  }
}

function updateSpeedButtonLabel(): void {
  if (speedTier >= speedMultipliers.length) {
    buySpeedButton.disabled = true;
    buySpeedButton.textContent = "Max Speed Reached";
    return;
  }

  const mult = speedMultipliers[speedTier];
  buySpeedButton.disabled = false;
  buySpeedButton.textContent = `Buy Speed ${mult}x ($${nextSpeedCost.toFixed(2)})`;
}

function buySpeedUpgrade(): void {
  if (speedTier >= speedMultipliers.length) {
    return;
  }

  const mult = speedMultipliers[speedTier];
  player.speed = 430 * mult;
  addSpent(nextSpeedCost);

  speedTier += 1;
  nextSpeedCost *= 8;
  updateSpeedButtonLabel();
}

function updateAdminPanelUI(): void {
  adminInfiniteButton.textContent = `Infinite Dollars: ${adminInfiniteDollars ? "ON" : "OFF"}`;
  adminStatus.textContent = adminInfiniteDollars
    ? "status: admin mode active"
    : "status: normal player";
}

function toggleAdminPanel(): void {
  adminPanel.classList.toggle("visible");
}

function toggleAdminInfiniteDollars(): void {
  adminInfiniteDollars = !adminInfiniteDollars;
  updateAdminPanelUI();
}

function updateMutePopupsButtonLabel(): void {
  mutePopupsButton.textContent = `Mute Popups: ${popupsMuted ? "ON" : "OFF"}`;
}

function togglePopupMute(): void {
  popupsMuted = !popupsMuted;
  updateMutePopupsButtonLabel();

  if (!popupsMuted) {
    return;
  }

  donateVisible = false;
  robuxVisible = false;
  annoyVisible = false;
  donatePopup.classList.remove("visible");
  robuxPopup?.classList.remove("visible");
  annoyPopup?.classList.remove("visible");
}

function updateShopToggleButtonLabel(): void {
  if (!shopToggleButton) {
    return;
  }
  shopToggleButton.textContent = shopPanel.classList.contains("hidden")
    ? "Show Pay To Win"
    : "Hide Pay To Win";
}

function toggleShopPanel(): void {
  shopPanel.classList.toggle("hidden");
  updateShopToggleButtonLabel();
}

function updateEndingsPanel(): void {
  if (!endingsList) {
    return;
  }
  endingsList.innerHTML = "";
  for (const endingId of endingOrder) {
    const li = document.createElement("li");
    li.className = `ending-item${unlockedEndings[endingId] ? " unlocked" : ""}`;
    const status = unlockedEndings[endingId] ? "Unlocked" : "Locked";
    li.textContent = `${endingLabels[endingId]} - ${status}`;
    li.style.cursor = "pointer";
    li.title = "Click for how to get";
    li.addEventListener("click", () => {
      rewardText = `${endingLabels[endingId]}: ${endingHints[endingId]}`;
      rewardTextUntil = performance.now() / 1000 + 3.4;
    });
    endingsList.appendChild(li);
  }
}

function toggleEndingsPanel(): void {
  if (!endingsPanel) {
    return;
  }
  endingsPanelVisible = !endingsPanelVisible;
  endingsPanel.classList.toggle("visible", endingsPanelVisible);
}

function unlockEnding(endingId: EndingId): void {
  if (unlockedEndings[endingId]) {
    return;
  }
  unlockedEndings[endingId] = true;
  updateEndingsPanel();

  if (!allEndingsMessageShown && endingOrder.every((id) => unlockedEndings[id])) {
    allEndingsMessageShown = true;
    gameOver = true;
    donateVisible = false;
    robuxVisible = false;
    annoyVisible = false;
    donatePopup.classList.remove("visible");
    robuxPopup?.classList.remove("visible");
    annoyPopup?.classList.remove("visible");
    loadingOverlay?.classList.add("hidden");
    modeOverlay.classList.add("hidden");
    finishTitle.textContent = "All Endings";
    finishMessage.textContent = "wow did that take long?";
    finish.classList.add("visible");
  }
}

function activateAdminPower(): void {
  upgrades.gun = true;
  upgrades.jetpack = true;
  buyGunButton.disabled = true;
  buyGunButton.textContent = "Gun Purchased";
  buyJetpackButton.disabled = true;
  buyJetpackButton.textContent = "Jetpack Purchased";
  speedTier = speedMultipliers.length;
  player.speed = 430 * speedMultipliers[speedMultipliers.length - 1];
  updateSpeedButtonLabel();
  rewardText = "admin power active";
  rewardTextUntil = performance.now() / 1000 + 2;
}

function updateHealthBar(): void {
  const ratio = Math.max(0, Math.min(1, playerHealth / maxHealth));
  healthFill.style.width = `${ratio * 100}%`;
  healthLabel.textContent = `Health: ${Math.ceil(playerHealth)} / ${maxHealth}`;
}

function damagePlayer(amount: number, endingType: "bad" | "fish" = "bad"): void {
  if (gameOver) {
    return;
  }
  if (noDamageMode) {
    return;
  }
  playerHealth = Math.max(0, playerHealth - amount);
  updateHealthBar();
  if (playerHealth <= 0) {
    gameOver = true;
    showEnding(usedLoadingSkipThisRun ? "impatient" : endingType);
  }
}

function showEnding(type: EndingId): void {
  unlockEnding(type);
  donateVisible = false;
  robuxVisible = false;
  annoyVisible = false;
  donatePopup.classList.remove("visible");
  robuxPopup?.classList.remove("visible");
  annoyPopup?.classList.remove("visible");
  loadingOverlay?.classList.add("hidden");
  modeOverlay.classList.add("hidden");
  currentAvatarKey = "default";
  currentBackgroundKey = "default";
  updateAvatarStatus();
  updateBackgroundStatus();
  if (type === "good") {
    finishTitle.textContent = "Good Ending";
    finishMessage.textContent = "Trololo wins with 100 stars.";
  } else if (type === "fish") {
    finishTitle.textContent = "Fish Ending";
    finishMessage.textContent = "haha fish got you.";
  } else if (type === "money") {
    finishTitle.textContent = "Money Ending";
    finishMessage.textContent = "You spent more than $1000.";
  } else if (type === "impatient") {
    finishTitle.textContent = "Impatient Ending";
    finishMessage.textContent = "you skipped loading and got rekt.";
  } else if (type === "boom") {
    finishTitle.textContent = "BOOM!";
    finishMessage.textContent = "You nuked the game.";
  } else if (type === "bankrupt") {
    finishTitle.textContent = "Bankrupt Ending";
    finishMessage.textContent = "you lost your money.";
  } else if (type === "muga") {
    finishTitle.textContent = "Muga Ending";
    finishMessage.textContent = "everything is muga now.";
  } else {
    finishTitle.textContent = "Bad Ending";
    finishMessage.textContent = "Trololo got rekt.";
  }
  finish.classList.add("visible");
}

function triggerBankruptEnding(): void {
  if (gameOver) {
    return;
  }
  moneySpent += 99_999_999_999_999;
  updateSpendLabel();
  gameOver = true;
  showEnding("bankrupt");
}

function startGame(mode: "super_easy" | "easy" | "medium" | "danger"): void {
  if (gameStarted) {
    return;
  }

  noDamageMode = mode === "super_easy";

  if (mode === "super_easy") {
    gravity = 1200;
    fishDamage = 0;
    spikeDamage = 0;
  } else if (mode === "easy") {
    gravity = 1550;
    fishDamage = 60;
    spikeDamage = 25;
  } else if (mode === "danger") {
    gravity = 2650;
    fishDamage = 100;
    spikeDamage = 100;
  } else {
    gravity = 1900;
    fishDamage = 100;
    spikeDamage = 50;
  }

  starsCollected = 0;
  playerHealth = maxHealth;
  moneySpent = 0;
  speedTier = 0;
  nextSpeedCost = 1.99;
  gameOver = false;
  allEndingsMessageShown = false;
  nukeWheelSpinning = false;
  donateVisible = false;
  robuxVisible = false;
  annoyVisible = false;
  ragePartTriggered = false;
  ragePartStartX = 0;
  ragePartEndX = 0;
  ragePartSkipped = false;
  currentRageVariant = "regular";
  skipRageUsed = false;
  activeFishAttack = null;
  particles.length = 0;
  bullets.length = 0;
  spikes.length = 0;
  trollParts.length = 0;
  platforms.length = 0;
  stars.length = 0;
  cameraX = 0;
  worldFarX = 0;
  player.vx = 0;
  player.vy = 0;
  player.speed = 430;
  player.animTime = 0;
  modeOverlay.classList.add("hidden");
  hideMugaModePopup();
  finish.classList.remove("visible");
  donatePopup.classList.remove("visible");
  robuxPopup?.classList.remove("visible");
  annoyPopup?.classList.remove("visible");
  if (skipRageButton) {
    skipRageButton.style.display = "block";
  }
  if (nukeWheelSpinButton) {
    nukeWheelSpinButton.disabled = false;
  }
  if (nukeWheelResult) {
    nukeWheelResult.textContent = "ready";
  }
  hud.textContent = `Stars: ${starsCollected} / ${targetStars}`;
  updateSpendLabel();
  updateSpeedButtonLabel();
  updateHealthBar();
  coolAd.classList.remove("visible");
  const nowSec = performance.now() / 1000;
  nextCoolAdAt = nowSec + 30;
  coolAdUntil = 0;
  nextDonatePopupAt = performance.now() / 1000 + 15;
  nextRobuxPopupAt = performance.now() / 1000 + 60;
  nextAnnoyPopupAt = performance.now() / 1000 + 5;
  whiteFlashUntil = 0;
  bgm.pause();
  bgm.src = songs[currentSongIndex];
  bgm.loop = false;
  bgm.currentTime = 0;
  applyBgmMute();
  void bgm.play().catch(() => {
    // If blocked, next user interaction starts it.
  });
  scheduleNextReward(performance.now() / 1000);
  setupWorld();

  if (rageSkipTeleportPending) {
    teleportToRagePart(performance.now() / 1000);
    rageSkipTeleportPending = false;
  }

  gameStarted = true;
  maybeTriggerMugaEnding();
  tryStartMusic();
}

function goBackToLoadingScreen(): void {
  gameStarted = false;
  gameOver = false;
  allEndingsMessageShown = false;
  nukeWheelSpinning = false;
  donateVisible = false;
  robuxVisible = false;
  annoyVisible = false;
  activeFishAttack = null;
  loadingVisible = true;
  loadingStartAt = performance.now() / 1000;
  loadingPaused = false;
  loadingPausedAt = 0;
  rageSkipTeleportPending = false;
  usedLoadingSkipThisRun = false;

  keys.left = false;
  keys.right = false;
  keys.fire = false;
  keys.spaceHeld = false;
  keys.jumpQueued = false;

  finish.classList.remove("visible");
  donatePopup.classList.remove("visible");
  robuxPopup?.classList.remove("visible");
  annoyPopup?.classList.remove("visible");
  modeOverlay.classList.remove("hidden");
  loadingOverlay?.classList.remove("hidden");
  if (loadingFill) {
    loadingFill.style.width = "0%";
  }
  if (loadingText) {
    loadingText.textContent = "preparing rage content";
  }
  if (nukeWheelSpinButton) {
    nukeWheelSpinButton.disabled = false;
  }
  if (nukeWheelResult) {
    nukeWheelResult.textContent = "ready";
  }
  if (loadingPauseButton) {
    loadingPauseButton.textContent = "Pause Loading";
  }
}

function showDonatePopup(): void {
  if (popupsMuted || donateVisible || robuxVisible || gameOver) {
    return;
  }
  donateVisible = true;
  donatePopup.classList.add("visible");
}

function hideDonatePopup(): void {
  if (!donateVisible) {
    return;
  }
  donateVisible = false;
  donatePopup.classList.remove("visible");
  nextDonatePopupAt = performance.now() / 1000 + 15;
}

function processDonation(amount: number): void {
  addSpent(amount);
  const methodLabel = donatePayMethod === "sad" ? ":(" : donatePayMethod;
  rewardText = `donated $${amount} via ${methodLabel}`;
  rewardTextUntil = performance.now() / 1000 + 2.2;
  hideDonatePopup();
}

function showRobuxPopup(): void {
  if (popupsMuted || robuxVisible || donateVisible || gameOver) {
    return;
  }
  robuxVisible = true;
  robuxPopup?.classList.add("visible");
}

function hideRobuxPopup(): void {
  if (!robuxVisible) {
    return;
  }
  robuxVisible = false;
  robuxPopup?.classList.remove("visible");
  nextRobuxPopupAt = performance.now() / 1000 + 60;
}

function processRobuxBuy(): void {
  if (adminInfiniteDollars) {
    rewardText = "robux bought for free (admin)";
    rewardTextUntil = performance.now() / 1000 + 2.2;
  } else {
    addSpent(15);
    rewardText = "bought robux for $15";
    rewardTextUntil = performance.now() / 1000 + 2.2;
  }
  hideRobuxPopup();
}

function showAnnoyPopup(): void {
  if (popupsMuted || annoyVisible || donateVisible || robuxVisible || gameOver) {
    return;
  }
  annoyVisible = true;
  annoyPopup?.classList.add("visible");
}

function hideAnnoyPopup(): void {
  if (!annoyVisible) {
    return;
  }
  annoyVisible = false;
  annoyPopup?.classList.remove("visible");
  nextAnnoyPopupAt = performance.now() / 1000 + 5;
}

function showMugaModePopup(): void {
  mugaModePopup?.classList.add("visible");
}

function hideMugaModePopup(): void {
  mugaModePopup?.classList.remove("visible");
}

function updateCoolAd(nowSec: number): void {
  if (nowSec >= nextCoolAdAt) {
    coolAdUntil = nowSec + 5;
    nextCoolAdAt += 30;
  }
  const visible = nowSec < coolAdUntil;
  coolAd.classList.toggle("visible", visible);
}

function scheduleNextReward(fromSec: number): void {
  nextRewardAt = fromSec + random(60, 600);
}

function applyStarReward(amount: number): void {
  if (gameOver || amount <= 0) {
    return;
  }
  starsCollected = Math.min(targetStars, starsCollected + amount);
  hud.textContent = `Stars: ${starsCollected} / ${targetStars}`;
  rewardText = `Reward: +${amount} stars`;
  rewardTextUntil = performance.now() / 1000 + 3.2;

  if (starsCollected >= targetStars) {
    gameOver = true;
    showEnding("good");
  }
}

function maybeGrantTimedReward(nowSec: number): void {
  if (gameOver || donateVisible || nowSec < nextRewardAt) {
    return;
  }

  const rewardStars = Math.floor(random(2, 9));
  applyStarReward(rewardStars);
  createExplosion(player.x + player.width / 2, player.y + 35);
  scheduleNextReward(nowSec);
}

function spawnFishAttack(): void {
  const targetY = Math.max(40, Math.min(canvas.height - 40, player.y + 64));
  activeFishAttack = {
    x: cameraX + canvas.width + 140,
    y: targetY + random(-32, 32),
    vx: -random(220, 320),
    vy: random(-40, 40),
    size: 170,
    life: 12,
  };
}

function updateFishAttack(dt: number): void {
  if (!activeFishAttack || gameOver) {
    return;
  }

  const fish = activeFishAttack;
  fish.life -= dt;
  if (fish.life <= 0) {
    activeFishAttack = null;
    return;
  }

  const targetX = player.x + player.width / 2;
  const targetY = player.y + 66;
  const dx = targetX - fish.x;
  const dy = targetY - fish.y;
  const dist = Math.max(1, Math.hypot(dx, dy));
  const steer = 470 * dt;
  fish.vx += (dx / dist) * steer;
  fish.vy += (dy / dist) * steer;

  const maxSpeed = 460;
  const speed = Math.hypot(fish.vx, fish.vy);
  if (speed > maxSpeed) {
    fish.vx = (fish.vx / speed) * maxSpeed;
    fish.vy = (fish.vy / speed) * maxSpeed;
  }

  fish.x += fish.vx * dt;
  fish.y += fish.vy * dt;
  fish.vx *= 0.996;
  fish.vy *= 0.996;

  const hit = circleIntersectsRect(
    fish.x,
    fish.y,
    fish.size * 0.3,
    player.x,
    player.y,
    player.width,
    player.height
  );

  if (hit) {
    createExplosion(fish.x, fish.y);
    rewardText = "haha";
    rewardTextUntil = performance.now() / 1000 + 2.1;
    damagePlayer(fishDamage, "fish");
    activeFishAttack = null;
  }
}

function updateSpikeDamage(nowSec: number): void {
  if (gameOver) {
    return;
  }

  if (nowSec - lastSpikeHitAt < 0.55) {
    return;
  }

  for (const spike of spikes) {
    const hit = circleIntersectsRect(
      player.x + player.width / 2,
      player.y + player.height - 8,
      14,
      spike.x,
      spike.y,
      spike.width,
      spike.height
    );
    if (hit) {
      lastSpikeHitAt = nowSec;
      damagePlayer(spikeDamage, "bad");
      createExplosion(spike.x + spike.width / 2, spike.y + spike.height / 2);
      break;
    }
  }
}

function updateMovingSpikes(nowSec: number): void {
  for (const spike of spikes) {
    if (
      spike.moveMinX === undefined ||
      spike.moveMaxX === undefined ||
      spike.moveSpeed === undefined ||
      spike.movePhase === undefined
    ) {
      continue;
    }

    const center = (spike.moveMinX + spike.moveMaxX) * 0.5;
    const amplitude = (spike.moveMaxX - spike.moveMinX) * 0.5;
    spike.x = center + Math.sin(nowSec * spike.moveSpeed + spike.movePhase) * amplitude;
  }
}

function triggerTrollPart(trollPart: TrollPart): void {
  trollPart.triggered = true;
  whiteFlashUntil = performance.now() / 1000 + 1.15;
  rewardText = "bro you cant handle this its to hard for eanyone";
  rewardTextUntil = performance.now() / 1000 + 2.8;
  void playBgmFromSources(trollTrackSources, false).then((played) => {
    if (played) {
      return;
    }
    rewardText = "add ./src/youll-never-see-it-coming.mp3";
    rewardTextUntil = performance.now() / 1000 + 2.8;
  });
}

function updateTrollParts(): void {
  if (gameOver) {
    return;
  }

  for (const trollPart of trollParts) {
    if (trollPart.triggered) {
      continue;
    }
    const footHit = circleIntersectsRect(
      player.x + player.width / 2,
      player.y + player.height - 8,
      16,
      trollPart.x,
      trollPart.y,
      trollPart.width,
      trollPart.height
    );
    const bodyHit =
      player.x + player.width > trollPart.x &&
      player.x < trollPart.x + trollPart.width &&
      player.y + player.height > trollPart.y &&
      player.y < trollPart.y + trollPart.height;
    const hit = footHit || bodyHit;
    if (hit) {
      triggerTrollPart(trollPart);
      break;
    }
  }
}

function collectStar(star: Star): void {
  if (star.collected) {
    return;
  }
  star.collected = true;
  starsCollected += 1;
  createExplosion(star.x, star.y);
  hud.textContent = `Stars: ${starsCollected} / ${targetStars}`;

  if (starsCollected >= targetStars) {
    gameOver = true;
    showEnding("good");
  }
}

function triggerNuke(): void {
  if (gameOver) {
    return;
  }

  addSpent(999.99);

  const centerX = cameraX + canvas.width / 2;
  const centerY = canvas.height / 2;
  createExplosion(centerX, centerY);

  for (let i = 0; i < 380; i += 1) {
    const angle = random(0, Math.PI * 2);
    const speed = random(140, 1250);
    particles.push({
      x: centerX + random(-120, 120),
      y: centerY + random(-90, 90),
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - random(0, 260),
      life: random(0.6, 1.9),
      maxLife: random(0.6, 1.9),
      size: random(2.5, 8.5),
      hue: random(8, 52),
    });
  }

  gameOver = true;
  showEnding("boom");
}

function spinNukeWheel(): void {
  if (!nukeWheelSpinButton || !nukeWheelResult || gameOver || nukeWheelSpinning) {
    return;
  }

  nukeWheelSpinning = true;
  nukeWheelSpinButton.disabled = true;
  nukeWheelResult.textContent = "spinning...";

  setTimeout(() => {
    const winChance = 0.001; // 0.1%
    const won = Math.random() < winChance;
    nukeWheelSpinning = false;
    nukeWheelSpinButton.disabled = false;

    if (won) {
      nukeWheelResult.textContent = "JACKPOT: NUKE";
      rewardText = "you hit the nuke jackpot";
      rewardTextUntil = performance.now() / 1000 + 2.2;
      triggerNuke();
      return;
    }

    nukeWheelResult.textContent = "no nuke. spin again.";
    rewardText = "no nuke this spin";
    rewardTextUntil = performance.now() / 1000 + 1.6;
  }, 900);
}

function fireGun(): void {
  const armAnchorY = player.y + 84;
  const gunX = player.x + player.width / 2 + gunSprite.offsetX;
  const gunY = armAnchorY + gunSprite.offsetY;
  const muzzleX = gunX + gunSprite.muzzleOffsetX;
  const muzzleY = gunY + gunSprite.muzzleOffsetY;
  bullets.push({
    x: muzzleX - 6,
    y: muzzleY,
    vx: 940,
    life: 0.9,
  });
  for (let i = 0; i < 6; i += 1) {
    particles.push({
      x: muzzleX,
      y: muzzleY,
      vx: random(90, 210),
      vy: random(-90, 90),
      life: random(0.08, 0.16),
      maxLife: random(0.08, 0.16),
      size: random(1.4, 3.2),
      hue: random(30, 55),
    });
  }
}

function updateGun(dt: number): void {
  if (!upgrades.gun) {
    bullets.length = 0;
    player.shootCooldown = 0;
    return;
  }

  player.shootCooldown = Math.max(0, player.shootCooldown - dt);
  if (keys.fire && player.shootCooldown <= 0) {
    fireGun();
    player.shootCooldown = 0.14;
  }

  for (let i = bullets.length - 1; i >= 0; i -= 1) {
    const bullet = bullets[i];
    bullet.x += bullet.vx * dt;
    bullet.life -= dt;

    if (bullet.life <= 0) {
      bullets.splice(i, 1);
      continue;
    }

    let hit = false;
    for (const star of stars) {
      if (star.collected) {
        continue;
      }
      const dx = star.x - bullet.x;
      const dy = star.y - bullet.y;
      if (dx * dx + dy * dy <= (star.radius + 6) * (star.radius + 6)) {
        collectStar(star);
        hit = true;
        break;
      }
    }

    if (hit) {
      bullets.splice(i, 1);
    }
  }
}

function updateStarsAndParticles(dt: number): void {
  const pickupMargin = 18;
  const pickupX = player.x - pickupMargin;
  const pickupY = player.y - pickupMargin;
  const pickupW = player.width + pickupMargin * 2;
  const pickupH = player.height + pickupMargin * 2;

  for (const star of stars) {
    if (star.collected) {
      continue;
    }

    if (circleIntersectsRect(star.x, star.y, star.radius, pickupX, pickupY, pickupW, pickupH)) {
      collectStar(star);
      continue;
    }
  }

  for (let i = particles.length - 1; i >= 0; i -= 1) {
    const p = particles[i];
    p.life -= dt;

    if (p.life <= 0) {
      particles.splice(i, 1);
      continue;
    }

    p.vy += 820 * dt;
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.vx *= 0.99;
  }
}

function drawParticles(): void {
  for (const p of particles) {
    const alpha = Math.max(0, p.life / p.maxLife);
    ctx.fillStyle = `hsla(${p.hue}, 100%, 55%, ${alpha})`;
    ctx.beginPath();
    ctx.arc(p.x - cameraX, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawBullets(): void {
  if (!upgrades.gun) {
    return;
  }

  for (const bullet of bullets) {
    const screenX = bullet.x - cameraX;
    if (screenX < -20 || screenX > canvas.width + 20) {
      continue;
    }

    ctx.fillStyle = "#181818";
    ctx.beginPath();
    ctx.arc(screenX, bullet.y, 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "#ffd35a";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(screenX - Math.sign(bullet.vx) * 8, bullet.y);
    ctx.lineTo(screenX - Math.sign(bullet.vx) * 16, bullet.y);
    ctx.stroke();
  }
}

function drawSpikes(): void {
  for (const spike of spikes) {
    const x = spike.x - cameraX;
    if (x + spike.width < -40 || x > canvas.width + 40) {
      continue;
    }
    ctx.fillStyle = "#cbcbcb";
    ctx.beginPath();
    ctx.moveTo(x, spike.y + spike.height);
    ctx.lineTo(x + spike.width * 0.5, spike.y);
    ctx.lineTo(x + spike.width, spike.y + spike.height);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "#5f5f5f";
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}

function drawTrollParts(): void {
  for (const trollPart of trollParts) {
    const x = trollPart.x - cameraX;
    if (x + trollPart.width < -40 || x > canvas.width + 40) {
      continue;
    }

    ctx.fillStyle = trollPart.triggered ? "rgba(230, 230, 230, 0.42)" : "rgba(255, 255, 255, 0.9)";
    ctx.fillRect(x, trollPart.y, trollPart.width, trollPart.height);
    ctx.strokeStyle = trollPart.triggered ? "#bdbdbd" : "#ff3030";
    ctx.lineWidth = 2.5;
    ctx.strokeRect(x, trollPart.y, trollPart.width, trollPart.height);

    if (!trollPart.triggered) {
      ctx.fillStyle = "#151515";
      ctx.font = "900 10px 'Comic Sans MS', 'Chalkboard SE', sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("TROLL", x + trollPart.width / 2, trollPart.y - 3);
      ctx.textAlign = "start";
    }
  }
}

function drawFishAttack(): void {
  if (!activeFishAttack) {
    return;
  }

  const fish = activeFishAttack;
  const x = fish.x - cameraX;
  const y = fish.y;
  const angle = Math.atan2(fish.vy, fish.vx);
  const w = fish.size;
  const h = fish.size * 0.54;

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  if (fishImage.complete && fishImage.naturalWidth > 0 && fishImage.naturalHeight > 0) {
    ctx.drawImage(fishImage, -w / 2, -h / 2, w, h);
  } else {
    ctx.fillStyle = "#d6efff";
    ctx.beginPath();
    ctx.ellipse(0, 0, w * 0.45, h * 0.45, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#5d8fbe";
    ctx.beginPath();
    ctx.moveTo(-w * 0.5, 0);
    ctx.lineTo(-w * 0.74, -h * 0.24);
    ctx.lineTo(-w * 0.74, h * 0.24);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#111";
    ctx.beginPath();
    ctx.arc(w * 0.22, -h * 0.1, h * 0.08, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#d34a4a";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(w * 0.03, h * 0.15);
    ctx.lineTo(w * 0.28, h * 0.15);
    ctx.stroke();
  }
  ctx.restore();
}

function drawPlayer(nowSec: number): void {
  const x = player.x - cameraX;
  const y = player.y;
  const moveIntensity = Math.min(1, Math.abs(player.vx) / Math.max(1, player.speed));
  const bob = Math.sin(nowSec * 9) * (1.2 + moveIntensity * 1.1);
  const centerX = x + player.width / 2;
  const spriteW = 104;
  const spriteH = 134;
  const spriteY = y + 8 + bob;

  ctx.fillStyle = "rgba(0, 0, 0, 0.18)";
  ctx.beginPath();
  ctx.ellipse(centerX, y + player.height - 2, 28, 9, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.save();
  ctx.translate(centerX, 0);
  ctx.scale(player.facing, 1);

  const avatarDrawable = getCurrentAvatarDrawable();
  if (
    avatarDrawable instanceof HTMLImageElement &&
    (!avatarDrawable.complete || avatarDrawable.naturalWidth <= 0 || avatarDrawable.naturalHeight <= 0)
  ) {
    ctx.fillStyle = currentAvatarKey === "muga" ? "#ffe45e" : currentAvatarKey === "console" ? "#b7f1ff" : "#ddd";
    ctx.fillRect(-spriteW / 2, spriteY, spriteW, spriteH);
    if (currentAvatarKey !== "default") {
      ctx.fillStyle = "#111";
      ctx.font = "900 18px 'Comic Sans MS', sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(currentAvatarKey.toUpperCase(), 0, spriteY + spriteH / 2);
      ctx.textAlign = "start";
    }
  } else {
    ctx.drawImage(avatarDrawable, -spriteW / 2, spriteY, spriteW, spriteH);
  }
  ctx.restore();

  if (upgrades.gun) {
    const gunX = centerX + 40;
    const gunY = spriteY + 58;
    if (gunImage.complete && gunImage.naturalWidth > 0 && gunImage.naturalHeight > 0) {
      ctx.drawImage(gunImage, gunX, gunY, gunSprite.width, gunSprite.height);
    } else {
      ctx.fillStyle = "#1e1e1e";
      ctx.fillRect(gunX, gunY, 36, 10);
    }
  }

  if (activeUsername) {
    const shownName = activeUsername.length > 18 ? `${activeUsername.slice(0, 18)}...` : activeUsername;
    const labelY = Math.max(20, spriteY - 10);
    ctx.font = "800 15px 'Comic Sans MS', 'Chalkboard SE', sans-serif";
    const textW = ctx.measureText(shownName).width;
    ctx.fillStyle = "rgba(0, 0, 0, 0.56)";
    ctx.fillRect(centerX - textW / 2 - 7, labelY - 16, textW + 14, 20);
    ctx.strokeStyle = "#ffe27d";
    ctx.lineWidth = 2;
    ctx.strokeRect(centerX - textW / 2 - 7, labelY - 16, textW + 14, 20);
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.fillText(shownName, centerX, labelY);
    ctx.textAlign = "start";
  }
}

function drawBackground(nowSec: number): void {
  if (currentBackgroundKey === "muga") {
    const tile = 160;
    ctx.fillStyle = "#f0f0f0";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    if (mugaAvatarImage.complete && mugaAvatarImage.naturalWidth > 0 && mugaAvatarImage.naturalHeight > 0) {
      for (let y = -tile; y < canvas.height + tile; y += tile) {
        for (let x = -tile; x < canvas.width + tile; x += tile) {
          const wobble = Math.sin((x + y + nowSec * 120) * 0.01) * 6;
          ctx.drawImage(mugaAvatarImage, x + wobble, y, tile, tile);
        }
      }
    } else {
      ctx.fillStyle = "#ffe45e";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    return;
  }

  if (currentBackgroundKey === "dark") {
    ctx.fillStyle = "#0a0a0a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < 10; i += 1) {
      const baseX = ((i * 140 - cameraX * 0.12) % (canvas.width + 180)) - 90;
      const baseY = canvas.height - 40 - (i % 3) * 16;
      const flameH = 80 + Math.sin(nowSec * 6 + i) * 14;
      const grad = ctx.createLinearGradient(baseX, baseY - flameH, baseX, baseY);
      grad.addColorStop(0, "rgba(255,210,80,0.9)");
      grad.addColorStop(0.5, "rgba(255,90,10,0.8)");
      grad.addColorStop(1, "rgba(150,20,0,0.6)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(baseX, baseY);
      ctx.quadraticCurveTo(baseX - 20, baseY - flameH * 0.4, baseX, baseY - flameH);
      ctx.quadraticCurveTo(baseX + 20, baseY - flameH * 0.4, baseX, baseY);
      ctx.fill();
    }

    for (let i = 0; i < 6; i += 1) {
      const skullX = ((i * 220 - cameraX * 0.08) % (canvas.width + 260)) - 120;
      const skullY = 80 + (i % 3) * 70 + Math.sin(nowSec * 2 + i) * 6;
      ctx.fillStyle = "rgba(235,235,235,0.8)";
      ctx.beginPath();
      ctx.arc(skullX, skullY, 24, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#111";
      ctx.beginPath();
      ctx.arc(skullX - 8, skullY - 3, 4, 0, Math.PI * 2);
      ctx.arc(skullX + 8, skullY - 3, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillRect(skullX - 5, skullY + 8, 10, 5);
    }
    return;
  }

  if (currentBackgroundKey === "donut") {
    const pink = ctx.createLinearGradient(0, 0, 0, canvas.height);
    pink.addColorStop(0, "#ff9bd2");
    pink.addColorStop(1, "#ffc8e8");
    ctx.fillStyle = pink;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < 12; i += 1) {
      const x = ((i * 140 - cameraX * 0.1) % (canvas.width + 180)) - 90;
      const y = 70 + (i % 4) * 72 + Math.sin(nowSec * 2.5 + i) * 8;
      const hue = (i * 37 + Math.floor(nowSec * 10)) % 360;
      ctx.fillStyle = `hsl(${hue}, 85%, 65%)`;
      ctx.beginPath();
      ctx.arc(x, y, 26, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#ffd8f3";
      ctx.beginPath();
      ctx.arc(x, y, 11, 0, Math.PI * 2);
      ctx.fill();
      for (let s = 0; s < 6; s += 1) {
        const a = (Math.PI * 2 * s) / 6 + nowSec * 0.5;
        ctx.strokeStyle = `hsl(${(hue + s * 25) % 360}, 95%, 45%)`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x + Math.cos(a) * 15, y + Math.sin(a) * 15);
        ctx.lineTo(x + Math.cos(a) * 23, y + Math.sin(a) * 23);
        ctx.stroke();
      }
    }
    return;
  }

  const sky = ctx.createLinearGradient(0, 0, 0, canvas.height);
  sky.addColorStop(0, "#90d9ff");
  sky.addColorStop(1, "#ddf7ff");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const cloudSpeed = 0.07;
  for (let i = 0; i < 5; i += 1) {
    const baseX = ((i * 260 - cameraX * cloudSpeed) % (canvas.width + 340)) - 170;
    const y = 70 + (i % 3) * 44 + Math.sin(nowSec + i) * 6;

    ctx.fillStyle = "rgba(255, 255, 255, 0.74)";
    ctx.beginPath();
    ctx.arc(baseX, y, 26, 0, Math.PI * 2);
    ctx.arc(baseX + 28, y - 9, 33, 0, Math.PI * 2);
    ctx.arc(baseX + 62, y, 22, 0, Math.PI * 2);
    ctx.fill();
  }
}

function cleanupWorld(): void {
  const leftEdge = cameraX - 700;

  while (platforms.length > 1 && platforms[0].x + platforms[0].width < leftEdge) {
    platforms.shift();
  }

  for (let i = stars.length - 1; i >= 0; i -= 1) {
    if (stars[i].x < leftEdge) {
      stars.splice(i, 1);
    }
  }

  for (let i = spikes.length - 1; i >= 0; i -= 1) {
    if (spikes[i].x + spikes[i].width < leftEdge) {
      spikes.splice(i, 1);
    }
  }

  for (let i = trollParts.length - 1; i >= 0; i -= 1) {
    if (trollParts[i].x + trollParts[i].width < leftEdge) {
      trollParts.splice(i, 1);
    }
  }
}

function render(nowSec: number): void {
  const inRagePart = ragePartTriggered && player.x >= ragePartStartX - 180 && player.x <= ragePartEndX + 180;
  const shakeX = inRagePart ? Math.sin(nowSec * 95) * 6.4 + Math.sin(nowSec * 33) * 3.1 : 0;
  const shakeY = inRagePart ? Math.cos(nowSec * 88) * 5.6 + Math.sin(nowSec * 41) * 2.2 : 0;

  ctx.save();
  ctx.translate(shakeX, shakeY);
  drawBackground(nowSec);

  for (const platform of platforms) {
    drawPlatform(platform);
  }

  drawSpikes();
  drawTrollParts();
  drawStars(nowSec);
  drawParticles();
  drawBullets();
  drawFishAttack();
  drawPlayer(nowSec);
  ctx.restore();

  if (nowSec < whiteFlashUntil) {
    const intensity = Math.max(0, Math.min(1, (whiteFlashUntil - nowSec) / 1.15));
    ctx.fillStyle = `rgba(255, 255, 255, ${0.55 + intensity * 0.45})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  if (inRagePart) {
    const pulse = (Math.sin(nowSec * 12) + 1) * 0.5;
    ctx.fillStyle = `rgba(255, 0, 0, ${0.08 + pulse * 0.12})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#ffffff";
    ctx.font = "900 48px 'Comic Sans MS', 'Chalkboard SE', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(currentRageVariant === "moving_spikes" ? "RAGE PART 2" : "RAGE PART", canvas.width / 2, 78);
    ctx.fillStyle = "#ff2b2b";
    ctx.font = "900 30px 'Comic Sans MS', 'Chalkboard SE', sans-serif";
    ctx.fillText("it took 10 hours", canvas.width / 2, 112);
    ctx.textAlign = "start";
  }

  if (nowSec < rewardTextUntil) {
    const isImpatientText = rewardText.toLowerCase().includes("bruh why u so impatient");
    const boxW = isImpatientText ? 420 : 216;
    const boxH = isImpatientText ? 52 : 34;
    const textY = isImpatientText ? 47 : 37;
    const font = isImpatientText
      ? "900 30px 'Comic Sans MS', 'Chalkboard SE', sans-serif"
      : "700 18px 'Comic Sans MS', 'Chalkboard SE', sans-serif";
    ctx.fillStyle = "rgba(0, 0, 0, 0.62)";
    ctx.fillRect(canvas.width / 2 - boxW / 2, 14, boxW, boxH);
    ctx.strokeStyle = "#ffe27d";
    ctx.lineWidth = 2;
    ctx.strokeRect(canvas.width / 2 - boxW / 2, 14, boxW, boxH);
    ctx.fillStyle = "#fff";
    ctx.font = font;
    ctx.textAlign = "center";
    ctx.fillText(rewardText, canvas.width / 2, textY);
    ctx.textAlign = "start";
  }
}

let last = performance.now();
function gameLoop(now: number): void {
  const dt = Math.min(0.033, (now - last) / 1000);
  last = now;
  const nowSec = now / 1000;

  if (!authenticated) {
    render(nowSec);
    requestAnimationFrame(gameLoop);
    return;
  }

  if (!gameStarted) {
    updateLoadingScreen(nowSec);
    coolAd.classList.remove("visible");
    render(nowSec);
    requestAnimationFrame(gameLoop);
    return;
  }

  updateCoolAd(nowSec);
  maybeTriggerRagePart(nowSec);

  if (!popupsMuted && !gameOver && !donateVisible && !robuxVisible && nowSec >= nextDonatePopupAt) {
    showDonatePopup();
  }
  if (!popupsMuted && !gameOver && !donateVisible && !robuxVisible && nowSec >= nextRobuxPopupAt) {
    showRobuxPopup();
  }
  if (!popupsMuted && !gameOver && !donateVisible && !robuxVisible && !annoyVisible && nowSec >= nextAnnoyPopupAt) {
    showAnnoyPopup();
  }
  maybeGrantTimedReward(nowSec);
  updateFishAttack(dt);
  updateMovingSpikes(nowSec);
  updateSpikeDamage(nowSec);
  updateTrollParts();

  if (!gameOver) {
    updatePlayer(dt);
    updateGun(dt);
    updateCamera(dt);
    queueWorldGeneration();
    updateStarsAndParticles(dt);
    cleanupWorld();
  } else {
    updateGun(dt);
    updateStarsAndParticles(dt);
  }

  render(nowSec);
  requestAnimationFrame(gameLoop);
}

window.addEventListener("resize", () => {
  const prevHeight = canvas.height;
  resizeCanvas();

  if (prevHeight !== 0) {
    const delta = canvas.height - prevHeight;
    for (const platform of platforms) {
      platform.y += delta;
    }
    for (const star of stars) {
      star.y += delta;
    }
    player.y += delta;
  }
});

window.addEventListener("keydown", (event) => {
  if (!authenticated) {
    return;
  }
  tryStartMusic();
  if (event.code === "ArrowLeft") {
    keys.left = true;
    event.preventDefault();
  }
  if (event.code === "ArrowRight") {
    keys.right = true;
    event.preventDefault();
  }
  if (event.code === "Space") {
    keys.spaceHeld = true;
    keys.jumpQueued = true;
    event.preventDefault();
  }
  if (event.code === "KeyF") {
    keys.fire = true;
    event.preventDefault();
  }
});

window.addEventListener("pointerdown", () => {
  if (!authenticated) {
    return;
  }
  tryStartMusic();
});

loadingSkipButton?.addEventListener("click", () => {
  handleLoadingSkip();
});

loadingPauseButton?.addEventListener("click", () => {
  toggleLoadingPause();
});

authSubmitButton?.addEventListener("click", () => {
  submitAuth();
});

authSavePasswordButton?.addEventListener("click", () => {
  const password = authPasswordInput?.value ?? "";
  if (!password) {
    setAuthMessage("enter password first");
    return;
  }
  savePassword(password);
});

authForgotButton?.addEventListener("click", () => {
  showForgotPasswords();
});

authNewAccountButton?.addEventListener("click", () => {
  createNewAccountFlow();
});

serverCreateButton?.addEventListener("click", () => {
  if (!activeUsername) {
    setServerMessage("log in first");
    return;
  }
  const name = normalizeServerName(serverNameInput?.value ?? "");
  if (!name) {
    setServerMessage("enter server name");
    return;
  }
  const servers = readServersForUser(activeUsername);
  if (servers.includes(name)) {
    setServerMessage("server already exists");
    return;
  }
  servers.push(name);
  writeServersForUser(activeUsername, servers);
  renderServerList();
  setServerMessage(`created server: ${name}`);
});

serverJoinButton?.addEventListener("click", () => {
  if (!activeUsername) {
    setServerMessage("log in first");
    return;
  }
  const name = normalizeServerName(serverNameInput?.value ?? "");
  if (!name) {
    setServerMessage("enter server name");
    return;
  }
  const servers = readServersForUser(activeUsername);
  if (!servers.includes(name)) {
    setServerMessage("server not found. create it first.");
    return;
  }
  joinServer(name);
});

serverNameInput?.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    serverJoinButton?.click();
  }
});

authPasswordInput?.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    submitAuth();
  }
});

window.addEventListener("keyup", (event) => {
  if (event.code === "ArrowLeft") {
    keys.left = false;
    event.preventDefault();
  }
  if (event.code === "ArrowRight") {
    keys.right = false;
    event.preventDefault();
  }
  if (event.code === "Space") {
    keys.spaceHeld = false;
    event.preventDefault();
  }
  if (event.code === "KeyF") {
    keys.fire = false;
    event.preventDefault();
  }
});

buyGunButton.addEventListener("click", () => {
  if (upgrades.gun) {
    return;
  }
  upgrades.gun = true;
  addSpent(4.99);
  buyGunButton.disabled = true;
  buyGunButton.textContent = "Gun Purchased";
});

buyJetpackButton.addEventListener("click", () => {
  if (upgrades.jetpack) {
    return;
  }
  upgrades.jetpack = true;
  addSpent(9.99);
  buyJetpackButton.disabled = true;
  buyJetpackButton.textContent = "Jetpack Purchased";
});

buySpeedButton.addEventListener("click", () => {
  buySpeedUpgrade();
});

mutePopupsButton.addEventListener("click", () => {
  togglePopupMute();
});

avatarDefaultButton.addEventListener("click", () => {
  setAvatarSkin("default");
});

avatarMugaButton.addEventListener("click", () => {
  setAvatarSkin("muga");
});

avatarConsoleButton.addEventListener("click", () => {
  setAvatarSkin("console");
});

avatarSaveButton.addEventListener("click", () => {
  saveAvatarSkin();
});

avatarLoadButton.addEventListener("click", () => {
  loadSavedAvatarSkin();
});

bgDefaultButton.addEventListener("click", () => {
  setBackgroundTheme("default");
});

bgMugaButton.addEventListener("click", () => {
  setBackgroundTheme("muga");
});

bgDarkButton.addEventListener("click", () => {
  setBackgroundTheme("dark");
});

bgDonutButton.addEventListener("click", () => {
  setBackgroundTheme("donut");
});

scamButton.addEventListener("click", () => {
  scamButton.textContent = "Get scammed!!!!!!!!!!!!!!!!";
  rewardText = "Get scammed!!!!!!!!!!!!!!!!";
  rewardTextUntil = performance.now() / 1000 + 2.8;
});

nukeButton.addEventListener("click", () => {
  triggerNuke();
});

nukeWheelSpinButton?.addEventListener("click", () => {
  spinNukeWheel();
});

donateCloseButton.addEventListener("click", () => {
  hideDonatePopup();
  spawnFishAttack();
});

robuxCloseButton?.addEventListener("click", () => {
  hideRobuxPopup();
});

robuxBuyButton?.addEventListener("click", () => {
  processRobuxBuy();
});

annoyCloseButton?.addEventListener("click", () => {
  hideAnnoyPopup();
});

for (const button of donateOptionButtons) {
  button.addEventListener("click", () => {
    const amount = Number.parseFloat(button.dataset.amount ?? "0");
    if (Number.isFinite(amount) && amount > 0) {
      processDonation(amount);
    } else {
      hideDonatePopup();
    }
  });
}

for (const button of payMethodButtons) {
  button.addEventListener("click", () => {
    donatePayMethod = (button.dataset.method ?? "card") as "card" | "cash" | "sad";
    for (const b of payMethodButtons) {
      b.classList.toggle("active", b === button);
    }
  });
}

muteButton.addEventListener("click", () => {
  toggleMute();
});

sheepMuteButton.addEventListener("click", () => {
  toggleSheepMute();
});

skipRageButton?.addEventListener("click", () => {
  skipRagePart();
});

modeEasyButton.addEventListener("click", () => {
  startGame("easy");
});

modeSuperEasyButton?.addEventListener("click", () => {
  startGame("super_easy");
});

modeSuperDuperMugaEasyButton?.addEventListener("click", () => {
  alert("bro this is to easy");
});

modeMediumButton.addEventListener("click", () => {
  startGame("medium");
});

modeMugaButton?.addEventListener("click", () => {
  showMugaModePopup();
});

modeDangerButton.addEventListener("click", () => {
  startGame("danger");
});

mugaModeCloseButton?.addEventListener("click", () => {
  hideMugaModePopup();
});

adminToggleButton.addEventListener("click", () => {
  toggleAdminPanel();
});

endingsButton?.addEventListener("click", () => {
  toggleEndingsPanel();
});

shopToggleButton?.addEventListener("click", () => {
  toggleShopPanel();
});

adminInfiniteButton.addEventListener("click", () => {
  toggleAdminInfiniteDollars();
});

adminPowerButton.addEventListener("click", () => {
  activateAdminPower();
});

finishBackButton.addEventListener("click", () => {
  goBackToLoadingScreen();
});

bankruptButton.addEventListener("click", () => {
  triggerBankruptEnding();
});

resizeCanvas();
hud.textContent = `Stars: ${starsCollected} / ${targetStars}`;
updateSpendLabel();
updateSpeedButtonLabel();
updateHealthBar();
updateMuteButtonLabel();
updateSheepMuteButtonLabel();
updateMutePopupsButtonLabel();
updateShopToggleButtonLabel();
updateAdminPanelUI();
updateEndingsPanel();
setAvatarSkin(getAvatarKeyFromStorage(localStorage.getItem(avatarStorageKey)));
updateBackgroundStatus();
initAuthGate();
requestAnimationFrame(gameLoop);
