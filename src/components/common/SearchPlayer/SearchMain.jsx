import React from "react";
import SearchMenu from "./SearchMenu";

import "./SearchMain.css";

class SearchMain extends React.Component {

  state = {menuOpen: false};

  onBlur = (e) => {
    this.closingMenu = setTimeout(
      () => this.setState({menuOpen: false}),
      300);
  }

  onFocus = (e) => {
    this.setState({
      menuOpen: true
    })
  }

  componentWillUnmount() {
    if (this.closingMenu) clearTimeout(this.closingMenu);
  }
  
  render() {
    const {status, onSearch, onChange, placeholder, value} = this.props;

    let icon = "fa fa-search";
    let formClasses = [];

    if (status === "loading") {
      formClasses.push("loading");
      icon = "fa fa-refresh fa-spin fa-3x fa-fw";
    }
    else if (status === "error"){
      formClasses.push("error");
      icon = "fa fa fa-exclamation-triangle";
    }

    return (
    <div className="SearchBar SearchBar-OpenMenu">
      <form action="" onSubmit={onSearch} className={formClasses.join(" ")}>

        <button type="submit" disabled={status === "loading"}> 
          <i className={icon} />
        </button>
        <input
          type="text"
          className="SearchBar-Input Input-Open"
          disabled={status === "loading"}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          required
          autoComplete="off" 
          autoCorrect="off" 
          autoCapitalize="off" 
          spellCheck="false"
        />
      </form>

        {this.state.menuOpen && <SearchMenu style={{left: 0, right: 0}} />}
    </div>
    )
  }
}

export default SearchMain;