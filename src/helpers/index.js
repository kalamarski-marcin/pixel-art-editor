const R = require('ramda');

const charGenerator = function* (charAt = 65) {
  while (true) {
    yield String.fromCharCode(charAt++);
  }
};

export const enableMode = (modeToEnable, modes) => {
  const hasStarted = R.has('started');

  const changeModeState = (mode, key, obj) => {
    if (R.equals(key, modeToEnable)){
      mode.enabled = true;
    }
    else {
      mode.enabled = false;
      if (hasStarted(mode)){
        mode.started = false;
      }
    }
    return mode;
  }

  return R.mapObjIndexed(changeModeState, modes);
};

export const createGridHeader = (cols) => {
  let gen = charGenerator();
  return Array.from(new Array(cols), () => null).map(() => gen.next().value);
};

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

      legend[color] = R.append(`${letters[x]}${y + 1}`, legend[color]);
    }
  }

  let sortColorCoordinates = (num, key, obj) => R.sort(
    sortCooridinates,
    num
  );

  return R.mapObjIndexed(sortColorCoordinates, legend);
};

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
};

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
};

export const addCoordinateToColorContainer = (colorContainer, coordinate) => {
  return R.sort(sortCooridinates, R.uniq(R.append(coordinate, colorContainer)));
};

const fillCellInMultipleMode = (state, row, col) => {
  let grid = R.clone(state.grid);
  grid[row][col] = state.activeColor;

  return { ...state, grid }
};

const fillCellInSingleMode = (state, row, col) => {
  let grid = R.clone(state.grid);
  let activeColor = state.activeColor;
  let currentCellValue = grid[row][col];

  grid[row][col] = currentCellValue
    ? R.equals(currentCellValue, activeColor) ? null : activeColor
  : activeColor;

  return { ...state, grid }
};

const fillCellInEraseMode = (state, row, col) => {
  let grid = R.clone(state.grid);
  grid[row][col] = null;

  return { ...state, grid }
};

export const fillArea = (state, row, col) => {
  let grid = R.clone(state.grid);
  let activeColor = state.activeColor;
  let chosenCellColor = grid[row][col];

  let rows = grid.length;
  let cols = grid[0].length;

  const floodfill = function(row, col) {
    let stack = Array();
    stack.push([row, col]);

    while(stack.length > 0) {
      let point = stack.pop();
      let currentCellColor = grid[point[0]][point[1]];

      if(R.isNil(currentCellColor) || R.equals(chosenCellColor,currentCellColor)) {

        grid[point[0]][point[1]] = activeColor;

        if (point[0] < rows - 1){
          stack.push([point[0] + 1, point[1]]);
        }

        if (point[1] < cols - 1) {
          stack.push([point[0], point[1] + 1]);
        }

        if (point[0] >= 1) {
          stack.push([point[0] - 1, point[1]]);
        }

        if (point[1] >= 1) {
          stack.push([point[0], point[1] - 1]);
        }
      }
    }
  };

  floodfill(row, col);

  return { ...state, grid }
};

export const buildCoordinate = (gridHeader, row, col) => {
  return `${gridHeader[col]}${row + 1}`;
};
