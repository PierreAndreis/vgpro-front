import React         from 'react';
import { translate } from 'react-i18next';
import { Link }      from 'react-router-dom';

import Alert            from './Header/Alert';
import LanguageSelector from './Header/LanguageSelector';
import SearchBar        from './Header/SearchBar';

const Header = ({ t }) => {
  
  const message  = (
    <span>
      {t('alert')}
      {" "}
      <a href="http://twitter.com/vgprogg" target="_blank" rel="noopener noreferrer" >
        @vgprogg
      </a>
    </span>
  );

  const regions = [];

  return (
    <div>

      <LanguageSelector />

      <div className="menu">
        <div className="wrap">
          <Link to="/">{t('menuhome')}</Link>
          <Link to="/teams">{t('menuteams')}</Link>
          <Link to="/leaderboard"> {t('leadboard')}</Link>
          <Link to="/"> {t('menuheroes')} <i>{t('soon')}</i></Link>
          <Link to="/"> {t('menuvg8')} <i>{t('soon')}</i></Link>
          <Link to="/"> {t('menunews')} <i>{t('soon')}</i></Link>
        </div>
      </div>

      <header>
        <div className="wrap">
          <div className="menu-mobile">
            <i className="fa fa-bars" />
          </div>
          <Link to="/">
            <div className="logo">
              <div className="img" />
            </div>
          </Link>
        </div>
      </header>

      <Alert message={message} />

      <SearchBar  placeholder={t('search-placeholder')} 
                  regions={regions}
      />
    </div>
  );
};

export default translate()(Header);
