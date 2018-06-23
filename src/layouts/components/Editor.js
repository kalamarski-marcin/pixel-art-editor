import React, { Fragment } from 'react';
import Content from './Content';
import Sidebar from './Sidebar';
import EditorContainer from '../../containers/EditorContainer';

const Editor = () => (
  <Fragment>
    <Sidebar />
    <Content>
      <EditorContainer />
    </Content>
  </Fragment>
);

export default Editor;
