import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PrintingOptions extends Component {
  render() {
    return (
      <div className='radio-inputs-wrapper'>
        <div>
          <input
            id='print-empty-grid'
            type='radio'
            checked={this.props.html2canvasIgnore ? 'checked' : ''}
            onChange={() => this.props.setHtml2canvasIgnore(true)}
          />
          <label htmlFor="print-empty-grid">Drukuj pusty obrazek z legendą</label>
        </div>
        <div>
          <input
            id='print-drawing'
            type='radio'
            checked={!this.props.html2canvasIgnore ? 'checked' : ''}
            onChange={() => this.props.setHtml2canvasIgnore(false)}
          />
          <label htmlFor='print-drawing'>Drukuj obrazek</label>
        </div>
      </div>
    );
  }
}

PrintingOptions.propTypes = {
  html2canvasIgnore: PropTypes.bool.isRequired,
  setHtml2canvasIgnore: PropTypes.func.isRequired
};

export default PrintingOptions;
