import React from 'react';
import PropTypes from 'prop-types';

const Main = (props) => (
  <div className="flexbox-item flexbox-item-grow">
    {props.children}
  </div>
);

export default Main;
