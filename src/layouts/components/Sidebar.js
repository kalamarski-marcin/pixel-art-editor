import React from 'react';
import PropTypes from 'prop-types';

const Sidebar = (props) => (
  <div className="sidebar left-sidebar">
    {props.children}
  </div>
);

export default Sidebar;
