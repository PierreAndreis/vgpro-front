import React from "react";
import { withRouter } from 'react-router';
import Match from "./Match";

import { SkeletonPayload } from "../../common/Skeleton";

import {fetchPlayerMatches, setPlayerMatches} from "./../../../actions/player";

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
    else {
      this.props.setPlayerMatches(0, {})
      this.props.fetchPlayerMatches(nextPlayer, 0);
    }
  }

  componentDidMount() {
    const {match} = this.props;
    const {player} = match.params;
    this.props.setPlayerMatches(0, {})
    this.props.fetchPlayerMatches(player, 0);
  }

  viewMore = () => {
    const {currentPage, name} = this.props;
    return this.props.fetchPlayerMatches(name, currentPage + 1);
  }

  viewLess = () => {
    const {currentPage, playerMatches} = this.props;
    let newPage = currentPage - 1;
    let newPlayerMatches = {...playerMatches};
    delete newPlayerMatches[currentPage];

    return this.props.setPlayerMatches(newPage, newPlayerMatches);
  }


  render() {
    let {playerMatches: pages, currentPage} = this.props;

    const content  = [];
    let buttons;

    let viewLessDisabled = (currentPage === 0)
    let buttonsDisabled = false;
    let done = false;

    for (const i in pages) {

      let page = pages[i];
      let matches = (page.status === "loaded") ? page.payload : SkeletonPayload(MATCHES_PER_PAGE);

      if (page.status !== "loaded") buttonsDisabled = true;
      if (matches.length === 0) {
        buttonsDisabled = true;
        done = true;
      }

      matches.forEach((match, index) => {
        content.push(<Match key={match.id || index} payload={match} status={page.status}/>)
      })
    };


    return (
    <div>
      {content}
      <div className="Matches_Buttons">
        <div className="button" 
             id={(viewLessDisabled || buttonsDisabled) ? "disabled" : undefined} 
             onClick={this.viewLess}>View Less</div>
        <div className="button" 
            id={(buttonsDisabled) ? "disabled" : undefined} 
             onClick={this.viewMore}>View More</div>
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
      setPlayerMatches,
    },
    dispatch
  )
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(MatchManager));