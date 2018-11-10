import ActionTypes from '../actionTypes';

const {
  SET_ACTIVE_COLOR,
  RESIZE_COLS,
  RESIZE_ROWS,
  CLEAR_EDITOR,
  RESET_EDITOR,
  SET_HTML2CANVAS_IGNORE,
  FILL_AREA,
  FILL_CELL,
  ENABLE_SINGLE_FILLING_MODE,
  ENABLE_MULTI_FILLING_MODE,
  START_MULTI_FILLING_MODE,
  END_MULTI_FILLING_MODE,
  ENABLE_AREA_FILLING_MODE,
  ENABLE_ERASE_MODE,
  START_ERASE_MODE,
  END_ERASE_MODE,
} = ActionTypes;

export const resetEditor = () => (
  { type: RESET_EDITOR }
);

export const clearEditor = () => (
  { type: CLEAR_EDITOR }
);

export const setHtml2canvasIgnore = html2canvasIgnore => (
  { type: SET_HTML2CANVAS_IGNORE, html2canvasIgnore }
);

export const setActiveColor = activeColor => (
  { type: SET_ACTIVE_COLOR, activeColor }
);

export const fillAreaAction = (row, col) => (
  { type: FILL_AREA, row, col }
);

export const fillCellAction = (row, col) => (
  { type: FILL_CELL, row, col }
);

export const resizeCols = cols => (
  { type: RESIZE_COLS, cols }
);

export const resizeRows = rows => (
  { type: RESIZE_ROWS, rows }
);

export const enableSingleFillingMode = () => (
  { type: ENABLE_SINGLE_FILLING_MODE }
);

export const enableMultiFillingMode = () => (
  { type: ENABLE_MULTI_FILLING_MODE }
);

export const enableAreaFillingMode = () => (
  { type: ENABLE_AREA_FILLING_MODE }
);

export const enableEraseMode = () => (
  { type: ENABLE_ERASE_MODE }
);

export const startMultiFillingMode = (row, col) => (
  { type: START_MULTI_FILLING_MODE, row, col }
);

export const endMultiFillingMode = () => {
  return { type: END_MULTI_FILLING_MODE };
};

export const startEraseMode = (row, col) => (
  { type: START_ERASE_MODE, row, col }
);

export const endEraseMode = () => {
  return { type: END_ERASE_MODE };
};