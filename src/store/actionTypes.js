import keyMirror from 'fbjs/lib/keyMirror';

const constants = {
  SET_ACTIVE_COLOR: null,
  RESIZE_ROWS: null,
  RESIZE_COLS: null,
  RESET_EDITOR: null,
  CLEAR_EDITOR: null,
  SET_HTML2CANVAS_IGNORE: null,
  RUN_MODE: null,
  ENABLE_MODE: null,
  START_MODE: null,
  END_MODE: null
};

const ActionTypes = keyMirror(constants);

export default ActionTypes;
