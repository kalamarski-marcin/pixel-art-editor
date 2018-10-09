import ActionTypes from '../constants';
import {
  createGridHeader,
  createGrid,
  fillCell,
  rebuildCoordinates,
} from '../helpers';

import { initialState, COLORS } from '../model'

const R = require('ramda');

const {
  SET_ACTIVE_COLOR,
  RESIZE_COLS,
  RESIZE_ROWS,
  CLEAR_EDITOR,
  RESET_EDITOR,
  SET_HTML2CANVAS_IGNORE,
  ENABLE_SINGLE_FILLING_MODE,
  ENABLE_MULTI_FILLING_MODE,
  START_MULTI_FILLING_MODE,
  END_MULTI_FILLING_MODE,
  FILL_CELL,
} = ActionTypes;

function editor(state = initialState, action) {
  switch (action.type) {
    case START_MULTI_FILLING_MODE: {
      let mode = R.clone(state.mode);

      mode.fillMultipleCells.started = true;

      let newState = fillCell(state, action.row, action.col);

      return { ...newState, mode }
    }
    case END_MULTI_FILLING_MODE: {
      let mode = R.clone(state.mode);

      mode.fillMultipleCells.started = false;

      return { ...state, mode }
    }
    case ENABLE_SINGLE_FILLING_MODE: {
      let mode = R.clone(state.mode);

      mode.fillSingleCell.enabled = true;
      mode.fillMultipleCells.enabled = false;
      mode.fillMultipleCells.started = false;

      return { ...state, mode }
    }
    case ENABLE_MULTI_FILLING_MODE: {
      let mode = R.clone(state.mode);

      mode.fillSingleCell.enabled = false;
      mode.fillMultipleCells.enabled = true;

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
    case FILL_CELL: {
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

      let gridHeader = createGridHeader(cols);

      if (R.lt(cols, currentCols)) {
        colors = R.merge(COLORS, rebuildCoordinates(grid, state.gridHeader));
      }

      return { ...state, cols, grid, gridHeader, colors: colors };
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
        colors = R.merge(COLORS, rebuildCoordinates(grid, state.gridHeader));
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

export const fillCellAction = (row, col) => (
  { type: FILL_CELL, row, col }
)

export const resizeCols = (cols) => (
  { type: RESIZE_COLS, cols }
)

export const resizeRows = (rows) => (
  { type: RESIZE_ROWS, rows }
)

export const enableSingleFillingMode = () => (
  { type: ENABLE_SINGLE_FILLING_MODE }
)

export const enableMultiFillingMode = () => (
  { type: ENABLE_MULTI_FILLING_MODE }
)

export const startMultiFillingMode = (row, col) => (
  { type: START_MULTI_FILLING_MODE, row, col }
)

export const endMultiFillingMode = () => {
  return { type: END_MULTI_FILLING_MODE }
}

export default editor;
