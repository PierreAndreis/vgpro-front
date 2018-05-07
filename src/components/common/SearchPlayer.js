import React from "react";
import ReactGA from "react-ga";
import { translate } from 'react-i18next';

import { withRouter } from 'react-router';

import { bindActionCreators }     from "redux";
import { connect }                from "react-redux";
import { lookupPlayer }           from "./../../actions/api";
import { addRecent }              from "./../../actions/user";

import SearchCompact from "./SearchPlayer/SearchCompact";
import SearchMain    from "./SearchPlayer/SearchMain";

import Utils from "../../utils";

const changeStatus = (instance, status) => {
  clearTimeout(instance.timeout);

  if (status === "error") {
     instance.setState({status: "error"});
     return instance.timeout = setTimeout(() => {
       instance.setState({status: "ready"})
     }, 2000)
  }
   return instance.setState({status: status});
}

class SearchPlayer extends React.Component {
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
  
  search = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    
    const playerName = this.state.playerField;

    changeStatus(this, "loading");

    lookupPlayer(playerName).then((result) => {

      if (result && result.name) {
        ReactGA.event({
          category: 'Search',
          action: `Player Found`,
          label: result.name,
        });

        if ( !this.props.recents.includes(result.name) 
          && !this.props.favorites.includes(result.name) ) {
          this.props.addRecent(result.name);
        }

        changeStatus(this, "ready");
        return this.props.history.push(Utils.goToPlayer(result.name));
      }
      ReactGA.event({
        category: 'Search',
        action: `Player Not Found`,
        label: playerName,
      });
      changeStatus(this, "error");
    });
  }

  render() {
    const {mode, t} = this.props;


    const props = {
      onChange:       this.changeField,
      value:          this.state.playerField,
      onSearch:       this.search,
      status:         this.state.status,
      placeholder:    t('search.placeholder')
    }

    if (mode === "compact") return (<SearchCompact {...props} />);
    else                    return (<SearchMain    {...props} />);
  }
}

const mapStateToProps = state => {

  return {
    ...state.user
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      addRecent,
    },
    dispatch
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(translate()(withRouter(SearchPlayer)));
