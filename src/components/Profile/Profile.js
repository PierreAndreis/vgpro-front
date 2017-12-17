import React from "react";
import { withRouter } from 'react-router';

// import Header    from "./Header/ProfileHeader";
import MatchStats from "./MatchStats/MatchStats";

import Sidebar from "./Sidebar";
import MatchFilter from "./MatchFilter";

import MatchesManager from "./Matches/MatchesManager";

import {fetchPlayerStats} from "./../../actions/player";

import {bindActionCreators} from "redux";
import { connect }          from "react-redux";

import "./Profile.css";

class Profile extends React.Component {


  componentWillReceiveProps(nextProps) {

    const nextMatch = nextProps.match;
    const nextPlayer = nextMatch.params.player;

    const {match} = this.props;
    const {player} = match.params;

    if (player === nextPlayer) return;
    else  this.props.fetchPlayerStats(nextPlayer);
  }

  componentDidMount() {
    const {match} = this.props;
    const {player} = match.params;
    this.props.fetchPlayerStats(player);
  }

  render() {
    const {t} = this.props;

    return (
      <div>
        {/* <Header t={t} /> */}
        <div className="Profile-ads" />
        <div className="wrap Profile-wrap">

          <div className="Profile__Sidebar">
          <Sidebar t={t} />
          </div>
          <div className="Profile__Main">
            <MatchStats t={t} />
            <MatchFilter t={t} />

            <MatchesManager t={t} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {

  return {
    ...state.playerStats
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchPlayerStats
    },
    dispatch
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Profile));

