import React         from 'react';
import { Link }      from "react-router-dom";
import { translate } from 'react-i18next';

// import Alert            from './Header/Alert';
// import LanguageSelector from './Header/LanguageSelector';
import MenuHeader       from "./Header/Menu";
import SearchPlayer     from "./../common/SearchPlayer";

import "./Header.css"

class Header extends React.Component {
  render() {
    const {t} = this.props;

    // const message  = (
    //   <span>
    //     {t('alert')}
    //     {" "}
    //     <a href="http://twitter.com/vgprogg" target="_blank" rel="noopener noreferrer" >
    //       @vgprogg
    //     </a>
    //   </span>
    // );

    return (
      <div>
        {/* <Alert message={message} /> */}
        <div className="Header">
          <div className="wrap Header-wrap">
            <Link to="/" className="Header-Logo-space">
              <div className="Header-Logo" />
            </Link>
            <MenuHeader t={t} />
            <SearchPlayer mode="compact" />
            </div>
        </div>
      </div>
    );
  };
}

export default translate()(Header);
