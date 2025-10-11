

// menu toggle (simple)
const menuBtn = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');
if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', () => {
    const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', String(!expanded));
    navLinks.classList.toggle('hide');
  });
}

function handleResize() {
  if (window.innerWidth >= 1000) {
    // Always show menu on large screens
    navLinks.classList.remove('hide'); 
    menuBtn.setAttribute('aria-expanded', 'false');
  } else {
    // On small screens, keep menu hidden until clicked
    navLinks.classList.add('hide');
  }
}

// Run once when page loads
handleResize();

// Watch for window size changes
window.addEventListener('resize', handleResize);

// The Viewer Template Function
function viewerTemplate(imgSrc, imgAlt) {
  return `<img src="${imgSrc}" alt="${imgAlt}"><button class='close-viewer'>X</button>`; 
}

// ===== Image viewer using <dialog> =====
const gallery   = document.querySelector('.gallery');
const viewer    = document.getElementById('viewer');
const viewerImg = document.getElementById('viewer-img');
const closeBtn  = document.querySelector('.close-viewer');

// Open the viewer when any gallery image is clicked
gallery.addEventListener('click', (event) => {
  const img = event.target.closest('img');
  if (!img) return;

  // Prefer data-full from the button; else build the full path from the -sm.jpeg
  const btn  = img.closest('.thumb-btn');
  const fileName = img.src.split('/').pop(); // e.g. 'images/norris-sm.jpeg' -> 'norris-sm.jpeg'
  const baseName = fileName.split('-')[0]; // e.g. 'norris-sm.jpeg' -> 'norris'
  const fullPath = img.src.replace(fileName, `${baseName}-full.jpeg`); // Rebuild the full path

  const full = btn?.dataset.full || fullPath; 

  viewerImg.src = full;
  viewerImg.alt = (img.alt || 'Photo').replace('— thumbnail', '').trim();

  viewer.showModal();
});


// Close handlers: X button, click on backdrop, Escape
closeBtn.addEventListener('click', () => viewer.close());
viewer.addEventListener('click', (e) => { if (e.target === viewer) viewer.close(); });
document.addEventListener('keydown', (e) => 
  { if (e.key === 'Escape' && viewer.open) viewer.close(); });


// year fallback (if element present)
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();
