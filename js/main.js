/* ==============================
   Navbar: solid once you scroll
   ============================== */
const navbar = document.getElementById('navbar');
const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 24);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ==============================
   Mobile menu
   ============================== */
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

function setMenu(open) {
  navLinks.classList.toggle('open', open);
  navToggle.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', String(open));
  navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  document.body.style.overflow = open ? 'hidden' : '';
}
navToggle.addEventListener('click', () => setMenu(!navLinks.classList.contains('open')));
navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

/* ==============================
   Smooth scroll, leaving room for the fixed navbar
   ============================== */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    const target = href === '#top' ? document.body : document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    const top = href === '#top' ? 0 : target.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ==============================
   Reveal on scroll (skipped if the visitor prefers less motion)
   ============================== */
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (!entry.isIntersecting) return;
      setTimeout(() => entry.target.classList.add('visible'), i * 70);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(el => observer.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('visible'));
}

/* ==============================
   Highlight the section you're in
   ============================== */
const sections   = Array.from(document.querySelectorAll('section[id]'));
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => { if (window.scrollY >= sec.offsetTop - 120) current = sec.id; });
  navAnchors.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current));
}, { passive: true });

/* ==============================
   Footer year (stays current)
   ============================== */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ==============================
   Google map: only loaded when the visitor taps it
   (faster first load, and no Google cookies until then)
   ============================== */
const mapLoad = document.getElementById('mapLoad');
if (mapLoad) {
  mapLoad.addEventListener('click', () => {
    const frame = document.createElement('iframe');
    frame.src = 'https://maps.google.com/maps?q=60+Leslie+Park+Road+Croydon+CR0+6TP&output=embed';
    frame.title = 'Map: Grove Autos, 60 Leslie Park Rd, Croydon';
    frame.loading = 'lazy';
    frame.referrerPolicy = 'no-referrer-when-downgrade';
    frame.allowFullscreen = true;
    mapLoad.replaceWith(frame);
  });
}

