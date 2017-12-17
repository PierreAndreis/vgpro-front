import React         from 'react';
import { translate } from 'react-i18next';

import Alert            from './Header/Alert';
import LanguageSelector from './Header/LanguageSelector';
import SearchBar        from './Header/SearchBar';
// import MenuHeader       from "./Header/Menu";

import { withRouter } from 'react-router';
import { Link }   from 'react-router-dom';

import {lookupPlayer} from "../../actions/api";
import Utils from "../../utils"

import "./Header.css"

const changeStatus = (instance, status) => {
  clearTimeout(instance.timeout);

  if (status === "loading") {
    return instance.setState({status: "loading"});
  }

  if (status === "error") {
     instance.setState({status: "error"});
     return instance.timeout = setTimeout(() => {
       instance.setState({status: "ready"})
     }, 2000)
  }

  if (status === "ready") {
    return instance.setState({status: "ready"})
  }
}

class Header extends React.Component {
  
  constructor() {
    super();

    this.state = {
      playerField: "",
      status: "ready",
    }

    this.timeout = null;
  }

  changeField = (e) => {
    this.setState({
      playerField: e.target.value,
      status: "ready"
    })
  }

  search = (playerName) => (e) => {
    e.preventDefault();
    
    changeStatus(this, "loading");

    lookupPlayer(playerName).then((result) => {

      if (result && result.name) {
        changeStatus(this, "ready");
        return this.props.history.push(Utils.goToPlayer(result.name));
      }
      changeStatus(this, "error");
    });
  }

  render() {
    const {t, location} = this.props;

    const {
      status
    } = this.state;


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
            <Link to="/"><div className="Header-Logo" /></Link>
            {/* <MenuHeader t={t} />
            <SearchBar mode="compact"
                      placeholder={t('search-placeholder')} 
                      status={status}
                      onSearch={this.search}
            /> */ }
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
          <SearchBar  mode="main"
                      placeholder={t('search-placeholder')} 
                      status={status}
                      onSearch={this.search}
          />
        </header>
        :
        null
        }
        </div>
        
    );
  };
}

export default translate()(withRouter(Header));
