/* ═══════════════════════════════════════════════════════
   FULLTREINA — Immersive Interactions
   Particle system, scroll reveals, counters, navigation
   ═══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  initParticleSystem('hero-canvas');
  initParticleSystem('differentials-canvas');
  initTypewriterHero();
  initScrollReveals();
  initStatements();
  initCounters();
  initHeader();
  initMobileNav();
  initSmoothScroll();
  initForm();
});

/* ═══════════════════ PARTICLE SYSTEM ═══════════════════ */
function initParticleSystem(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];
  let mouse = { x: -999, y: -999 };
  let animFrame;

  function resize() {
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;
  }
  resize();

  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });
  canvas.addEventListener('mouseleave', () => {
    mouse.x = -999;
    mouse.y = -999;
  });

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 1.8 + 0.3;
      this.baseX = this.x;
      this.baseY = this.y;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = (Math.random() - 0.5) * 0.3;
      this.opacity = Math.random() * 0.4 + 0.1;
    }
    update() {
      // Drift
      this.x += this.vx;
      this.y += this.vy;

      // Mouse repel
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        const force = (120 - dist) / 120;
        this.x += (dx / dist) * force * 2;
        this.y += (dy / dist) * force * 2;
      }

      // Wrap
      if (this.x > canvas.width + 10) this.x = -10;
      if (this.x < -10) this.x = canvas.width + 10;
      if (this.y > canvas.height + 10) this.y = -10;
      if (this.y < -10) this.y = canvas.height + 10;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(59, 130, 246, ${this.opacity})`;
      ctx.fill();
    }
  }

  let lastArea = canvas.width * canvas.height;
  let count = Math.min(250, Math.floor(lastArea / 15000));
  for (let i = 0; i < count; i++) {
    particles.push(new Particle());
  }

  function drawLines() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(59, 130, 246, ${0.06 * (1 - dist / 150)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    drawLines();
    animFrame = requestAnimationFrame(animate);
  }
  
  window.addEventListener('resize', () => {
    resize();
    const newArea = canvas.width * canvas.height;
    if (Math.abs(newArea - lastArea) > 50000) {
      particles = [];
      count = Math.min(250, Math.floor(newArea / 15000));
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
      lastArea = newArea;
    }
  });

  animate();
}

/* ═══════════════════ HERO TYPEWRITER ═══════════════════ */
function initTypewriterHero() {
  const container = document.getElementById('typewriter-content');
  const heroSection = document.getElementById('hero');
  if (!container || !heroSection) return;

  const fragments = [
    { text: "Especialistas ", className: "word" },
    { text: "em ", className: "word" },
    { text: "SAP PM ", className: "word accent" },
    { text: "e ", className: "word" },
    { text: "SAP Script ", className: "word accent" },
    { text: "para ", className: "word" },
    { text: "Gestão ", className: "word" },
    { text: "Inteligente ", className: "word" },
    { text: "de ", className: "word" },
    { text: "Ativos", className: "word" }
  ];

  let typingTimeout;

  function typeWriter() {
    container.innerHTML = '';
    let currentFragmentIndex = 0;
    let currentCharIndex = 0;
    
    const elements = fragments.map(frag => {
      const span = document.createElement('span');
      span.className = frag.className;
      container.appendChild(span);
      return span;
    });

    function typeChar() {
      if (currentFragmentIndex >= fragments.length) {
        document.querySelectorAll('.hero-sub, .hero-btns').forEach(el => el.classList.add('active'));
        return;
      }

      const frag = fragments[currentFragmentIndex];
      const el = elements[currentFragmentIndex];

      el.textContent += frag.text[currentCharIndex];
      currentCharIndex++;

      if (currentCharIndex >= frag.text.length) {
        currentFragmentIndex++;
        currentCharIndex = 0;
      }

      typingTimeout = setTimeout(typeChar, 45); // Typing speed
    }

    typingTimeout = setTimeout(typeChar, 400); // initial delay before typing
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        clearTimeout(typingTimeout);
        document.querySelectorAll('.hero-sub, .hero-btns').forEach(el => el.classList.remove('active'));
        typeWriter();
      } else {
        clearTimeout(typingTimeout);
        container.innerHTML = '';
        document.querySelectorAll('.hero-sub, .hero-btns').forEach(el => el.classList.remove('active'));
      }
    });
  }, { threshold: 0.1 });

  observer.observe(heroSection);
}

/* ═══════════════════ SCROLL REVEALS ═══════════════════ */
function initScrollReveals() {
  const elements = document.querySelectorAll('.reveal-fade, .reveal-slide-up');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

/* ═══════════════════ STATEMENT SECTIONS ═══════════════════ */
function initStatements() {
  const statements = document.querySelectorAll('[data-statement]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      } else {
        entry.target.classList.remove('in-view');
      }
    });
  }, {
    threshold: 0.4,
    rootMargin: '-10% 0px -10% 0px'
  });

  statements.forEach(s => observer.observe(s));
}

/* ═══════════════════ COUNTER ANIMATION ═══════════════════ */
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'));
        animateCounter(el, target);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

function animateCounter(el, target) {
  const duration = 2000;
  const start = performance.now();

  function tick(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(target * eased);
    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      el.textContent = target;
    }
  }
  requestAnimationFrame(tick);
}

/* ═══════════════════ HEADER ═══════════════════ */
function initHeader() {
  const header = document.getElementById('header');
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        if (window.scrollY > 80) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
        ticking = false;
      });
      ticking = true;
    }
  });
}

/* ═══════════════════ MOBILE NAV ═══════════════════ */
function initMobileNav() {
  const toggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('nav-links');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
  });

  // Close on link click
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* ═══════════════════ SMOOTH SCROLL ═══════════════════ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* ═══════════════════ FORM ═══════════════════ */
function initForm() {
  const form = document.getElementById('fulltreina-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const original = btn.textContent;

    btn.textContent = 'Enviando...';
    btn.disabled = true;
    btn.style.opacity = '0.7';

    const formData = new FormData(form);

    try {
      const response = await fetch("https://formsubmit.co/ajax/fulltreina2@gmail.com", {
        method: "POST",
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
      });

      if (response.ok) {
        btn.textContent = '✓ Recebido com Sucesso!';
        btn.style.opacity = '1';
        btn.style.background = 'linear-gradient(135deg, #059669, #10b981)';
        form.reset();
      } else {
        throw new Error("Erro de resposta do servidor");
      }
    } catch (error) {
      btn.textContent = '✗ Erro ao enviar. Tente novamente.';
      btn.style.opacity = '1';
      btn.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
    } finally {
      setTimeout(() => {
        btn.textContent = original;
        btn.style.background = '';
        btn.disabled = false;
      }, 4000);
    }
  });
}
