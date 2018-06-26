import React, { Fragment } from 'react';
import Content from './Content';
import Sidebar from './Sidebar';
import RightSidebar from './RightSidebar';
import EditorContainer from '../../containers/EditorContainer';

const Editor = () => (
  <Fragment>
    <Sidebar />
    <Content>
      <EditorContainer />
    </Content>
    <RightSidebar />
  </Fragment>
);

export default Editor;
