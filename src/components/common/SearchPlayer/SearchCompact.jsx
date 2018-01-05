import React from "react";

import SearchMenu from "./SearchMenu";

import "./SearchCompact.css"

class SearchCompact extends React.Component {
  
  constructor() {
    super();

    this.timeout = null;

    this.state = {
      open: (document.documentElement.clientWidth > 790) ? true : false,
      menuOpen: false,
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  onFocus = (e) => {
    this.setState({
      menuOpen: true
    })
  }

  onBlur = (e) => {
    this.timeout = setTimeout(() => {
      this.setState((prevState) => {
        let open = false;
        if (document.documentElement.clientWidth > 790) open = true;

        return {
          open,
          menuOpen: false
        }
      })
    }, 200)
  }

  openMenu = () => {
    this.setState({
      open: true
    }, () => {
      if (this.state.open) this.input.focus();
    });
  }

  handleClick = (e) => {
    const {onSearch} = this.props;

    if (this.state.open) {
      onSearch();
      return;
    }
    return this.openMenu();
  }

  render() {
    const {status, onSearch, placeholder, onChange, value} = this.props;

    let icon = "fa fa-search";

    if (status === "loading") {
      icon = "fa fa-refresh fa-spin fa-3x fa-fw";
    }
    else if (status === "error"){
      icon = "fa fa fa-exclamation-triangle";
    }

    let ph = (this.state.open) ? placeholder : "";

    return (
      <div className="Header-Search">
        <form action="" onSubmit={onSearch}>
          <input type="text" 
                ref={input => this.input = input}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                className={`Header-Search_input ${!this.state.open && "close"}`}
                placeholder={ph} 
                onChange={onChange} 
                value={value}
                autoComplete="off" 
                autoCorrect="off" 
                autoCapitalize="off" 
                spellCheck="false"
            />

            <div className={`Search-Icon ${icon}`} onClick={this.handleClick} />
          {
            this.state.menuOpen && 
            <SearchMenu style={{width: "250px", right: -5, marginTop: "45px", textAlign: "left"}} />
          }
        </form>
      </div>
    )
  }
}

export default SearchCompact;