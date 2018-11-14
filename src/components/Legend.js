import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { sortCoordinates } from '../utils';

const R = require('ramda');

class LegendItem extends Component {
  shouldComponentUpdate(nextProps) {
    return R.length(nextProps.coordinates) !== R.length(this.props.coordinates);
  }

  render() {
    return (
      <div
        className="legend-item-wrapper"
      >
        <span
          className="legend-item__color"
          style={{ backgroundColor: this.props.color }}
        />
        <span className="legend-item__coords">
          {this.props.coordinates.sort(sortCoordinates).join(', ')}
        </span>
      </div>
    );
  }
}

LegendItem.propTypes = {
  color: PropTypes.string.isRequired,
  coordinates: PropTypes.array.isRequired,
};

const renderLegend = legend => {
  const legendItems = [];

  Object.entries(legend).forEach(([key, value]) => {
    if (value.length > 0) {
      legendItems.push(
        <LegendItem
          key={`legend-item-${key}`}
          color={key}
          coordinates={value}
        />
      );
    }
  });

  return legendItems;
};

const Legend = props => (
  <div
    id="editor-legend"
    {...props.html2canvasIgnore === false && { 'data-html2canvas-ignore': '' }}
    style={{
      flexDirection: 'column',
      padding: '10px',
      display: 'flex',
      flex: 1,
      flexGrow: 1,
    }}
  >
    {renderLegend(props.legend)}
  </div>
);

Legend.propTypes = {
  legend: PropTypes.object.isRequired,
  html2canvasIgnore: PropTypes.bool.isRequired,
};

export default Legend;
