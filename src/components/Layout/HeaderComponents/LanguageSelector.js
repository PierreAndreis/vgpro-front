import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import styled from "styled-components";

import { changeLanguage, toggleLanguage } from "./../../../actions/i18n";

const LANGS = [
  { language: "en", flag: "us" },
  { language: "jp", flag: "jp" },
  { language: "kh", flag: "kh" },
  { language: "ir", flag: "ir" },
  { language: "es", flag: "es" },
  { language: "br", flag: "br" },
  { language: "de", flag: "de" },
  { language: "it", flag: "it" },
  { language: "id", flag: "id" },
  { language: "fr", flag: "fr" },
  { language: "kr", flag: "kr" },
  { language: "ph", flag: "ph" },
  { language: "cn", flag: "cn" },
  { language: "ru", flag: "ru" },
  { language: "ro", flag: "ro" },
  { language: "my", flag: "my" },
];

const Wrapper = styled.div`
  width: 70px;
  margin-left: 10px;
`;

const Button = styled.div`
  padding: 5px;
  cursor: pointer;
  text-transform: uppercase;
  color: rgba(0,0,0,0.6);
  border-radius: 5px;
  span {
    margin-right: 5px;
  }
`;

const Selected = styled.div`
  z-index: 99;
  padding: 5px 2px;
  color: ${props => props.theme.background.white};
  border-radius: 5px;
  background: #19191E;
`;

const Menu = styled.div`
  position: absolute;
  left: auto;
  right: auto;
  top: 35px;
  z-index: 99;
  padding: 5px;
  color: ${props => props.theme.background.white};
  border-radius: 5px;
  background: #19191E;
`;

const Options = styled.div`
  padding: 5px;
  cursor: pointer;
  transition: all 300ms;
  &:hover {
    background-color: rgba(0,0,0,0.9);
  }
`;


const MenuLanguage = ({ onChange, open }) => (
  <Menu>
    {
      LANGS.map(l => (
        <Options onClick={(e) => onChange(l.language, e)}>
          <span className={`flag-icon flag-icon-${l.flag}`} />{l.language.toUpperCase()}
        </Options>
      )
      )
    }
  </Menu>
);


const LanguageSelector = ({ language, changeLanguage, toggleLanguage, openMenu }) => {

  const current = LANGS.filter((lang) => {
    return (lang.language === language);
  });

  // const flag = (current && current[0] && current[0].flag    ) ? current[0].flag     : "us";
  const name = (current && current[0] && current[0].language) ? current[0].language : "en";

  let menu = null;

  if (openMenu) {
    menu = <MenuLanguage onChange={changeLanguage} current={current} />;
  }

  return (
    <Wrapper>

      <Button onClick={toggleLanguage}>
        <Selected>
          {name.toUpperCase()}
        </Selected>
      </Button>

      {menu}
    </Wrapper>
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