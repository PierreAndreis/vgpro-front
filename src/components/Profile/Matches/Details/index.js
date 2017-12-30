import React from "react";

import "./Details.css";
import AsyncContainer from "./../../../common/AsyncContainer";
import {fetchMatchDetails, fetchMatchTelemetry} from "./../../../../actions/api";

import Utils from "../../../../utils";

const Tabs = [
  {
    name: "Overview",
    component: AsyncContainer(() => import("./Overview"))
  },
  {
    name: "Builds",
    component: AsyncContainer(() => import("./Builds"))
  }
]


class MatchDetails extends React.Component {

  state = {
    status: "loading",
    telemetry: null,
    details: null,
    tab: Tabs[0],
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

  changeTab = (tab) => (e) => {
    this.setState({
      tab: tab
    })
  }

  render() {
    
    const {
      telemetry,
      status,
      details,
      tab
    } = this.state;

    let { playerName } = this.props;

    let content = null;
    let payload = [];

    if (status === "loading") payload = [{}, {}]
    else {
      
      const {players, rosters} = details;

      payload = rosters.map(r => {
        const ps = players.filter(p => p.side === r.side);
        return {
          ...r,
          players: ps
        }
      });
    }

    content = React.createElement(
      tab.component,
      {
        status,
        telemetry,
        me: playerName,
        teams: payload
      }
    );
   

    return (
      <div className="MatchDetails animated slideInDown">
        <div className="MatchDetails-Tab">
          {Tabs.map(t => (
            <div key={t.name} 
                 className={(tab.name === t.name && "active") || ""} 
                 onClick={this.changeTab(t)}>{t.name}</div>
          ))}
        </div>
        {content}
      </div>
    )
  }
}

export default MatchDetails;