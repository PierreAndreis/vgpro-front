import React                from "react";
import {bindActionCreators} from "redux";
import { connect }          from "react-redux";


import "./SearchBar.css"


class SearchBar extends React.Component {


  render() {

    const { 
      // onSearch, 
      

      placeholder, 

      // recentlySearched,
    } = this.props;


    return (
    <div className="searchbar">
      <div className="wrap">
        <form action="" onSubmit={(e) => e.preventDefault()} className="searchwrap">

          <input
            type="text"
            className="search"
            placeholder={placeholder}
            required
          />
          <button type="submit"> <i className="fa fa-search" /> </button>
        </form>
      </div>
    </div>
    )
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
)(SearchBar);
