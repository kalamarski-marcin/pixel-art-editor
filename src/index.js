import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers';
import Index from './layouts/Index';

import './styles/app.scss';

function configureStore(initialState) {
  return createStore(
    rootReducer, initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
}

const store = configureStore({});

const reactRoot = document.getElementById('app');

ReactDOM.render(
  <Provider store={store}>
    <Index />
  </Provider>,
  reactRoot
);
