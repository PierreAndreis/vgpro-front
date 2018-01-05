import React               from 'react';
import ReactDOM            from 'react-dom';
import { Provider }        from 'react-redux';
import { I18nextProvider } from 'react-i18next';

import "./polyfills.js";

import App from './App';

// import registerServiceWorker from './registerServiceWorker';

import store from "./store";
import i18n from './i18n';

ReactDOM.render(
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </Provider>,
  document.getElementById('app'));
// registerServiceWorker();
