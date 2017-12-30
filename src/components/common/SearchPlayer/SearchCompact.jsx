import React from "react";

import "./SearchCompact.css"

class SearchCompact extends React.Component {
  
  constructor() {
    super();

    this.state = {
      open: (document.documentElement.clientWidth > 790) ? true : false
    }
  }

  openMenu = () => {
    this.setState({
      open: true
    }, () => {
      if (this.state.open) this.input.focus();
    });
  }

  closeMenu = () => {

    if (document.documentElement.clientWidth > 790) return;
    
    this.setState({
      open: false
    })
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
                onBlur={() => setTimeout(this.closeMenu, 300)}
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
        </form>
      </div>
    )
  }
}

export default SearchCompact;