/* ============================================================
   PRABHAKAR S GAUR — PORTFOLIO JAVASCRIPT
   EmailJS IDs:
     Public Key  : UniBXgM-X-l8dKboM
     Service ID  : service_hai46s4
     Template ID : template_t0novmp
   ============================================================ */

/* ── EMAILJS INITIALIZATION ─────────────────────────────────── */
(function () {
  if (typeof emailjs !== 'undefined') {
    emailjs.init("UniBXgM-X-l8dKboM");
  } else {
    console.warn('EmailJS not loaded.');
  }
})();

/* ── CUSTOM CURSOR ─────────────────────────────────────────── */
const cursorDot  = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top  = mouseY + 'px';
});

(function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top  = ringY + 'px';
  requestAnimationFrame(animateRing);
})();

document.querySelectorAll('a, button, .skill-card, .project-card, .info-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursorRing.style.width   = '52px';
    cursorRing.style.height  = '52px';
    cursorRing.style.opacity = '0.9';
  });
  el.addEventListener('mouseleave', () => {
    cursorRing.style.width   = '36px';
    cursorRing.style.height  = '36px';
    cursorRing.style.opacity = '0.5';
  });
});

/* ── PARTICLE CANVAS ────────────────────────────────────────── */
const canvas = document.getElementById('bg-canvas');
const ctx    = canvas.getContext('2d');
let particles = [];
const PARTICLE_COUNT = 70;

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x     = Math.random() * canvas.width;
    this.y     = Math.random() * canvas.height;
    this.r     = Math.random() * 1.8 + 0.4;
    this.vx    = (Math.random() - 0.5) * 0.3;
    this.vy    = (Math.random() - 0.5) * 0.3;
    this.alpha = Math.random() * 0.5 + 0.1;
    const hues = [260, 180, 0];
    this.hue   = hues[Math.floor(Math.random() * hues.length)];
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > canvas.width ||
        this.y < 0 || this.y > canvas.height) this.reset();
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = "hsla(" + this.hue + ", 70%, 70%, " + this.alpha + ")";
    ctx.fill();
  }
}

for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());

function drawLines() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx   = particles[i].x - particles[j].x;
      const dy   = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = "rgba(124,106,255," + (0.08 * (1 - dist / 120)) + ")";
        ctx.lineWidth   = 0.6;
        ctx.stroke();
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  drawLines();
  requestAnimationFrame(animateParticles);
}
animateParticles();

/* ── TYPING ANIMATION ───────────────────────────────────────── */
const typingEl = document.getElementById('typingText');
const roles = [
  'Aspiring Software Developer',
  'Java Enthusiast',
  'DSA Problem Solver',
  'Web Developer',
  'Open Source Contributor',
];
let roleIdx = 0, charIdx = 0, deleting = false;

function typeLoop() {
  const current = roles[roleIdx];
  if (!deleting) {
    typingEl.textContent = current.slice(0, charIdx + 1);
    charIdx++;
    if (charIdx === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1800);
      return;
    }
    setTimeout(typeLoop, 80);
  } else {
    typingEl.textContent = current.slice(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) {
      deleting = false;
      roleIdx   = (roleIdx + 1) % roles.length;
      setTimeout(typeLoop, 400);
      return;
    }
    setTimeout(typeLoop, 40);
  }
}
typeLoop();

/* ── NAVBAR ─────────────────────────────────────────────────── */
const navbar       = document.getElementById('navbar');
const hamburger    = document.getElementById('hamburger');
const navLinks     = document.getElementById('navLinks');
const navLinkItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
  updateActiveLink();
  toggleBackTop();
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

navLinkItems.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

function updateActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 80) current = sec.id;
  });
  navLinkItems.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
}

/* ── DARK / LIGHT MODE ──────────────────────────────────────── */
const themeToggle = document.getElementById('themeToggle');
const themeIcon   = document.getElementById('themeIcon');

const savedTheme  = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next    = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateThemeIcon(next);
});

function updateThemeIcon(theme) {
  themeIcon.className = theme === 'dark' ? 'bx bx-sun' : 'bx bx-moon';
}

/* ── SCROLL REVEAL ──────────────────────────────────────────── */
const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

const observer  = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => observer.observe(el));

