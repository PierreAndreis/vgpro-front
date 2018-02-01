import React          from "react";
import {Helmet}       from "react-helmet";
import ReactGA        from "react-ga";
import {Adsense}           from "./../common/Ads";
import { withRouter } from 'react-router';

import ErrorScreen from "../common/ErrorScreen";

import TimeAgo from "../../i18n/timeAgo";
import MatchStats from "./MatchStats/MatchStats";

import Sidebar from "./Sidebar";
import ProfileFilters from "./ProfileFilters";

import MatchesManager from "./MatchesManager";

import {setPlayer, changeFilters} from "./../../actions/player";

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
    else this.props.setPlayer(nextPlayer);
  }

  componentDidMount() {
    const {match} = this.props;
    const {player} = match.params;
    this.props.setPlayer(player);
  }

  changeFilters = (filter) => {
    
    ReactGA.event({
      category: 'Players',
      action: 'Change Filters',
      label: `${filter.gameMode}/${filter.season}`,
    });

    const {match} = this.props;
    const {player} = match.params;
    this.props.changeFilters(player, filter);
  }

  render() {
    const {t} = this.props;
    const {match, playerStats, status, filters} = this.props;
    const {player} = match.params;

    let title = (
      <Helmet>
        <title>{player}</title>
        <meta name="ROBOTS" content="INDEX, NOFOLLOW" />
        <meta name="description" content={`${player} Stats on Vainglory.`} />
      </Helmet>
    );

    let FoundButNoMatch = (
      status !== "loading" 
    && playerStats.stats 
    && playerStats.id 
    && !playerStats.name
    && playerStats.stats.errors
    )

    if (FoundButNoMatch) {
      return (
      <div>
      {title}
      <ErrorScreen message={
        <p>{player} was found but hasn't played a match in a while 
        <br /> Please try again later.
        <br /> Last update: <TimeAgo date={playerStats.lastCache} />
        </p>} boxed/>
      </div>
      )
    }

    if (!playerStats.lastCache && status === "loaded") {
      return (
        <div>
        {title}
        <ErrorScreen message={
          <p>{player} was not found.
          <br /> Please try again later.
          </p>} boxed/>
        </div>
      )
    };

    return (
      <div>
        {title}
        <ProfileFilters onChange={this.changeFilters} />
        <div className="wrap Profile-wrap">
          <div className="Profile__Sidebar">
            <Sidebar t={t} />
          </div>
          <div className="Profile__Main">
            <MatchStats  t={t} />
            <Adsense />
            <MatchesManager t={t} filters={filters} />
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
      changeFilters,
      setPlayer
    },
    dispatch
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Profile));

