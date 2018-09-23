import React, { Component } from 'react';
import PropTypes from 'prop-types';

const HeaderCell = (props) => (
  <div className="editor-grid__cell editor-grid__cell--header">
    {props.letter}
  </div>
);

HeaderCell.propTypes = {
  letter: PropTypes.string
};

const renderCells = (grid_header) => grid_header.map(
  (char, i) => <HeaderCell key={`header-cell-${i}`} letter={char} />
);

class GridHeader extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.grid_header !== nextProps.grid_header;
  }

  render() {
    return (
      <div className="editor-grid__row">
        <div className="editor-grid__cell editor-grid__cell--header" />
        { renderCells(this.props.grid_header) }
      </div>
    )
  }
}

GridHeader.propTypes = {
  grid_header: PropTypes.array.isRequired
};

export default GridHeader;
