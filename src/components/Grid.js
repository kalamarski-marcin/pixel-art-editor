import React from 'react';
import PropTypes from 'prop-types';
import Row from './Row';
import GridHeader from './GridHeader';

const renderRows = (grid, handleFillCell) => {
  return grid.map((row, index) => {
    return (
      <Row
        key={`row-${index}`}
        row={index}
        cells={grid[index]}
        handleFillCell={handleFillCell}
      />
    );
  });
};

const Grid = props => {
  return (
    <div className="editor-grid" style={{ zoom: 1 }} id="grid">
      <GridHeader grid_header={props.grid_header} />
      { renderRows(props.grid, props.handleFillCell) }
    </div>
  )
};

Grid.propTypes = {
  grid: PropTypes.array,
  grid_header: PropTypes.array,
  handleFillCell: PropTypes.func
};

export default Grid;
