import React from "react";

import "./SearchCompact.css"

class SearchCompact extends React.Component {
  
  state = {open: false}

  timeout = null;

  handleMenu = () => {
    this.setState({
      open: !this.state.open
    }, () => {
      if (this.state.open) this.input.focus();
    })
  }

  handleClick = (e) => {
    console.log("lul");
    const {open} = this.state;
    const {onSearch} = this.props;

    if (open) {
      onSearch();
      return;
    }
    return this.handleMenu();

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
                onBlur={this.handleMenu}
                className={`Header-Search_input ${!this.state.open && "close"}`}
                placeholder={ph} 
                onChange={onChange} 
                value={value}
            />

            <div className={`Search-Icon ${icon}`} onClick={this.handleClick} />
        </form>
      </div>
    )
  }
}

export default SearchCompact;