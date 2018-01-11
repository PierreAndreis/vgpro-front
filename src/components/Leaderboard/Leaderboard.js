import React    from "react";
import Helmet   from "react-helmet";
import _forEach from "lodash/forEach";

import {fetchLeaderboard} from "./../../actions/api";

import HalfPieChart from "./../common/Charts/PieChart";
import {SkeletonPayload, SkeletonWrapper} from "./../common/Skeleton";
import AssetLoader from "./../common/AssetLoader";
import ErrorScreen from "./../common/ErrorScreen";
import Box         from "./../common/Box";
import {KDA}       from "./../common/ColoredValues";

import {LEADERBOARD_TYPES, REGIONS} from "./../../config/constants";

import Utils from "./../../utils";

import "./Leaderboard.css";

const kpGraph = [
  { value: 90, fill: 'url(#orange)' }
];

const LeadMember = ({status, data}) => (
  <div className="Leaderboard-Member">

    <div className="Leaderboard-Member-Position">
      <SkeletonWrapper status={status} width="20px" height="35px">
        { () => data.position}
      </SkeletonWrapper>
    </div>

    <SkeletonWrapper status={status} width="35px" height="45px">
      {() => <AssetLoader type="tiers" name={data.tier} className="Leaderboard-Member-Tier" />}
    </SkeletonWrapper>

    <div className="Leaderboard-Member-Info">
      <div className="Leaderboard-Member-Name">
        <SkeletonWrapper status={status} >
          {() => data.name}
        </SkeletonWrapper>
      </div>
      <span>
        <SkeletonWrapper status={status} width="35px">
          {() => <span>KDA <KDA kda={data.kda}/></span>}
        </SkeletonWrapper>
      </span>
    </div>

    <div className="Leaderboard-Member-Score">
      <div>1323</div>
      <span>Points</span>
    </div>

    <div className="Leaderboard-Member-Stats">
      <div className="Leaderboard-Member-Chart">
        <HalfPieChart width={55} data={kpGraph}>
          <span>32%</span>
        </HalfPieChart>
      </div>
      <div className="Leaderboard-Member-Rates">
        <div><span className="Rate-Win">W</span>1500</div>
        <div><span className="Rate-Loss">L</span>250</div>
      </div>
    </div>

    <div className="Leaderboard-Member-Heroes">
      <AssetLoader type="heroes" name="Catherine" className="Leaderboard-Member-Hero" />
      <AssetLoader type="heroes" name="Catherine" className="Leaderboard-Member-Hero" />
      <AssetLoader type="heroes" name="Catherine" className="Leaderboard-Member-Hero" />
      <AssetLoader type="heroes" name="" className="Leaderboard-Member-Hero" />
      <AssetLoader type="heroes" name="" className="Leaderboard-Member-Hero" />
    </div>

  </div>
)

class Leaderboard extends React.Component {

  constructor() {
    super();

    this.state = {
      status: "loading",
      mode: LEADERBOARD_TYPES[0],
      region: "all", 
      payload: SkeletonPayload(10)
    }

  }

  changeRegion = (region) => (e) => {
    if (this.state.region === region) return;
    this.setState({
      region: region,
    }, this.fetch)
  }

  changeMode = (mode) => (e) => {
    if (this.state.mode === mode) return;
    this.setState({
        mode,
    }, this.fetch)
  }

  componentDidMount() {
    this.fetch();
  }

  async fetch() {
    
    let {mode, region} = this.state;

    const server_region = (region === "sea") ? "sg" : region;

    this.setState({
      status: "loading"
    });

    this.cancel = Utils.makeCancelable(
      fetchLeaderboard(mode.value, server_region, {limit: 10, offset: 1000}),
      (res) => this.setState({ status: "loaded", payload: res }),
      (e) => this.setState({ status: "error", payload: e })
    );
  }

  componentWillUnmount() {
    this.cancel();
  }

  render() {

    const {payload, status} = this.state;
    let content = [];

    if (status === "error" || !payload) content = <ErrorScreen err={payload} />
    else {  
      _forEach(payload, (each, index) => {
        content.push(<LeadMember key={`${index} - ${each.name}`} status={status} data={each} mode={this.state.mode.value} />);
        index++;
      });
    }

    return (
      <React.Fragment>
        <Helmet>
          <title>Leaderboards</title>
        </Helmet>
        <div className="wrap Leaderboard-wrap">
          <Box.wrap className="Leaderboard-box">
            <div className="Leaderboard-filters" />
            <Box.body>
              <div className="Leaderboard-Members">
                {content}
              
              </div>
            </Box.body>
          </Box.wrap>
        </div>
      
      </React.Fragment>
    )
  }
}

export default Leaderboard;