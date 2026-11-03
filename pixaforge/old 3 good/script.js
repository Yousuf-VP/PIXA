
/* =========================================================
   PIXAFORGE — MAIN WEBSITE JAVASCRIPT
   Landing page interactions
========================================================= */

"use strict";


/* =========================================================
   CONFIGURATION
========================================================= */

const PIXAFORGE_CONFIG = {
  particleCount: 32,
  revealThreshold: 0.12,
  carouselSpeed: 0.45,
  toastDuration: 2600,
  favoriteStorageKey: "pixaforge_favorites_v1"
};


/* =========================================================
   EDITABLE STUDIO NEWS
   Add, remove or edit announcements here.
========================================================= */

const PIXAFORGE_NEWS = [

  {
    category: "studio",
    label: "STUDIO UPDATE",
    date: "NOVEMBER 2026",
    title: "A new digital playground is taking shape.",
    description:
      "PIXAFORGE is building a collection of original browser gaming experiences. The journey is just getting started.",
    link: "#about",
    linkText: "EXPLORE THE STUDIO"
  },

  {
    category: "development",
    label: "DEVELOPMENT",
    date: "NOVEMBER 2026",
    title: "Cookie Emperor continues to grow.",
    description:
      "Our first original game is expanding with new systems, progression and a growing cookie kingdom.",
    link: "#games",
    linkText: "VIEW THE GAME"
  },

  {
    category: "development",
    label: "IN DEVELOPMENT",
    date: "COMING SOON",
    title: "A mysterious world is on the horizon.",
    description:
      "Unknown World is part of the next chapter of the PIXAFORGE collection.",
    link: "#games",
    linkText: "VIEW COLLECTION"
  },

  {
    category: "release",
    label: "COLLECTION",
    date: "PIXAFORGE",
    title: "Three game worlds. One growing collection.",
    description:
      "Explore the current lineup and follow the development of upcoming experiences.",
    link: "#games",
    linkText: "EXPLORE ARCADE"
  }

];


/* =========================================================
   DOM HELPERS
========================================================= */

const $ = (selector, parent = document) =>
  parent.querySelector(selector);

const $$ = (selector, parent = document) =>
  [...parent.querySelectorAll(selector)];

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

const isTouchDevice =
  window.matchMedia("(hover: none)").matches;


/* =========================================================
   ELEMENT REFERENCES
========================================================= */

const pageLoader = $("#pageLoader");
const siteHeader = $("#siteHeader");
const scrollProgress = $("#scrollProgress");

const menuToggle = $("#menuToggle");
const mainNav = $("#mainNav");

const cursorGlow = $("#cursorGlow");
const cursorDot = $("#cursorDot");

const gamesGrid = $("#gamesGrid");
const gameSearch = $("#gameSearch");
const gamesEmpty = $("#gamesEmpty");

const newsGrid = $("#newsGrid");
const newsEmpty = $("#newsEmpty");

const detailsModal = $("#detailsModal");
const modalImage = $("#modalImage");
const modalTitle = $("#modalTitle");
const modalDescription = $("#modalDescription");
const modalCategory = $("#modalCategory");
const modalStatus = $("#modalStatus");
const modalPlay = $("#modalPlay");

const toastContainer = $("#toastContainer");

const floatingTopButton = $("#floatingTopButton");


/* =========================================================
   PRELOADER
========================================================= */

function finishLoading() {
  if (!pageLoader) return;

  pageLoader.classList.add("loaded");

  window.setTimeout(() => {
    pageLoader.remove();
  }, 800);
}

if (document.readyState === "complete") {
  finishLoading();
} else {
  window.addEventListener("load", finishLoading, { once: true });
}

// Prevent an indefinitely visible loader if an external asset is slow.
window.setTimeout(finishLoading, 3500);


/* =========================================================
   TOAST NOTIFICATIONS
========================================================= */

function showToast(message) {
  if (!toastContainer) return;

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;

  toastContainer.appendChild(toast);

  window.setTimeout(() => {
    toast.classList.add("removing");

    window.setTimeout(() => {
      toast.remove();
    }, 320);
  }, PIXAFORGE_CONFIG.toastDuration);
}


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

function closeNavigation() {
  if (!menuToggle || !mainNav) return;

  menuToggle.classList.remove("active");
  mainNav.classList.remove("open");

  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation");

  document.body.classList.remove("menu-open");
}

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");

    menuToggle.classList.toggle("active", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation"
    );

    document.body.classList.toggle("menu-open", isOpen);
  });

  $$(".nav-link", mainNav).forEach(link => {
    link.addEventListener("click", closeNavigation);
  });

  document.addEventListener("click", event => {
    if (
      mainNav.classList.contains("open") &&
      !mainNav.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      closeNavigation();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) {
      closeNavigation();
    }
  });
}


