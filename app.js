document.addEventListener('DOMContentLoaded', () => {
	const gridWidth = 50;
	const gridHeight = 33;
	const gridContainer = document.getElementById('gridContainer');
	let grid = [];
	let intervalId = null;
	let generationCount = 0;
	createGrid(gridWidth, gridHeight);
	document.getElementById('start').addEventListener('click', startSimulation);
	document.getElementById('stop').addEventListener('click', stopSimulation);
	document.getElementById('reset').addEventListener('click', resetSimulation);
	document.getElementById('randomize').addEventListener('click', randomizeGrid);

	function startSimulation() {
		if (intervalId === null) {
			intervalId = setInterval(nextGeneration, document.getElementById('speedControl').value);
		}
	}

	function stopSimulation() {
		clearInterval(intervalId);
		intervalId = null;
	}

	function resetSimulation() {
		stopSimulation();
		createGrid(gridWidth, gridHeight);
		generationCount = 0;
		updateGenerationCount();
	}

	function createGrid(width, height) {
		gridContainer.innerHTML = '';
		gridContainer.style.gridTemplateColumns = `repeat(${width}, 15px)`;
		gridContainer.style.gridTemplateRows = `repeat(${height}, 15px)`;
		grid = Array.from({
			length: height
		}, () => Array.from({
			length: width
		}, createCell));
	}

	function createCell() {
		const cell = document.createElement('div');
		cell.classList.add('cell');
		cell.addEventListener('click', () => toggleCellState(cell));
		gridContainer.appendChild(cell);
		return cell;
	}

	function toggleCellState(cell, newState) {
		if (newState !== undefined) {
			if (newState) {
				cell.classList.add('alive');
				cell.innerText = '👽';
			} else {
				cell.classList.remove('alive');
				cell.innerText = '';
			}
		} else {
			cell.classList.toggle('alive');
			cell.innerText = cell.classList.contains('alive') ? '👽' : '';
		}
	}

	function randomizeGrid() {
		grid.forEach(row => row.forEach(cell => {
			toggleCellState(cell, Math.random() > 0.85);
		}));
	}

	function nextGeneration() {
		let changesMade = false;
		const nextGen = grid.map((row, i) => row.map((cell, j) => {
			const liveNeighbors = countLiveNeighbors(i, j);
			const cellAlive = cell.classList.contains('alive');
			const nextState = liveNeighbors === 3 || (cellAlive && liveNeighbors === 2);
			if (cellAlive !== nextState) {
				changesMade = true;
			}
			return nextState;
		}));
		if (!changesMade) {
			stopSimulation();
			return;
		}
		updateGrid(nextGen);
		generationCount++;
		updateGenerationCount();
	}

	function countLiveNeighbors(row, col) {
		let count = 0;
		for (let i = -1; i <= 1; i++) {
			for (let j = -1; j <= 1; j++) {
				if (i === 0 && j === 0) continue;
				const x = (row + i + gridHeight) % gridHeight;
				const y = (col + j + gridWidth) % gridWidth;
				if (grid[x][y].classList.contains('alive')) {
					count++;
				}
			}
		}
		return count;
	}

	function updateGrid(nextGen) {
		grid.forEach((row, i) => row.forEach((cell, j) => {
			toggleCellState(cell, nextGen[i][j]);
		}));
	}

	function updateGenerationCount() {
		document.getElementById('generationCount').textContent = generationCount;
	}
});
