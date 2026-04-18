/* ============================================
   Main JavaScript — DevOps Terminal Premium
   Particles, 3D Tilt, Enhanced Animations
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ══════════════════════════════════════
  // 1. Typing Effect
  // ══════════════════════════════════════
  const titles = [
    'DevOps / Security Engineer',
    'Cloud Platform Engineer',
    'Infrastructure Architect',
    'Linux Systems Administrator',
    'SCM & Compliance Specialist'
  ];

  const typedTextEl = document.getElementById('typedText');
  let titleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 80;

  function typeEffect() {
    const currentTitle = titles[titleIndex];

    if (isDeleting) {
      typedTextEl.textContent = currentTitle.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 40;
    } else {
      typedTextEl.textContent = currentTitle.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 80;
    }

    if (!isDeleting && charIndex === currentTitle.length) {
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
      typeSpeed = 500;
    }

    setTimeout(typeEffect, typeSpeed);
  }

  setTimeout(typeEffect, 1200);


  // ══════════════════════════════════════
  // 2. Particle System (Hero Background)
  // ══════════════════════════════════════
  const canvas = document.getElementById('particles-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: null, y: null };

    function resizeCanvas() {
      const hero = canvas.parentElement;
      canvas.width = hero.offsetWidth;
      canvas.height = hero.offsetHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.1;
        // Random color — green, blue, or amber
        const colors = [
          { r: 0, g: 212, b: 170 },   // cyan/green
          { r: 14, g: 165, b: 233 },   // blue
          { r: 245, g: 158, b: 11 },   // amber
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Mouse interaction — particles gently repel from cursor
        if (mouse.x !== null) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const force = (120 - dist) / 120;
            this.x += (dx / dist) * force * 1.5;
            this.y += (dy / dist) * force * 1.5;
          }
        }

        // Wrap around
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity})`;
        ctx.fill();
      }
    }

    // Create particles
    const particleCount = Math.min(80, Math.floor((canvas.width * canvas.height) / 15000));
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Draw connection lines
    function drawConnections() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            const opacity = (1 - dist / 150) * 0.15;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 212, 170, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      drawConnections();
      requestAnimationFrame(animateParticles);
    }

    animateParticles();

    // Track mouse position within hero
    canvas.parentElement.addEventListener('mousemove', (e) => {
      const rect = canvas.parentElement.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });

    canvas.parentElement.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });
  }


  // ══════════════════════════════════════
  // 3. 3D Card Tilt Effect
  // ══════════════════════════════════════
  const tiltCards = document.querySelectorAll('.glass-panel');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });


  // ══════════════════════════════════════
  // 4. Scroll-Triggered Animations (Enhanced)
  // ══════════════════════════════════════
  const animatedElements = document.querySelectorAll(
    '.animate-on-scroll, .animate-slide-left, .animate-slide-right, .animate-scale'
  );

  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        scrollObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  animatedElements.forEach(el => scrollObserver.observe(el));


  // ══════════════════════════════════════
  // 5. Navbar Scroll Effect with Progress
  // ══════════════════════════════════════
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  function handleNavScroll() {
    const currentScroll = window.scrollY;

    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });


  // ══════════════════════════════════════
  // 6. Active Nav Link Highlight
  // ══════════════════════════════════════
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: `-${parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 72}px 0px 0px 0px`
  });

  sections.forEach(section => sectionObserver.observe(section));


  // ══════════════════════════════════════
  // 7. Mobile Menu Toggle
  // ══════════════════════════════════════
  const navToggle = document.getElementById('navToggle');
  const navLinksContainer = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinksContainer.classList.toggle('open');
    document.body.style.overflow = navLinksContainer.classList.contains('open') ? 'hidden' : '';
  });

  navLinksContainer.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinksContainer.classList.remove('open');
      document.body.style.overflow = '';
    });
  });


  // ══════════════════════════════════════
  // 8. Smooth Scroll for Nav Links
  // ══════════════════════════════════════
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 72;
        const top = target.offsetTop - navHeight;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });


  // ══════════════════════════════════════
  // 9. Counter Animation (Enhanced with glow)
  // ══════════════════════════════════════
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.getAttribute('data-target'));
        animateCounter(entry.target, target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => counterObserver.observe(el));

  function animateCounter(element, target) {
    const duration = 2000;
    const startTime = performance.now();
    const suffix = element.closest('.stat-card')
      ?.querySelector('.stat-label')
      ?.textContent.includes('%') ? '.9' : '+';

    element.classList.add('counting');

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);

      element.textContent = current + (progress === 1 ? suffix : '');

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        element.classList.remove('counting');
        element.classList.add('counted');
      }
    }

    requestAnimationFrame(updateCounter);
  }


  // ══════════════════════════════════════
  // 10. Tech Stack Filter (Enhanced)
  // ══════════════════════════════════════
  const filterButtons = document.querySelectorAll('.stack-filter-btn');
  const techTiles = document.querySelectorAll('.tech-tile');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      techTiles.forEach((tile, index) => {
        const category = tile.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          tile.style.display = '';
          tile.style.opacity = '0';
          tile.style.transform = 'translateY(20px) scale(0.95)';
          setTimeout(() => {
            tile.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            tile.style.opacity = '1';
            tile.style.transform = 'translateY(0) scale(1)';
          }, index * 30); // stagger each tile
        } else {
          tile.style.opacity = '0';
          tile.style.transform = 'scale(0.85)';
          setTimeout(() => {
            tile.style.display = 'none';
          }, 300);
        }
      });
    });
  });


  // ══════════════════════════════════════
  // 11. Proficiency Bar Animation
  // ══════════════════════════════════════
  const proficiencyBars = document.querySelectorAll('.proficiency-fill');

  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const targetWidth = entry.target.style.width;
        entry.target.style.width = '0%';
        requestAnimationFrame(() => {
          entry.target.style.width = targetWidth;
        });
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  proficiencyBars.forEach(bar => barObserver.observe(bar));


  // ══════════════════════════════════════
  // 12. Timeline Deploy Animation
  // ══════════════════════════════════════
  const timelineDots = document.querySelectorAll('.timeline-dot');

  const dotObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('deployed');
          // Add a brief flash effect
          setTimeout(() => {
            entry.target.classList.remove('deployed');
          }, 600);
        }, 200);
      }
    });
  }, { threshold: 0.5 });

  timelineDots.forEach(dot => dotObserver.observe(dot));


  // ══════════════════════════════════════
  // 13. Parallax Scroll Depth
  // ══════════════════════════════════════
  const heroDecorations = document.querySelectorAll('.hero-decoration');
  const floatingCommands = document.querySelector('.floating-commands');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const heroHeight = document.querySelector('.hero')?.offsetHeight || 1000;

    if (scrollY < heroHeight) {
      heroDecorations.forEach((dec, i) => {
        const speed = 0.15 + (i * 0.08);
        dec.style.transform = `translateY(${scrollY * speed}px)`;
      });

      if (floatingCommands) {
        floatingCommands.style.transform = `translateY(${scrollY * 0.1}px)`;
      }
    }
  }, { passive: true });


  // ══════════════════════════════════════
  // 14. Magnetic Hover on Buttons
  // ══════════════════════════════════════
  const magneticBtns = document.querySelectorAll('.btn-primary, .btn-outline');

  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0px, 0px)';
    });
  });

  // ══════════════════════════════════════
  // 15. Terminal Boot Sequence Overlay
  // ══════════════════════════════════════
  const bootSequence = document.getElementById('boot-sequence');
  const bootText = document.getElementById('boot-text');

  if (bootSequence && bootText && !sessionStorage.getItem('bootScreenShown')) {
    document.body.style.overflow = 'hidden';
    sessionStorage.setItem('bootScreenShown', 'true');

    const lines = [
      { text: "Initializing kernel...", class: "system", delay: 100 },
      { text: "[ <span class=\"ok\">OK</span> ] Mounted root filesystem.", class: "", delay: 300 },
      { text: "[ <span class=\"ok\">OK</span> ] Started DevOps Subsystem.", class: "", delay: 200 },
      { text: "[ <span class=\"warn\">WARN</span> ] Unauthorized access detected on port 22.", class: "", delay: 400 },
      { text: "[ <span class=\"ok\">OK</span> ] Threat mitigated auto-banned IP.", class: "", delay: 150 },
      { text: "[ <span class=\"ok\">OK</span> ] Loading Security Engineer profile_data.json", class: "", delay: 500 },
      { text: "Decrypting credentials...", class: "system", delay: 600 },
      { text: "Access Granted. Welcome Divyakanth.", class: "ok", delay: 200 }
    ];

    let currentDelay = 0;
    
    lines.forEach((line, index) => {
      setTimeout(() => {
        const p = document.createElement('div');
        p.className = line.class;
        p.innerHTML = line.text;
        bootText.appendChild(p);
        
        // Auto scroll
        bootSequence.scrollTop = bootSequence.scrollHeight;

        if (index === lines.length - 1) {
          setTimeout(() => {
            bootSequence.classList.add('hidden');
            document.body.style.overflow = '';
            // Trigger decryption on hero
            triggerDecryption();
          }, 800);
        }
      }, currentDelay);
      currentDelay += line.delay;
    });
  } else if (bootSequence) {
    bootSequence.style.display = 'none';
    triggerDecryption(); // if refreshed, just trigger the decrypt immediately
  } else {
    triggerDecryption();
  }

  // ══════════════════════════════════════
  // 16. Decryption Text Effect
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

    // Isolate the text node from icons or child elements
    const lockIcon = element.querySelector('.hero-lock');
    const prefix = element.querySelector('.mono-prefix');
    const childSpan = element.querySelector('.gradient-text');
    
    let targetEl = element;
    if (childSpan) targetEl = childSpan; // decrypt the inner span if it exists
    
    // We only scramble the actual text content to avoid breaking HTML structure
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
      
      iterations += 1/2; // speed controls how fast characters lock in
      
      if (iterations >= originalText.length) {
        clearInterval(interval);
        targetEl.textContent = originalText;
        if (lockIcon) {
          setTimeout(() => lockIcon.classList.add('unlocked'), 300);
        }
      }
    }, 40);
  }

});
