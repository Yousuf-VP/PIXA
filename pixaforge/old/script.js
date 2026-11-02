
/* ================================
   PIXAFORGE — MAIN JAVASCRIPT
================================ */

// MOBILE NAVIGATION

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

const navLinks = document.querySelectorAll(".main-nav a");

if (menuToggle && mainNav) {

    menuToggle.addEventListener("click", () => {

        const isOpen = mainNav.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", isOpen);

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation" : "Open navigation"
        );

    });

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            mainNav.classList.remove("open");

            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation");

        });

    });

    document.addEventListener("click", event => {

        const clickedInsideMenu = mainNav.contains(event.target);
        const clickedToggle = menuToggle.contains(event.target);

        if (!clickedInsideMenu && !clickedToggle) {

            mainNav.classList.remove("open");

            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation");

        }

    });

    window.addEventListener("resize", () => {

        if (window.innerWidth > 700) {

            mainNav.classList.remove("open");

            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation");

        }

    });

}


// CURSOR GLOW

const cursorGlow = document.querySelector(".cursor-glow");

if (cursorGlow && window.matchMedia("(hover: hover)").matches) {

    window.addEventListener("pointermove", event => {

        cursorGlow.style.left = `${event.clientX}px`;
        cursorGlow.style.top = `${event.clientY}px`;

    });

}


// PIXAFORGE INITIALIZATION

console.log(
    "%c PIXAFORGE ",
    "background: linear-gradient(90deg, #a855f7, #ec4899); color: white; padding: 8px 14px; font-weight: bold;"
);

console.log("Forge your experience.");
