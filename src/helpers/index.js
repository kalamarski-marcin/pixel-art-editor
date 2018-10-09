const R = require('ramda');

const charGenerator = function* (charAt = 65) {
  while (true) {
    yield String.fromCharCode(charAt++);
  }
};

export const createGridHeader = (cols) => {
  let gen = charGenerator();
  return Array.from(new Array(cols), () => null).map(() => gen.next().value);
}

export const createGrid = (rows, cols) => {
  const cells = () => Array.from(new Array(cols), () => null);
  return Array.from(new Array(rows), cells);
};

export const sortCooridinates = (a, b) => a.localeCompare(b, 'en', { numeric: true });

export const rebuildCoordinates = (grid, letters) => {
  let legend = {};
  for (let [y, row] of grid.entries()) {
    for (let [x, color] of row.entries()) {
      if (R.isNil(color)) continue;

      legend[color] = R.sort(
        sortCooridinates,
        R.append(`${letters[x]}${y + 1}`, legend[color])
      );
    }
  }

  return legend;
}

export const fillCell = (state, row, col) => {
  row = parseInt(row, 10);
  col = parseInt(col, 10);

  let grid = R.clone(state.grid);
  let colors = R.clone(state.colors);
  let letters = state.gridHeader;
  let activeColor = state.activeColor;
  let cellValue = grid[row][col];
  let color;

  if (state.mode.fillMultipleCells.enabled) {
    color = activeColor;
  }
  else if (state.mode.erase.enabled) {
    color = null;
  } else {
    color = cellValue
      ? R.equals(cellValue, activeColor) ? null : activeColor
      : activeColor;
  }
  grid[row][col] = color;

  let coordinate = `${letters[row]}${col + 1}`;
  if (R.isNil(color)) {
    colors[activeColor] = colors[activeColor].filter(i => i != coordinate);
  }
  else {
    if (!R.isNil(cellValue)) colors[cellValue] = colors[cellValue].filter(i => i != coordinate);

    colors[activeColor].push(coordinate);
  }

  colors[activeColor] = R.sort(sortCooridinates, colors[activeColor]);

  return { ...state, grid, colors }
}