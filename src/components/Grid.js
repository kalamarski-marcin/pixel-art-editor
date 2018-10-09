import React from 'react';
import PropTypes from 'prop-types';
import Row from './Row';
import GridHeader from './GridHeader';

const renderRows = (props) => {
  return props.grid.map((row, index) => {
    return (
      <Row
        key={`row-${index}`}
        row={index}
        cells={props.grid[index]}
        fillSingleCell={props.fillSingleCell}
        fillMultipleCells={props.fillMultipleCells}
        html2canvasIgnore={props.html2canvasIgnore}
        mode={props.mode}
        startMultiFillingMode={props.startMultiFillingMode}
        endMultiFillingMode={props.endMultiFillingMode}
      />
    );
  });
};

const Grid = props => {
  return (
    <div
      className="editor-grid"
      style={{ zoom: 1 }}
      id="grid"
      onMouseLeave={
        props.mode.fillMultipleCells.enabled && props.mode.fillMultipleCells.started
          ? props.endMultiFillingMode : () => { }
      }
    >
      <GridHeader gridHeader={props.gridHeader} />
      { renderRows(props) }
    </div>
  )
};

Grid.propTypes = {
  mode: PropTypes.object.isRequired,
  grid: PropTypes.array.isRequired,
  gridHeader: PropTypes.array.isRequired,
  fillSingleCell: PropTypes.func.isRequired,
  fillMultipleCells: PropTypes.func.isRequired,
  html2canvasIgnore: PropTypes.bool.isRequired,
  startMultiFillingMode: PropTypes.func.isRequired,
  endMultiFillingMode: PropTypes.func.isRequired
};

export default Grid;
