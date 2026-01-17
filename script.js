/* =========================================================
   Agency Chauffeur Private Drivers — script.js
   - Mobile drawer menu (QTS-style behavior)
   - Locks background scroll when open
   - Services dropdown inside mobile drawer
   - Closes on overlay, ESC, and link click
   ========================================================= */

(function () {
  "use strict";

  // ---------- Helpers ----------
  const $ = (id) => document.getElementById(id);

  const toggle = $("mobileToggle");
  const overlay = $("mobileOverlay");
  const nav = $("mobileNav");
  const closeBtn = $("mobileClose");

  const openMenu = () => {
    if (!nav || !overlay) return;
    nav.classList.add("open");
    overlay.classList.add("open");
    document.body.classList.add("no-scroll");

    toggle?.setAttribute("aria-expanded", "true");
    overlay.setAttribute("aria-hidden", "false");
    nav.setAttribute("aria-hidden", "false");
  };

  const closeMenu = () => {
    if (!nav || !overlay) return;
    nav.classList.remove("open");
    overlay.classList.remove("open");
    document.body.classList.remove("no-scroll");

    toggle?.setAttribute("aria-expanded", "false");
    overlay.setAttribute("aria-hidden", "true");
    nav.setAttribute("aria-hidden", "true");
  };

  const isOpen = () => !!nav && nav.classList.contains("open");

  // ---------- Mobile Menu Events ----------
  toggle?.addEventListener("click", () => {
    if (isOpen()) closeMenu();
    else openMenu();
  });

  closeBtn?.addEventListener("click", closeMenu);

  overlay?.addEventListener("click", closeMenu);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen()) closeMenu();
  });

  // Close on link click inside drawer
  nav?.addEventListener("click", (e) => {
    const target = e.target;
    if (!target) return;

    // close on any anchor click
    if (target.tagName === "A") closeMenu();

    // also close if clicking inside a button-like element with data-close
    const btn = target.closest?.("[data-close-menu]");
    if (btn) closeMenu();
  });

  // Prevent iOS scroll "leaking" to the page behind the drawer
  nav?.addEventListener("touchmove", (e) => e.stopPropagation(), { passive: true });

  // ---------- Mobile Services Dropdown ----------
  const ddBtn = $("mobileServicesToggle");
  const ddMenu = $("mobileServicesMenu");

  const setDropdownState = (open) => {
    if (!ddMenu || !ddBtn) return;
    ddMenu.classList.toggle("open", open);
    ddBtn.setAttribute("aria-expanded", open ? "true" : "false");
  };

  ddBtn?.addEventListener("click", () => {
    if (!ddMenu) return;
    setDropdownState(!ddMenu.classList.contains("open"));
  });

  // If you want dropdown to collapse when menu closes
  const originalCloseMenu = closeMenu;
  // monkey patch: keep behavior but collapse dropdown
  // (safe because closeMenu is scoped inside this IIFE)
  // eslint-disable-next-line no-unused-vars
  const closeMenuWithDropdown = () => {
    setDropdownState(false);
    originalCloseMenu();
  };
  // Rebind close button + overlay to new close if dropdown exists
  if (ddMenu && ddBtn) {
    closeBtn?.removeEventListener("click", closeMenu);
    overlay?.removeEventListener("click", closeMenu);

    closeBtn?.addEventListener("click", closeMenuWithDropdown);
    overlay?.addEventListener("click", closeMenuWithDropdown);

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && isOpen()) closeMenuWithDropdown();
    });
  }

  // ---------- Optional: Desktop dropdown (if you use JS "open" class) ----------
  // If your desktop dropdown uses a button and .dropdown-menu.open, uncomment:
  /*
  const deskDdBtn = $("desktopServicesToggle");
  const deskDdMenu = $("desktopServicesMenu");
  deskDdBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    deskDdMenu?.classList.toggle("open");
  });
  document.addEventListener("click", (e) => {
    if (!deskDdMenu || !deskDdBtn) return;
    if (!deskDdMenu.contains(e.target) && !deskDdBtn.contains(e.target)) {
      deskDdMenu.classList.remove("open");
    }
  });
  */
})();