/* =========================================================
   HEADER + SCROLL PROGRESS
========================================================= */

let scrollTicking = false;

function updateScrollInterface() {
  const scrollTop = window.scrollY;

  const scrollableHeight =
    document.documentElement.scrollHeight - window.innerHeight;

  const progress =
    scrollableHeight > 0
      ? (scrollTop / scrollableHeight) * 100
      : 0;

  if (scrollProgress) {
    scrollProgress.style.width = `${progress}%`;
  }

  if (siteHeader) {
    siteHeader.classList.toggle("scrolled", scrollTop > 40);
  }

  if (floatingTopButton) {
    floatingTopButton.classList.toggle("visible", scrollTop > 600);
  }

  scrollTicking = false;
}

window.addEventListener("scroll", () => {
  if (!scrollTicking) {
    window.requestAnimationFrame(updateScrollInterface);
    scrollTicking = true;
  }
}, { passive: true });

updateScrollInterface();


/* =========================================================
   BACK TO TOP
========================================================= */

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: prefersReducedMotion ? "instant" : "smooth"
  });
}

if (floatingTopButton) {
  floatingTopButton.addEventListener("click", scrollToTop);
}

const backToTop = $("#backToTop");

if (backToTop) {
  backToTop.addEventListener("click", event => {
    event.preventDefault();
    scrollToTop();
  });
}


/* =========================================================
   ACTIVE NAVIGATION TRACKING
========================================================= */

const navigationSections = $$("#home, #games, #features, #news, #about");
const navigationLinks = $$(".nav-link");

if ("IntersectionObserver" in window) {
  const navObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      navigationLinks.forEach(link => {
        const active =
          link.getAttribute("href") === `#${entry.target.id}`;

        link.classList.toggle("active", active);
      });
    });
  }, {
    rootMargin: "-35% 0px -55% 0px",
    threshold: 0
  });

  navigationSections.forEach(section => navObserver.observe(section));
}


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements = $$(".reveal");

if ("IntersectionObserver" in window && !prefersReducedMotion) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  }, {
    threshold: PIXAFORGE_CONFIG.revealThreshold,
    rootMargin: "0px 0px -35px 0px"
  });

  revealElements.forEach(element => revealObserver.observe(element));
} else {
  revealElements.forEach(element => element.classList.add("visible"));
}


/* =========================================================
   STAGGERED REVEAL
========================================================= */

