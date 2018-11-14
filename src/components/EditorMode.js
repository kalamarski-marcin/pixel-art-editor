import React  from 'react';
import PropTypes from 'prop-types';

const renderModes = (modes, enableMode) => {
  return modes.map(mode => (
    <div
      key={mode.name}
      onClick={() => enableMode(mode.name)}
      className={`painting-mode ${mode.enabled ? 'painting-mode--active' : ''}`}
    >
      <i className={`fas ${mode.icon} fa-2x`} />
    </div>
  ));
};

const EditorMode = (props) => (
  <div className="painting-mode-wrapper">
    { renderModes(props.modes, props.enableMode)}
  </div>
);

EditorMode.propTypes = {
  modes: PropTypes.array.isRequired,
  enableMode: PropTypes.func.isRequired
};

export default EditorMode;
