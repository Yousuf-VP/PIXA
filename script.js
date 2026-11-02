/* =====================================================
   PIXAFORGE — MAIN WEBSITE
   COOKIE EMPEROR — KINGDOM MANAGEMENT ENGINE
===================================================== */

/* =========================
   1. WEBSITE NAVIGATION
========================= */

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

menuToggle?.addEventListener("click", () => {
    const open = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
});

mainNav?.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        mainNav.classList.remove("open");
        menuToggle?.setAttribute("aria-expanded", "false");
    });
});

const cursorGlow = document.querySelector(".cursor-glow");

if (cursorGlow && window.matchMedia("(hover:hover)").matches) {
    window.addEventListener("pointermove", event => {
        cursorGlow.style.left = `${event.clientX}px`;
        cursorGlow.style.top = `${event.clientY}px`;
    });
}

console.log("PIXAFORGE initialized.");


/* =========================
   2. GAME ELEMENTS
========================= */

const $ = id => document.getElementById(id);

const gameOverlay = $("gameOverlay");
const closeGameButton = $("closeGame");
const giantCookie = $("giantCookie");

const cookieBalanceElement = $("cookieBalance");
const cookieCpsElement = $("cookieCps");
const empireLevelElement = $("empireLevel");
const empireRankElement = $("empireRank");

const clickPowerElement = $("clickPower");
const kingdomTitleElement = $("kingdomTitle");
const kingdomQuoteElement = $("kingdomQuote");

const levelProgressText = $("levelProgressText");
const levelProgressBar = $("levelProgressBar");

const storeContent = $("storeContent");
const storeTabs = document.querySelectorAll(".store-tab");

const achievementCountElement = $("achievementCount");
const saveIndicator = $("saveIndicator");

const settingsModal = $("settingsModal");
const gameSettingsButton = $("gameSettings");
const closeSettingsButton = $("closeSettings");
const settingsDoneButton = $("settingsDone");

const resetGameButton = $("resetGame");
const toastContainer = $("toastContainer");

const eventBanner = $("eventBanner");
const eventText = $("eventText");


/* =========================
   3. GAME CONFIGURATION
========================= */

const SAVE_KEY = "pixaforge_cookie_emperor_v2";

const BUILDINGS = [
    {
        id: "bakery",
        name: "Tiny Bakery",
        icon: "🏠",
        description: "Your first cookie production building.",
        baseCost: 30,
        production: 0.5,
        workersRequired: 1,
        buildTime: 5 * 60
    },
    {
        id: "farm",
        name: "Cookie Farm",
        icon: "🌾",
        description: "Grow ingredients for the kingdom.",
        baseCost: 180,
        production: 2,
        workersRequired: 2,
        buildTime: 8 * 60
    },
    {
        id: "oven",
        name: "Royal Oven",
        icon: "🔥",
        description: "Bake large batches of royal cookies.",
        baseCost: 800,
        production: 8,
        workersRequired: 3,
        buildTime: 12 * 60
    },
    {
        id: "factory",
        name: "Cookie Factory",
        icon: "🏭",
        description: "Mass-produce cookies automatically.",
        baseCost: 4000,
        production: 35,
        workersRequired: 5,
        buildTime: 18 * 60
    },
    {
        id: "mine",
        name: "Cookie Mine",
        icon: "⛏️",
        description: "Extract rare ingredients underground.",
        baseCost: 18000,
        production: 150,
        workersRequired: 8,
        buildTime: 25 * 60
    },
    {
        id: "generator",
        name: "Enchanted Generator",
        icon: "🔮",
        description: "Use ancient magic to produce cookies.",
        baseCost: 90000,
        production: 700,
        workersRequired: 12,
        buildTime: 35 * 60
    },
    {
        id: "laboratory",
        name: "Royal Dessert Laboratory",
        icon: "🧪",
        description: "Research the future of cookie production.",
        baseCost: 450000,
        production: 3200,
        workersRequired: 18,
        buildTime: 50 * 60
    }
];

const UPGRADES = [
    {
        id: "strongHands",
        name: "Stronger Hands",
        icon: "💪",
        description: "Double your cookies per click.",
        cost: 100,
        type: "click",
        multiplier: 2
    },
    {
        id: "secretRecipe",
        name: "Secret Recipe",
        icon: "📜",
        description: "Increase all building production by 50%.",
        cost: 350,
        type: "production",
        multiplier: 1.5
    },
    {
        id: "goldenOven",
        name: "Golden Oven",
        icon: "♨️",
        description: "Double building production.",
        cost: 1200,
        type: "production",
        multiplier: 2
    },
    {
        id: "royalGloves",
        name: "Royal Baking Gloves",
        icon: "🧤",
        description: "Triple your clicking power.",
        cost: 2500,
        type: "click",
        multiplier: 3
    },
    {
        id: "cookieAlchemy",
        name: "Cookie Alchemy",
        icon: "✨",
        description: "Increase production by 75%.",
        cost: 8000,
        type: "production",
        multiplier: 1.75
    },
    {
        id: "royalEngineering",
        name: "Royal Engineering",
        icon: "⚙️",
        description: "Double building production.",
        cost: 25000,
        type: "production",
        multiplier: 2
    },
    {
        id: "emperorTouch",
        name: "Emperor's Touch",
        icon: "👑",
        description: "Five times more cookies per click.",
        cost: 100000,
        type: "click",
        multiplier: 5
    },
    {
        id: "grandBakery",
        name: "Grand Bakery Design",
        icon: "🏰",
        description: "Triple all building production.",
        cost: 350000,
        type: "production",
        multiplier: 3
    }
];

