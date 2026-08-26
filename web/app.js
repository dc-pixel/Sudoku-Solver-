const EXAMPLE = [
  [5,3,0,0,7,0,0,0,0],[6,0,0,1,9,5,0,0,0],[0,9,8,0,0,0,0,6,0],
  [8,0,0,0,6,0,0,0,3],[4,0,0,8,0,3,0,0,1],[7,0,0,0,2,0,0,0,6],
  [0,6,0,0,0,0,2,8,0],[0,0,0,4,1,9,0,0,5],[0,0,0,0,8,0,0,7,9]
];
const boardEl = document.querySelector('#board');
const statusEl = document.querySelector('#status');
let given = new Set();

function makeBoard(values = Array.from({length:9}, () => Array(9).fill(0)), markGiven = true) {
  boardEl.innerHTML = '';
  given.clear();
  values.forEach((row, r) => row.forEach((value, c) => {
    const wrap = document.createElement('div');
    wrap.className = 'cell';
    const input = document.createElement('input');
    input.type = 'text'; input.inputMode = 'numeric'; input.maxLength = 1;
    input.setAttribute('aria-label', `Row ${r+1}, column ${c+1}`);
    if (value) input.value = value;
    if (markGiven && value) { wrap.classList.add('given'); given.add(`${r}-${c}`); input.readOnly = true; }
    input.addEventListener('input', () => {
      input.value = input.value.replace(/[^1-9]/g, '').slice(0,1);
      wrap.classList.remove('solved');
    });
    wrap.appendChild(input); boardEl.appendChild(wrap);
  }));
}

function readGrid() {
  return [...boardEl.querySelectorAll('input')].reduce((grid, input, i) => {
    grid[Math.floor(i/9)][i%9] = Number(input.value) || 0; return grid;
  }, Array.from({length:9}, () => Array(9).fill(0)));
}

function valid(grid, row, col, n) {
  for (let i=0; i<9; i++) if (grid[row][i]===n || grid[i][col]===n) return false;
  const rs = Math.floor(row/3)*3, cs = Math.floor(col/3)*3;
  for (let r=rs; r<rs+3; r++) for (let c=cs; c<cs+3; c++) if (grid[r][c]===n) return false;
  return true;
}

function solve(grid) {
  let best = null, options = null;
  for (let r=0; r<9; r++) for (let c=0; c<9; c++) if (!grid[r][c]) {
    const candidates = [];
    for (let n=1; n<=9; n++) if (valid(grid,r,c,n)) candidates.push(n);
    if (!candidates.length) return false;
    if (!options || candidates.length < options.length) { best=[r,c]; options=candidates; }
  }
  if (!best) return true;
  const [r,c]=best;
  for (const n of options) { grid[r][c]=n; if (solve(grid)) return true; grid[r][c]=0; }
  return false;
}

function load(values, label='Puzzle loaded.') { makeBoard(values, true); statusEl.textContent=label; }

document.querySelector('#solve').addEventListener('click', () => {
  const grid = readGrid();
  const copy = grid.map(row => [...row]);
  if (!solve(copy)) { statusEl.textContent='No valid solution exists for this puzzle.'; return; }
  const inputs=[...boardEl.querySelectorAll('input')];
  inputs.forEach((input,i) => { const r=Math.floor(i/9), c=i%9; if (!given.has(`${r}-${c}`)) { input.value=copy[r][c]; input.parentElement.classList.add('solved'); }});
  statusEl.textContent='Solved successfully.';
});

document.querySelector('#example').addEventListener('click', () => load(EXAMPLE, 'Classic example loaded.'));
document.querySelector('#clear').addEventListener('click', () => load(Array.from({length:9}, () => Array(9).fill(0)), 'Board cleared.'));
document.querySelector('#generate').addEventListener('click', () => {
  const solved=Array.from({length:9},()=>Array(9).fill(0));
  solve(solved);
  const puzzle=solved.map(row=>[...row]);
  const cells=[...Array(81).keys()].sort(()=>Math.random()-.5);
  cells.slice(0,50).forEach(i=>puzzle[Math.floor(i/9)][i%9]=0);
  load(puzzle, 'Fresh puzzle generated.');
});

load(EXAMPLE, 'Ready to solve.');
