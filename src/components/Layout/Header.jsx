import React         from 'react';
import { translate } from 'react-i18next';
import { NavLink, Link }   from 'react-router-dom'

import Alert            from './Header/Alert';
import LanguageSelector from './Header/LanguageSelector';
import SearchBar        from './Header/SearchBar';

import "./Header.css"

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
      <Alert message={message} />

      <div className="menu">
        <LanguageSelector />
        <div className="wrap">
          <NavLink to="/"   exact    activeClassName="active"> {t('menuhome')  }                     </NavLink>
          <NavLink to="/leaderboard" activeClassName="active"> {t('leadboard') }                     </NavLink>
          <NavLink to="/teams"       activeClassName="active"> {t('menuteams') }                     </NavLink>
          <NavLink to="/"            activeClassName="none"  > {t('menuheroes')} <i>{t('soon')}</i>  </NavLink>
          <NavLink to="/"            activeClassName="none"  > {t('menuvg8')   } <i>{t('soon')}</i>  </NavLink>
          <NavLink to="/"            activeClassName="none"  > {t('menunews')  } <i>{t('soon')}</i>  </NavLink>
        </div>
      </div>

      <header>
        <div className="wrap">
          <Link to="/">
            <div className="logo">
              <div className="img" />
            </div>
          </Link>
        </div>
      </header>

      <SearchBar  placeholder={t('search-placeholder')} 
                  regions={regions}
      />
    </div>
  );
};

export default translate()(Header);
