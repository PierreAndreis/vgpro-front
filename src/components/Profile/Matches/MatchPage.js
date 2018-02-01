import React from "react";
import Match from "./Match"

import Utils from "./../../../utils";

import { fetchMatchDetails } from "./../../../actions/api";

class MatchPage extends React.Component {

  state = {
    status: "loading",
    payload: null,
  };

  componentDidMount() {
    this.fetch();
  }

  componentWillUnmount() {
    this.cancel();
  }

  fetch() {
    const { match } = this.props;
    const { player } = match.params;
    /* Sense we don't want ALL of the user's matches we fetch for this one id */
    this.cancel = Utils.makeCancelable(
      fetchMatchDetails(match.params.matchId, match.params.region),
      res => {
        // Since we are not sending a playerId when making the API request, (as we do when we get match history)
        // we will manually set the correct player as me only if there is a params for the player set
        // otherwise, show any (technically the first in the list)
        let payload = this.findCurrentPlayer(res);
        this.setState({payload, status: "loaded"})
      }),
      err => this.setState({payload: err, status: "error"})
  }

  findCurrentPlayer = (payload) => {
    const { match } = this.props;
    const { player } = match.params;

    let res = payload;
    if (!player) {
      res.players[0].me = true;
      return res;
    }

    for (let i in res.players) {
      if (res.players[i].name === player) {
        res.players[i].me = true;
        break;
      }
    }
    return res;
  }

  render() {
    return (
      <div className="wrap">
        <Match payload={this.state.payload} status={this.state.status} forceOpen={true} />
      </div>
    );
  }
}

export default MatchPage;