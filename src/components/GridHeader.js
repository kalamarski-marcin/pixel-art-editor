import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { cellSizeStyle, cellWidthStyle } from '../utils';

const HeaderCell = props => (
  <div
    className="editor-grid__cell editor-grid__cell--header"
    style={cellWidthStyle(props.cellWidth)}
  >
    {props.letter}
  </div>
);

HeaderCell.propTypes = {
  letter: PropTypes.string,
  cellWidth: PropTypes.number
};

const renderCells = (gridHeader, cellWidth) => gridHeader.map(
  (char, i) => <HeaderCell cellWidth={cellWidth} key={`header-cell-${i}`} letter={char} />
);

class GridHeader extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.gridHeader !== nextProps.gridHeader ||
      this.props.cellWidth !== nextProps.cellWidth
  }

  render() {
    return (
      <div className="editor-grid__row">
        <div className="editor-grid__cell editor-grid__cell--header" />
        { renderCells(this.props.gridHeader, this.props.cellWidth) }
      </div>
    );
  }
}

GridHeader.propTypes = {
  gridHeader: PropTypes.array.isRequired,
  cellWidth: PropTypes.number.isRequired
};

export default GridHeader;
