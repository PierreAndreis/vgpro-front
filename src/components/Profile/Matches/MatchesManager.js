import React from "react";
import { withRouter } from 'react-router';
import Match from "./Match";

import { SkeletonPayload } from "../../common/Skeleton";

import {fetchPlayerMatches, removePlayersMatches} from "./../../../actions/player";

import {bindActionCreators} from "redux";
import { connect }          from "react-redux";

const MATCHES_PER_PAGE = 5;

class MatchManager extends React.Component {


  componentWillReceiveProps(nextProps) {
    const nextMatch = nextProps.match;
    const nextPlayer = nextMatch.params.player;

    const {match} = this.props;
    const {player} = match.params;

    if (player === nextPlayer) return;
    else  this.props.fetchPlayerMatches(nextPlayer, 0);
  }

  componentDidMount() {
    const {match} = this.props;
    const {player} = match.params;
    this.props.fetchPlayerMatches(player, 0);
  }

  viewMore = () => {
    const {currentPage, name} = this.props;
    return this.props.fetchPlayerMatches(name, currentPage + 1);
  }

  viewLess = () => {
    const {name} = this.props;
    return this.props.removePlayersMatches(name, 1);
  }


  render() {
    let {playerMatches: pages} = this.props;

    const content  = [];

    for (const i in pages) {

      let page = pages[i];
      let matches = (page.status === "loaded") ? page.payload : SkeletonPayload(MATCHES_PER_PAGE);

      matches.forEach((match, index) => {
        content.push(<Match key={match.id || index} payload={match} status={page.status}/>)
      })
    };

    return (
    <div>
      {content}
      <div className="Matches_Buttons">
        {/* <div className="button" onClick={this.viewLess}>View Less</div> */}
        <div className="button" onClick={this.viewMore}>View More</div>
      </div>
    </div>)

  }
}

const mapStateToProps = state => {

  return {
    ...state.playerMatches
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchPlayerMatches,
      removePlayersMatches,
    },
    dispatch
  )
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(MatchManager));