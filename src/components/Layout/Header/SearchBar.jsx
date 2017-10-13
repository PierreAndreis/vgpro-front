import React                from "react";
import * as lodash          from "lodash";
import {bindActionCreators} from "redux";
import { connect }          from "react-redux";

import { fetchRegions, changeRegion, toggleRegion } from "./../../../actions/regions";

import "./SearchBar.css"

const RegionSelector = ({regions, visible, onClick}) => {

  if (!visible) return null;

  let region = lodash.map(regions, (region, name) => {
    return <li key={name} onClick={(e) => onClick(region)} id={region.Status}>{region.Name}</li>
  })

  return (
    <div className="region">
      {region}
    </div>
  )

}

class SearchBar extends React.Component {

  componentWillMount() {
    if (this.props.regionStatus !== "loaded") {
      this.props.fetchRegions();
    }
  }

  render() {

    const { 
      changeRegion,
      toggleRegion,
      // onSearch, 
      

      placeholder, 

      region,
      regions, 
      // recentlySearched,
      // regionStatus,
      // regionMessage,
      openMenu,
    } = this.props;


    return (
    <div className="searchbar">
      <div className="wrap">
        <form className="searchwrap">

          <input
            type="text"
            className="search"
            placeholder={placeholder}
            required
          />

          <div className="region_input" onClick={toggleRegion}>{region.Tag}</div>

          <RegionSelector regions={regions} onClick={changeRegion} visible={openMenu} />
          <button> <i className="fa fa-search" /></button>
        </form>

        <div className="recent-searchs" /> </div>
    </div>
    )
  }
}

const mapStateToProps = state => {

    // region,
    // openMenu,
    // recentlySearched,
    // regions,
    // regionStatus,
    // regionMessage

  return {
    ...state.regions
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchRegions,
      changeRegion,
      toggleRegion
    },
    dispatch
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);
