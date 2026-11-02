/* =========================================
   PIXAFORGE — MAIN JAVASCRIPT
========================================= */

// MOBILE NAVIGATION

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  mainNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 700) {
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
}

// CURSOR GLOW

const cursorGlow = document.getElementById("cursorGlow");

if (cursorGlow && window.matchMedia("(hover: hover)").matches) {
  window.addEventListener("pointermove", event => {
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
  });
}

// PAGE ROUTING

const studioView = document.getElementById("studioView");
const cookieEmperor = document.getElementById("cookieEmperor");
const siteFooter = document.getElementById("siteFooter");

function updatePage() {
  const isGame = window.location.hash === "#cookie-emperor";

  studioView.hidden = isGame;
  cookieEmperor.hidden = !isGame;

  // Keep the studio footer visible on both screens.
  siteFooter.hidden = false;

  document.body.classList.toggle("playing-game", isGame);

  if (!isGame) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    window.scrollTo({ top: 0, behavior: "instant" });
    renderGame();
  }
}

window.addEventListener("hashchange", updatePage);
updatePage();

/* =========================================
   COOKIE EMPEROR — GAME ENGINE
========================================= */

const buildings = [
  {
    name: "Tiny Bakery",
    description: "Produces 1 cookie/sec",
    icon: "🏠",
    baseCost: 15,
    production: 1,
    owned: 0
  },
  {
    name: "Cookie Farm",
    description: "Produces 5 cookies/sec",
    icon: "🌾",
    baseCost: 100,
    production: 5,
    owned: 0
  },
  {
    name: "Royal Oven",
    description: "Produces 20 cookies/sec",
    icon: "🔥",
    baseCost: 500,
    production: 20,
    owned: 0
  },
  {
    name: "Cookie Factory",
    description: "Produces 75 cookies/sec",
    icon: "🏭",
    baseCost: 2500,
    production: 75,
    owned: 0
  }
];

const game = {
  cookies: 0,
  totalBaked: 0,
  cookiesPerClick: 1,
  productionMultiplier: 1,
  kingdomName: "COOKIE KINGDOM",
  empireLevel: 1,
  experience: 0,
  clickUpgradeLevel: 0,
  ovenUpgradeLevel: 0,
  clickUpgradeCost: 25,
  ovenUpgradeCost: 100
};

const ranks = [
  { level: 1, name: "APPRENTICE BAKER" },
  { level: 3, name: "COOKIE MERCHANT" },
  { level: 5, name: "MASTER BAKER" },
  { level: 8, name: "DUKE OF DOUGH" },
  { level: 12, name: "ROYAL GOVERNOR" },
  { level: 18, name: "COOKIE MONARCH" },
  { level: 25, name: "COOKIE EMPEROR" }
];

const elements = {
  cookieCount: document.getElementById("cookieCount"),
  cpsCount: document.getElementById("cpsCount"),
  empireLevel: document.getElementById("empireLevel"),
  clickPower: document.getElementById("clickPower"),
  kingdomTitle: document.getElementById("kingdomTitle"),
  rankLabel: document.getElementById("rankLabel"),
  xpText: document.getElementById("xpText"),
  xpBar: document.getElementById("xpBar"),
  buildingCount: document.getElementById("buildingCount"),
  buildingList: document.getElementById("buildingList"),
  clickUpgradeCost: document.getElementById("clickUpgradeCost"),
  ovenUpgradeCost: document.getElementById("ovenUpgradeCost"),
  floatingText: document.getElementById("floatingText")
};

const giantCookie = document.getElementById("giantCookie");

// FORMATTING

function formatNumber(number) {
  if (number < 1000) {
    return Math.floor(number).toLocaleString("en-US");
  }

  if (number < 1000000) {
    return (number / 1000).toFixed(1) + "K";
  }

  if (number < 1000000000) {
    return (number / 1000000).toFixed(2) + "M";
  }

  return (number / 1000000000).toFixed(2) + "B";
}

function getProduction() {
  return buildings.reduce((total, building) => {
    return total + building.owned * building.production;
  }, 0) * game.productionMultiplier;
}

function getTotalBuildings() {
  return buildings.reduce((total, building) => total + building.owned, 0);
}

function getBuildingCost(building) {
  return Math.floor(building.baseCost * Math.pow(1.15, building.owned));
}

function getExperienceRequired() {
  return game.empireLevel * 100;
}

// RANKS AND EXPERIENCE

function updateExperience(amount) {
  game.experience += amount;

  while (game.experience >= getExperienceRequired()) {
    game.experience -= getExperienceRequired();
    game.empireLevel++;
  }
}

function getRank() {
  let currentRank = ranks[0].name;

  for (const rank of ranks) {
    if (game.empireLevel >= rank.level) {
      currentRank = rank.name;
    }
  }

  return currentRank;
}

// COOKIE CLICKING

function bakeCookie() {
  const amount = game.cookiesPerClick;

  game.cookies += amount;
  game.totalBaked += amount;
  updateExperience(amount);

  showFloatingText(`+${formatNumber(amount)}`);
  renderGame();
}

function showFloatingText(message) {
  const text = elements.floatingText;

  if (!text) return;

  text.textContent = message;
  text.classList.remove("pop");

  // Restart the animation.
  void text.offsetWidth;

  text.classList.add("pop");
}

