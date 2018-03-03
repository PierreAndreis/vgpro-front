import React from 'react';
import { Link } from "react-router-dom";
import { translate } from 'react-i18next';

import styled from "styled-components";
import Media from "react-media";
import { commonWrapper } from "./../../styles/App.style";

import Alert from './HeaderComponents/Alert';
// import LanguageSelector from './Header/LanguageSelector';
import MenuHeader from "./HeaderComponents/Menu";
import ThemeSwitch from "./HeaderComponents/ThemeSwitch";
import SearchPlayer from "./../common/SearchPlayer";

const Wrapper = styled.div`
  width: 100%;
  height: 55px;
  text-align: center;
  background: ${props => props.theme.background.box};
  position: relative;
  z-index: 4;
  display: flex;
  box-shadow: 0 4px 2px -2px ${props => props.theme.shadow};
`;

const Content = commonWrapper.extend`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 30px;
  box-sizing: border-box;
`;

const Logo = styled.div`
  background: url(/images/${props => props.theme.logo}) no-repeat;
  background-size: 100%;
  background-position: center center;
  width: 125px;
  height: 42px;
`;

const ToHomePage = styled(Link) `
margin-right: 30px;
`;

class Header extends React.Component {
  render() {
    const { t } = this.props;

    const message = (
      <span>
        Welcome! This is the preview of our new website. Please report any bugs or feedback to
        {" "}
        <a href="http://twitter.com/vgprogg" target="_blank" rel="noopener noreferrer" >
          @vgprogg
        </a>
      </span>
    );

    return (
      <React.Fragment>
        <Alert message={message} />
        <Wrapper>
          <Content>

            <ToHomePage to="/">
              <Logo />
            </ToHomePage>

            <MenuHeader t={t} />
            <SearchPlayer mode="compact" />
            <Media query="(max-width: 768px)">
              {matches =>!matches && (<ThemeSwitch />)}
            </Media>
          </Content>
        </Wrapper>
      </React.Fragment>
    );
  };
}

export default translate()(Header);
