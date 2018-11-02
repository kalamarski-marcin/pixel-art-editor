import React  from 'react';
import PropTypes from 'prop-types';

const EditorMode = props => (
  <div className='painting-mode-wrapper'>
    <div
      onClick={() => props.enableSingleFillingMode()}
      className={`painting-mode ${props.mode.fillSingleCell.enabled ? 'painting-mode--active' : ''}`}
    >
      <i className="fas fa-paint-brush fa-2x"></i>
    </div>
    <div
      onClick={() => props.enableMultiFillingMode()}
      className={`painting-mode ${props.mode.fillMultipleCells.enabled ? 'painting-mode--active' : ''}`}
    >
      <i className="fas fa-brush fa-2x"></i>
    </div>
    <div
      onClick={() => props.enableAreaFillingMode()}
      className={`painting-mode ${props.mode.fillArea.enabled ? 'painting-mode--active' : ''}`}
    >
      <i className="fas fa-fill fa-2x"></i>
    </div>
    <div
      onClick={() => props.enableEraseMode()}
      className={`painting-mode ${props.mode.erase.enabled ? 'painting-mode--active' : ''}`}
    >
      <i className="fas fa-eraser fa-2x"></i>
    </div>
  </div>
);

EditorMode.propTypes = {
  mode: PropTypes.object.isRequired,
  enableSingleFillingMode: PropTypes.func.isRequired,
  enableMultiFillingMode: PropTypes.func.isRequired,
  enableAreaFillingMode: PropTypes.func.isRequired,
  enableEraseMode: PropTypes.func.isRequired
};

export default EditorMode;
