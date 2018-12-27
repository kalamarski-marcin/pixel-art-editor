const R = require('ramda');

import COLORS from './colors';

export const getEnabledMode = (modes) => {
  return modes.find(m => m.enabled === true);
}

export const enableMode = (state, modeToEnable) => {
  let modes = state.modes;

  modes = modes.map(mode => {
    if (R.equals(mode.name, modeToEnable)) {
      mode.enabled = true;
    } else {
      mode.enabled = false;
      if (R.has('started')) {
        mode.started = false;
      }
    }
    return mode;
  });

  return { ...state, modes }
};

export const startMode = (state, row, col, mode) => {
  return runMode(toggleStarted(state, mode), row, col);
}

export const endMode = (state, mode) => {
  return toggleStarted(state, mode);
}

const toggleStarted = (state, mode) => {
  let modes = R.clone(state.modes);

  const enabledMode = getEnabledMode(modes);
  const modeIndex = modes.findIndex(i => i.name === mode);

  modes[modeIndex] = {
    ...enabledMode,
    started: !enabledMode.started
  }

  return { ...state, modes }
}

export const createGridHeader = cols => {
  const generator = charGenerator();
  return Array.from(new Array(cols), () => null).map(() => generator.next().value);
};

function * charGenerator(charAt = 65) {
  while (true) {
    yield String.fromCharCode(charAt++);
  }
}

export const createGrid = (rows, cols) => {
  const cells = () => Array.from(new Array(cols), () => null);
  return Array.from(new Array(rows), cells);
};

export const rebuildCoordinates = (grid, letters) => {
  const legend = {};
  for (const [y, row] of grid.entries()) {
    for (const [x, color] of row.entries()) {
      if (R.isNil(color)) continue;

      legend[color] = R.append(`${letters[x]}${y + 1}`, legend[color]);
    }
  }

  return legend;
};

export const sortCooridinates = (a, b) => a.localeCompare(b, 'en', { numeric: true });

export const runMode = (state, row, col) => {
  const enabledMode = getEnabledMode(state.modes);
  let newState;

  switch(enabledMode.name) {
    case 'fillSingleCell': {
      newState = fillCellInSingleMode(state, row, col);
      break;
    }
    case 'fillMultipleCells': {
      newState = fillCellInMultipleMode(state, row, col);
      break;
    }
    case 'erase': {
      newState = fillCellInEraseMode(state, row, col);
      break;
    }
    case 'fillArea': {
      newState = fillArea(state, row, col);
      break;
    }
  }

  const colors = R.merge(
    COLORS,
    rebuildCoordinates(
      newState.grid,
      state.gridHeader
    )
  );

  return { ...newState, colors }
};

export const addCoordinateToColorContainer = (colorContainer, coordinate) => {
  return R.sort(sortCooridinates, R.uniq(R.append(coordinate, colorContainer)));
};

const fillCellInMultipleMode = (state, row, col) => {
  const grid = R.clone(state.grid);
  grid[row][col] = state.activeColor;

  return { ...state, grid };
};

const fillCellInSingleMode = (state, row, col) => {
  const grid = R.clone(state.grid);
  const activeColor = state.activeColor;
  const currentCellValue = grid[row][col];

  grid[row][col] = currentCellValue
    ? R.equals(currentCellValue, activeColor) ? null : activeColor
  : activeColor;

  return { ...state, grid };
};

const fillCellInEraseMode = (state, row, col) => {
  const grid = R.clone(state.grid);
  grid[row][col] = null;

  return { ...state, grid };
};

const fillArea = (state, row, col) => {
  row = parseInt(row, 10);
  col = parseInt(col, 10);

  const grid = R.clone(state.grid);
  const activeColor = state.activeColor;
  const chosenCellColor = grid[row][col];

  const rows = grid.length;
  const cols = grid[0].length

  function floodFill(row, col) {
    const stack = Array();
    stack.push([row, col]);

    while(stack.length > 0) {
      const point = stack.pop();
      const currentCellColor = grid[point[0]][point[1]];

      if(R.isNil(currentCellColor) || (R.equals(chosenCellColor, currentCellColor) && !R.equals(chosenCellColor, activeColor))) {
        grid[point[0]][point[1]] = activeColor;

        if (point[0] < rows - 1) {
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
  }

  floodFill(row, col);

  return { ...state, grid };
};

export const buildCoordinate = (gridHeader, row, col) => {
  return `${gridHeader[col]}${row + 1}`;
};

export const resizeCols = (state, cols) => {
  cols = parseInt(cols, 10);
  const currentCols = state.cols;

  let grid = R.clone(state.grid);
  let colors = R.clone(state.colors);

  grid = grid.map(row => {
    return R.gt(cols, currentCols)
      ? row.concat(Array.from(new Array(cols - currentCols), () => null))
      : row.slice(0, cols);
  });

  const gridHeader = createGridHeader(cols);

  if (R.lt(cols, currentCols)) {
    colors = R.merge(COLORS, rebuildCoordinates(grid, state.gridHeader));
  }

  return { ...state, cols, grid, gridHeader, colors };
}

export const resizeRows = (state, rows) => {
  rows = parseInt(rows, 10);
  const cols = state.cols;
  const currentRows = state.rows;

  let grid = R.clone(state.grid);
  let colors = R.clone(state.colors);

  grid = (R.gt(rows, currentRows))
    ? grid.concat(createGrid((rows - currentRows), cols))
    : grid.slice(0, rows);

  if (R.lt(rows, currentRows)) {
    colors = R.merge(COLORS, rebuildCoordinates(grid, state.gridHeader));
  }

  return { ...state, rows, grid, colors };
}

export const zoomIn = state => {
  const cellWidth = state.cellWidth;

  return { ...state, cellWidth: cellWidth == 38 ? cellWidth : state.cellWidth + 1 }
}

export const zoomOut = state => {
  const cellWidth = state.cellWidth;

  return { ...state, cellWidth: cellWidth == 28 ? cellWidth : state.cellWidth - 1 }
}

export const cellHeightStyle = cellWidth => ({
  height: `${cellWidth}px`,
  minHeight: `${cellWidth}px`
})

export const cellWidthStyle = cellWidth => ({
  width: `${cellWidth}px`,
  minWidth: `${cellWidth}px`
})

export const cellSizeStyle = cellWidth => {
  let width = cellWidthStyle(cellWidth);
  let height = cellHeightStyle(cellWidth);

  return { ...height, ...width }
}