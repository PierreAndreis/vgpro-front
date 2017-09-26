import i18n from "i18next";

export const changeLanguage = (language) => {

  i18n.changeLanguage(language);

  return {
      type: 'SWITCH_LANGUAGE',
      language
  }
};

export const toggleLanguage = () => {
  return {
      type: 'TOGGLE_MENU_LANGUAGE'
  }
};