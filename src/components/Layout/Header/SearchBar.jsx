import React                from "react";
import {bindActionCreators} from "redux";
import { connect }          from "react-redux";

import {withRouter} from "react-router-dom";

import "./SearchBar.css"

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

const SearchMain = ({status, onSearch, onChange, placeholder, value}) =>  {

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
    <div className="SearchBar">
      <form action="" onSubmit={onSearch(value)} className={formClasses.join(" ")}>

        <button type="submit" disabled={status === "loading"}> 
          <i className={icon} />
        </button>
        <input
          type="text"
          className="SearchBar-Input"
          disabled={status === "loading"}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required
        />
      </form>
    </div>
    )
  }

class SearchBar extends React.Component {
  
  constructor() {
    super();
    this.state = {
      playerField: "",
    }
  }

  changeField = (e) => {
    this.setState({
      playerField: e.target.value
    })
  }
  
  render() {
    const {mode} = this.props;


    const props = {
      onChange: this.changeField,
      value: this.state.playerField,
      ...this.props
    }

    if (mode === "compact") return ( <SearchCompact {...props} />);
    else                    return (<SearchMain     {...props} />);
  }
}

const mapStateToProps = state => {

  return {}
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      // props
    },
    dispatch
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SearchBar));
