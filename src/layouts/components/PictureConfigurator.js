import React from 'react';
import ColumnInputRangeContainer from '../../containers/ColumnsInputRangeContainer';
import RowsInputRangeContainer from '../../containers/RowsInputRangeContainer';
import ColorPickerContainer from '../../containers/ColorPickerContainer';
import PrintingOptionsContainer from '../../containers/PrintingOptionsContainer';
import ResetButton from '../../components/ResetButton';
import ClearButton from '../../components/ClearButton';
import PrintButton from '../../components/PrintButton';

const PictureConfigurator = () => (
  <div className="sidebar left-sidebar">
    <div className="inputs-wrapper">
      <ColumnInputRangeContainer />
      <RowsInputRangeContainer />
    </div>
    <ColorPickerContainer />
    <div>
      <PrintingOptionsContainer />
    </div>
    <div className="buttons-wrapper">
      <ResetButton />
      <ClearButton />
      <PrintButton />
    </div>
  </div>
);

export default PictureConfigurator;
