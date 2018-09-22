import ActionTypes from '../constants';
const R = require('ramda');

const {
  FILL_CELL,
  SET_ACTIVE_COLOR,
  RESIZE_COLS,
  RESIZE_ROWS,
  CLEAR_EDITOR,
  RESET_EDITOR,
  SET_HTML2CANVAS_IGNORE
} = ActionTypes;

const DEFAULT_ROWS = 15;
const DEFAULT_COLS = 15;

const COLORS = [
  '#000000','#808080', '#C0C0C0','#800000',
  '#FF0000','#808000','#FFFF00','#008000',
  '#00FF00','#008080','#00FFFF','#000080',
  '#0000FF','#f0f8ff','#800080','#FF00FF'
];

const charGenerator = function * (charAt = 65) {
  while (true) {
    yield String.fromCharCode(charAt++);
  }
};

const createGridHeader = (cols) => {
  let gen = charGenerator();
  return Array.from(new Array(cols), () => null).map(() => gen.next().value);
}

const createGrid = (rows, cols) => {
  const cells = () => Array.from(new Array(cols), () => null);
  return Array.from(new Array(rows), cells);
};

const sortLegendItems = (a, b) => a.localeCompare(b, 'en', { numeric: true });

const buildLegend = (grid, letters) => {
  let legend = {};
  for(let [y, row] of grid.entries() ){
    for(let [x, color] of row.entries() ) {
      if (R.isNil(color)) continue;

      legend[color] = R.sort(
        sortLegendItems,
        R.append(`${letters[x]}${y + 1}`, legend[color])
      );
    }
  }

  return legend;
}

const initialState = {
  grid_header: createGridHeader(DEFAULT_COLS),
  grid: createGrid(DEFAULT_ROWS, DEFAULT_COLS),
  activeColor: '#000000',
  cols: DEFAULT_COLS,
  rows: DEFAULT_ROWS,
  colors: COLORS,
  html2canvasIgnore: true,
  zoom: 1,
  legend: {}
};

function editor(state = initialState, action) {
  switch (action.type) {
  case SET_HTML2CANVAS_IGNORE: {
      return {
        ...state,
        html2canvasIgnore: action.html2canvasIgnore
      }
  }
  case RESET_EDITOR: {
    return { ...initialState }
  }
  case CLEAR_EDITOR: {
    let cols = state.cols;
    let rows = state.rows;

    return {
      ...state,
      grid: createGrid(rows, cols),
      legend: {}
    }
  }
  case FILL_CELL: {
    let grid = R.clone(state.grid);

    let row = parseInt(action.row, 10);
    let col = parseInt(action.col, 10);
    let activeColor = state.activeColor;
    let cellValue = grid[row][col];

    let color = cellValue
      ? R.equals(cellValue, activeColor) ? null : activeColor
      : activeColor;

    grid = R.adjust(() => R.adjust(() => color)(col)(grid[row]))(row)(grid);

    return {
      ...state,
      grid: grid,
      legend: buildLegend(grid, state.grid_header)
    }
  }
  case SET_ACTIVE_COLOR: {
    return { ...state, activeColor: action.activeColor }
  }
  case RESIZE_COLS: {
    let cols = parseInt(action.cols, 10);
    let currentCols = state.cols;
    let grid = R.clone(state.grid);

    grid = grid.map(row => {
      return R.gt(cols, currentCols)
        ? row.concat(Array.from(new Array(cols - currentCols), () => null))
        : row.slice(0, cols);
    });

    let grid_header = createGridHeader(cols);

    return {
      ...state,
      cols,
      grid,
      grid_header,
      legend: buildLegend(grid, grid_header)
    };
  }
  case RESIZE_ROWS: {
    let rows = parseInt(action.rows, 10);
    let grid = R.clone(state.grid);
    let cols = state.cols;
    let currentRows = state.rows;

    grid = (R.gt(rows, currentRows))
      ? grid.concat(createGrid((rows - currentRows), cols))
      : grid.slice(0, rows);

    return {
      ...state,
      rows,
      grid,
      legend: buildLegend(grid, state.grid_header)
    };
  }
  default:
    return state;
  }
}

export const resetEditor = () => (
  { type: RESET_EDITOR }
);

export const clearEditor = () => (
  { type: CLEAR_EDITOR }
);

export const setHtml2canvasIgnore = (html2canvasIgnore) => (
  { type: SET_HTML2CANVAS_IGNORE, html2canvasIgnore }
);

export const setActiveColor = (activeColor) => (
  { type: SET_ACTIVE_COLOR, activeColor }
);

export const fillCell = (row, col) => (
  { type: FILL_CELL, row, col }
);

export const resizeCols = (cols) => (
  { type: RESIZE_COLS, cols }
)

export const resizeRows = (rows) => (
  { type: RESIZE_ROWS, rows }
)

export default editor;
