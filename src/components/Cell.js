import React, { Component } from 'react';
import PropTypes from 'prop-types';

const R = require('ramda');

class Cell extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.backgroundColor !== nextProps.backgroundColor ||
      this.props.html2canvasIgnore !== nextProps.html2canvasIgnore ||
      !R.equals(this.props.mode, nextProps.mode)
  }

  render() {
    return (
      <div
        className="editor-grid__cell"
      >
        <div
          className="editor-grid__cell--fill"
          { ...this.props.html2canvasIgnore && { 'data-html2canvas-ignore': '' } }
          data-row={this.props.row}
          data-col={this.props.col}
          onClick={this.props.mode.paintBrush.enabled ? this.props.paintBrush : this.props.mode.paintRoller.started ? this.props.endPaintRollerMode : () => this.props.startPaintRollerMode(this.props.row, this.props.col) }
          onMouseEnter={this.props.mode.paintRoller.enabled && this.props.mode.paintRoller.started ? this.props.paintRoller : () => { } }
          style={{ backgroundColor: this.props.backgroundColor }}
        />
      </div>
    );
  }
}

Cell.propTypes = {
  backgroundColor: PropTypes.string,
  row: PropTypes.number.isRequired,
  col: PropTypes.number.isRequired,
  paintBrush: PropTypes.func.isRequired,
  paintRoller: PropTypes.func.isRequired,
  html2canvasIgnore: PropTypes.bool.isRequired,
  mode: PropTypes.object.isRequired,
  startPaintRollerMode: PropTypes.func.isRequired,
  endPaintRollerMode: PropTypes.func.isRequired
};

export default Cell;
