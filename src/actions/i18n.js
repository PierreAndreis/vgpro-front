export const changeLanguage = (language) => {

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