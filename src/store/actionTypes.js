import keyMirror from 'fbjs/lib/keyMirror';

const constants = {
  SET_ACTIVE_COLOR: null,
  RESIZE_ROWS: null,
  RESIZE_COLS: null,
  RESET_EDITOR: null,
  CLEAR_EDITOR: null,
  SET_HTML2CANVAS_IGNORE: null,
  FILL_CELL: null,
  FILL_AREA: null,
  ENABLE_SINGLE_FILLING_MODE: null,
  ENABLE_MULTI_FILLING_MODE: null,
  START_MULTI_FILLING_MODE: null,
  END_MULTI_FILLING_MODE: null,
  ENABLE_AREA_FILLING_MODE: null,
  ENABLE_ERASE_MODE: null,
  START_ERASE_MODE: null,
  END_ERASE_MODE: null,
};

const ActionTypes = keyMirror(constants);

export default ActionTypes;
