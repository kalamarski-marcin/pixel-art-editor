import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { cellSizeStyle } from '../utils';

const R = require('ramda');

class Cell extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.backgroundColor !== nextProps.backgroundColor ||
      !R.equals(nextProps.cellWidth, this.props.cellWidth) ||
      this.props.html2canvasIgnore !== nextProps.html2canvasIgnore ||
      !R.equals(this.props.modes, nextProps.modes);
  }

  render() {
    return (
      <div className="editor-grid__cell" style={cellSizeStyle(this.props.cellWidth)}>
        <div
          className="editor-grid__cell--fill"
          { ...this.props.html2canvasIgnore && { 'data-html2canvas-ignore': '' } }
          data-row={this.props.row}
          data-col={this.props.col}
          onClick={this.props.onClick}
          onMouseEnter={this.props.onMouseEnter}
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
  html2canvasIgnore: PropTypes.bool.isRequired,
  modes: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  cellWidth: PropTypes.number.isRequired
};

export default Cell;
