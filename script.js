/* =========================================================
   Agency Chauffeur Private Drivers — script.js
   - Mobile drawer menu (Fix B compatible)
   - Uses existing IDs in your index.html + notary.html:
     mobileMenuToggle, mobileMenuOverlay, mobileNav, mobileMenuClose
   - Mobile Services dropdown inside drawer
   ========================================================= */

(function () {
  "use strict";

  const toggle = document.getElementById("mobileMenuToggle");
  const overlay = document.getElementById("mobileMenuOverlay");
  const nav = document.getElementById("mobileNav");
  const closeBtn = document.getElementById("mobileMenuClose");

  if (!toggle || !overlay || !nav || !closeBtn) return;

  const openMenu = () => {
    toggle.setAttribute("aria-expanded", "true");
    nav.classList.add("open");
    overlay.classList.add("open");
    overlay.setAttribute("aria-hidden", "false");
    nav.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
  };

  const closeMenu = () => {
    toggle.setAttribute("aria-expanded", "false");
    nav.classList.remove("open");
    overlay.classList.remove("open");
    overlay.setAttribute("aria-hidden", "true");
    nav.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");

    // collapse any open mobile dropdowns
    nav.querySelectorAll(".mobile-dropdown-toggle").forEach((btn) => {
      btn.setAttribute("aria-expanded", "false");
      const menu = btn.nextElementSibling;
      if (menu) menu.classList.remove("open");
    });
  };

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    isOpen ? closeMenu() : openMenu();
  });

  closeBtn.addEventListener("click", closeMenu);
  overlay.addEventListener("click", closeMenu);

  // Close when clicking a link in the drawer
  nav.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", closeMenu);
  });

  // Mobile Services dropdown
  nav.querySelectorAll(".mobile-dropdown-toggle").forEach((btn) => {
    btn.addEventListener("click", () => {
      const expanded = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!expanded));
      const menu = btn.nextElementSibling;
      if (menu) menu.classList.toggle("open", !expanded);
    });
  });

  // ESC closes menu
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
})();
