import React from 'react';
import PropTypes from 'prop-types';

const LegendItem = props => (
  <div className="legend-item-wrapper">
    <span className="legend-item__color" style={{ backgroundColor: props.color }} />
    <span className="legend-item__coords">{props.coordinates.join(', ')}</span>
  </div>
);

LegendItem.propTypes = {
  color: PropTypes.string.isRequired,
  coordinates: PropTypes.array.isRequired
}

const renderLegend = (legend) => {
  const legendItems = [];

  Object.entries(legend).forEach(([key, value]) => {
    legendItems.push(
      <LegendItem
        key={`legend-item-${key}`}
        color={key}
        coordinates={value}
      />
    )
  });

  return legendItems;
};

const Legend = props => (
  <div
    { ...props.html2canvasIgnore == false && { 'data-html2canvas-ignore': '' } }
    style={{
      flexDirection: 'column',
      padding: '10px',
      display: 'flex',
      flex: 1,
      flexGrow: 1
    }}
  >
    {renderLegend(props.legend)}
  </div>
);

Legend.propTypes = {
  legend: PropTypes.object.isRequired,
  html2canvasIgnore: PropTypes.bool.isRequired
};

export default Legend;
