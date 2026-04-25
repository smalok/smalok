/* ═══════════════════════════════════════════════════════════════
   GALACTIC ARCHITECT — Interactive Scripts
   ═══════════════════════════════════════════════════════════════ */

// ─── Particle System ───
(function initParticles() {
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];
  const PARTICLE_COUNT = 80;

  function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
  window.addEventListener('resize', resize);
  resize();

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.speedY = (Math.random() - 0.5) * 0.3;
      this.opacity = Math.random() * 0.5 + 0.1;
      const colors = ['168,164,255', '0,210,253', '255,157,208'];
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }
    update() {
      this.x += this.speedX; this.y += this.speedY;
      if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
    }
    draw() {
      ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color},${this.opacity})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());

  function connectParticles() {
    for (let a = 0; a < particles.length; a++) {
      for (let b = a + 1; b < particles.length; b++) {
        const dx = particles[a].x - particles[b].x;
        const dy = particles[a].y - particles[b].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(108,99,255,${0.08 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    connectParticles();
    requestAnimationFrame(animate);
  }
  animate();
})();

// ─── Navbar scroll ───
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  navbar?.classList.toggle('scrolled', window.scrollY > 50);
  const btn = document.querySelector('.back-to-top');
  btn?.classList.toggle('visible', window.scrollY > 400);
});

// ─── Mobile nav toggle ───
document.querySelector('.nav-toggle')?.addEventListener('click', () => {
  document.querySelector('.nav-links')?.classList.toggle('open');
});
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => document.querySelector('.nav-links')?.classList.remove('open'));
});

// ─── Scroll reveal ───
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ─── Terminal typing effect ───
(function initTerminalTyping() {
  const el = document.getElementById('terminal-typing');
  if (!el) return;
  const lines = [
    { text: '// manish_kumar.config.js', cls: 'comment' },
    { text: 'const developer = {', cls: '' },
    { text: '  name: "Manish Kumar",', cls: 'string', indent: true },
    { text: '  role: "AI & ML Engineer",', cls: 'string', indent: true },
    { text: '  university: "Vel Tech",', cls: 'string', indent: true },
    { text: '  cgpa: 9.0,', cls: 'var', indent: true },
    { text: '  passions: ["DSA", "CP", "AI"],', cls: 'keyword', indent: true },
    { text: '  status: "Open to work"', cls: 'func', indent: true },
    { text: '};', cls: '' },
    { text: 'deploy(developer); █', cls: 'keyword' },
  ];
  let html = '';
  lines.forEach(l => {
    const indent = l.indent ? '  ' : '';
    html += `<div>${indent}<span class="${l.cls}">${l.text}</span></div>`;
  });
  el.innerHTML = html;
})();

// ─── Counter animation ───
function animateCounters() {
  document.querySelectorAll('.stat-number span').forEach(el => {
    const target = parseInt(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    let current = 0;
    const step = Math.max(1, Math.floor(target / 40));
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = current + suffix;
    }, 30);
  });
}
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { animateCounters(); counterObserver.unobserve(e.target); } });
}, { threshold: 0.5 });
const statRow = document.querySelector('.stat-row');
if (statRow) counterObserver.observe(statRow);

// ─── Smooth scroll for back-to-top ───
document.querySelector('.back-to-top')?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ─── Active nav highlight ───
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 100) current = s.getAttribute('id');
  });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? '#a8a4ff' : '';
  });
});
