/* eslint-disable import/default */

require('./favicon.ico')
import './styles/styles.scss'
import 'semantic-ui-css/semantic.min.css'

import { render } from 'react-dom'
import React from 'react'
import axios from 'axios'
import moment from 'moment'

import { AppContainer } from 'react-hot-loader'

import Root from './components/Root'
import configureStore, { history } from './store/configureStore'

const store = configureStore();

moment.locale('en-us')
axios.defaults.baseURL = '/api/'

render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept('./components/Root', () => {
    const NewRoot = require('./components/Root').default;
    render(
      <AppContainer>
        <NewRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('app')
    );
  });
}
