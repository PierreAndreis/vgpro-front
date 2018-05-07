import React from "react";
import { Helmet } from "react-helmet";
import ReactGA from "react-ga";
import { Adsense } from "./../common/Ads";

import ErrorScreen from "../common/ErrorScreen";

import TimeAgo from "../../i18n/timeAgo";
import MatchStats from "./Overview";

import Sidebar from "./Sidebar";
import ProfileFilters from "./ProfileFilters";

import MatchesManager from "./MatchesManager";

import { setPlayer, changeFilters } from "./../../actions/player";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as Styled from "./Profile.style";

class Profile extends React.Component {

  componentWillReceiveProps(nextProps) {

    const nextMatch = nextProps.match;
    const nextPlayer = nextMatch.params.player;

    const { match } = this.props;
    const { player } = match.params;

    if (player === nextPlayer) return;
    else this.props.setPlayer(nextPlayer);
  }

  componentDidMount() {
    const { match } = this.props;
    const { player } = match.params;
    this.props.setPlayer(player);
  }

  changeFilters = (filter) => {

    ReactGA.event({
      category: 'Players',
      action: 'Change Filters',
      label: `${filter.gameMode}/${filter.season}`,
    });

    const { match } = this.props;
    const { player } = match.params;
    this.props.changeFilters(player, filter);
  }

  render() {
    const { t } = this.props;
    const { match, player, status, filters } = this.props;
    const { player: playerName } = match.params;

    let title = (
      <Helmet>
        <title>{playerName}</title>
        <meta name="robots" content="index, nofollow" />
        <meta name="description" content={`${player} Stats on Vainglory.`} />
      </Helmet>
    );

    let FoundButNoMatch = (
      status !== "loading"
      && player.stats
      && player.id
      && !player.name
      && player.stats.errors
    )

    if (FoundButNoMatch) {
      return (
        <div style={{marginTop: "5%"}}>
          {title}
          <ErrorScreen message={
            <p>{t('profile.foundButNoMatches', {name: playerName})}
            <br /> {t('general.tryAgain')}
            <br /> {t('general.lastUpdated')} <TimeAgo date={player.lastCache} />
            </p>}
            boxed />
        </div>
      )
    }

    if (!player.lastCache && status === "loaded") {
      return (
        <div style={{marginTop: "5%"}}>
          {title}
          <ErrorScreen message={
            <p>{t('profile.notFound', {name: playerName})}
          <br /> {t('general.tryAgain')}
          </p>} boxed />
        </div>
      )
    };

    return (
      <React.Fragment>
        {title}
        <ProfileFilters onChange={this.changeFilters} />
        <Styled.Wrap>

          <Styled.Sidebar>
            <Sidebar t={t} />
          </Styled.Sidebar>

          <Styled.Main>
            <MatchStats t={t} />
            <Adsense />
            <MatchesManager t={t} filters={filters} />
            <Adsense />
          </Styled.Main>

        </Styled.Wrap>
      </React.Fragment>
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
)(Profile);

