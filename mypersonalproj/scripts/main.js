// scripts/main.js
import { features } from "./features.js";

function featureCardTemplate(feature) {
  const tagsHtml = feature.tags
    .map((tag) => `<span class="tag">${tag}</span>`)
    .join("");

  return `
    <article class="feature-card">
      <div class="feature-icon" aria-hidden="true">
        <img src="${feature.icon}" alt="" width="28" height="28" loading="lazy" decoding="async">
      </div>
      <h3 class="feature-title">${feature.title}</h3>
      <p class="feature-desc">${feature.description}</p>
      <div class="feature-tags">${tagsHtml}</div>
      <button class="feature-btn" type="button">Learn more</button>
    </article>
  `;
}

function renderFeatures(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = features.map(featureCardTemplate).join("");

  // Optional small interaction: click "Learn more" to show an alert
  container.addEventListener("click", (event) => {
    const button = event.target.closest(".feature-btn");
    if (!button) return;

    const card = button.closest(".feature-card");
    const title = card?.querySelector(".feature-title")?.textContent ?? "Feature";
    alert(`${title}\n\nMore details will be added later.`);
  });
}

renderFeatures("feature-spotlight");
