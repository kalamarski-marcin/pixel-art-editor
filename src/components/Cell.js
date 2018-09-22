import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Cell extends Component {
  shouldComponentUpdate (nextProps) {
    return this.props.backgroundColor !== nextProps.backgroundColor ||
      this.props.html2canvasIgnore !== nextProps.html2canvasIgnore
  }

  render() {
    const {row, col, backgroundColor, handleFillCell } = this.props;

    return (
      <div
        className="editor-grid__cell"
      >
        <div
          className="editor-grid__cell--fill"
          { ...this.props.html2canvasIgnore && { 'data-html2canvas-ignore': '' } }
          data-row={row}
          data-col={col}
          onClick={ handleFillCell }
          style={{ backgroundColor: backgroundColor }}
        />
      </div>
    );
  }
}

Cell.propTypes = {
  backgroundColor: PropTypes.string,
  row: PropTypes.number.isRequired,
  col: PropTypes.number.isRequired,
  handleFillCell: PropTypes.func.isRequired,
  html2canvasIgnore: PropTypes.bool.isRequired
};

export default Cell;
