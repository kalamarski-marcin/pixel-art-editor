import keyMirror from 'fbjs/lib/keyMirror';

let constants = {
  SET_ACTIVE_COLOR: null,
  RESIZE_ROWS: null,
  RESIZE_COLS: null,
  RESET_EDITOR: null,
  CLEAR_EDITOR: null,
  SET_HTML2CANVAS_IGNORE: null,
  ENABLE_SINGLE_FILLING_MODE: null,
  ENABLE_MULTI_FILLING_MODE: null,
  START_MULTI_FILLING_MODE: null,
  END_MULTI_FILLING_MODE: null,
  FILL_SINGLE_CELL: null,
  FILL_MULTIPLE_CELLS: null
};

const ActionTypes = keyMirror(constants);

export default ActionTypes;
