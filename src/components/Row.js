import React from 'react';
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

const Row = props => (
  <div className="editor-grid__row">
    <div className="editor-grid__cell editor-grid__cell--counter">
      {(props.row + 1)}
    </div>
    { renderCells(props.row, props.cells, props.html2canvasIgnore, props.handleFillCell) }
  </div>
);

Row.propTypes = {
  row: PropTypes.number.isRequired,
  cells: PropTypes.array.isRequired,
  handleFillCell: PropTypes.func.isRequired,
  html2canvasIgnore: PropTypes.bool.isRequired
};

export default Row;