const ACHIEVEMENTS = [
    {
        id: "firstCookie",
        name: "First Batch",
        icon: "🍪",
        description: "Earn your first cookie.",
        condition: s => s.totalEarned >= 1
    },
    {
        id: "hundred",
        name: "Cookie Collector",
        icon: "🧺",
        description: "Earn 100 cookies.",
        condition: s => s.totalEarned >= 100
    },
    {
        id: "thousand",
        name: "Cookie Merchant",
        icon: "💰",
        description: "Earn 1,000 cookies.",
        condition: s => s.totalEarned >= 1000
    },
    {
        id: "tenThousand",
        name: "Baking Business",
        icon: "🏪",
        description: "Earn 10,000 cookies.",
        condition: s => s.totalEarned >= 10000
    },
    {
        id: "firstBuilding",
        name: "First Investment",
        icon: "🏠",
        description: "Complete your first building.",
        condition: s => totalBuildings(s) >= 1
    },
    {
        id: "tenBuildings",
        name: "Building an Empire",
        icon: "🏗️",
        description: "Complete 10 buildings.",
        condition: s => totalBuildings(s) >= 10
    },
    {
        id: "firstWorker",
        name: "The First Employee",
        icon: "👷",
        description: "Hire your first worker.",
        condition: s => s.workers >= 1
    },
    {
        id: "tenWorkers",
        name: "Growing Workforce",
        icon: "👥",
        description: "Hire 10 workers.",
        condition: s => s.workers >= 10
    },
    {
        id: "firstUpgrade",
        name: "Research Begins",
        icon: "📜",
        description: "Purchase your first upgrade.",
        condition: s => s.upgrades.length >= 1
    },
    {
        id: "levelFive",
        name: "Rising Monarch",
        icon: "👑",
        description: "Reach empire level 5.",
        condition: s => s.level >= 5
    }
];

const RANKS = [
    { level: 1, name: "APPRENTICE BAKER" },
    { level: 2, name: "COOKIE MERCHANT" },
    { level: 3, name: "MASTER BAKER" },
    { level: 4, name: "DUKE OF DOUGH" },
    { level: 5, name: "ROYAL GOVERNOR" },
    { level: 7, name: "COOKIE MONARCH" },
    { level: 10, name: "COOKIE EMPEROR" }
];

const CONTRACTS = [
    {
        name: "The First Royal Order",
        description: "Earn 100 cookies in total.",
        target: 100,
        type: "earned",
        reward: 75
    },
    {
        name: "Expand the Workforce",
        description: "Hire 3 workers.",
        target: 3,
        type: "workers",
        reward: 250
    },
    {
        name: "A Growing Kingdom",
        description: "Complete 3 buildings.",
        target: 3,
        type: "buildings",
        reward: 500
    },
    {
        name: "Royal Production",
        description: "Reach 10 cookies per second.",
        target: 10,
        type: "production",
        reward: 1500
    },
    {
        name: "The Cookie Empire",
        description: "Earn 10,000 cookies in total.",
        target: 10000,
        type: "earned",
        reward: 5000
    }
];

const ROYAL_EVENTS = [
    {
        name: "Golden Cookie Rush",
        description: "Production doubled for 25 seconds!",
        multiplier: 2,
        duration: 25
    },
    {
        name: "Royal Bakery Festival",
        description: "Production tripled for 20 seconds!",
        multiplier: 3,
        duration: 20
    },
    {
        name: "Cookie Storm",
        description: "A cookie storm! Production doubled for 30 seconds!",
        multiplier: 2,
        duration: 30
    }
];


/* =========================
   4. GAME STATE
========================= */

function defaultState() {
    return {
        cookies: 0,
        totalEarned: 0,
        clickPower: 1,
        level: 1,

        buildings: {},
        workers: 0,
        workerSkill: 1,

        upgrades: [],
        achievements: [],

        construction: null,

        contractIndex: 0,
        completedContracts: [],

        activeTab: "buildings",

        lastSavedAt: Date.now()
    };
}

let state = defaultState();

let gameInterval = null;
let saveInterval = null;
let eventInterval = null;

let gameIsRunning = false;

let activeEvent = null;
let lastEventCheck = Date.now();
let lastRender = 0;
let notifiedContractIndex = null;


/* =========================
   5. HELPERS
========================= */

function totalBuildings(s = state) {
    return Object.values(s.buildings)
        .reduce((sum, amount) => sum + amount, 0);
}

