import React from 'react';
import ColumnInputRangeContainer from '../../containers/ColumnsInputRangeContainer';
import RowsInputRangeContainer from '../../containers/RowsInputRangeContainer';
import ColorPickerContainer from '../../containers/ColorPickerContainer';
import ResetButton from '../../components/ResetButton';
import ClearButton from '../../components/ClearButton';

const RightSidebar = () => (
  <div className="sidebar right-sidebar">
    <div className="inputs-wrapper">
      <ColumnInputRangeContainer />
      <RowsInputRangeContainer />
    </div>
    <div className="color-picker-wrapper">
      <ColorPickerContainer />
    </div>
    <div className="buttons-wrapper">
      <ResetButton />
      <ClearButton />
    </div>
  </div>
);

export default RightSidebar;
