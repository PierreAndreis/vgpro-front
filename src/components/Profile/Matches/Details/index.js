import React from "react";

import "./Details.css";
import {fetchMatchDetails, fetchMatchTelemetry} from "./../../../../actions/api";

import Utils from "../../../../utils";

import MatchOverview from "./Overview";

class MatchDetails extends React.Component {

  state = {
    status: "loading",
    telemetry: null,
    details: null,
  }

  componentDidMount() {
    this.fetch();
  }

  fetch() {
    const {matchId, region} = this.props;

    this.setState({
      status: "loading",
      details: null,
      telemetry: null,
    });

    this.cancelDetails = Utils.makeCancelable(
      fetchMatchDetails(matchId, region),
      (res) => this.setState({status: "loaded", details: res})
    )

    this.cancelTelemetry = Utils.makeCancelable(
      fetchMatchTelemetry(matchId, region),
      (res) => this.setState({telemetry: res})
    )
  }

  componentWillUnmount() {
    this.cancelDetails();
    this.cancelTelemetry();
  }

  render() {
    
    const {
      telemetry,
      status,
      details
    } = this.state;

    let content = null;
    let payload = [];

    if (status === "loading") payload = [{}, {}]
    else {

      // TODO: More tabs (?)
      const {players, rosters} = details;

      payload = rosters.map(r => {
        const ps = players.filter(p => p.side === r.side);
        return {
          ...r,
          players: ps
        }
      });
    }

    content = (<MatchOverview status={status} players={payload} telemetry={telemetry} />)
   

    return (
      <div className="MatchDetails animated slideInDown">
        {content}
      </div>
    )
  }
}

export default MatchDetails;