/* ── SKILL BARS ─────────────────────────────────────────────── */
const skillFills    = document.querySelectorAll('.skill-fill');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.width = entry.target.dataset.pct + '%';
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
skillFills.forEach(fill => skillObserver.observe(fill));

/* ── BACK TO TOP ─────────────────────────────────────────────── */
const backTop = document.getElementById('backTop');

function toggleBackTop() {
  backTop.classList.toggle('show', window.scrollY > 400);
}

backTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ── CONTACT FORM + EMAILJS ───────────────────────────────────
   Public Key  : UniBXgM-X-l8dKboM  (inited above)
   Service ID  : service_hai46s4
   Template ID : template_t0novmp

   EmailJS template mein ye 4 variables zaroor hone chahiye:
     {{from_name}}   - sender ka naam
     {{from_email}}  - sender ki email
     {{message}}     - message text
     {{reply_to}}    - reply-to address
   ─────────────────────────────────────────────────────────── */
const contactForm  = document.getElementById('contactForm');
const formSuccess  = document.getElementById('formSuccess');
const nameInput    = document.getElementById('name');
const emailInput   = document.getElementById('email');
const messageInput = document.getElementById('message');
const nameError    = document.getElementById('nameError');
const emailError   = document.getElementById('emailError');
const messageError = document.getElementById('messageError');

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function clearErrors() {
  [nameInput, emailInput, messageInput].forEach(el => el.classList.remove('error'));
  [nameError, emailError, messageError].forEach(el => el.textContent = '');
}

contactForm.addEventListener('submit', function (e) {
  e.preventDefault();
  clearErrors();

  let valid = true;

  if (nameInput.value.trim().length < 2) {
    nameInput.classList.add('error');
    nameError.textContent = 'Please enter your name (at least 2 characters).';
    valid = false;
  }
  if (!isValidEmail(emailInput.value.trim())) {
    emailInput.classList.add('error');
    emailError.textContent = 'Please enter a valid email address.';
    valid = false;
  }
  if (messageInput.value.trim().length < 10) {
    messageInput.classList.add('error');
    messageError.textContent = 'Message must be at least 10 characters.';
    valid = false;
  }

  if (!valid) return;

  const btn = contactForm.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Sending...';

  const templateParams = {
    from_name:  nameInput.value.trim(),
    from_email: emailInput.value.trim(),
    message:    messageInput.value.trim(),
    reply_to:   emailInput.value.trim()
  };

  if (typeof emailjs === 'undefined') {
    alert('Email service load nahi hua. Direct mail karein: prabhakarsgaur12@gmail.com');
    btn.disabled = false;
    btn.innerHTML = '<i class="bx bx-send"></i> Send Message';
    return;
  }

  emailjs.send('service_hai46s4', 'template_t0novmp', templateParams)
    .then(function (res) {
      console.log('Email sent!', res.status, res.text);
      contactForm.reset();
      formSuccess.classList.add('show');
      btn.disabled = false;
      btn.innerHTML = '<i class="bx bx-send"></i> Send Message';
      setTimeout(() => formSuccess.classList.remove('show'), 5000);
    })
    .catch(function (err) {
      console.error('EmailJS error:', err);
      alert('Message send nahi hua. Direct mail karein: prabhakarsgaur12@gmail.com');
      btn.disabled = false;
      btn.innerHTML = '<i class="bx bx-send"></i> Send Message';
    });
});

/* Real-time validation */
nameInput.addEventListener('input', () => {
  if (nameInput.value.trim().length >= 2) { nameInput.classList.remove('error'); nameError.textContent = ''; }
});
emailInput.addEventListener('input', () => {
  if (isValidEmail(emailInput.value.trim())) { emailInput.classList.remove('error'); emailError.textContent = ''; }
});
messageInput.addEventListener('input', () => {
  if (messageInput.value.trim().length >= 10) { messageInput.classList.remove('error'); messageError.textContent = ''; }
});

/* ── SMOOTH SCROLL ───────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href').slice(1);
    const target   = document.getElementById(targetId);
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.pageYOffset - 72;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ── PAGE LOAD FADE IN ───────────────────────────────────────── */
window.addEventListener('load', () => {
  document.body.style.opacity    = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  setTimeout(() => { document.body.style.opacity = '1'; }, 50);
});
