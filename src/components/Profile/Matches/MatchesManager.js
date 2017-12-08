import React from "react";
import { withRouter } from 'react-router';
import Match from "./Match";

import { SkeletonPayload } from "../../common/Skeleton";

import {fetchPlayerMatches} from "./../../../actions/player";

import {bindActionCreators} from "redux";
import { connect }          from "react-redux";

class MatchManager extends React.Component {

  componentWillReceiveProps(nextProps) {
    const nextMatch = nextProps.match;
    const nextPlayer = nextMatch.params.player;

    const {match} = this.props;
    const {player} = match.params;

    if (player === nextPlayer) return;
    else  this.props.fetchPlayerMatches(nextPlayer, "");
  }

  componentDidMount() {
    const {match} = this.props;
    const {player} = match.params;
    this.props.fetchPlayerMatches(player, "");
  }

  render() {
    let {playerMatches: matches, status} = this.props;

    if (status === "loading") matches = SkeletonPayload(5);

    const content  = [];

    matches.forEach((match, index) => {
      content.push(<Match key={match.id || index} payload={match} status={status}/>);
    })

    return (<div>{content}</div>)

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
      fetchPlayerMatches
    },
    dispatch
  )
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(MatchManager));