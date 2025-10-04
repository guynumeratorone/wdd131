// file is loaded with <script defer> so DOM is ready

// menu toggle (simple)
const menuBtn = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');
if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', () => {
    const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', String(!expanded));
    navLinks.classList.toggle('hidden');
  });
}

// lightbox elements
const thumbButtons = document.querySelectorAll('.thumb-btn');
const lightbox = document.getElementById('lightbox');
const lbImage = document.getElementById('lb-image');
const lbClose = document.getElementById('lb-close');

let lastFocused = null;

// helper: lock/unlock page scroll
function setScrollLock(lock) {
  document.documentElement.classList.toggle('no-scroll', lock);
}

// open / close
function openLightbox(url, alt) {
  if (!lightbox || !lbImage) return;
  lastFocused = document.activeElement;
  lbImage.src = url || '';
  lbImage.alt = alt || 'Photo';
  lightbox.classList.add('visible');
  lightbox.setAttribute('aria-hidden', 'false');
  setScrollLock(true);
  lbClose?.focus();
}

function closeLightbox() {
  if (!lightbox || !lbImage) return;
  lightbox.classList.remove('visible');
  lightbox.setAttribute('aria-hidden', 'true');
  lbImage.src = '';
  lbImage.alt = '';
  setScrollLock(false);
  lastFocused?.focus();
}

// bind thumbnail clicks
thumbButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const full = btn.dataset.full;
    const alt = btn.querySelector('img')?.alt || 'Photo';
    openLightbox(full, alt);
  });
});

// close handlers
if (lbClose) lbClose.addEventListener('click', closeLightbox);
if (lightbox) {
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });
}
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && lightbox && lightbox.classList.contains('visible')) closeLightbox();
});

// year fallback (if element present)
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();
