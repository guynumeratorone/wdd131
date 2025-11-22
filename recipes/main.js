import recipes from './recipes.mjs';

function random(num) {
  // returns an integer from 0 up to (but not including) num
  return Math.floor(Math.random() * num);
}

function getRandomListEntry(list) {
  const listLength = list.length;
  const randomIndex = random(listLength);
  return list[randomIndex];
}

function tagsTemplate(tags) {
  // tags is an array like ["Dessert", "Fruit"]
  let html = "";
  for (const tag of tags) {
    html += `<li>${tag}</li>`;
  }
  return html;
}

function ratingTemplate(rating) {
  // Round to nearest whole star so 4.5 => 5 stars
  const rounded = Math.round(rating);

  let html = `<span
    class="rating"
    role="img"
    aria-label="Rating: ${rating} out of 5 stars"
  >`;

  for (let i = 1; i <= 5; i++) {
    if (i <= rounded) {
      html += `<span aria-hidden="true" class="icon-star">★</span>`;
    } else {
      html += `<span aria-hidden="true" class="icon-star-empty">☆</span>`;
    }
  }

  html += `</span>`;
  return html;
}

function recipeTemplate(recipe) {
  // Build an <article class="recipe-card"> to match your existing HTML/CSS
  const tagsHtml = tagsTemplate(recipe.tags);

  // Build a simple meta line out of tags + cookTime + yield
  const metaParts = [];
  if (recipe.tags && recipe.tags.length > 0) {
    metaParts.push(recipe.tags.join(", "));
  }
  if (recipe.cookTime) {
    metaParts.push(recipe.cookTime);
  }
  if (recipe.recipeYield) {
    metaParts.push(recipe.recipeYield);
  }
  const metaText = metaParts.join(" • ");

  const detailsHref = recipe.url && recipe.url.trim().length > 0
    ? recipe.url
    : "#";

  return `
  <article class="recipe-card">
    <img
      src="${recipe.image}"
      alt="${recipe.name}"
    >
    <div class="recipe-content">
      <h2>${recipe.name}</h2>

      <ul class="recipe-tags">
        ${tagsHtml}
      </ul>

      <p class="recipe-meta">${metaText}</p>

      <div class="recipe-rating">
        ${ratingTemplate(recipe.rating)}
        <span class="rating-count">${recipe.rating} / 5</span>
      </div>

      <p class="description">
        ${recipe.description}
      </p>

      <a href="${detailsHref}" class="details-link">View full recipe</a>
    </div>
  </article>`;
}

function renderRecipes(recipeList) {
  const container = document.querySelector('#recipes');
  const recipesHTML = recipeList.map(recipeTemplate).join('');
  container.innerHTML = recipesHTML;
}

function filterRecipes(query) {
  // if query is empty, just show all recipes sorted by name
  if (!query) {
    return [...recipes].sort((a, b) => a.name.localeCompare(b.name));
  }

  const filtered = recipes.filter((recipe) => {
    const q = query.toLowerCase();

    const nameMatch = recipe.name.toLowerCase().includes(q);
    const descMatch = recipe.description.toLowerCase().includes(q);

    const tagMatch = recipe.tags &&
      recipe.tags.find((tag) => tag.toLowerCase().includes(q));

    const ingredientMatch = recipe.recipeIngredient &&
      recipe.recipeIngredient.find((item) => item.toLowerCase().includes(q));

    return nameMatch || descMatch || tagMatch || ingredientMatch;
  });

  // sort alphabetically by name
  filtered.sort((a, b) => a.name.localeCompare(b.name));
  return filtered;
}

function searchHandler(e) {
  e.preventDefault(); // stop the form from reloading the page

  const input = document.querySelector('#search');
  const query = input.value.trim().toLowerCase();

  const results = filterRecipes(query);
  renderRecipes(results);
}

function init() {
  // show a random recipe on first load
  const recipe = getRandomListEntry(recipes);
  renderRecipes([recipe]);

  // hook up the search form
  const form = document.querySelector('form.search');
  if (form) {
    form.addEventListener('submit', searchHandler);
  }
}




init();
