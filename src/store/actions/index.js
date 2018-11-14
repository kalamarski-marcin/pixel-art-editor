import ActionTypes from '../actionTypes';

const {
  SET_ACTIVE_COLOR,
  RESIZE_COLS,
  RESIZE_ROWS,
  CLEAR_EDITOR,
  RESET_EDITOR,
  SET_HTML2CANVAS_IGNORE,
  ENABLE_MODE,
  START_MODE,
  RUN_MODE,
  END_MODE
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

export const runMode = (row, col) => (
  { type: RUN_MODE, row, col }
);

export const resizeCols = cols => (
  { type: RESIZE_COLS, cols }
);

export const resizeRows = rows => (
  { type: RESIZE_ROWS, rows }
);

export const enableMode = mode => (
  { type: ENABLE_MODE, mode }
)
//todo: remove mode
export const startMode = (row, col, mode) => (
  { type: START_MODE, row, col, mode }
)

export const endMode = (mode) => (
  { type: END_MODE, mode }
)
