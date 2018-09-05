import i18n from "i18next";
import LngDetector from "i18next-browser-languagedetector";

import website from "./website";
import widget from "./widget";

// import store from "../store";

// Subscribing i18n to redux, so everytime there is a state change,
// and current i18n language is different from the set,  it will trigger changeLanguage.
// store.subscribe(() => {
//   const state = store.getState();
//   if (state && state.i18n && state.i18n.current !== i18n.language) {
//     i18n.changeLanguage(state.i18n.current);
//   }
// });

// Quick hack to match i18next language resource format
function createResource(resources) {
  let obj = {};
  for (let [resource, languages] of Object.entries(resources)) {
    for (let [language, content] of Object.entries(languages)) {
      if (!obj[language]) obj[language] = {};
      obj[language][resource] = content;
    }
  }
  return obj;
}

const resources = createResource({ website, widget });

i18n.use(LngDetector).init({
  debug: false,
  resources: resources,
  fallbackLng: "en",

  ns: ["website", "widget"],
  defaultNS: "website",

  keySeparator: false, // we use content as keys

  interpolation: {
    escapeValue: false, // not needed for react!!
    formatSeparator: ",",
  },

  react: {
    wait: true,
  },
});

// i18n.services.pluralResolver.addRule("pt_BR", {
//   numbers: [0, 1, "plural"],
//   plurals: function plurals(n) {
//     return Number(n >= 2 ? 2 : n);
//   },
// });

export default i18n;
