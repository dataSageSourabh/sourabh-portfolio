/* ============================================
   SOURABH RATHORE PORTFOLIO — script.js
   ============================================ */


/* ============================================
   1. NAVBAR — Scroll shadow + Active link
   ============================================ */

const navbar  = document.getElementById('navbar');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('#nav-links a');

window.addEventListener('scroll', () => {

  // Shadow when user scrolls down
  navbar.classList.toggle('scrolled', window.scrollY > 20);

  // Highlight active nav link based on scroll position
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 100) {
      current = sec.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });

  // Show/hide back-to-top button
  document.getElementById('back-to-top').classList.toggle('visible', window.scrollY > 400);
});


/* ============================================
   2. MOBILE HAMBURGER MENU
   ============================================ */

const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

// Close mobile menu when any link is clicked
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});


/* ============================================
   3. SCROLL REVEAL ANIMATION
   Explanation: Jab bhi koi card/section
   screen pe aaye — neeche se fade in ho
   ============================================ */

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target); // ek baar ho gaya toh stop
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


/* ============================================
   4. BACK TO TOP BUTTON
   ============================================ */

document.getElementById('back-to-top').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


/* ============================================
   5. DARK MODE TOGGLE
   Explanation:
   - Button click karo → dark mode on/off
   - localStorage mein save hota hai
   - Page reload karne pe bhi yaad rehta hai
   ============================================ */

const darkToggle = document.getElementById('dark-toggle');
const body       = document.body;

// Pehle check karo — pehle se dark mode save tha kya
if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark');
  darkToggle.textContent = '☀️';
}

darkToggle.addEventListener('click', () => {
  body.classList.toggle('dark');

  // Dark hai toh sun emoji, light hai toh moon emoji
  const isDark = body.classList.contains('dark');
  darkToggle.textContent = isDark ? '☀️' : '🌙';

  // Save karo localStorage mein — reload pe bhi yaad rahe
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});


/* ============================================
   6. ANIMATED NUMBER COUNTER
   Explanation:
   - Hero section ke numbers (1+, 3, 8.3, 3+)
   - Page load hote hi count up hote hain
   - Jaise meter chaalta hai — 0 se target tak
   ============================================ */

function animateCounter(element, target, duration = 1500, suffix = '') {
  let start     = 0;
  const step    = target / (duration / 16); // 60fps ke liye
  const isFloat = target % 1 !== 0;         // decimal number hai kya (jaise 8.3)

  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      start = target;
      clearInterval(timer);
    }
    // Decimal hai toh 1 place, warna integer
    element.textContent = isFloat
      ? start.toFixed(1) + suffix
      : Math.floor(start) + suffix;
  }, 16);
}

// Saare stat numbers pe counter lagao
const statNums = document.querySelectorAll('.hero-stat-num');

// Values aur suffixes define karo
const statData = [
  { value: 1,   suffix: '+'  },   // Years Experience
  { value: 3,   suffix: ''   },   // Key Projects
  { value: 8.3, suffix: ''   },   // CGPA
  { value: 3,   suffix: '+'  },   // Certifications
];

// IntersectionObserver — hero section dikhe tab counter shuru ho
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      statNums.forEach((el, i) => {
        if (statData[i]) {
          animateCounter(el, statData[i].value, 1500, statData[i].suffix);
        }
      });
      counterObserver.disconnect(); // Sirf ek baar chalega
    }
  });
}, { threshold: 0.5 });

// Hero right panel observe karo
const heroRight = document.querySelector('.hero-right');
if (heroRight) counterObserver.observe(heroRight);


/* ============================================
   7. TYPING EFFECT — Hero role text
   Explanation:
   - "Data Analyst & BI Engineer" type hota
     dikhega jaise koi likh raha ho
   ============================================ */

const roleEl = document.querySelector('.hero-role');
const roles  = [
  'Data Analyst & BI Engineer',
  'SQL & Python Developer',
  'Power BI Dashboard Builder',
  'Data Pipeline Engineer',
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const current = roles[roleIndex];

  if (!isDeleting) {
    // Type karo — ek ek character add karo
    roleEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === current.length) {
      // Poora type ho gaya — 2 second ruko phir delete karo
      setTimeout(() => { isDeleting = true; }, 2000);
    }
  } else {
    // Delete karo — ek ek character hatao
    roleEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      // Poora delete ho gaya — agli role pe jao
      isDeleting = false;
      roleIndex  = (roleIndex + 1) % roles.length;
    }
  }

  // Speed — typing thoda slow, deleting thoda fast
  const speed = isDeleting ? 60 : 100;
  setTimeout(typeEffect, speed);
}

// 1 second baad typing shuru karo (page load hone do pehle)
setTimeout(typeEffect, 1000);