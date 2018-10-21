import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { I18nextProvider } from "react-i18next";

import * as Sentry from "@sentry/browser";

import "react-app-polyfill/ie9";
import "./polyfills.js";

import App from "./App";

// import registerServiceWorker from './registerServiceWorker';

import store from "./store";
import i18n from "./i18n";

Sentry.init({
  dsn: "https://1275e38f47b74e1a840442136c2d7a82@sentry.io/1305449",
  release: process.env.REACT_APP_VERSION,
  whitelistUrls: [/vgpro\.gg/, /www\.vgpro\.gg/],
  ignoreErrors: [
    /Loading chunk/,
    /SecurityError/,
    /^Exact Match Message$/,
    /MyAppGetLinkTitleNameAtPoint/,
  ],
});

ReactDOM.render(
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </Provider>,
  document.getElementById("app")
);
// registerServiceWorker();
