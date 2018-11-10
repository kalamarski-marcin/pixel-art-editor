import "@babel/polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './src/store';
import Index from './src/layouts/Index';
import './src/styles/app.scss';

const reactRoot = document.getElementById('app');

ReactDOM.render(
  <Provider store={store}>
    <Index />
  </Provider>,
  reactRoot
);
