# Sudoku Solver Web App

The original project is a C++17 Sudoku-Suite library for solving, validating, generating, and manipulating 9x9 Sudoku grids. The repository includes the original `src/`, `examples/`, and `tests/` directories.

A standalone browser interface is provided under `web/` so the project can also be demonstrated as a live application. The browser implementation uses the same core idea described by the original project: constraint checking with recursive backtracking, with a minimum-candidate cell selection to reduce unnecessary search.

## Features

- Responsive 9x9 Sudoku board
- Editable puzzle input
- Solve button with invalid/unsolvable feedback
- Example puzzle
- Clear board
- Randomly generated playable puzzle
- Accessible labels and live status messages
- Static deployment compatible with Vercel

## Deployment

Import this GitHub repository into Vercel. The included `vercel.json` rewrites the root route to `web/`, so no framework or build step is required.

The original C++17 library remains untouched and can still be consumed from the `src/` headers or compiled using the existing test/example instructions in `README.md`.
