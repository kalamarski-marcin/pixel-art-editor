import React, {Fragment} from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/Main';
import Editor from './components/Editor';

const Index = () => (
  <Fragment>
    <Header />
    <Main>
      <Editor />
    </Main>
    <Footer />
  </Fragment>
);

export default Index;
