function countStars(stars) {
  if (!stars) return 0;
  // Count either '★' or '*' or '⭐' visually, not by string length
  const arr = Array.from(stars); // proper Unicode iteration
  return arr.filter(ch => ch === '★' || ch === '*' || ch === '⭐').length;
}

function starText(stars) {
  const n = countStars(stars);
  return "★".repeat(Math.min(n,5)) + "☆".repeat(Math.max(0, 5 - n));
}

function articleHTML(a) {
  const rating = countStars(a.stars);
  return `
  <article class="review" data-genre="${a.genre || ''}" data-level="${a.ages || ''}" data-rating="${rating}">
    <header>
      <h2>${a.title}</h2>
    </header>

    <div class="article-grid">
      <dl class="details">
        <div><dt>Date</dt><dd>${a.date || '-'}</dd></div>
        <div><dt>Ages</dt><dd>${a.ages || '-'}</dd></div>
        <div><dt>Genre</dt><dd>${a.genre || '-'}</dd></div>
        <div><dt>Rating</dt><dd>${starText(a.stars)}</dd></div>
      </dl>

      <div class="content">
        <figure class="cover">
          <img src="${a.imgSrc}" alt="${a.imgAlt || ''}" width="300" height="420" loading="lazy">
          ${a.description ? `<figcaption>${a.description}</figcaption>` : ""}
        </figure>
      </div>
    </div>
    <footer class="tags"></footer>
  </article>`;
}


function renderArticles(list) {
  const container = document.querySelector('#reviews');
  if (!container) return;
  container.innerHTML = list.map(articleHTML).join('');
}

// Kick it off once DOM is ready and blog.js has loaded.
document.addEventListener('DOMContentLoaded', () => {
  if (Array.isArray(window.articles)) {
    renderArticles(window.articles);
  } else {
    console.warn('No "articles" array found from blog.js');
  }
});
