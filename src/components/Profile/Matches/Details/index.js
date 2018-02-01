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
  constructor(props) {
    super(props);

    this.state = {
      status: "loading",
      telemetry: null,
      details: this.props.matchDetails,
      tab: Tabs[0],
    }
  }

  /* dev note -- remove before merge
  added this method to MatchDetails class because props can be
  unreliable with state changes. 
  I'm not too sure, would appreciate clarification
  whether we need this or not */
  componentWillReceiveProps(nextProps) {
    this.setState({
      details: this.nextProps.matchDetails
    });
  }

  componentDidMount() {
    this.fetch();
  }

  fetch() {
    const {matchId, region} = this.props;

    this.setState({
      status: "loaded",
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