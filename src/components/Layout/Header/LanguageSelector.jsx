/**
 * state managed by redux store i18n
 */

import React                from "react";
import {bindActionCreators} from "redux";
import { connect }          from "react-redux";

import { changeLanguage, toggleLanguage } from "./../../../actions/i18n";

const LANGS = [
  {  language: "en",    flag: "us"  },
  {  language: "jp",    flag: "jp"  },
  {  language: "kh",    flag: "kh"  },
  {  language: "ir",    flag: "ir"  },
  {  language: "es",    flag: "es"  },
  {  language: "br",    flag: "br"  },
  {  language: "de",    flag: "de"  },
  {  language: "it",    flag: "it"  },
  {  language: "id",    flag: "id"  },
  {  language: "fr",    flag: "fr"  },
  {  language: "kr",    flag: "kr"  },
  {  language: "ph",    flag: "ph"  },
  {  language: "cn",    flag: "cn"  },
  {  language: "ru",    flag: "ru"  },
  {  language: "ro",    flag: "ro"  },
  {  language: "my",    flag: "my"  },
]


const MenuLanguage = ({onChange, open}) => (
  <div className="language_select">
  {
    LANGS.map((l) => (
        <div className="lang_sel" key={l.language} onClick={(e) => onChange(l.language, e)}>
          <span className={`flag-icon flag-icon-${l.flag}`} />{l.language.toUpperCase()}
        </div>
      )
    )
  }
  </div>
  );


const LanguageSelector = ({language, changeLanguage, toggleLanguage, openMenu}) => {

  const current = LANGS.filter((lang) => {
    return (lang.language === language);
  });

  const flag = (current && current[0] && current[0].flag    ) ? current[0].flag     : "us";
  const name = (current && current[0] && current[0].language) ? current[0].language : "en";

  let menu = null;

  if (openMenu) {
    menu = <MenuLanguage onChange={changeLanguage} />;
  }

  return (
    <div className="menu_language">

      <div className="language_selected" onClick={toggleLanguage}>
        <div className="lang_seled">
          <span className={`flag-icon flag-icon-${flag}`} />
          {name.toUpperCase()}
        </div>
      </div>

      {menu}
    </div>
  )
}


const mapStateToProps = state => {
  return {
    language: state.i18n.current,
    openMenu: state.i18n.openMenu
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      changeLanguage,
      toggleLanguage
    },
    dispatch
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LanguageSelector);