$$(".games-grid, .features-grid, .news-grid, .numbers-grid").forEach(group => {
  const items = [...group.children];

  items.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index * 90, 360)}ms`;
  });
});


/* =========================================================
   ANIMATED NUMBER COUNTERS
========================================================= */

const counterElements = $$("[data-count]");

function animateCounter(element) {
  const target = Number(element.dataset.count);

  if (!Number.isFinite(target)) return;

  if (prefersReducedMotion) {
    element.textContent = target.toLocaleString();
    return;
  }

  const duration = 1300;
  const start = performance.now();

  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 4);

    const value = Math.round(target * eased);

    element.textContent = value.toLocaleString();

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

if ("IntersectionObserver" in window) {
  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      animateCounter(entry.target);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.65 });

  counterElements.forEach(counter => counterObserver.observe(counter));
} else {
  counterElements.forEach(animateCounter);
}


/* =========================================================
   PARTICLE GENERATOR
========================================================= */

function createParticles() {
  const field = $("#particleField");

  if (!field || prefersReducedMotion || isTouchDevice) return;

  const fragment = document.createDocumentFragment();

  for (let i = 0; i < PIXAFORGE_CONFIG.particleCount; i++) {
    const particle = document.createElement("span");

    particle.className = "particle";

    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;

    particle.style.animationDuration =
      `${12 + Math.random() * 20}s`;

    particle.style.animationDelay =
      `${-Math.random() * 25}s`;

    particle.style.opacity =
      `${0.15 + Math.random() * 0.45}`;

    fragment.appendChild(particle);
  }

  field.appendChild(fragment);
}

createParticles();


/* =========================================================
   CUSTOM CURSOR
========================================================= */

if (
  cursorGlow &&
  cursorDot &&
  !isTouchDevice &&
  !prefersReducedMotion
) {
  let cursorX = 0;
  let cursorY = 0;
  let dotX = 0;
  let dotY = 0;
  let cursorFrame = false;

  window.addEventListener("mousemove", event => {
    cursorX = event.clientX;
    cursorY = event.clientY;

    cursorGlow.style.opacity = "1";
    cursorDot.style.opacity = "1";

    if (!cursorFrame) {
      cursorFrame = true;
      requestAnimationFrame(updateCursor);
    }
  }, { passive: true });

  function updateCursor() {
    dotX += (cursorX - dotX) * 0.25;
    dotY += (cursorY - dotY) * 0.25;

    cursorGlow.style.left = `${cursorX}px`;
    cursorGlow.style.top = `${cursorY}px`;

    cursorDot.style.left = `${dotX}px`;
    cursorDot.style.top = `${dotY}px`;

    if (
      Math.abs(cursorX - dotX) > 0.1 ||
      Math.abs(cursorY - dotY) > 0.1
    ) {
      requestAnimationFrame(updateCursor);
    } else {
      cursorFrame = false;
    }
  }

  document.addEventListener("mouseleave", () => {
    cursorGlow.style.opacity = "0";
    cursorDot.style.opacity = "0";
  });
}


/* =========================================================
   GAME LIBRARY — DATA
========================================================= */

function getGameCards() {
  return gamesGrid ? $$(".game-card", gamesGrid) : [];
}

function getGameData(card) {
  return {
    title: card.dataset.title || "Untitled game",
    description: card.dataset.description || "",
    category: card.dataset.category || "",
    status: card.dataset.status || "soon",
    image: card.dataset.image || "",
    link: card.dataset.link || ""
  };
}


/* =========================================================
   GAME SEARCH + CATEGORY FILTERS
========================================================= */

let activeGameFilter = "all";

function filterGames() {
  if (!gamesGrid) return;

  const query = (gameSearch?.value || "").trim().toLowerCase();
  let visibleCount = 0;

  getGameCards().forEach(card => {
    const data = getGameData(card);

    const matchesCategory =
      activeGameFilter === "all" ||
      data.category.split(/\s+/).includes(activeGameFilter);

    const searchable =
      `${data.title} ${data.description} ${data.category}`.toLowerCase();

    const matchesSearch = searchable.includes(query);

    const visible = matchesCategory && matchesSearch;

    card.classList.toggle("is-filtered-out", !visible);
    card.setAttribute("aria-hidden", String(!visible));

    if (visible) visibleCount++;
  });

  if (gamesEmpty) {
    gamesEmpty.hidden = visibleCount !== 0;
  }
}

$$(".filter-button").forEach(button => {
  button.addEventListener("click", () => {
    activeGameFilter = button.dataset.filter || "all";

    $$(".filter-button").forEach(item => {
      item.classList.toggle("active", item === button);
    });

    filterGames();
  });
});

if (gameSearch) {
  gameSearch.addEventListener("input", filterGames);
}

const clearGameSearch = $("#clearGameSearch");

if (clearGameSearch) {
  clearGameSearch.addEventListener("click", () => {
    activeGameFilter = "all";

    if (gameSearch) gameSearch.value = "";

    $$(".filter-button").forEach(button => {
      button.classList.toggle(
        "active",
        button.dataset.filter === "all"
      );
    });

    filterGames();
  });
}


/* =========================================================
   KEYBOARD SEARCH SHORTCUT
========================================================= */

document.addEventListener("keydown", event => {
  const target = event.target;
  const isTyping =
    target instanceof HTMLElement &&
    (
      target.isContentEditable ||
      ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)
    );

  if (event.key === "/" && !isTyping && gameSearch) {
    event.preventDefault();
    gameSearch.focus();
    $("#games")?.scrollIntoView({ behavior: "smooth" });
  }

  if (event.key === "Escape") {
    closeDetailsModal();
    closeNavigation();
  }
});


/* =========================================================
   FAVORITES — LOCAL STORAGE
========================================================= */

function loadFavorites() {
  try {
    const saved = localStorage.getItem(
      PIXAFORGE_CONFIG.favoriteStorageKey
    );

    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function saveFavorites(favorites) {
  try {
    localStorage.setItem(
      PIXAFORGE_CONFIG.favoriteStorageKey,
      JSON.stringify(favorites)
    );
  } catch {
    showToast("Favorites could not be saved in this browser.");
  }
}

let favorites = loadFavorites();

function updateFavoriteButtons() {
  getGameCards().forEach(card => {
    const button = $(".favorite-button", card);
    if (!button) return;

    const title = getGameData(card).title;
    const isFavorite = favorites.includes(title);

    button.setAttribute("aria-pressed", String(isFavorite));
    button.textContent = isFavorite ? "★" : "☆";
  });
}

getGameCards().forEach(card => {
  const button = $(".favorite-button", card);
  if (!button) return;

  button.addEventListener("click", () => {
    const title = getGameData(card).title;

    if (favorites.includes(title)) {
      favorites = favorites.filter(item => item !== title);
      showToast(`${title} removed from favorites.`);
    } else {
      favorites.push(title);
      showToast(`${title} added to favorites.`);
    }

    saveFavorites(favorites);
    updateFavoriteButtons();
  });
});

updateFavoriteButtons();


/* =========================================================
   GAME DETAILS MODAL
========================================================= */

function openDetailsModal(card) {
  if (!detailsModal) return;

  const data = getGameData(card);

  if (modalTitle) modalTitle.textContent = data.title;
  if (modalDescription) modalDescription.textContent = data.description;
  if (modalCategory) modalCategory.textContent = data.category.toUpperCase();

  if (modalImage) {
    modalImage.src = data.image;
    modalImage.alt = `${data.title} artwork`;
  }

  if (modalStatus) {
    modalStatus.textContent =
      data.status === "available"
        ? "● AVAILABLE TO PLAY"
        : "◷ IN DEVELOPMENT";
  }

  if (modalPlay) {
    if (data.status === "available" && data.link) {
      modalPlay.hidden = false;
      modalPlay.href = data.link;
      modalPlay.removeAttribute("aria-disabled");
    } else {
      modalPlay.hidden = true;
      modalPlay.removeAttribute("href");
    }
  }

  detailsModal.classList.add("open");
  detailsModal.setAttribute("aria-hidden", "false");

  document.body.classList.add("modal-open");

  $(".modal-close", detailsModal)?.focus();
}

function closeDetailsModal() {
  if (!detailsModal) return;

  detailsModal.classList.remove("open");
  detailsModal.setAttribute("aria-hidden", "true");

  document.body.classList.remove("modal-open");
}

getGameCards().forEach(card => {
  const detailsButton = $(".game-details-button", card);

  if (detailsButton) {
    detailsButton.addEventListener("click", () => {
      openDetailsModal(card);
    });
  }
});

if (detailsModal) {
  $$("[data-modal-close]", detailsModal).forEach(button => {
    button.addEventListener("click", closeDetailsModal);
  });
}


/* =========================================================
   NEWS RENDERING
========================================================= */

function renderNews(filter = "all") {
  if (!newsGrid) return;

  newsGrid.innerHTML = "";

  const items = PIXAFORGE_NEWS.filter(item => {
    return filter === "all" || item.category === filter;
  });

  if (newsEmpty) {
    newsEmpty.hidden = items.length !== 0;
  }

  const fragment = document.createDocumentFragment();

  items.forEach(item => {
    const article = document.createElement("article");
    article.className = "news-card reveal visible";

    const top = document.createElement("div");
    top.className = "news-card-top";

    const tag = document.createElement("span");
    tag.className = "news-tag";
    tag.textContent = item.label;

    const date = document.createElement("span");
    date.className = "news-date";
    date.textContent = item.date;

    top.append(tag, date);

    const title = document.createElement("h3");
    title.textContent = item.title;

    const description = document.createElement("p");
    description.textContent = item.description;

    const link = document.createElement("a");
    link.className = "news-read";
    link.href = item.link || "#news";
    link.textContent = `${item.linkText || "READ MORE"} ↗`;

    article.append(top, title, description, link);
    fragment.appendChild(article);
  });

  newsGrid.appendChild(fragment);
}

renderNews();


/* =========================================================
   NEWS FILTERS
========================================================= */

$$(".news-filter").forEach(button => {
  button.addEventListener("click", () => {
    const filter = button.dataset.newsFilter || "all";

    $$(".news-filter").forEach(item => {
      item.classList.toggle("active", item === button);
    });

    renderNews(filter);
  });
});


/* =========================================================
   MOBILE GAME CAROUSEL
   On small screens, cards move horizontally.
   Autoplay stops during manual interaction.
========================================================= */

let carouselTimer = null;
let carouselPaused = false;
let carouselLastInteraction = 0;
let carouselPosition = 0;

const mobileCarouselQuery = window.matchMedia("(max-width: 760px)");

function isMobileCarousel() {
  return mobileCarouselQuery.matches && gamesGrid;
}

function getVisibleCarouselCards() {
  return getGameCards().filter(card => !card.classList.contains("is-filtered-out"));
}

function stopCarousel() {
  if (carouselTimer) {
    clearInterval(carouselTimer);
    carouselTimer = null;
  }
}

function startCarousel() {
  stopCarousel();

  if (!isMobileCarousel() || prefersReducedMotion) return;

  carouselTimer = window.setInterval(() => {
    if (carouselPaused || Date.now() - carouselLastInteraction < 3200) {
      return;
    }

    const cards = getVisibleCarouselCards();

    if (cards.length < 2) return;

    const current = cards[carouselPosition % cards.length];
    const nextIndex = (carouselPosition + 1) % cards.length;
    const next = cards[nextIndex];

    if (!current || !next) return;

    if (nextIndex === 0) {
      gamesGrid.scrollTo({
        left: 0,
        behavior: "smooth"
      });
    } else {
      next.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center"
      });
    }

    carouselPosition = nextIndex;
  }, 4200);
}

function pauseCarousel() {
  carouselPaused = true;
  carouselLastInteraction = Date.now();
}

function resumeCarousel() {
  carouselLastInteraction = Date.now();

  window.setTimeout(() => {
    carouselPaused = false;
  }, 1200);
}

if (gamesGrid) {
  gamesGrid.addEventListener("touchstart", pauseCarousel, { passive: true });
  gamesGrid.addEventListener("touchend", resumeCarousel, { passive: true });
  gamesGrid.addEventListener("pointerdown", pauseCarousel);
  gamesGrid.addEventListener("pointerup", resumeCarousel);
  gamesGrid.addEventListener("wheel", pauseCarousel, { passive: true });
  gamesGrid.addEventListener("scroll", () => {
    carouselLastInteraction = Date.now();
  }, { passive: true });
}

function updateCarouselMode() {
  if (isMobileCarousel()) {
    carouselPosition = 0;
    startCarousel();
  } else {
    stopCarousel();
    carouselPosition = 0;
  }
}

mobileCarouselQuery.addEventListener("change", updateCarouselMode);
updateCarouselMode();

// Keep carousel position valid when filters change.
$$(".filter-button").forEach(button => {
  button.addEventListener("click", () => {
    carouselPosition = 0;

    if (gamesGrid) {
      gamesGrid.scrollTo({ left: 0, behavior: "smooth" });
    }

    updateCarouselMode();
  });
});


/* =========================================================
   DESKTOP CARD TILT
========================================================= */

if (!isTouchDevice && !prefersReducedMotion) {
  getGameCards().forEach(card => {
    card.addEventListener("pointermove", event => {
      if (window.innerWidth <= 760) return;

      const rect = card.getBoundingClientRect();

      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;

      const rotateY = (x - 0.5) * 5;
      const rotateX = (0.5 - y) * 5;

      card.style.transform =
        `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
    });

    card.addEventListener("pointerleave", () => {
      card.style.transform = "";
    });
  });
}


