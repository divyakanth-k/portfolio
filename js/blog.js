/* ============================================
   Blog Page — Interactive Features
   Theme sync, Search, back-to-top, mobile nav
   ============================================ */

(function () {
  'use strict';

  // ══════════════════════════════════════
  // 1. Theme — sync with main portfolio
  //    Reads localStorage (set by features.js on index.html)
  //    and applies the same theme here
  // ══════════════════════════════════════
  const themeToggle = document.getElementById('theme-toggle');

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    if (themeToggle) {
      const icon = themeToggle.querySelector('i');
      if (icon) icon.className = theme === 'dark' ? 'ph ph-sun' : 'ph ph-moon';
    }
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    applyTheme(current === 'dark' ? 'light' : 'dark');
  }

  // Read saved preference from localStorage (shared with main page)
  // Fall back to system preference, then dark as last resort
  const savedTheme   = localStorage.getItem('theme');
  const sysDark      = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(savedTheme || (sysDark ? 'dark' : 'light'));

  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }


  // ══════════════════════════════════════
  // 2. Post Counts per Year Group
  // ══════════════════════════════════════
  function updatePostCounts() {
    document.querySelectorAll('.blog-year-group').forEach(group => {
      const visible = group.querySelectorAll('.blog-post-item:not(.hidden)').length;
      const total   = group.querySelectorAll('.blog-post-item').length;
      const countEl = group.querySelector('.blog-year-count');
      if (countEl) {
        countEl.textContent = visible === total
          ? `${total} post${total !== 1 ? 's' : ''}`
          : `${visible} / ${total} posts`;
      }
    });
  }

  updatePostCounts();


  // ══════════════════════════════════════
  // 3. Live Search
  // ══════════════════════════════════════
  const searchInput = document.getElementById('blogSearch');
  const searchCount = document.getElementById('searchCount');
  const noResults   = document.querySelector('.blog-no-results');
  const postItems   = document.querySelectorAll('.blog-post-item');
  const yearGroups  = document.querySelectorAll('.blog-year-group');

  if (searchInput) {
    searchInput.addEventListener('input', function () {
      const query = this.value.toLowerCase().trim();
      let matchCount = 0;

      postItems.forEach(item => {
        const linkEl = item.querySelector('.blog-post-link');
        const tagEl  = item.querySelector('.blog-post-tag');
        const text   = (linkEl ? linkEl.textContent : '').toLowerCase()
                     + ' ' + (tagEl ? tagEl.textContent : '').toLowerCase();

        const matches = !query || text.includes(query);
        item.classList.toggle('hidden', !matches);
        if (matches) matchCount++;
      });

      // Hide year groups with no visible posts
      yearGroups.forEach(group => {
        const hasVisible = group.querySelectorAll('.blog-post-item:not(.hidden)').length > 0;
        group.classList.toggle('hidden', !hasVisible);
      });

      if (searchCount) {
        searchCount.textContent = query
          ? `${matchCount} result${matchCount !== 1 ? 's' : ''}`
          : '';
      }

      if (noResults) {
        noResults.classList.toggle('visible', matchCount === 0 && query.length > 0);
      }

      updatePostCounts();
    });
  }


  // ══════════════════════════════════════
  // 4. Back to Top
  // ══════════════════════════════════════
  const backToTop = document.getElementById('back-to-top');

  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }


  // ══════════════════════════════════════
  // 5. Mobile Nav Toggle
  // ══════════════════════════════════════
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  // ══════════════════════════════════════
  // 6. Decryption Text Effect
  // ══════════════════════════════════════
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';

  function triggerDecryption() {
    const decryptElements = document.querySelectorAll('.decrypt-text');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('decrypted')) {
          entry.target.classList.add('decrypted');
          decryptNode(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    decryptElements.forEach(el => observer.observe(el));
  }

  function decryptNode(element) {
    const originalText = element.getAttribute('data-text');
    if (!originalText) return;

    const childSpan = element.querySelector('.gradient-text');
    let targetEl = element;
    if (childSpan) targetEl = childSpan; // decrypt the inner span if it exists

    let iterations = 0;
    const maxIterations = 15;

    const interval = setInterval(() => {
      targetEl.textContent = originalText.split('')
        .map((char, index) => {
          if (char === ' ') return ' ';
          if (index < iterations) return originalText[index];
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');

      iterations += 1 / 2;

      if (iterations >= originalText.length) {
        clearInterval(interval);
        targetEl.textContent = originalText;
      }
    }, 40);
  }

  triggerDecryption();

})();
