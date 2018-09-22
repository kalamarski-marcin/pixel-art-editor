import React, { Fragment } from 'react';
import PictureConfigurator from './PictureConfigurator';
import EditorContainer from '../../containers/EditorContainer';
import LegendContainer from '../../containers/LegendContainer';

const Editor = () => (
  <Fragment>
    <PictureConfigurator />
    <div id="print-drawing-wrapper">
      <EditorContainer />
      <LegendContainer />
    </div>
  </Fragment>
);

export default Editor;
