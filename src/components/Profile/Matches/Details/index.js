import React from "react";

import "./Details.css";
import {fetchMatchDetails, fetchMatchTelemetry} from "./../../../../actions/api";

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
      telemetry: null,
    });

    fetchMatchDetails(matchId, region)
      .then(res => {
        this.setState({
          status: "loaded",
          details: res,
        })
      })

    fetchMatchTelemetry(matchId, region)
      .then(res => {
        this.setState({
          telemetry: res,
        })
      });
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