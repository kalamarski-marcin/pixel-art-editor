import React from 'react';
import PropTypes from 'prop-types';
import Row from './Row';
import GridHeader from './GridHeader';

const renderRows = (grid, html2canvasIgnore, handleFillCell) => {
  return grid.map((row, index) => {
    return (
      <Row
        key={`row-${index}`}
        row={index}
        cells={grid[index]}
        handleFillCell={handleFillCell}
        html2canvasIgnore={html2canvasIgnore}
      />
    );
  });
};

const Grid = props => {
  return (
    <div className="editor-grid" style={{ zoom: 1 }} id="grid">
      <GridHeader grid_header={props.grid_header} />
      { renderRows(props.grid, props.html2canvasIgnore, props.handleFillCell) }
    </div>
  )
};

Grid.propTypes = {
  grid: PropTypes.array.isRequired,
  grid_header: PropTypes.array.isRequired,
  handleFillCell: PropTypes.func.isRequired,
  html2canvasIgnore: PropTypes.bool.isRequired
};

export default Grid;
