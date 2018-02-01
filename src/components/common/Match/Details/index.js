import React from "react";

import AsyncContainer from "./../../AsyncContainer";
import { fetchMatchTelemetry } from "./../../../../actions/api";

import Utils from "../../../../utils";

import "./Details.css";

const Tabs = [
  {
    name: "Overview",
    component: AsyncContainer(() => import("./Overview"))
  },
  {
    name: "Builds",
    component: AsyncContainer(() => import("./Builds"))
  }
];

class MatchDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      telemetry: null,
      tab: Tabs[0],
    }
  }

  componentDidMount() {
    this.fetch();
  }

  fetch() {
    const {matchId, region} = this.props;

    this.setState({
      telemetry: null
    });

    this.cancelTelemetry = Utils.makeCancelable(
      fetchMatchTelemetry(matchId, region),
      (res) => this.setState({
        telemetry: res
      })
    )
  }

  componentWillUnmount() {
    this.cancelTelemetry();
  }

  changeTab = (tab) => (e) => {
    if (this.state.tab === tab) return;
    this.setState({
      tab: tab
    })
  }

  render() {
    
    const {
      telemetry,
      tab
    } = this.state;

    let { 
      playerName, 
      status, 
      details,
      gameMode
    } = this.props;

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
        gameMode,
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