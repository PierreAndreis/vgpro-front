import React from "react";
import { Trans, translate } from "react-i18next";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import _isEqual from "lodash/isEqual";

import Match from "./../common/Match/Match";
import ErrorScreen from "./../common/ErrorScreen";
import { SkeletonPayload } from "./../common/Skeleton";
import { Adsense } from "./../common/Ads";
import { BoxButton } from "../common/Box";

import {
  fetchPlayerMatches,
  setPlayerMatches,
} from "./../../actions/player";

const MATCHES_PER_PAGE = 10;
const AD_EVERY = 9;

class MatchManager extends React.Component {
  componentWillReceiveProps(nextProps) {
    const nextPlayer = nextProps.player;
    const nextFilters = nextProps.filters;

    const { player, filters } = this.props;
    if (nextPlayer === "") {
      // small hack to turn status to loading whenever changing player
      // the reason is that nextPlayer turns into "" before turning into the player name
      // that's because we are doing a /player/:name/find
      if (
        this.props.playerMatches[0] &&
        this.props.playerMatches[0].status !== "loading"
      ) {
        this.props.setPlayerMatches(0, { 0: { status: "loading" } });
      }
      return;
    }

    if (player === nextPlayer && _isEqual(filters, nextFilters)) return;
    else {
      this.props.setPlayerMatches(0, {});
      this.props.fetchPlayerMatches(nextPlayer, 0, nextFilters);
    }
  }

  viewMore = e => {
    if (e.target.id === "disabled") return;
    const { currentPage, name, filters } = this.props;
    return this.props.fetchPlayerMatches(name, currentPage + 1, filters);
  };

  viewLess = e => {
    if (e.target.id === "disabled") return;
    const { currentPage, playerMatches } = this.props;
    let newPage = currentPage - 1;
    let newPlayerMatches = { ...playerMatches };
    delete newPlayerMatches[currentPage];

    return this.props.setPlayerMatches(newPage, newPlayerMatches);
  };

  render() {
    let { playerMatches: pages, currentPage } = this.props;

    const content = [];

    let viewLessDisabled = currentPage === 0;
    let buttonsDisabled = false;
    let done = false;
    let adCount = 0;

    for (const i in pages) {
      let page = pages[i];
      let matches =
        page.status === "loaded"
          ? page.payload
          : SkeletonPayload(MATCHES_PER_PAGE);

      if (page.status !== "loaded") buttonsDisabled = true;

      if (matches.length === 0) {
        buttonsDisabled = true;
      }

      if (page.status === "error") {
        content.push(<ErrorScreen key="error" width="100%" boxed />);
      } else {
        for (const index in matches) {
          let match = matches[index];
          content.push(
            <Match
              key={match.id || index}
              payload={match}
              status={page.status}
            />
          );
          if (++adCount % AD_EVERY === 0) {
            content.push(<Adsense key={`Adsense-Key-${adCount}`} />);
          }
        }

        if (!done && (page && page.payload)) {
          done = page.payload.length !== MATCHES_PER_PAGE;
          buttonsDisabled = buttonsDisabled || done;
          if (page.payload < 1)
            content.push(
              <ErrorScreen
                key="error"
                width="100%"
                boxed
                message={this.props.t("general.noMatches")}
              />
            );
        }
      }
    }

    return (
      <div>
        {content}
        <div className="Matches_Buttons">
          <BoxButton
            disabled={viewLessDisabled || buttonsDisabled}
            onClick={this.viewLess}
          >
            <Trans i18nKey="general.ViewLess" />
          </BoxButton>
          <BoxButton disabled={buttonsDisabled} onClick={this.viewMore}>
            <Trans i18nKey="general.ViewMore" />
          </BoxButton>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state.playerMatches,
    player: state.playerStats.name,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchPlayerMatches,
      setPlayerMatches,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(
  translate()(MatchManager)
);
