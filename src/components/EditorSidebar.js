import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import EditorSidebarSectionWrapper from './EditorSidebarSectionWrapper';
import ButtonsWrapper from './ButtonsWrapper';
import ColumnInputRangeContainer from '../containers/ColumnsInputRangeContainer';
import RowsInputRangeContainer from '../containers/RowsInputRangeContainer';
import ColorPickerContainer from '../containers/ColorPickerContainer';
import PrintingOptionsContainer from '../containers/PrintingOptionsContainer';
import EditorModeContainer from '../containers/EditorModeContainer';
import Zoom from './Zoom';
import ResetButton from './ResetButton';
import ClearButton from './ClearButton';
import PrintButton from './PrintButton';

class EditorSidebar extends Component {
  render() {
    return (
      <Fragment>
        <EditorSidebarSectionWrapper>
          <Zoom />
        </EditorSidebarSectionWrapper>
        <EditorSidebarSectionWrapper>
          <ColumnInputRangeContainer />
          <RowsInputRangeContainer />
        </EditorSidebarSectionWrapper>
        <EditorSidebarSectionWrapper>
          <EditorModeContainer />
        </EditorSidebarSectionWrapper>
        <EditorSidebarSectionWrapper>
          <ColorPickerContainer />
        </EditorSidebarSectionWrapper>
        <EditorSidebarSectionWrapper>
          <PrintingOptionsContainer />
        </EditorSidebarSectionWrapper>
        <EditorSidebarSectionWrapper>
          <ButtonsWrapper>
            <ResetButton />
            <ClearButton />
            <PrintButton />
          </ButtonsWrapper>
        </EditorSidebarSectionWrapper>
      </Fragment>
    );
  }
}

EditorSidebar.contextTypes = {
  store: PropTypes.object.isRequired,
};

export default EditorSidebar;
