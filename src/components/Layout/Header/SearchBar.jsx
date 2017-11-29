import React                from "react";
import {bindActionCreators} from "redux";
import { connect }          from "react-redux";

import {withRouter} from "react-router-dom";

import "./SearchBar.css"

const SearchCompact = ({status, onSearch, placeholder, onChange, value}) => {
  
  return (
  <form action="" onSubmit={onSearch(value)} className="Header-Search">
    <input type="text" 
           className="Header-Search_input"
           placeholder={placeholder} 
           onChange={onChange} 
           value={value}
           />
    <button type="submit">
      <div className="fa fa-search" />
    </button>
  </form>
  )
}

const SearchMain = ({status, onSearch, onChange, placeholder, value}) =>  {

    let icon = "fa fa-search";
    let formClasses = ["searchwrap"];

    if (status === "loading") {
      formClasses.push("loading");
      icon = "fa fa-refresh fa-spin fa-3x fa-fw";
    }
    else if (status === "error"){
      formClasses.push("error");
      icon = "fa fa fa-exclamation-triangle";
    }

    return (
    <div className="searchbar">
      <div className="wrap">
        <form action="" onSubmit={onSearch(value)} className={formClasses.join(" ")}>
          <input
            type="text"
            className="search"
            disabled={status === "loading"}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required
          />
          <button type="submit" disabled={status === "loading"}> 
            <i className={icon} />
          </button>
        </form>
      </div>
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
