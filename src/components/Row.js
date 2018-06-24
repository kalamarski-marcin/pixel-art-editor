import React from 'react';
import PropTypes from 'prop-types';

import Cell from './Cell';

const renderCells = (row, cells, handleFillCell) => {
  return cells.map((cell, index) => {
    return (
      <Cell
        key={`cell-${row}-${index}`}
        row={row}
        col={index}
        backgroundColor={cells[index]}
        handleFillCell={handleFillCell}
      />
    );
  });
};

const Row = props => (
  <div className="editor-grid__row">
    <div className="editor-grid__cell editor-grid__cell--counter">
      {(props.row + 1)}
    </div>
    { renderCells(props.row, props.cells, props.handleFillCell) }
  </div>
);

Row.propTypes = {
  row: PropTypes.number.isRequired,
  cells: PropTypes.array.isRequired,
  handleFillCell: PropTypes.func.isRequired
};

export default Row;
