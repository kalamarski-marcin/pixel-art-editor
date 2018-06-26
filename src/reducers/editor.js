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

const createKey = () => R.zipObj(
  COLORS,
  Array.from(new Array(COLORS.length), () => [])
);

const rebuildKey = (index, letters) => {
  const keyItem = indexItem => letters[indexItem.col].concat(indexItem.row+1);
  const groupedIndex = R.groupWith(
    (a, b) => R.equals(a[0], b[0]),
    R.map(indexItem => [indexItem.color, keyItem(indexItem)])(index)
  );

  const createNewKey = (group, obj = {}) => {
    let tmp = R.uniq(R.flatten(group))
    obj[R.head(tmp)] = R.tail(tmp)
    return obj;
  }

  return R.merge(
    createKey(),
    R.reduce(
      R.merge,
      {},
      R.map(group => createNewKey(group))(groupedIndex)
    )
  )
}

const initialState = {
  grid_header: createGridHeader(DEFAULT_COLS),
  grid: createGrid(DEFAULT_ROWS, DEFAULT_COLS),
  activeColor: '#000000',
  cols: DEFAULT_COLS,
  rows: DEFAULT_ROWS,
  colors: COLORS,
  zoom: 1,
  index: [],
  key: createKey()
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
      key: createKey(),
      index: []
    }
  }
  case FILL_CELL: {
    let index = R.clone(state.index);
    let grid = R.clone(state.grid);
    let row = parseInt(action.row, 10);
    let col = parseInt(action.col, 10);
    let activeColor = state.activeColor;
    let cellValue = grid[row][col];
    let letters = R.clone(state.grid_header);

    let color = cellValue
      ? R.equals(cellValue, activeColor) ? null : activeColor
      : activeColor;

    const findIndexItemIndex = index.findIndex(
      item => R.and(R.equals(item.row,row), R.equals(item.col, col))
    );

    const rebuildIndex = R.ifElse(
      () => R.isNil(color),
      R.remove(findIndexItemIndex, 1),
      R.ifElse(
        () => R.equals(findIndexItemIndex, -1),
        R.append({ row, col, color }),
        index => {
          index[findIndexItemIndex] = R.merge(index[findIndexItemIndex], {color})
          return index;
        }
      )
    );

    index = rebuildIndex(index);

    return {
      ...state,
      index,
      key: R.isEmpty(index) ? createKey() : rebuildKey(index, letters),
      grid: R.adjust(() => R.adjust(() => color)(col)(grid[row]))(row)(grid)
    };
  }
  case SET_ACTIVE_COLOR: {
    return { ...state, activeColor: action.activeColor }
  }
  case RESIZE_COLS: {
    let cols = parseInt(action.cols, 10);
    let currentCols = state.cols;
    let grid = R.clone(state.grid);
    let index = R.clone(state.index);

    grid = grid.map(row => {
      return R.gt(cols, currentCols)
        ? row.concat(Array.from(new Array(cols - currentCols), () => null))
        : row.slice(0, cols);
    });

    const rebuildIndex = R.filter(item => R.lte(item.col, (cols-1)));

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
    let cols = state.cols;
    let currentRows = state.rows;
    let index = R.clone(state.index);

    grid = (R.gt(rows, currentRows))
      ? grid.concat(createGrid((rows - currentRows), cols))
      : grid.slice(0, rows);

    const rebuildIndex = R.filter(item => R.lte(item.row, (rows-1)));

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
