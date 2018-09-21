import React from 'react';
import ColumnInputRangeContainer from '../../containers/ColumnsInputRangeContainer';
import RowsInputRangeContainer from '../../containers/RowsInputRangeContainer';
import ColorPickerContainer from '../../containers/ColorPickerContainer';
import ResetButton from '../../components/ResetButton';
import ClearButton from '../../components/ClearButton';

const PictureConfigurator = () => (
  <div className="sidebar left-sidebar">
    <div className="inputs-wrapper">
      <ColumnInputRangeContainer />
      <RowsInputRangeContainer />
    </div>
    <ColorPickerContainer />
    <div className="buttons-wrapper">
      <ResetButton />
      <ClearButton />
    </div>
  </div>
);

export default PictureConfigurator;
