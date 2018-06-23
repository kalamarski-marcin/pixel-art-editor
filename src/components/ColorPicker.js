import React from 'react';
import PropTypes from 'prop-types';
import Color from './Color';

const renderColors = (colors, activeColor, handleSetActiveColor) => {
  return colors.map((color, index) => (
    <Color
      key={`color-${index}`}
      handleSetActiveColor={handleSetActiveColor}
      activeColor={activeColor}
      color={color}
    />
  ));
};

const ColorPicker = ({ colors, activeColor, handleSetActiveColor }) => (
  <div className="editor-color-picker">
    { renderColors(colors, activeColor, handleSetActiveColor) }
  </div>
);

ColorPicker.propTypes = {
  colors: PropTypes.array.isRequired,
  activeColor: PropTypes.string.isRequired,
  handleSetActiveColor: PropTypes.func.isRequired
};

export default ColorPicker;
