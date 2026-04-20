/* ============================================
   Blog — Theme toggle, Search, Back-to-top,
   Mobile nav, Decrypt text effect
   ============================================ */

(function () {
  "use strict";

  // Theme is already applied before paint via inline <script> in <head>.
  // We only need to wire the toggle button here.
  const themeToggle = document.getElementById("theme-toggle");

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    if (themeToggle) {
      const icon = themeToggle.querySelector("i");
      if (icon) icon.className = theme === "dark" ? "ph ph-sun" : "ph ph-moon";
    }
  }

  // Sync icon with whatever theme is already active
  const current = document.documentElement.getAttribute("data-theme") || "light";
  if (themeToggle) {
    const icon = themeToggle.querySelector("i");
    if (icon) icon.className = current === "dark" ? "ph ph-sun" : "ph ph-moon";
    themeToggle.addEventListener("click", () => {
      const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
    });
  }

  // ══════════════════════════════════════
  // Post Counts per Year Group
  // ══════════════════════════════════════
  function updatePostCounts() {
    document.querySelectorAll(".blog-year-group").forEach((group) => {
      const items = group.querySelectorAll(".blog-post-item");
      const visible = group.querySelectorAll(".blog-post-item:not(.hidden)").length;
      const countEl = group.querySelector(".blog-year-count");
      if (countEl) {
        countEl.textContent =
          visible === items.length
            ? `${items.length} post${items.length !== 1 ? "s" : ""}`
            : `${visible} / ${items.length} posts`;
      }
    });
  }

  updatePostCounts();

  // ══════════════════════════════════════
  // Live Search
  // ══════════════════════════════════════
  const searchInput = document.getElementById("blogSearch");
  const searchCount = document.getElementById("searchCount");
  const noResults = document.querySelector(".blog-no-results");
  const postItems = document.querySelectorAll(".blog-post-item");
  const yearGroups = document.querySelectorAll(".blog-year-group");

  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const query = this.value.toLowerCase().trim();
      let matchCount = 0;

      postItems.forEach((item) => {
        const text =
          (item.querySelector(".blog-post-link")?.textContent ?? "").toLowerCase() +
          " " +
          (item.querySelector(".blog-post-tag")?.textContent ?? "").toLowerCase();
        const matches = !query || text.includes(query);
        item.classList.toggle("hidden", !matches);
        if (matches) matchCount++;
      });

      yearGroups.forEach((group) => {
        group.classList.toggle("hidden", group.querySelectorAll(".blog-post-item:not(.hidden)").length === 0);
      });

      if (searchCount) {
        searchCount.textContent = query ? `${matchCount} result${matchCount !== 1 ? "s" : ""}` : "";
      }
      if (noResults) {
        noResults.classList.toggle("visible", matchCount === 0 && query.length > 0);
      }

      updatePostCounts();
    });
  }

  // ══════════════════════════════════════
  // Back to Top
  // ══════════════════════════════════════
  const backToTop = document.getElementById("back-to-top");

  if (backToTop) {
    window.addEventListener(
      "scroll",
      () => {
        backToTop.classList.toggle("visible", window.scrollY > 400);
      },
      { passive: true },
    );

    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ══════════════════════════════════════
  // Mobile Nav Toggle
  // ══════════════════════════════════════
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => navLinks.classList.toggle("open"));
    navLinks.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => navLinks.classList.remove("open"));
    });
  }

  // ══════════════════════════════════════
  // Decrypt Text Effect
  // ══════════════════════════════════════
  const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";

  function decryptNode(element) {
    const originalText = element.getAttribute("data-text");
    if (!originalText) return;

    const targetEl = element.querySelector(".gradient-text") ?? element;
    let iterations = 0;

    const interval = setInterval(() => {
      targetEl.textContent = originalText
        .split("")
        .map((char, i) => {
          if (char === " ") return " ";
          if (i < iterations) return originalText[i];
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");

      iterations += 0.5;

      if (iterations >= originalText.length) {
        clearInterval(interval);
        targetEl.textContent = originalText;
      }
    }, 40);
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.classList.contains("decrypted")) {
          entry.target.classList.add("decrypted");
          decryptNode(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 },
  );

  document.querySelectorAll(".decrypt-text").forEach((el) => observer.observe(el));
})();
