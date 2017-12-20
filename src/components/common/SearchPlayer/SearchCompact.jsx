import React from "react";

import "./SearchCompact.css"

class SearchCompact extends React.Component {
  
  state = {open: false}

  timeout = null;

  handleMenu = () => {
    this.setState({
      open: !this.state.open
    })
  }

  handleClick = (value) => (e) => {
    e.preventDefault();
    const {open} = this.state;
    const {onSearch} = this.props;

    if (open) {
      return onSearch(value, this.handleMenu);
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

    return (
      <div className="Header-Search">
        <form action="" onSubmit={onSearch(value)}>
          <input type="text" 
                className="Header-Search_input open"
                placeholder={placeholder} 
                onChange={onChange} 
                value={value}
            />
            <div className={`Search-Icon ${icon}`} onClick={onSearch(value)} />
        </form>
      </div>
    )
  }
}

export default SearchCompact;