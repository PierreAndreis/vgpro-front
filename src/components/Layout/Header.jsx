import React         from 'react';
import { translate } from 'react-i18next';

import Alert            from './Header/Alert';
import LanguageSelector from './Header/LanguageSelector';
import SearchBar        from './Header/SearchBar';
import MenuHeader       from "./Header/Menu";

import { withRouter } from 'react-router';

import "./Header.css"

const Header = ({t, location}) => {

  const message  = (
    <span>
      {t('alert')}
      {" "}
      <a href="http://twitter.com/vgprogg" target="_blank" rel="noopener noreferrer" >
        @vgprogg
      </a>
    </span>
  );

  return (
    <div>
      <Alert message={message} />

      <div className="Header">
        <div className="wrap Header-wrap">
          <div className="Header-Logo" />
          <MenuHeader t={t} />
          <form action="" onSubmit={(e) => e.preventDefault()} className="Header-Search">
            <input type="text" className="Header-Search_input" placeholder={t('search-placeholder')} />
            <button type="submit"><div className="fa fa-search" /></button>
          </form>
          <LanguageSelector />
          </div>
      </div>
      {   location.pathname === "/" 
       || location.pathname === "/home" ? 
      <header className="header-home">
        <div className="wrap">
          <div className="logo">
            <div className="img" />
          </div>
        </div>
        <SearchBar  placeholder={t('search-placeholder')} 
        />
      </header>
      :
      null
      }
      </div>
      
  );
};

export default translate()(withRouter(Header));
