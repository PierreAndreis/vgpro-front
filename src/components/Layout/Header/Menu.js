import React from "react";

import { NavLink }   from 'react-router-dom'

import "./Menu.css";

const MenuHeader = ({t}) => { 
  return (      
    <div className="Header-Menu">
      <NavLink to="/"   exact    activeClassName="active"> {t('menuhome')  }                     </NavLink>
      <NavLink to="/leaderboard" activeClassName="active"> {t('leadboard') }                     </NavLink>
      <NavLink to="/teams"       activeClassName="active"> {t('menuteams') }                     </NavLink>
      <NavLink to="/"            activeClassName="none"  > {t('menuheroes')} <i>{t('soon')}</i>  </NavLink>
      <NavLink to="/"            activeClassName="none"  > {t('menuvg8')   } <i>{t('soon')}</i>  </NavLink>
      <NavLink to="/"            activeClassName="none"  > {t('menunews')  } <i>{t('soon')}</i>  </NavLink>
    </div>
      );
}

export default MenuHeader;