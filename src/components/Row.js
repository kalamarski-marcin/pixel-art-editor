import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Cell from './Cell';

const renderCells = (row, cells, html2canvasIgnore, handleFillCell) => {
  return cells.map((cell, index) => {
    return (
      <Cell
        key={`cell-${row}-${index}`}
        row={row}
        col={index}
        backgroundColor={cells[index]}
        handleFillCell={handleFillCell}
        html2canvasIgnore={html2canvasIgnore}
      />
    );
  });
};

class Row extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.cells.filter(n => n).length !== this.props.cells.filter(n => n).length ||
      nextProps.cells.length !== this.props.cells.length ||
      nextProps.html2canvasIgnore !== this.props.html2canvasIgnore
  }

  render() {
    return (
      <div className="editor-grid__row">
        <div className="editor-grid__cell editor-grid__cell--counter">
          {(this.props.row + 1)}
        </div>
        {
          renderCells(
            this.props.row,
            this.props.cells,
            this.props.html2canvasIgnore,
            this.props.handleFillCell
          )
        }
      </div>
    );
  }
}

Row.propTypes = {
  row: PropTypes.number.isRequired,
  cells: PropTypes.array.isRequired,
  handleFillCell: PropTypes.func.isRequired,
  html2canvasIgnore: PropTypes.bool.isRequired
};

export default Row;
