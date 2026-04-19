/* ============================================
   Features — Scroll Progress, Back to Top,
   Copy Email, Command Palette, Dark Mode
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {
  // ══════════════════════════════════════
  // 1. Scroll Progress Bar
  // ══════════════════════════════════════
  const progressBar = document.getElementById("scroll-progress");

  if (progressBar) {
    window.addEventListener(
      "scroll",
      () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = `${progress}%`;
      },
      { passive: true },
    );
  }

  // ══════════════════════════════════════
  // 2. Back to Top Button
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
  // 3. Copy Email Button
  // ══════════════════════════════════════
  const copyEmailBtn = document.getElementById("copy-email-btn");

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      const email = "divyakanthops@gmail.com";

      try {
        await navigator.clipboard.writeText(email);
      } catch {
        // Fallback for older browsers
        const el = document.createElement("textarea");
        el.value = email;
        el.style.position = "absolute";
        el.style.left = "-9999px";
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
      }

      copyEmailBtn.classList.add("copied");
      const tooltip = copyEmailBtn.querySelector(".copy-tooltip");
      if (tooltip) tooltip.textContent = "Copied!";

      setTimeout(() => {
        copyEmailBtn.classList.remove("copied");
        if (tooltip) tooltip.textContent = "Copy";
      }, 2000);
    });
  }

  // ══════════════════════════════════════
  // 4. Dark / Light Mode Toggle
  // ══════════════════════════════════════
  const themeToggle = document.getElementById("theme-toggle");

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    if (themeToggle) {
      const icon = themeToggle.querySelector("i");
      icon.className = theme === "dark" ? "ph ph-sun" : "ph ph-moon";
    }
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme") || "dark";
    applyTheme(current === "dark" ? "light" : "dark");
  }

  // Init — respect saved preference, else system preference
  const saved = localStorage.getItem("theme");
  applyTheme(saved || "light");

  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }

  // ══════════════════════════════════════
  // 5. Command Palette (Cmd+K / Ctrl+K)
  // ══════════════════════════════════════
  const palette = document.getElementById("cmd-palette");
  const cmdInput = document.getElementById("cmd-input");
  const cmdResults = document.getElementById("cmd-results");

  if (!palette || !cmdInput || !cmdResults) return;

  const commands = [
    { label: "Go to About", icon: "ph-user", type: "nav", action: () => scrollTo("#about") },
    { label: "Go to Stack", icon: "ph-stack", type: "nav", action: () => scrollTo("#stack") },
    { label: "Go to Experience", icon: "ph-briefcase", type: "nav", action: () => scrollTo("#experience") },
    { label: "Go to Projects", icon: "ph-folder-open", type: "nav", action: () => scrollTo("#projects") },
    { label: "Go to Education", icon: "ph-graduation-cap", type: "nav", action: () => scrollTo("#education") },
    { label: "Go to Contact", icon: "ph-envelope", type: "nav", action: () => scrollTo("#contact") },
    {
      label: "Open GitHub",
      icon: "ph-github-logo",
      type: "link",
      action: () => window.open("https://github.com/divyakanth-k", "_blank"),
    },
    {
      label: "Open LinkedIn",
      icon: "ph-linkedin-logo",
      type: "link",
      action: () => window.open("https://www.linkedin.com/in/divyakanth-k/", "_blank"),
    },
    {
      label: "Open Blog",
      icon: "ph-notebook",
      type: "link",
      action: () => {
        closePalette();
        window.location.href = "blog.html";
      },
    },
    {
      label: "Copy Email",
      icon: "ph-copy",
      type: "action",
      action: () => {
        closePalette();
        copyEmailBtn?.click();
      },
    },
    {
      label: "Toggle Theme",
      icon: "ph-sun",
      type: "action",
      action: () => {
        toggleTheme();
        closePalette();
      },
    },
    {
      label: "Back to Top",
      icon: "ph-arrow-up",
      type: "action",
      action: () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        closePalette();
      },
    },
  ];

  const typeLabels = { nav: "Navigate", link: "Link", action: "Action" };

  let selectedIndex = 0;
  let filteredCommands = [...commands];

  function scrollTo(hash) {
    closePalette();
    const target = document.querySelector(hash);
    const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--nav-height")) || 72;
    if (target) window.scrollTo({ top: target.offsetTop - navHeight, behavior: "smooth" });
  }

  function renderCommands(list) {
    cmdResults.innerHTML = "";

    if (list.length === 0) {
      cmdResults.innerHTML = '<li class="cmd-empty">No results found</li>';
      return;
    }

    list.forEach((cmd, i) => {
      const li = document.createElement("li");
      li.className = "cmd-item" + (i === selectedIndex ? " selected" : "");
      li.innerHTML = `
        <i class="ph ${cmd.icon}"></i>
        <span class="cmd-item-label">${cmd.label}</span>
        <span class="cmd-item-type">${typeLabels[cmd.type]}</span>
      `;
      li.addEventListener("click", () => cmd.action());
      li.addEventListener("mouseenter", () => {
        selectedIndex = i;
        updateSelection();
      });
      cmdResults.appendChild(li);
    });
  }

  function updateSelection() {
    document.querySelectorAll(".cmd-item").forEach((el, i) => {
      el.classList.toggle("selected", i === selectedIndex);
    });
    const selected = cmdResults.children[selectedIndex];
    if (selected) selected.scrollIntoView({ block: "nearest" });
  }

  function openPalette() {
    palette.classList.add("open");
    cmdInput.value = "";
    selectedIndex = 0;
    filteredCommands = [...commands];
    renderCommands(filteredCommands);
    setTimeout(() => cmdInput.focus(), 50);
  }

  function closePalette() {
    palette.classList.remove("open");
  }

  cmdInput.addEventListener("input", () => {
    const q = cmdInput.value.toLowerCase().trim();

    // Developer Easter Eggs
    if (q === "sudo" || q === "su") {
      filteredCommands = [
        {
          label: "Nice try. This incident will be reported.",
          icon: "ph-warning",
          type: "action",
          action: () => {
            alert("User is not in the sudoers file. This incident will be reported to... yourself.");
            closePalette();
          },
        },
      ];
    } else if (q === "rm -rf /" || q === "hack") {
      filteredCommands = [
        {
          label: "System lockdown initiated...",
          icon: "ph-lock-key",
          type: "action",
          action: () => {
            window.location.href = "404.html";
          },
        },
      ];
    } else {
      filteredCommands = commands.filter((c) => c.label.toLowerCase().includes(q));
    }

    selectedIndex = 0;
    renderCommands(filteredCommands);
  });

  cmdInput.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      selectedIndex = Math.min(selectedIndex + 1, filteredCommands.length - 1);
      updateSelection();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      selectedIndex = Math.max(selectedIndex - 1, 0);
      updateSelection();
    } else if (e.key === "Enter") {
      e.preventDefault();
      filteredCommands[selectedIndex]?.action();
    } else if (e.key === "Escape") {
      closePalette();
    }
  });

  // Global keyboard shortcut
  document.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      palette.classList.contains("open") ? closePalette() : openPalette();
    }
    if (e.key === "Escape" && palette.classList.contains("open")) {
      closePalette();
    }
  });

  // Backdrop click closes
  palette.querySelector(".cmd-backdrop").addEventListener("click", closePalette);

  // Cmd+K hint click opens palette
  document.getElementById("cmd-hint")?.addEventListener("click", openPalette);
});
