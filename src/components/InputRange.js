import React from 'react';
import PropTypes from 'prop-types';
import DebounceInput from 'react-debounce-input';

const InputRange = ({id, label, value, handleOnChange}) => (
  <div className="input-wrapper">
    <label htmlFor={id}>{label}</label>
    <DebounceInput
      id={id}
      type="range"
      step={1}
      min={1}
      max={26}
      debounceTimeout={500}
      value={value}
      onChange={handleOnChange}
    />
  </div>
);

InputRange.propTypes = {
  value: PropTypes.number,
  handleOnChange: PropTypes.func,
  label: PropTypes.string,
  id: PropTypes.string
}

export default InputRange;
