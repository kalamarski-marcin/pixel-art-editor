const R = require('ramda');

import ActionTypes from '../actionTypes';
import COLORS from '../../utils/colors';

const {
  SET_ACTIVE_COLOR,
  RESIZE_COLS,
  RESIZE_ROWS,
  CLEAR_EDITOR,
  RESET_EDITOR,
  SET_HTML2CANVAS_IGNORE,
  FILL_AREA,
  FILL_CELL,
  ENABLE_MODE,
  START_MODE,
  END_MODE,
  RUN_MODE
} = ActionTypes;

import {
  createGridHeader,
  createGrid,
  rebuildCoordinates,
  buildCoordinate,
  updateColors,
  enableMode,
  startMode,
  endMode,
  runMode,
  resizeCols,
  resizeRows
} from '../../utils';

const DEFAULT_ROWS = 20;
const DEFAULT_COLS = 20;

const initialState = {
  gridHeader: createGridHeader(DEFAULT_COLS),
  grid: createGrid(DEFAULT_ROWS, DEFAULT_COLS),
  activeColor: '#000000',
  cols: DEFAULT_COLS,
  rows: DEFAULT_ROWS,
  colors: COLORS,
  html2canvasIgnore: true,
  modes: [
    { name: 'fillSingleCell', enabled: true, icon: 'fa-paint-brush' },
    { name: 'fillMultipleCells', enabled: false, started: false, icon: 'fa-brush' },
    { name: 'fillArea', enabled: false, icon: 'fa-fill' },
    { name: 'erase', enabled: false, started: false, icon: 'fa-eraser' }
  ],
};

function editor(state = initialState, action) {
  switch (action.type) {
    case ENABLE_MODE: {
      return enableMode(state, action.mode);
    }
    case START_MODE: {
      const { row, col, mode } = action;
      return startMode(state, row, col, mode);
    }
    case END_MODE: {
      return endMode(state, action.mode);
    }
    case SET_HTML2CANVAS_IGNORE: {
      return {...state, html2canvasIgnore: action.html2canvasIgnore};
    }
    case RESET_EDITOR: {
      return { ...initialState };
    }
    case CLEAR_EDITOR: {
      return {...state, grid: createGrid(state.rows, state.cols), colors: COLORS};
    }
    case RUN_MODE: {
      return runMode(state, action.row, action.col);
    }
    case SET_ACTIVE_COLOR: {
      return { ...state, activeColor: action.activeColor };
    }
    case RESIZE_COLS: {
      return resizeCols(state, action.cols);
    }
    case RESIZE_ROWS: {
      return resizeRows(state, action.rows);
    }
    default:
      return state;
  }
}

export default editor;
