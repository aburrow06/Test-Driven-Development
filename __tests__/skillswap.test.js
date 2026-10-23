const {
  filterSkillsByCategory,
  calculateTotalCosts,
  matchSkillsToUser
} = require("../skillswap-functions");

const skills = [
  { title: "Python Tutoring", category: "Programming", price: 20 },
  { title: "Guitar Lessons", category: "Music", price: 15 },
  { title: "Resume Review", category: "Career", price: 0 },
  { title: "Web Development", category: "Programming", price: 25 },
  { title: "JavaScript Help", category: "Programming", price: 25 }
];

describe("filterSkillsByCategory", () => {
  test("filters skills by the selected category", () => {
    expect(filterSkillsByCategory(skills, "Programming")).toEqual([
      skills[0], skills[3], skills[4]
    ]);
  });

  test('returns all skills when category is "All"', () => {
    expect(filterSkillsByCategory(skills, "All")).toEqual(skills);
  });

  test("returns an empty array when there are no matches", () => {
    expect(filterSkillsByCategory(skills, "Cooking")).toEqual([]);
  });

  test("returns an empty array for invalid skills input", () => {
    expect(filterSkillsByCategory(null, "Programming")).toEqual([]);
  });
});

describe("calculateTotalCosts", () => {
  test("calculates total for a standard rate and duration", () => {
    expect(calculateTotalCosts(20, 2)).toBe(40);
  });

  test("supports free sessions and zero hours", () => {
    expect(calculateTotalCosts(0, 3)).toBe(0);
    expect(calculateTotalCosts(20, 0)).toBe(0);
  });

  test("calculates decimal hours", () => {
    expect(calculateTotalCosts(25, 1.5)).toBe(37.5);
  });

  test("returns zero for invalid or negative inputs", () => {
    expect(calculateTotalCosts(-5, 2)).toBe(0);
    expect(calculateTotalCosts(20, -1)).toBe(0);
    expect(calculateTotalCosts("not a number", 2)).toBe(0);
  });
});

describe("matchSkillsToUser", () => {
  test("matches by category and maximum price", () => {
    expect(matchSkillsToUser(
      { category: "Programming", maxPrice: 30 }, skills
    )).toEqual([skills[0], skills[3], skills[4]]);
  });

  test("filters out skills above the maximum price", () => {
    expect(matchSkillsToUser(
      { category: "Programming", maxPrice: 20 }, skills
    )).toEqual([skills[0]]);
  });

  test("returns an empty array when there are no matches", () => {
    expect(matchSkillsToUser(
      { category: "Cooking", maxPrice: 100 }, skills
    )).toEqual([]);
  });

  test("includes free skills when the maximum price is zero", () => {
    expect(matchSkillsToUser(
      { category: "Career", maxPrice: 0 }, skills
    )).toEqual([skills[2]]);
  });

  test('supports the "All" category', () => {
    expect(matchSkillsToUser(
      { category: "All", maxPrice: 15 }, skills
    )).toEqual([skills[1], skills[2]]);
  });
});