if (giantCookie) {
  giantCookie.addEventListener("click", bakeCookie);
}

// BUY BUILDINGS

function buyBuilding(index) {
  const building = buildings[index];

  if (!building) return;

  const cost = getBuildingCost(building);

  if (game.cookies < cost) return;

  game.cookies -= cost;
  building.owned++;

  renderGame();
}

function renderBuildings() {
  elements.buildingList.innerHTML = "";

  buildings.forEach((building, index) => {
    const cost = getBuildingCost(building);
    const canAfford = game.cookies >= cost;

    const article = document.createElement("article");
    article.className = "building-item";

    const icon = document.createElement("span");
    icon.className = "building-icon";
    icon.textContent = building.icon;

    const details = document.createElement("div");
    details.className = "building-details";

    const name = document.createElement("b");
    name.textContent = building.name;

    const description = document.createElement("small");
    description.textContent = building.description;

    const price = document.createElement("strong");
    price.textContent = `Cost: ${formatNumber(cost)} cookies`;

    details.append(name, description, price);

    const buyArea = document.createElement("div");
    buyArea.className = "building-buy";

    const owned = document.createElement("span");
    owned.className = "owned";
    owned.textContent = `${building.owned} owned`;

    const buyButton = document.createElement("button");
    buyButton.textContent = "BUY";
    buyButton.disabled = !canAfford;

    buyButton.addEventListener("click", () => {
      buyBuilding(index);
    });

    buyArea.append(owned, buyButton);
    article.append(icon, details, buyArea);

    elements.buildingList.appendChild(article);
  });
}

// UPGRADES

function buyClickUpgrade() {
  if (game.cookies < game.clickUpgradeCost) return;

  game.cookies -= game.clickUpgradeCost;
  game.clickUpgradeLevel++;

  game.cookiesPerClick += 1;
  game.clickUpgradeCost = Math.floor(game.clickUpgradeCost * 2.2);

  renderGame();
}

function buyOvenUpgrade() {
  if (game.cookies < game.ovenUpgradeCost) return;

  game.cookies -= game.ovenUpgradeCost;
  game.ovenUpgradeLevel++;

  game.productionMultiplier += 0.25;
  game.ovenUpgradeCost = Math.floor(game.ovenUpgradeCost * 2.5);

  renderGame();
}

document.getElementById("clickUpgrade").addEventListener("click", buyClickUpgrade);
document.getElementById("ovenUpgrade").addEventListener("click", buyOvenUpgrade);

// KINGDOM NAME

document.getElementById("renameKingdom").addEventListener("click", () => {
  const newName = prompt("Enter your kingdom's name:", game.kingdomName);

  if (newName === null) return;

  const cleanedName = newName.trim().slice(0, 24);

  if (!cleanedName) {
    alert("Your kingdom needs a name!");
    return;
  }

  game.kingdomName = cleanedName.toUpperCase();
  renderGame();
});

// GAME INFORMATION MODAL

const gameModal = document.getElementById("gameModal");

document.getElementById("settingsButton").addEventListener("click", () => {
  gameModal.hidden = false;
});

document.getElementById("closeModal").addEventListener("click", () => {
  gameModal.hidden = true;
});

document.getElementById("modalOkay").addEventListener("click", () => {
  gameModal.hidden = true;
});

gameModal.addEventListener("click", event => {
  if (event.target === gameModal) {
    gameModal.hidden = true;
  }
});

// MAIN UI UPDATE

function renderGame() {
  if (!elements.cookieCount) return;

  elements.cookieCount.textContent = formatNumber(game.cookies);
  elements.cpsCount.textContent = formatNumber(getProduction());
  elements.empireLevel.textContent = game.empireLevel;
  elements.clickPower.textContent = game.cookiesPerClick;

  elements.kingdomTitle.textContent = game.kingdomName;
  elements.rankLabel.textContent = getRank();

  const requiredXP = getExperienceRequired();

  elements.xpText.textContent =
    `${formatNumber(game.experience)} / ${formatNumber(requiredXP)}`;

  elements.xpBar.style.width =
    `${Math.min(100, (game.experience / requiredXP) * 100)}%`;

  elements.buildingCount.textContent =
    `${getTotalBuildings()} OWNED`;

  elements.clickUpgradeCost.textContent =
    formatNumber(game.clickUpgradeCost);

  elements.ovenUpgradeCost.textContent =
    formatNumber(game.ovenUpgradeCost);

  document.getElementById("clickUpgrade").disabled =
    game.cookies < game.clickUpgradeCost;

  document.getElementById("ovenUpgrade").disabled =
    game.cookies < game.ovenUpgradeCost;

  renderBuildings();
}

// PASSIVE PRODUCTION

setInterval(() => {
  const production = getProduction();

  if (production <= 0) return;

  game.cookies += production;
  game.totalBaked += production;

  updateExperience(production);
  renderGame();
}, 1000);

// INITIAL GAME RENDER

renderGame();

console.log(
  "%cPIXAFORGE",
  "font-size:24px;font-weight:bold;color:#00e5ff;"
);

console.log(
  "%cCOOKIE EMPEROR — Build your empire, one cookie at a time.",
  "font-size:12px;color:#c9853b;"
);