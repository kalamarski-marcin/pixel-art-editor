import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import ColumnInputRangeContainer from '../containers/ColumnsInputRangeContainer';
import RowsInputRangeContainer from '../containers/RowsInputRangeContainer';
import ColorPickerContainer from '../containers/ColorPickerContainer';
import PrintingOptionsContainer from '../containers/PrintingOptionsContainer';
import PaintingModeContainer from '../containers/PaintingModeContainer';
import ResetButton from '../components/ResetButton';
import ClearButton from '../components/ClearButton';
import PrintButton from '../components/PrintButton';

class EditorSidebar extends Component {
  render() {
    return (
      <Fragment>
        <div className="inputs-wrapper">
          <ColumnInputRangeContainer />
          <RowsInputRangeContainer />
        </div>
        <PaintingModeContainer />
        <ColorPickerContainer />
        <div>
          <PrintingOptionsContainer />
        </div>
        <div className="buttons-wrapper">
          <ResetButton />
          <ClearButton />
          <PrintButton />
        </div>
      </Fragment>
    )
  }
}

EditorSidebar.contextTypes = {
  store: PropTypes.object.isRequired
};

export default EditorSidebar;
