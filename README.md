# Conway's Game of Life 2D

A browser-based implementation of John Horton Conway's cellular automaton.

## Overview

This project runs a 50x33 cell grid entirely in vanilla JavaScript, HTML, and CSS. The dashboard layout puts the simulation controls on the left and the grid on the right, keeping all controls and cells visible on typical displays without vertical scrolling.

## Features

- Interactive grid: click any cell to toggle it between alive and dead.
- Random seed: populates the board with a randomized starting pattern.
- Speed control: adjust tick rate directly in milliseconds.
- Generation counter: tracks active simulation steps in real time.
- Standalone: zero build tools, dependencies, or package managers required.

## Running locally

Clone the repository and open `index.html` in any modern web browser:

```bash
git clone https://github.com/quadraticgames/conway2D.git
cd conway2D
```

Double click `index.html` or open it with a local server:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Game rules

The simulation follows standard Conway rules:

1. Birth: a dead cell with exactly three live neighbors becomes a live cell.
2. Survival: a live cell with two or three live neighbors stays alive for the next generation.
3. Death: all other cells die or stay dead from underpopulation or overpopulation.