function totalCookies(number) {
    if (!Number.isFinite(number)) return "0";

    if (number < 1000) {
        return number % 1 === 0
            ? Math.floor(number).toString()
            : number.toFixed(1);
    }

    const units = [
        [1e3, "K"],
        [1e6, "M"],
        [1e9, "B"],
        [1e12, "T"],
        [1e15, "Qa"],
        [1e18, "Qi"]
    ];

    for (let i = units.length - 1; i >= 0; i--) {
        if (number >= units[i][0]) {
            return (number / units[i][0]).toFixed(2) + units[i][1];
        }
    }

    return Math.floor(number).toString();
}

function formatTime(seconds) {
    seconds = Math.max(0, Math.ceil(seconds));

    const minutes = Math.floor(seconds / 60);
    const remaining = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(remaining).padStart(2, "0")}`;
}

function showToast(message) {
    if (!toastContainer) return;

    const toast = document.createElement("div");

    toast.className = "game-toast";
    toast.textContent = message;

    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateX(15px)";

        setTimeout(() => toast.remove(), 300);
    }, 2600);
}


/* =========================
   6. SAVE AND LOAD
========================= */

function saveGame() {
    try {
        state.lastSavedAt = Date.now();

        localStorage.setItem(SAVE_KEY, JSON.stringify(state));

        if (saveIndicator) {
            saveIndicator.innerHTML = "<i></i> SAVED LOCALLY";
        }
    } catch (error) {
        console.error("Save failed:", error);

        if (saveIndicator) {
            saveIndicator.textContent = "SAVE ERROR";
        }
    }
}

function loadGame() {
    try {
        const raw = localStorage.getItem(SAVE_KEY);

        if (!raw) {
            state = defaultState();
            return;
        }

        const parsed = JSON.parse(raw);

        if (!parsed || typeof parsed !== "object") {
            throw new Error("Invalid save data.");
        }

        state = {
            ...defaultState(),
            ...parsed,

            buildings: {
                ...defaultState().buildings,
                ...(parsed.buildings || {})
            },

            upgrades: Array.isArray(parsed.upgrades)
                ? parsed.upgrades.filter(id =>
                    UPGRADES.some(item => item.id === id)
                )
                : [],

            achievements: Array.isArray(parsed.achievements)
                ? parsed.achievements.filter(id =>
                    ACHIEVEMENTS.some(item => item.id === id)
                )
                : [],

            completedContracts: Array.isArray(parsed.completedContracts)
                ? parsed.completedContracts.filter(index =>
                    Number.isInteger(index) &&
                    index >= 0 &&
                    index < CONTRACTS.length
                )
                : []
        };

        state.cookies = Math.max(0, Number(state.cookies) || 0);
        state.totalEarned = Math.max(0, Number(state.totalEarned) || 0);
        state.clickPower = Math.max(1, Number(state.clickPower) || 1);
        state.level = Math.max(1, Number(state.level) || 1);
        state.workers = Math.max(0, Math.floor(Number(state.workers) || 0));
        state.workerSkill = Math.max(1, Math.floor(Number(state.workerSkill) || 1));

        for (const building of BUILDINGS) {
            state.buildings[building.id] =
                Math.max(0, Math.floor(Number(state.buildings[building.id]) || 0));
        }

        state.contractIndex = Math.max(
            0,
            Math.min(
                CONTRACTS.length,
                Math.floor(Number(state.contractIndex) || 0)
            )
        );

        if (
            state.construction &&
            (
                !BUILDINGS.some(b => b.id === state.construction.buildingId) ||
                !Number.isFinite(state.construction.completesAt) ||
                !Number.isFinite(state.construction.duration)
            )
        ) {
            state.construction = null;
        }

        if (!["buildings", "workforce", "upgrades", "achievements"].includes(state.activeTab)) {
            state.activeTab = "buildings";
        }

    } catch (error) {
        console.error("Load failed:", error);

        state = defaultState();
        showToast("Could not read the previous save. New save started.");
    }
}


/* =========================
   7. OFFLINE PROGRESS
========================= */

function applyOfflineProgress() {
    const previousTime = Number(state.lastSavedAt) || Date.now();
    const now = Date.now();

    const elapsed = Math.max(
        0,
        Math.min((now - previousTime) / 1000, 8 * 60 * 60)
    );

    // Only count offline production after the construction
    // has actually completed.
    let productiveSeconds = elapsed;

    if (state.construction) {
        const completionTime = state.construction.completesAt;
        const offlinePeriodStart = now - elapsed * 1000;

        if (completionTime > now) {
            productiveSeconds = 0;
        } else if (completionTime > offlinePeriodStart) {
            productiveSeconds = Math.max(
                0,
                (now - completionTime) / 1000
            );
        }

        completeConstructionIfReady();
    }

    const offlineProduction =
        getProductionPerSecond() * productiveSeconds * 0.5;

    if (offlineProduction > 0) {
        state.cookies += offlineProduction;
        state.totalEarned += offlineProduction;

        showToast(
            `Welcome back! Your kingdom earned ${totalCookies(offlineProduction)} cookies.`
        );
    }

    checkLevelUp();
    checkAchievements();
    checkContracts();

    saveGame();
}


/* =========================
   8. BUILDING ECONOMY
========================= */

function getBuildingCost(building) {
    const owned = state.buildings[building.id] || 0;

    return Math.floor(
        building.baseCost * Math.pow(1.16, owned)
    );
}

function getBuildingMultiplier() {
    return state.upgrades.reduce((multiplier, id) => {
        const upgrade = UPGRADES.find(item => item.id === id);

        if (upgrade?.type === "production") {
            return multiplier * upgrade.multiplier;
        }

        return multiplier;
    }, 1);
}

function getWorkerMultiplier() {
    return 1 + (state.workerSkill - 1) * 0.2;
}

function getStaffing() {
    let workersRemaining = state.workers;
    const result = {};

    for (const building of BUILDINGS) {
        const owned = state.buildings[building.id] || 0;
        const required = owned * building.workersRequired;

        const assigned = Math.min(required, workersRemaining);

        workersRemaining -= assigned;

        result[building.id] = {
            assigned,
            required,
            ratio: required > 0 ? assigned / required : 0
        };
    }

    return result;
}

function getProductionPerSecond() {
    const staffing = getStaffing();
    const buildingMultiplier = getBuildingMultiplier();
    const workerMultiplier = getWorkerMultiplier();

    let production = 0;

    for (const building of BUILDINGS) {
        const owned = state.buildings[building.id] || 0;
        const staffRatio = staffing[building.id].ratio;

        production +=
            owned *
            building.production *
            staffRatio *
            buildingMultiplier *
            workerMultiplier;
    }

    if (activeEvent && activeEvent.endsAt > Date.now()) {
        production *= activeEvent.multiplier;
    }

    return production;
}


/* =========================
   9. CONSTRUCTION SYSTEM
========================= */

function startConstruction(buildingId) {
    const building = BUILDINGS.find(item => item.id === buildingId);

    if (!building) return;

    if (state.construction) {
        showToast("Your construction team is already busy!");
        return;
    }

    const cost = getBuildingCost(building);

    if (state.cookies < cost) {
        showToast("Not enough cookies for construction!");
        return;
    }

    const owned = state.buildings[building.id] || 0;

    const duration = Math.floor(
        building.buildTime * (1 + owned * 0.15)
    );

    state.cookies -= cost;

    state.construction = {
        buildingId,
        startedAt: Date.now(),
        completesAt: Date.now() + duration * 1000,
        duration
    };

    showToast(`${building.name} construction started!`);

    updateGame();
}

function completeConstructionIfReady() {
    if (!state.construction) return false;

    if (Date.now() < state.construction.completesAt) {
        return false;
    }

    const building = BUILDINGS.find(
        item => item.id === state.construction.buildingId
    );

    if (!building) {
        state.construction = null;
        return false;
    }

    state.buildings[building.id] =
        (state.buildings[building.id] || 0) + 1;

    state.construction = null;

    showToast(`🏗️ ${building.name} is complete! Hire workers to operate it.`);

    checkAchievements();
    checkContracts();

    return true;
}

function getConstructionRemaining() {
    if (!state.construction) return 0;

    return Math.max(
        0,
        (state.construction.completesAt - Date.now()) / 1000
    );
}


/* =========================
   10. WORKFORCE SYSTEM
========================= */

function getWorkerHireCost() {
    return Math.floor(
        50 * Math.pow(1.35, state.workers)
    );
}

function hireWorker() {
    const cost = getWorkerHireCost();

    if (state.cookies < cost) {
        showToast("Not enough cookies to hire a worker!");
        return;
    }

    state.cookies -= cost;
    state.workers++;

    showToast("👷 A new worker joined your kingdom!");

    checkAchievements();
    checkContracts();
    updateGame();
}

function getTrainingCost() {
    return Math.floor(
        500 * Math.pow(2.1, state.workerSkill - 1)
    );
}

function trainWorkers() {
    if (state.workers === 0) {
        showToast("Hire workers before training them!");
        return;
    }

    const cost = getTrainingCost();

    if (state.cookies < cost) {
        showToast("Not enough cookies for training!");
        return;
    }

    state.cookies -= cost;
    state.workerSkill++;

    showToast(`🎓 Workforce training level ${state.workerSkill}!`);

    updateGame();
}

function getWorkerSummary() {
    const staffing = getStaffing();

    let required = 0;
    let assigned = 0;

    Object.values(staffing).forEach(item => {
        required += item.required;
        assigned += item.assigned;
    });

    return {
        total: state.workers,
        required,
        assigned,
        idle: Math.max(0, state.workers - assigned),
        shortage: Math.max(0, required - assigned)
    };
}


/* =========================
   11. UPGRADES
========================= */

function buyUpgrade(id) {
    const upgrade = UPGRADES.find(item => item.id === id);

    if (!upgrade || state.upgrades.includes(id)) return;

    if (state.cookies < upgrade.cost) {
        showToast("Not enough cookies!");
        return;
    }

    state.cookies -= upgrade.cost;
    state.upgrades.push(id);

    if (upgrade.type === "click") {
        state.clickPower *= upgrade.multiplier;
    }

    showToast(`${upgrade.name} unlocked!`);

    checkAchievements();
    updateGame();
}


/* =========================
   12. CLICKING AND PRODUCTION
========================= */

function earnCookies(amount) {
    if (!Number.isFinite(amount) || amount <= 0) return;

    state.cookies += amount;
    state.totalEarned += amount;

    checkLevelUp();
    checkAchievements();
    checkContracts();
}

function clickCookie(event) {
    earnCookies(state.clickPower);

    const stage = document.querySelector(".cookie-stage");

    if (stage && giantCookie) {
        const particle = document.createElement("span");

        particle.className = "float-cookie";
        particle.textContent = `+${totalCookies(state.clickPower)}`;

        const rect = stage.getBoundingClientRect();

        const hasPointerPosition =
            event.clientX !== 0 || event.clientY !== 0;

        particle.style.left = hasPointerPosition
            ? `${event.clientX - rect.left}px`
            : "50%";

        particle.style.top = hasPointerPosition
            ? `${event.clientY - rect.top}px`
            : "45%";

        stage.appendChild(particle);

        setTimeout(() => particle.remove(), 900);

        giantCookie.animate(
            [
                { transform: "scale(1)" },
                { transform: "scale(.92)" },
                { transform: "scale(1)" }
            ],
            { duration: 130 }
        );
    }

    updateDashboard();
}

function gameTick() {
    const now = Date.now();

    completeConstructionIfReady();

    if (activeEvent && now >= activeEvent.endsAt) {
        activeEvent = null;

        eventBanner?.classList.remove("active-event");

        if (eventText) {
            eventText.textContent = "The kingdom awaits its next royal event.";
        }

        updateDashboard();
    }

    const production = getProductionPerSecond();

    if (production > 0) {
        earnCookies(production / 10);
    }

    updateDashboard();

    if (now - lastRender >= 1000) {
        renderStore();
        lastRender = now;
    }
}


/* =========================
   13. ROYAL EVENTS
========================= */

function checkRoyalEvents() {
    const now = Date.now();

    if (activeEvent) return;

    if (now - lastEventCheck < 90 * 1000) return;

    lastEventCheck = now;

    // 35% chance of an event after the waiting period.
    if (Math.random() > 0.35) return;

    const event =
        ROYAL_EVENTS[Math.floor(Math.random() * ROYAL_EVENTS.length)];

    activeEvent = {
        ...event,
        endsAt: now + event.duration * 1000
    };

    eventBanner?.classList.add("active-event");

    if (eventText) {
        eventText.textContent = event.description;
    }

    showToast(`📯 Royal event: ${event.name}!`);

    updateDashboard();
}


/* =========================
   14. LEVELS AND RANKS
========================= */

function getLevelRequirement(level) {
    return Math.floor(100 * Math.pow(level, 1.6));
}

function checkLevelUp() {
    while (state.totalEarned >= getLevelRequirement(state.level)) {
        state.level++;
        showToast(`👑 Empire level ${state.level} reached!`);
    }
}

function getCurrentRank() {
    let rank = RANKS[0].name;

    for (const item of RANKS) {
        if (state.level >= item.level) {
            rank = item.name;
        }
    }

    return rank;
}


/* =========================
   15. ACHIEVEMENTS
========================= */

function checkAchievements() {
    for (const achievement of ACHIEVEMENTS) {
        if (state.achievements.includes(achievement.id)) continue;

        if (achievement.condition(state)) {
            state.achievements.push(achievement.id);

            showToast(`🏆 Achievement unlocked: ${achievement.name}`);
        }
    }

    if (achievementCountElement) {
        achievementCountElement.textContent =
            `${state.achievements.length} / ${ACHIEVEMENTS.length}`;
    }
}


/* =========================
   16. ROYAL CONTRACTS
========================= */

function getContractProgress(contract) {
    switch (contract.type) {
        case "earned":
            return state.totalEarned;

        case "workers":
            return state.workers;

        case "buildings":
            return totalBuildings();

        case "production":
            return getProductionPerSecond();

        default:
            return 0;
    }
}

function checkContracts() {
    const index = state.contractIndex;
    const contract = CONTRACTS[index];

    if (!contract) return;

    if (state.completedContracts.includes(index)) return;

    if (getContractProgress(contract) >= contract.target) {
        // Prevent the same completion notification from
        // appearing repeatedly during the game loop.
        if (notifiedContractIndex !== index) {
            notifiedContractIndex = index;
            showToast("📜 Royal contract completed! Claim your reward.");
        }
    }
}

function claimContract() {
    const index = state.contractIndex;
    const contract = CONTRACTS[index];

    if (!contract) {
        showToast("All current royal contracts are complete!");
        return;
    }

    if (state.completedContracts.includes(index)) return;

    if (getContractProgress(contract) < contract.target) {
        showToast("Complete the contract first!");
        return;
    }

    state.cookies += contract.reward;
    state.completedContracts.push(index);
    state.contractIndex++;

    notifiedContractIndex = null;

    showToast(`📜 Royal reward: ${totalCookies(contract.reward)} cookies!`);

    updateGame();
}


/* =========================
   17. BUILDINGS DISPLAY
========================= */

function renderBuildings() {
    const staffing = getStaffing();

    let html = `<div class="store-heading">YOUR ROYAL BUILDINGS</div>`;

    if (state.construction) {
        const building = BUILDINGS.find(
            b => b.id === state.construction.buildingId
        );

        if (building) {
            const remaining = getConstructionRemaining();

            const progress = Math.min(
                100,
                Math.max(
                    0,
                    100 * (1 - remaining / state.construction.duration)
                )
            );

            html += `
                <div class="construction-panel">
                    <h4>🏗️ CONSTRUCTION IN PROGRESS</h4>
                    <p>${building.name} is being built by your construction team.</p>

                    <div class="construction-timer">
                        <span>COMPLETION TIME</span>
                        <strong>${formatTime(remaining)}</strong>
                    </div>

                    <div class="construction-track">
                        <div style="width:${progress}%"></div>
                    </div>
                </div>
            `;
        }
    } else {
        html += `
            <div class="construction-panel">
                <h4>🏗️ CONSTRUCTION YARD</h4>
                <p>Your construction team is available. Choose a building to start your next project.</p>
            </div>
        `;
    }

    BUILDINGS.forEach(building => {
        const owned = state.buildings[building.id] || 0;
        const cost = getBuildingCost(building);
        const staff = staffing[building.id];

        const canAfford = state.cookies >= cost;
        const busy = Boolean(state.construction);

        const constructionTime = Math.floor(
            building.buildTime * (1 + owned * 0.15)
        );

        const buildingProduction =
            building.production *
            getBuildingMultiplier() *
            getWorkerMultiplier();

        html += `
            <article class="building-item">
                <div class="building-icon">${building.icon}</div>

                <div class="building-details">
                    <strong>${building.name} ×${owned}</strong>
                    <p>${building.description}</p>

                    <small>
                        ${formatTime(constructionTime)} BUILD TIME
                    </small>

                    <div class="staff-line">
                        👷 ${staff.assigned}/${staff.required} WORKERS
                        · ${staff.ratio === 1 ? "FULLY STAFFED" : "NEEDS STAFF"}
                    </div>

                    <small>
                        +${totalCookies(buildingProduction * staff.ratio)}
                        COOKIES / SEC
                    </small>
                </div>

                <button
                    class="buy-button"
                    data-build="${building.id}"
                    ${(!canAfford || busy) ? "disabled" : ""}
                >
                    ${busy ? "BUSY" : `🍪 ${totalCookies(cost)}`}
                </button>
            </article>
        `;
    });

    storeContent.innerHTML = html;
}


/* =========================
   18. WORKFORCE DISPLAY
========================= */

function renderWorkforce() {
    const summary = getWorkerSummary();

    const hireCost = getWorkerHireCost();
    const trainingCost = getTrainingCost();

    const contract = CONTRACTS[state.contractIndex];

    let contractHTML = "";

    if (contract) {
        const contractProgress = getContractProgress(contract);

        const progress = Math.min(
            100,
            contractProgress / contract.target * 100
        );

        const completed = contractProgress >= contract.target;

        contractHTML = `
            <div class="store-heading">ROYAL CONTRACT</div>

            <div class="contract-card">
                <strong>📜 ${contract.name}</strong>
                <p>${contract.description}</p>

                <div class="contract-progress">
                    <div style="width:${progress}%"></div>
                </div>

                <small>
                    ${totalCookies(contractProgress)}
                    / ${totalCookies(contract.target)}
                    · REWARD: ${totalCookies(contract.reward)} COOKIES
                </small>

                <button
                    class="action-button"
                    id="claimContract"
                    ${completed ? "" : "disabled"}
                    style="width:100%;margin-top:12px"
                >
                    ${completed ? "CLAIM ROYAL REWARD" : "CONTRACT IN PROGRESS"}
                </button>
            </div>
        `;
    } else {
        contractHTML = `
            <div class="contract-card">
                <strong>🏆 ROYAL CONTRACTS COMPLETED</strong>
                <p>Your kingdom has completed every available contract.</p>
            </div>
        `;
    }

    storeContent.innerHTML = `
        <div class="store-heading">KINGDOM WORKFORCE</div>

        <div class="worker-card">
            <div class="worker-icon">👷</div>

            <div class="worker-details">
                <strong>${state.workers} Hired Workers</strong>
                <p>Workers operate your completed buildings.</p>
                <small>${summary.assigned} ASSIGNED · ${summary.idle} IDLE</small>
            </div>

            <button class="action-button" id="hireWorker"
                ${state.cookies < hireCost ? "disabled" : ""}>
                HIRE · ${totalCookies(hireCost)}
            </button>
        </div>

        <div class="worker-card">
            <div class="worker-icon">📊</div>

            <div class="worker-details">
                <strong>Workforce Capacity</strong>
                <p>${summary.assigned} of ${summary.required} required positions filled.</p>
                <small>${summary.shortage} MORE WORKERS NEEDED</small>
            </div>
        </div>

        <div class="worker-card">
            <div class="worker-icon">🎓</div>

            <div class="worker-details">
                <strong>Worker Training · Level ${state.workerSkill}</strong>
                <p>Each training level increases worker productivity by 20%.</p>
                <small>CURRENT BONUS: +${(state.workerSkill - 1) * 20}%</small>
            </div>

            <button class="action-button" id="trainWorkers"
                ${state.workers === 0 || state.cookies < trainingCost ? "disabled" : ""}>
                TRAIN · ${totalCookies(trainingCost)}
            </button>
        </div>

        <div class="store-heading">HOW STAFFING WORKS</div>

        <div class="contract-card">
            <strong>👥 Automatic Staff Assignment</strong>
            <p>
                Workers are assigned to buildings in order, starting with
                the Tiny Bakery. Every building has a different staffing requirement.
                An understaffed building only produces according to its staffing ratio.
            </p>
        </div>

        ${contractHTML}
    `;
}


/* =========================
   19. UPGRADES DISPLAY
========================= */

function renderUpgrades() {
    let html = `<div class="store-heading">ROYAL RESEARCH & IMPROVEMENTS</div>`;
    let available = 0;

    UPGRADES.forEach(upgrade => {
        if (state.upgrades.includes(upgrade.id)) return;

        available++;

        html += `
            <article class="upgrade-item">
                <div class="upgrade-icon">${upgrade.icon}</div>

                <div class="upgrade-details">
                    <strong>${upgrade.name}</strong>
                    <p>${upgrade.description}</p>
                </div>

                <button
                    class="upgrade-buy"
                    data-upgrade="${upgrade.id}"
                    ${state.cookies < upgrade.cost ? "disabled" : ""}
                >
                    ${totalCookies(upgrade.cost)}
                </button>
            </article>
        `;
    });

    if (!available) {
        html += `<div class="empty-store">All current upgrades unlocked!</div>`;
    }

    storeContent.innerHTML = html;
}


/* =========================
   20. ACHIEVEMENTS DISPLAY
========================= */

function renderAchievements() {
    let html = `<div class="store-heading">ROYAL TROPHY ROOM</div>`;

    ACHIEVEMENTS.forEach(achievement => {
        const unlocked = state.achievements.includes(achievement.id);

        html += `
            <article class="achievement-item ${unlocked ? "unlocked" : "locked"}">
                <div class="achievement-icon">
                    ${unlocked ? achievement.icon : "🔒"}
                </div>

                <div class="achievement-details">
                    <strong>${achievement.name}</strong>
                    <p>${achievement.description}</p>
                </div>

                <span>${unlocked ? "✓" : "—"}</span>
            </article>
        `;
    });

    storeContent.innerHTML = html;
}


/* =========================
   21. STORE ROUTER
========================= */

function renderStore() {
    if (!storeContent) return;

    const activeTab =
        document.querySelector(".store-tab.active")?.dataset.tab ||
        state.activeTab ||
        "buildings";

    if (activeTab === "buildings") renderBuildings();
    if (activeTab === "workforce") renderWorkforce();
    if (activeTab === "upgrades") renderUpgrades();
    if (activeTab === "achievements") renderAchievements();
}


/* =========================
   22. DASHBOARD
========================= */

function updateDashboard() {
    if (
        !cookieBalanceElement ||
        !cookieCpsElement ||
        !empireLevelElement ||
        !empireRankElement
    ) return;

    cookieBalanceElement.textContent = totalCookies(state.cookies);
    cookieCpsElement.textContent = totalCookies(getProductionPerSecond());

    empireLevelElement.textContent = state.level;
    empireRankElement.textContent = getCurrentRank();

    if (clickPowerElement) {
        clickPowerElement.textContent =
            `${totalCookies(state.clickPower)} COOKIE${state.clickPower === 1 ? "" : "S"}`;
    }

    if (achievementCountElement) {
        achievementCountElement.textContent =
            `${state.achievements.length} / ${ACHIEVEMENTS.length}`;
    }

    const requirement = getLevelRequirement(state.level);

    const previous = state.level === 1
        ? 0
        : getLevelRequirement(state.level - 1);

    const progress = Math.max(0, state.totalEarned - previous);
    const range = requirement - previous;

    const percentage = Math.min(100, progress / range * 100);

    if (levelProgressBar) {
        levelProgressBar.style.width = `${percentage}%`;
    }

    if (levelProgressText) {
        levelProgressText.textContent =
            `${totalCookies(progress)} / ${totalCookies(range)}`;
    }

    const buildings = totalBuildings();

    if (buildings >= 10) {
        kingdomTitleElement.textContent = "The Royal Cookie Empire";
        kingdomQuoteElement.textContent = '"A kingdom built one cookie at a time."';
    } else if (buildings >= 4) {
        kingdomTitleElement.textContent = "The Growing Bakery";
        kingdomQuoteElement.textContent = '"The smell of success is in the oven."';
    } else if (buildings >= 1) {
        kingdomTitleElement.textContent = "The Village Bakery";
        kingdomQuoteElement.textContent = '"Your first investment has begun."';
    } else {
        kingdomTitleElement.textContent = "The First Bakery";
        kingdomQuoteElement.textContent = '"Every empire begins with one batch."';
    }
}

function updateGame() {
    updateDashboard();
    renderStore();
    checkContracts();
    saveGame();
}


/* =========================
   23. GAME OPEN / CLOSE
========================= */

function openGame() {
    if (!gameOverlay) return;

    gameOverlay.classList.add("open");
    gameOverlay.setAttribute("aria-hidden", "false");

    document.body.classList.add("game-open");

    updateGame();
    startGame();
}

function closeGame() {
    stopGame();

    gameOverlay?.classList.remove("open");
    gameOverlay?.setAttribute("aria-hidden", "true");

    document.body.classList.remove("game-open");

    settingsModal?.classList.remove("open");
    settingsModal?.setAttribute("aria-hidden", "true");
}

document.querySelectorAll(".play-game").forEach(button => {
    button.addEventListener("click", openGame);
});

closeGameButton?.addEventListener("click", closeGame);


/* =========================
   24. GAME LOOP CONTROL
========================= */

function startGame() {
    if (gameIsRunning) return;

    gameIsRunning = true;
    lastEventCheck = Date.now();

    gameInterval = setInterval(gameTick, 100);
    saveInterval = setInterval(saveGame, 5000);
    eventInterval = setInterval(checkRoyalEvents, 5000);
}

function stopGame() {
    gameIsRunning = false;

    clearInterval(gameInterval);
    clearInterval(saveInterval);
    clearInterval(eventInterval);

    gameInterval = null;
    saveInterval = null;
    eventInterval = null;

    saveGame();
}


/* =========================
   25. STORE BUTTON ACTIONS
========================= */

storeTabs.forEach(tab => {
    tab.addEventListener("click", () => {
        storeTabs.forEach(item => item.classList.remove("active"));

        tab.classList.add("active");
        state.activeTab = tab.dataset.tab;

        renderStore();
        saveGame();
    });
});

storeContent?.addEventListener("click", event => {
    const target = event.target;

    if (!(target instanceof Element)) return;

    const buildButton = target.closest("[data-build]");
    const upgradeButton = target.closest("[data-upgrade]");

    if (buildButton) {
        startConstruction(buildButton.dataset.build);
    }

    if (upgradeButton) {
        buyUpgrade(upgradeButton.dataset.upgrade);
    }

    if (target.closest("#hireWorker")) {
        hireWorker();
    }

    if (target.closest("#trainWorkers")) {
        trainWorkers();
    }

    if (target.closest("#claimContract")) {
        claimContract();
    }
});

giantCookie?.addEventListener("click", clickCookie);


/* =========================
   26. SETTINGS
========================= */

function closeSettings() {
    settingsModal?.classList.remove("open");
    settingsModal?.setAttribute("aria-hidden", "true");
}

gameSettingsButton?.addEventListener("click", () => {
    settingsModal?.classList.add("open");
    settingsModal?.setAttribute("aria-hidden", "false");
});

closeSettingsButton?.addEventListener("click", closeSettings);
settingsDoneButton?.addEventListener("click", closeSettings);

settingsModal?.addEventListener("click", event => {
    if (event.target === settingsModal) {
        closeSettings();
    }
});


/* =========================
   27. RESET GAME
========================= */

resetGameButton?.addEventListener("click", () => {
    const confirmed = confirm(
        "Reset your entire Cookie Emperor kingdom? This cannot be undone."
    );

    if (!confirmed) return;

    state = defaultState();
    activeEvent = null;
    notifiedContractIndex = null;

    try {
        localStorage.removeItem(SAVE_KEY);
    } catch (error) {
        console.error("Could not remove save:", error);
        showToast("Could not clear the browser save.");
    }

    storeTabs.forEach(tab => {
        tab.classList.toggle(
            "active",
            tab.dataset.tab === "buildings"
        );
    });

    state.activeTab = "buildings";

    eventBanner?.classList.remove("active-event");

    if (eventText) {
        eventText.textContent = "The kingdom awaits its emperor.";
    }

    showToast("Your kingdom has been reset.");

    updateGame();
});


/* =========================
   28. KEYBOARD SUPPORT
========================= */

document.addEventListener("keydown", event => {
    if (event.key !== "Escape") return;

    if (settingsModal?.classList.contains("open")) {
        closeSettings();
    } else if (gameOverlay?.classList.contains("open")) {
        closeGame();
    }
});


/* =========================
   29. INITIALIZE GAME
========================= */

loadGame();
applyOfflineProgress();

updateGame();

window.addEventListener("beforeunload", saveGame);

console.log("COOKIE EMPEROR engine loaded.");
console.log("Construction, workforce and kingdom systems ready.");
