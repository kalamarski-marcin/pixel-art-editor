import ActionTypes from '../constants';
const R = require('ramda');

const {
  FILL_CELL,
  SET_ACTIVE_COLOR,
  RESIZE_COLS,
  RESIZE_ROWS,
  CLEAR_EDITOR,
  RESET_EDITOR
} = ActionTypes;

const DEFAULT_ROWS = 15;
const DEFAULT_COLS = 15;

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
  zoom: 1,
  index: []
};

function editor(state = initialState, action) {
  switch(action.type){
  case RESET_EDITOR: {
    return { ...initialState }
  }
  case CLEAR_EDITOR: {
    let cols = state.cols;
    let rows = state.rows;

    return {
      ...state,
      grid: createGrid(rows, cols),
      index: []
    }
  }
  case FILL_CELL: {
    let index = R.clone(state.index);
    let grid = R.clone(state.grid);
    let row = parseInt(action.row, 10);
    let col = parseInt(action.col, 10);
    let activeColor = state.activeColor;

    let color = grid[row][col]
      ? grid[row][col] === activeColor ? null : activeColor
      : activeColor;

    grid[row][col] = color;

    const findIndexedItemIndex = (row, col, index) => {
      return index.findIndex(item => item.row === row && item.col === col);
    };

    const rebuildIndex = R.ifElse(
      () => R.isNil(color),
      R.remove(findIndexedItemIndex(row, col, index),1),
      R.when(
        () => R.equals(findIndexedItemIndex(row, col, index), -1),
        R.append({
          row: row,
          col: col,
          color: color
        })
      )
    );

    return { ...state, grid, index: rebuildIndex(index) };
  }
  case SET_ACTIVE_COLOR: {
    return { ...state, activeColor: action.activeColor }
  }
  case RESIZE_COLS: {
    let cols = parseInt(action.cols, 10);
    let grid = R.clone(state.grid);
    let countCols = grid[0].length;
    let index = R.clone(state.index);

    grid = grid.map(row => {
      return cols > countCols
        ? row.concat(Array.from(new Array(cols - countCols), () => null))
        : row.slice(0, cols);
    });

    const rebuildIndex = R.filter(item => item.col <= (cols-1));

    return {
      ...state,
      cols,
      grid,
      index: rebuildIndex(index),
      grid_header: createGridHeader(cols)
    };
  }
  case RESIZE_ROWS: {
    let rows = parseInt(action.rows, 10);
    let grid = R.clone(state.grid);
    let cols = state.grid[0].length;
    let index = R.clone(state.index);

    let countRows = grid.length;

    if (rows > countRows) {
      let newGrid = createGrid((rows - countRows), cols);
      grid = grid.concat(newGrid);
    } else {
      grid = grid.slice(0, rows);
    }

    const rebuildIndex = R.filter(item => item.row <= (rows-1));

    return {
      ...state,
      rows,
      grid,
      index: rebuildIndex(index)
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
