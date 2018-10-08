import ActionTypes from '../constants';
import COLORS from '../model/colors';
import {
  createGridHeader,
  createGrid,
  fillCell,
  rebuildCoordinates,
} from '../helpers';

const R = require('ramda');

const {
  SET_ACTIVE_COLOR,
  RESIZE_COLS,
  RESIZE_ROWS,
  CLEAR_EDITOR,
  RESET_EDITOR,
  SET_HTML2CANVAS_IGNORE,
  ENABLE_PAINT_BRUSH_MODE,
  ENABLE_PAINT_ROLLER_MODE,
  START_PAINT_ROLLER_MODE,
  END_PAINT_ROLLER_MODE,
  PAINT_BRUSH,
  PAINT_ROLLER
} = ActionTypes;

const DEFAULT_ROWS = 20;
const DEFAULT_COLS = 20;

const initialState = {
  grid_header: createGridHeader(DEFAULT_COLS),
  grid: createGrid(DEFAULT_ROWS, DEFAULT_COLS),
  activeColor: '#000000',
  cols: DEFAULT_COLS,
  rows: DEFAULT_ROWS,
  colors: COLORS,
  html2canvasIgnore: true,
  zoom: 1,
  mode: {
    paintBrush: { enabled: true },
    paintRoller: { enabled: false, started: false }
  }
};

function editor(state = initialState, action) {
  switch (action.type) {
    case START_PAINT_ROLLER_MODE: {
      let mode = R.clone(state.mode);

      mode.paintRoller.started = true;

      let newState = fillCell(state, action.row, action.col);

      return { ...newState, mode }
    }
    case END_PAINT_ROLLER_MODE: {
      let mode = R.clone(state.mode);

      mode.paintRoller.started = false;

      return { ...state, mode }
    }
    case ENABLE_PAINT_BRUSH_MODE: {
      let mode = R.clone(state.mode);

      mode.paintBrush.enabled = true;
      mode.paintRoller.enabled = false;
      mode.paintRoller.started = false;

      return { ...state, mode }
    }
    case ENABLE_PAINT_ROLLER_MODE: {
      let mode = R.clone(state.mode);

      mode.paintBrush.enabled = false;
      mode.paintRoller.enabled = true;

      return { ...state, mode }
    }
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
      return {
        ...state,
        grid: createGrid(state.rows, state.cols),
        colors: COLORS
      }
    }
    case PAINT_BRUSH: {
      return fillCell(state, action.row, action.col);
    }
    case PAINT_ROLLER: {
      return fillCell(state, action.row, action.col);
    }
    case SET_ACTIVE_COLOR: {
      return { ...state, activeColor: action.activeColor }
    }
    case RESIZE_COLS: {
      let cols = parseInt(action.cols, 10);
      let currentCols = state.cols;
      let grid = R.clone(state.grid);
      let colors = R.clone(state.colors);

      grid = grid.map(row => {
        return R.gt(cols, currentCols)
          ? row.concat(Array.from(new Array(cols - currentCols), () => null))
          : row.slice(0, cols);
      });

      let grid_header = createGridHeader(cols);

      if (R.lt(cols, currentCols)) {
        colors = R.merge(COLORS, rebuildCoordinates(grid, state.grid_header));
      }

      return { ...state, cols, grid, grid_header, colors: colors };
    }
    case RESIZE_ROWS: {
      let rows = parseInt(action.rows, 10);
      let grid = R.clone(state.grid);
      let cols = state.cols;
      let currentRows = state.rows;
      let colors = R.clone(state.colors);

      grid = (R.gt(rows, currentRows))
        ? grid.concat(createGrid((rows - currentRows), cols))
        : grid.slice(0, rows);


      if (R.lt(rows, currentRows)) {
        colors = R.merge(COLORS, rebuildCoordinates(grid, state.grid_header));
      }

      return { ...state, rows, grid, colors: colors };
    }
    default:
      return state;
  }
}

export const resetEditor = () => (
  { type: RESET_EDITOR }
)

export const clearEditor = () => (
  { type: CLEAR_EDITOR }
)

export const setHtml2canvasIgnore = (html2canvasIgnore) => (
  { type: SET_HTML2CANVAS_IGNORE, html2canvasIgnore }
)

export const setActiveColor = (activeColor) => (
  { type: SET_ACTIVE_COLOR, activeColor }
)

export const paintBrush = (row, col) => (
  { type: PAINT_BRUSH, row, col }
)

export const paintRoller = (row, col) => (
  { type: PAINT_ROLLER, row, col }
)

export const resizeCols = (cols) => (
  { type: RESIZE_COLS, cols }
)

export const resizeRows = (rows) => (
  { type: RESIZE_ROWS, rows }
)

export const enablePaintBrushMode = () => (
  { type: ENABLE_PAINT_BRUSH_MODE }
)

export const enablePaintRollerMode = () => (
  { type: ENABLE_PAINT_ROLLER_MODE }
)

export const startPaintRollerMode = (row, col) => (
  { type: START_PAINT_ROLLER_MODE, row, col }
)

export const endPaintRollerMode = () => {
  return { type: END_PAINT_ROLLER_MODE }
}

export default editor;
