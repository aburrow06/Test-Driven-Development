# SkillSwap — Unit 8: Test-Driven Development

A responsive SkillSwap homepage with category filtering, a session-cost calculator, and skill matching. Business logic is separated into `skillswap-functions.js` so Jest can test it independently from the page.

## Features
- Filter available skills by category, including **All** and empty results.
- Calculate session costs for regular, free, zero-hour, and decimal-hour sessions.
- Match skills by preferred category and maximum hourly price, including free skills.
- Responsive layout, accessible labels, live result announcements, and expandable skill details.

## Requirements
- Node.js and npm
- A browser for the homepage

## Run the tests
```bash
npm install
npm test
```

## Run the homepage
Open `index.html` in a browser, or use the VS Code Live Server extension.

## Test-driven development
The Jest test suite covers category filtering, cost calculations, and matching by category and budget. The functions are exported from `skillswap-functions.js` and consumed by `script.js` for UI interactions.

## Repository workflow
Use feature branches for each feature, commit failing tests before implementing the function, then commit passing implementation and UI integration. Open and merge a pull request for each feature branch after reviewing the diff and running `npm test`.
