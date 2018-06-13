import i18n from "i18next";
import LngDetector from "i18next-browser-languagedetector";

import resources from "./languages";

// import store from "../store";

// Subscribing i18n to redux, so everytime there is a state change,
// and current i18n language is different from the set,  it will trigger changeLanguage.
// store.subscribe(() => {
//   const state = store.getState();
//   if (state && state.i18n && state.i18n.current !== i18n.language) {
//     i18n.changeLanguage(state.i18n.current);
//   }
// });

i18n.use(LngDetector).init({
  // debug: true,
  // we init with resources
  resources: resources,
  fallbackLng: "en",

  // have a common namespace used around the full app
  ns: ["translations"],
  defaultNS: "translations",

  keySeparator: false, // we use content as keys

  interpolation: {
    escapeValue: false, // not needed for react!!
    formatSeparator: ",",
  },

  react: {
    wait: true,
  },
});

export default i18n;
