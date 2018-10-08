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
        paintBrush={props.paintBrush}
        paintRoller={props.paintRoller}
        html2canvasIgnore={props.html2canvasIgnore}
        mode={props.mode}
        startPaintRollerMode={props.startPaintRollerMode}
        endPaintRollerMode={props.endPaintRollerMode}
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
      onMouseLeave={props.mode.paintRoller.enabled && props.mode.paintRoller.started ? props.endPaintRollerMode : () => { }}
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
  paintBrush: PropTypes.func.isRequired,
  paintRoller: PropTypes.func.isRequired,
  html2canvasIgnore: PropTypes.bool.isRequired,
  startPaintRollerMode: PropTypes.func.isRequired,
  endPaintRollerMode: PropTypes.func.isRequired
};

export default Grid;
