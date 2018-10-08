import React  from 'react';
import PropTypes from 'prop-types';

const PaintingMode = props => (
  <div className='painting-mode-wrapper'>
    <div
      onClick={() => props.enablePaintBrushMode()}
      className={`painting-mode ${props.mode.paintBrush.enabled ? 'painting-mode--active' : ''}`}
    >
      <i className="fas fa-paint-brush fa-2x"></i>
    </div>
    <div
      onClick={() => props.enablePaintRollerMode()}
      className={`painting-mode ${props.mode.paintRoller.enabled ? 'painting-mode--active' : ''}`}
    >
      <i className="fas fa-paint-roller fa-2x"></i>
    </div>
  </div>
);

PaintingMode.propTypes = {
  mode: PropTypes.object.isRequired,
  enablePaintBrushMode: PropTypes.func.isRequired,
  enablePaintRollerMode: PropTypes.func.isRequired
};

export default PaintingMode;
