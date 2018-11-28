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
  // Will cause a deprecation warning, but the demise of `ignoreErrors` is still under discussion.
  // See: https://github.com/getsentry/raven-js/issues/73
  ignoreErrors: [
    /Loading chunk/,
    /SecurityError/,
    /^Exact Match Message$/,
    /MyAppGetLinkTitleNameAtPoint/,
    // Random plugins/extensions
    "top.GLOBALS",
    // See: http://blog.errorception.com/2012/03/tale-of-unfindable-js-error.html
    "originalCreateNotification",
    "canvas.contentDocument",
    "MyApp_RemoveAllHighlights",
    "http://tt.epicplay.com",
    "Can't find variable: ZiteReader",
    "jigsaw is not defined",
    "ComboSearch is not defined",
    "http://loading.retry.widdit.com/",
    "atomicFindClose",
    // Facebook borked
    "fb_xd_fragment",
    // ISP "optimizing" proxy - `Cache-Control: no-transform` seems to reduce this. (thanks @acdha)
    // See http://stackoverflow.com/questions/4113268/how-to-stop-javascript-injection-from-vodafone-proxy
    "bmi_SafeAddOnload",
    "EBCallBackMessageReceived",
    // See http://toolbar.conduit.com/Developer/HtmlAndGadget/Methods/JSInjection.aspx
    "conduitPage",
    // Generic error code from errors outside the security sandbox
    // You can delete this if using raven.js > 1.0, which ignores these automatically.
    "Script error.",
  ],
  ignoreUrls: [
    // Facebook flakiness
    /graph\.facebook\.com/i,
    // Facebook blocked
    /connect\.facebook\.net\/en_US\/all\.js/i,
    // Woopra flakiness
    /eatdifferent\.com\.woopra-ns\.com/i,
    /static\.woopra\.com\/js\/woopra\.js/i,
    // Chrome extensions
    /extensions\//i,
    /^chrome:\/\//i,
    // Other plugins
    /127\.0\.0\.1:4001\/isrunning/i, // Cacaoweb
    /webappstoolbarba\.texthelp\.com\//i,
    /metrics\.itunes\.apple\.com\.edgesuite\.net\//i,
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
