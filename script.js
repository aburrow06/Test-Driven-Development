/* UI integration for SkillSwap. Tested business logic lives in skillswap-functions.js. */
const skillFunctions = (typeof module !== "undefined" && module.exports)
  ? require("./skillswap-functions")
  : window.SkillSwapFunctions;

const skills = [
  { title: "Python Tutoring", category: "Programming", price: 20, description: "Build programming confidence with beginner-friendly Python practice.", icon: "💻" },
  { title: "Guitar Lessons", category: "Music", price: 15, description: "Learn chords, rhythm, and songs at your own pace.", icon: "🎸" },
  { title: "Resume Review", category: "Career", price: 0, description: "Get helpful feedback to make your resume clearer and stronger.", icon: "📝" },
  { title: "Web Development", category: "Programming", price: 25, description: "Explore HTML, CSS, and JavaScript by building a small website.", icon: "🌐" },
  { title: "JavaScript Help", category: "Programming", price: 25, description: "Work through JavaScript concepts and practice problems.", icon: "⚡" },
  { title: "Songwriting Basics", category: "Music", price: 10, description: "Try lyric ideas, melodies, and simple song structures.", icon: "🎵" }
];

function money(value) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
}

function createSkillCard(skill) {
  const article = document.createElement("article");
  article.className = "skill-card";
  const icon = document.createElement("div");
  icon.className = "skill-icon";
  icon.setAttribute("aria-hidden", "true");
  icon.textContent = skill.icon || "✨";
  const category = document.createElement("p");
  category.className = "skill-category";
  category.textContent = skill.category;
  const title = document.createElement("h3");
  title.textContent = skill.title;
  const description = document.createElement("p");
  description.className = "skill-description";
  description.textContent = skill.description || "";
  const bottom = document.createElement("div");
  bottom.className = "skill-bottom";
  const price = document.createElement("strong");
  price.textContent = skill.price === 0 ? "Free" : `${money(skill.price)} / hr`;
  const details = document.createElement("details");
  const summary = document.createElement("summary");
  summary.textContent = "More info";
  const detailText = document.createElement("p");
  detailText.textContent = `Category: ${skill.category}. Session rate: ${skill.price === 0 ? "Free" : money(skill.price) + " per hour"}.`;
  details.append(summary, detailText);
  bottom.append(price);
  article.append(icon, category, title, description, bottom, details);
  return article;
}

function renderSkills(container, items) {
  if (!container) return;
  container.replaceChildren();
  items.forEach(skill => container.appendChild(createSkillCard(skill)));
}

function initSkillSwap() {
  if (!skillFunctions || typeof document === "undefined") return;
  const skillList = document.getElementById("skill-list");
  const filterMessage = document.getElementById("filter-message");
  const filterButtons = document.querySelectorAll(".filter-button");

  function applyFilter(category) {
    const filtered = skillFunctions.filterSkillsByCategory(skills, category);
    renderSkills(skillList, filtered);
    filterMessage.textContent = filtered.length
      ? `${filtered.length} skill${filtered.length === 1 ? "" : "s"} found.`
      : "No skills found in this category.";
    filterButtons.forEach(button => {
      const selected = button.dataset.category === category;
      button.classList.toggle("active", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
  }

  filterButtons.forEach(button => button.addEventListener("click", () => applyFilter(button.dataset.category)));
  applyFilter("All");

  const costForm = document.getElementById("cost-form");
  costForm?.addEventListener("submit", event => {
    event.preventDefault();
    const rate = Number(document.getElementById("hourly-rate").value);
    const hours = Number(document.getElementById("hours").value);
    const result = skillFunctions.calculateTotalCosts(rate, hours);
    document.getElementById("cost-result").textContent = `Estimated total: ${money(result)}`;
  });

  const matchForm = document.getElementById("match-form");
  matchForm?.addEventListener("submit", event => {
    event.preventDefault();
    const category = document.getElementById("match-category").value;
    const maxPrice = Number(document.getElementById("max-price").value);
    const matches = skillFunctions.matchSkillsToUser({ category, maxPrice }, skills);
    renderSkills(document.getElementById("match-results"), matches);
    document.getElementById("match-message").textContent = matches.length
      ? `${matches.length} matching skill${matches.length === 1 ? "" : "s"} found.`
      : "No matches found. Try a different category or budget.";
  });
}

if (typeof window !== "undefined") {
  window.SkillSwapFunctions = skillFunctions;
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSkillSwap);
  } else {
    initSkillSwap();
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { skills, renderSkills, createSkillCard };
}
