import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Cell extends Component {
  shouldComponentUpdate (nextProps) {
    return this.props.backgroundColor !== nextProps.backgroundColor;
  }

  render () {
    const {row, col, backgroundColor, handleFillCell} = this.props;

    return (
      <div
        className="editor-grid__cell"
        data-row={row}
        data-col={col}
        style={ { backgroundColor: backgroundColor }}
        onClick={ handleFillCell }
      />
    );
  }
}

Cell.propTypes = {
  backgroundColor: PropTypes.string.isRequired,
  row: PropTypes.number.isRequired,
  col: PropTypes.number.isRequired,
  handleFillCell: PropTypes.func.isRequired
};

export default Cell;
