import keyMirror from 'fbjs/lib/keyMirror';

let constants = {
  SET_ACTIVE_COLOR: null,
  RESIZE_ROWS: null,
  RESIZE_COLS: null,
  FILL_CELL: null,
  RESET_EDITOR: null,
  CLEAR_EDITOR: null
};

const ActionTypes = keyMirror(constants);

export default ActionTypes;
