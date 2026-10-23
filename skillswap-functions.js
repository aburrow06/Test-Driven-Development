/**
 * Pure functions for SkillSwap. These functions are separated from the DOM so
 * they can be tested automatically with Jest.
 */

function filterSkillsByCategory(skills, category) {
  if (!Array.isArray(skills)) return [];
  if (!category || category === "All") return [...skills];
  return skills.filter(skill => skill.category === category);
}

function calculateTotalCosts(hourlyRate, hours) {
  const rate = Number(hourlyRate);
  const duration = Number(hours);
  if (!Number.isFinite(rate) || !Number.isFinite(duration) || rate < 0 || duration < 0) {
    return 0;
  }
  return rate * duration;
}

function matchSkillsToUser(userNeeds, skills) {
  if (!userNeeds || !Array.isArray(skills)) return [];
  const category = userNeeds.category || "All";
  const maxPrice = Number(userNeeds.maxPrice);
  if (!Number.isFinite(maxPrice) || maxPrice < 0) return [];

  return skills.filter(skill => {
    const categoryMatches = category === "All" || skill.category === category;
    const price = Number(skill.price);
    // Explicit numeric conversion ensures a free skill (price 0) is not treated as missing.
    const priceMatches = Number.isFinite(price) && price >= 0 && price <= maxPrice;
    return categoryMatches && priceMatches;
  });
}

const skillSwapFunctions = {
  filterSkillsByCategory,
  calculateTotalCosts,
  matchSkillsToUser
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = skillSwapFunctions;
}
if (typeof window !== "undefined") {
  window.SkillSwapFunctions = skillSwapFunctions;
}
