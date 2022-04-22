import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import AppLayout from '@main/layouts/AppLayout';
import { store } from './config';

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <AppLayout />
    </HashRouter>
  </Provider>,
  document.getElementById('root')
);
