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
  backgroundColor: PropTypes.string,
  row: PropTypes.number,
  col: PropTypes.number,
  handleFillCell: PropTypes.func
};

export default Cell;
