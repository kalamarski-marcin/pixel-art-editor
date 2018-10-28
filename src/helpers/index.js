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
  if (state.mode.fillSingleCell.enabled) {
    return fillCellInSingleMode(state, row, col);
  }
  if (state.mode.fillMultipleCells.enabled) {
    return fillCellInMultipleMode(state, row, col);
  }
  if (state.mode.erase.enabled) {
    return fillCellInEraseMode(state, row, col);
  }
}

export const updateColors = (colors, oldCellValue, newCellValue, coordinate) => {
  if (newCellValue) {
    colors[newCellValue] = addCoordinateToColorContainer(
      colors[newCellValue],
      coordinate
    );
  }

  if (oldCellValue && !R.equals(oldCellValue, newCellValue)) {
    colors[oldCellValue] = colors[oldCellValue].filter(i => i !== coordinate);
  }

  return colors;
}

export const addCoordinateToColorContainer = (colorContainer, coordinate) => {
  return R.sort(sortCooridinates, R.uniq(R.append(coordinate, colorContainer)));
}

const fillCellInMultipleMode = (state, row, col) => {
  let grid = R.clone(state.grid);
  grid[row][col] = state.activeColor;

  return { ...state, grid }
}

const fillCellInSingleMode = (state, row, col) => {
  let grid = R.clone(state.grid);
  let activeColor = state.activeColor;
  let currentCellValue = grid[row][col];

  grid[row][col] = currentCellValue
      ? R.equals(currentCellValue, activeColor) ? null : activeColor
      : activeColor;

  return { ...state, grid }
}

const fillCellInEraseMode = (state, row, col) => {
  console.log('ok')
  let grid = R.clone(state.grid);
  grid[row][col] = null;

  return { ...state, grid }
}

export const buildCoordinate = (gridHeader, row, col) => {
  return `${gridHeader[col]}${row + 1}`;
}
