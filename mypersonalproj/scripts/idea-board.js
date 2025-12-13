// scripts/idea-board.js
import { ideas as initialIdeas } from "./ideas.js";

const state = {
  ideas: [...initialIdeas],
  filterType: "All",
  sortBy: "newest",
  search: "",
};

function isPopular(idea) {
  return idea.upvotes >= 5;
}

function isUseCase(idea) {
  return idea.type === "Use Case";
}

function formatType(type) {
  return type;
}

function ideaCardTemplate(idea) {
  const popularBadge = isPopular(idea)
    ? `<span class="badge badge-popular">Popular</span>`
    : "";

  return `
    <article class="idea-card" data-id="${idea.id}">
      <div class="idea-top">
        <div class="idea-meta">
          <span class="badge badge-type">${formatType(idea.type)}</span>
          ${popularBadge}
        </div>

        <button class="upvote-btn" type="button" aria-label="Upvote ${idea.title}">
          ▲ <span class="upvote-count">${idea.upvotes}</span>
        </button>
      </div>

      <h3 class="idea-title">${idea.title}</h3>
      <p class="idea-desc">${idea.description}</p>
    </article>
  `;
}

function getVisibleIdeas() {
  const q = state.search.trim().toLowerCase();

  let results = state.ideas
    .filter((idea) => state.filterType === "All" || idea.type === state.filterType)
    .filter((idea) => {
      if (!q) return true;
      return (
        idea.title.toLowerCase().includes(q) ||
        idea.description.toLowerCase().includes(q) ||
        idea.type.toLowerCase().includes(q)
      );
    });

  if (state.sortBy === "newest") {
    results = results.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } else if (state.sortBy === "upvotes") {
    results = results.sort((a, b) => b.upvotes - a.upvotes);
  } else if (state.sortBy === "title") {
    results = results.sort((a, b) => a.title.localeCompare(b.title));
  }

  return results;
}

function render() {
  const featuresSection = document.getElementById("features-section");
  const usecasesSection = document.getElementById("usecases-section");

  const featuresList = document.getElementById("features-list");
  const usecasesList = document.getElementById("usecases-list");

  const featuresEmpty = document.getElementById("features-empty");
  const usecasesEmpty = document.getElementById("usecases-empty");

  if (
    !featuresSection ||
    !usecasesSection ||
    !featuresList ||
    !usecasesList ||
    !featuresEmpty ||
    !usecasesEmpty
  ) {
    return;
  }

  const visible = getVisibleIdeas();

  const visibleFeatures = visible.filter((x) => !isUseCase(x));
  const visibleUseCases = visible.filter((x) => isUseCase(x));

  // Section visibility rules based on filter
  const showOnlyUseCases = state.filterType === "Use Case";
  const showOnlyFeatures = state.filterType !== "All" && state.filterType !== "Use Case";

  if (showOnlyUseCases) {
    featuresSection.hidden = true;
    usecasesSection.hidden = false;
  } else if (showOnlyFeatures) {
    featuresSection.hidden = false;
    usecasesSection.hidden = true;
  } else {
    // All
    featuresSection.hidden = false;
    usecasesSection.hidden = false;
  }

  // Render Features list
  if (!featuresSection.hidden) {
    if (visibleFeatures.length === 0) {
      featuresList.innerHTML = "";
      featuresEmpty.hidden = false;
    } else {
      featuresEmpty.hidden = true;
      featuresList.innerHTML = visibleFeatures.map(ideaCardTemplate).join("");
    }
  }

  // Render Use Cases list
  if (!usecasesSection.hidden) {
    if (visibleUseCases.length === 0) {
      usecasesList.innerHTML = "";
      usecasesEmpty.hidden = false;
    } else {
      usecasesEmpty.hidden = true;
      usecasesList.innerHTML = visibleUseCases.map(ideaCardTemplate).join("");
    }
  }
}

function wireControls() {
  const filter = document.getElementById("filter-type");
  const sort = document.getElementById("sort-by");
  const search = document.getElementById("search");
  const form = document.getElementById("idea-form");
  const wrapper = document.getElementById("ideas-wrapper");

  filter?.addEventListener("change", () => {
    state.filterType = filter.value;
    render();
  });

  sort?.addEventListener("change", () => {
    state.sortBy = sort.value;
    render();
  });

  search?.addEventListener("input", () => {
    state.search = search.value;
    render();
  });

  form?.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("idea-title").value.trim();
    const type = document.getElementById("idea-type").value;
    const description = document.getElementById("idea-desc").value.trim();

    const newIdea = {
      id: Date.now(),
      title,
      type,
      description,
      upvotes: 0,
      createdAt: new Date().toISOString(),
    };

    state.ideas.unshift(newIdea);
    form.reset();
    render();
  });

  wrapper?.addEventListener("click", (e) => {
    const btn = e.target.closest(".upvote-btn");
    if (!btn) return;

    const card = e.target.closest(".idea-card");
    const id = Number(card?.dataset.id);
    const idea = state.ideas.find((x) => x.id === id);
    if (!idea) return;

    idea.upvotes += 1;
    render();
  });
}

wireControls();
render();
