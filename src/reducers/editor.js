import ActionTypes from '../constants';
import { cloneDeep } from 'lodash/lang';

const {
  FILL_CELL,
  SET_ACTIVE_COLOR,
  RESIZE_COLS,
  RESIZE_ROWS,
  CLEAR_EDITOR,
  RESET_EDITOR
} = ActionTypes;

const DEFAULT_ROWS = 26;
const DEFAULT_COLS = 26;

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

const initialState = {
  grid_header: createGridHeader(DEFAULT_COLS),
  grid: createGrid(DEFAULT_ROWS, DEFAULT_COLS),
  activeColor: '#000000',
  cols: DEFAULT_COLS,
  rows: DEFAULT_ROWS,
  colors: [
    '#000000','#808080', '#C0C0C0','#800000',
    '#FF0000','#808000','#FFFF00','#008000',
    '#00FF00','#008080','#00FFFF','#000080',
    '#0000FF','#f0f8ff','#800080','#FF00FF'
  ],
  zoom: 1
};

function editor(state = initialState, action) {
  switch(action.type){
  case RESET_EDITOR: {
    return { ...initialState }
  }
  case CLEAR_EDITOR: {
    let cols = state.cols;
    let rows = state.rows;

    return { ...state, grid: createGrid(rows, cols) }
  }
  case FILL_CELL: {
    let grid = cloneDeep(state.grid);
    let row = action.row;
    let col = action.col;
    let activeColor = state.activeColor;

    grid[row][col] = grid[row][col]
      ? grid[row][col] === activeColor ? null : activeColor
      : activeColor;

    return { ...state, grid };
  }
  case SET_ACTIVE_COLOR: {
    return { ...state, activeColor: action.activeColor }
  }
  case RESIZE_COLS: {
    let cols = parseInt(action.cols, 10);
    let grid = cloneDeep(state.grid);
    let countCols = grid[0].length;

    grid = grid.map(row => {
      return cols > countCols
        ? row.concat(Array.from(new Array(cols - countCols), () => null))
        : row.slice(0, cols);
    });

    return { ...state, cols, grid, grid_header: createGridHeader(cols) };
  }
  case RESIZE_ROWS: {
    let rows = parseInt(action.rows, 10);
    let grid = cloneDeep(state.grid);
    let cols = state.grid[0].length;

    let countRows = grid.length;

    if (rows > countRows) {
      let newGrid = createGrid((rows - countRows), cols);
      grid = grid.concat(newGrid);
    } else {
      grid = grid.slice(0, rows);
    }

    return { ...state, rows, grid };
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

export const setActiveColor = (activeColor) => (
  { type: SET_ACTIVE_COLOR, activeColor }
);

export const fillCell = (row, col) => (
  { type: FILL_CELL, row, col }
);

export const resizeCols = (cols) => (
  {type: RESIZE_COLS, cols}
)

export const resizeRows = (rows) => (
  {type: RESIZE_ROWS, rows}
)


export default editor;
