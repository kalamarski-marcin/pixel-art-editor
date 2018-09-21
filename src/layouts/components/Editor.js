import React, { Fragment } from 'react';
import PictureConfigurator from './PictureConfigurator';
import EditorContainer from '../../containers/EditorContainer';
import LegendContainer from '../../containers/LegendContainer';

const Editor = () => (
  <Fragment>
    <PictureConfigurator />
    <EditorContainer />
    <LegendContainer />
  </Fragment>
);

export default Editor;
