import React from 'react';
import PropTypes from 'prop-types';

const ButtonsWrapper = props => (
  <div className="buttons-wrapper">
    {props.children}
  </div>
);

export default ButtonsWrapper;
