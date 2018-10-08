import keyMirror from 'fbjs/lib/keyMirror';

let constants = {
  SET_ACTIVE_COLOR: null,
  RESIZE_ROWS: null,
  RESIZE_COLS: null,
  RESET_EDITOR: null,
  CLEAR_EDITOR: null,
  SET_HTML2CANVAS_IGNORE: null,
  ENABLE_PAINT_BRUSH_MODE: null,
  ENABLE_PAINT_ROLLER_MODE: null,
  START_PAINT_ROLLER_MODE: null,
  END_PAINT_ROLLER_MODE: null,
  PAINT_BRUSH: null,
  PAINT_ROLLER: null
};

const ActionTypes = keyMirror(constants);

export default ActionTypes;
