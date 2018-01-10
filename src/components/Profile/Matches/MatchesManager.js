import React from "react";
import Match from "./Match";

import _isEqual from "lodash/isEqual";

import ErrorScreen from "../../common/ErrorScreen";

import { SkeletonPayload } from "../../common/Skeleton";

import {fetchPlayerMatches, setPlayerMatches} from "./../../../actions/player";

import {bindActionCreators} from "redux";
import { connect }          from "react-redux";
import { Adsense }          from "../../common/Ads";

const MATCHES_PER_PAGE = 7;
const AD_EVERY = 9;

class MatchManager extends React.Component {

  componentWillReceiveProps(nextProps) {
    const nextPlayer = nextProps.player;
    const nextFilters = nextProps.filters;

    const {player, filters} = this.props;
    if (nextPlayer === "") return;

    if (player === nextPlayer
    && _isEqual(filters, nextFilters)) return;
    else {
      this.props.setPlayerMatches(0, {});
      this.props.fetchPlayerMatches(nextPlayer, 0, nextFilters);
    }
  }

  viewMore = (e) => {
    if (e.target.id === "disabled") return;
    const {currentPage, name, filters} = this.props;
    return this.props.fetchPlayerMatches(name, currentPage + 1, filters);
  }

  viewLess = (e) => {
    if (e.target.id === "disabled") return;
    const {currentPage, playerMatches} = this.props;
    let newPage = currentPage - 1;
    let newPlayerMatches = {...playerMatches};
    delete newPlayerMatches[currentPage];

    return this.props.setPlayerMatches(newPage, newPlayerMatches);
  }


  render() {
    let {playerMatches: pages, currentPage} = this.props;

    const content  = [];

    let viewLessDisabled = (currentPage === 0)
    let buttonsDisabled = false;
    let done = false;
    let adCount = 0;

    for (const i in pages) {

      let page = pages[i];
      let matches = (page.status === "loaded") ? page.payload : SkeletonPayload(MATCHES_PER_PAGE);

      if (page.status !== "loaded") buttonsDisabled = true;
      if (matches.length === 0) {
        buttonsDisabled = true;
        done = (pages.length > 1);
      }

      if (page.status === "error" && !done) {
        content.push(<ErrorScreen key="error" width="100%" boxed message="There was an error while loading the matches." />);
      }
      else if (done) {
        content.push(<ErrorScreen key="error" width="100%" boxed message="No matches found" />);
      }
      else {
        for (const index in matches) {
          let match = matches[index];
          content.push(<Match key={match.id || index} payload={match} status={page.status}/>);
          if (++adCount % AD_EVERY === 0) {
            content.push(<Adsense key={`Adsense-Key-${adCount}`} />)
          };
        }

      }
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
    ...state.playerMatches,
    player: state.playerStats.name
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MatchManager);