/* =========================================================
   HERO PARALLAX
========================================================= */

const heroVisual = $(".hero-visual");

if (heroVisual && !isTouchDevice && !prefersReducedMotion) {
  heroVisual.addEventListener("pointermove", event => {
    const rect = heroVisual.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    const emblem = $(".hero-emblem-container", heroVisual);

    if (emblem) {
      emblem.style.transform =
        `translate(${x * 12}px,${y * 12}px)`;
    }
  });

  heroVisual.addEventListener("pointerleave", () => {
    const emblem = $(".hero-emblem-container", heroVisual);

    if (emblem) {
      emblem.style.transform = "";
    }
  });
}


/* =========================================================
   MARQUEE ACCESSIBILITY
========================================================= */

if (prefersReducedMotion) {
  const marquee = $(".marquee-content");

  if (marquee) {
    marquee.style.animation = "none";
    marquee.style.transform = "none";
  }
}


/* =========================================================
   IMAGE ERROR HANDLING
========================================================= */

$$(".game-art img").forEach(image => {
  image.addEventListener("error", () => {
    image.classList.add("image-unavailable");
  });
});


/* =========================================================
   PAGE VISIBILITY
========================================================= */

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    stopCarousel();
  } else {
    updateCarouselMode();
  }
});


/* =========================================================
   INITIALIZATION
========================================================= */

function initializePixaforge() {
  filterGames();
  updateFavoriteButtons();
  updateScrollInterface();

  console.log(
    "%cPIXAFORGE",
    "color:#c084fc;font-size:24px;font-weight:900;"
  );

  console.log(
    "%cFORGE YOUR EXPERIENCE.",
    "color:#00e5ff;font-size:12px;"
  );
}

initializePixaforge();
