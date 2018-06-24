import React from 'react';
import PropTypes from 'prop-types';

const Main = ({children}) => (
  <div className="flexbox-item flexbox-item-grow">
    { children }
  </div>
);

Main.propTypes = {
  children: PropTypes.object.isRequired
}

export default Main;
