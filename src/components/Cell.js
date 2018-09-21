import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Cell extends Component {
  shouldComponentUpdate (nextProps) {
    return this.props.backgroundColor !== nextProps.backgroundColor;
  }

  render () {
    const {row, col, backgroundColor, handleFillCell } = this.props;

    return (
      <div
        className="editor-grid__cell"
      >
        <div
          className="editor-grid__cell--fill"
          data-html2canvas-ignore
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
  handleFillCell: PropTypes.func.isRequired
};

export default Cell;
