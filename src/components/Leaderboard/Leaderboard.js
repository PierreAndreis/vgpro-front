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
import {VPR}      from "./../common/Ratings";

import {LEADERBOARD_TYPES, REGIONS} from "./../../config/constants";

import Utils from "./../../utils";

import "./Leaderboard.css";

const PER_PAGE = 10;

// Small helper to modify a certain page easily
const modifyPage = (page, newState) => (prevState) => {
  const newPage = [...prevState.pages];
  newPage[page] = newState;

  return {
    pages: newPage
  }
}


const LeadMember = ({status, data}) => {

  // const winRate = (data.winRate) ? parseFloat(data.winRate) : 0;

  let graph;

  if (data && data.games && data.wins) {
    graph = [
      { value: data.wins, fill: 'url(#blue)'},
      { value: data.games - data.wins, fill: 'url(#red)'}
    ]
  }

  let heroes = [];

  for (let i = 0; i < 5; i++) {
    const hero = data && data.topHeroes && data.topHeroes[i];
    heroes.push(<AssetLoader key={i} type="heroes" name={hero} className="Leaderboard-Member-Hero" />)
  }

  return (
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
        <SkeletonWrapper status={status} width="45px">
          {() => <div><VPR value={data.points} /></div>}
        </SkeletonWrapper>
        <span>Points</span>
      </div>

      <div className="Leaderboard-Member-Stats">
        <div className="Leaderboard-Member-Chart">
        <SkeletonWrapper status={status} width="55px" height="55px" borderRadius="50%">
          {() => (
            <HalfPieChart width={55} data={graph}>
              <span>{data.winRate}</span>
            </HalfPieChart>
          )}
        </SkeletonWrapper>
        </div>
        <div className="Leaderboard-Member-Rates">

          <div>
            <span className="Rate-Win">W</span>
            <SkeletonWrapper status={status} width="25px" height="10px">
              {() => data.wins}
            </SkeletonWrapper>
          </div>

          <div>
            <span className="Rate-Loss">L</span>
            <SkeletonWrapper status={status} width="25px" height="10px">
              {() => data.games - data.wins}
            </SkeletonWrapper>
          </div>
        </div>

      </div>

      <div className="Leaderboard-Member-Heroes">
        {heroes}
      </div>

    </div>
  );
}

class Leaderboard extends React.Component {

  initialState = () => {
    return {
      mode: LEADERBOARD_TYPES[0],
      region: "all",
      pages: [
        {
          status: "loading",
          payload: SkeletonPayload(PER_PAGE)
        }
      ]
    }
  }

  state = this.initialState();

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
    this.setState(this.initialState());
    this.fetch(0);
  }

  async fetch(page) {
    let {mode, region} = this.state;
    const server_region = (region === "sea") ? "sg" : region;
    const offset = page * PER_PAGE;
    const limit = PER_PAGE;

    this.setState(modifyPage(page, {
        status: "loading",
        payload: SkeletonPayload(PER_PAGE)
      })
    );
    

    this.cancel = Utils.makeCancelable(
      fetchLeaderboard(mode.value, server_region, {limit, offset}),
      (res) => this.setState(modifyPage(page, {status: "ready", payload: res})),
      (e) => this.setState(modifyPage(page, {status: "error", payload: e}))
    );
  }

  nextPage = (e) => {
    if (e.target.id === "disabled") return;
    const {pages} = this.state;
    const nextPage = pages.length;
    this.fetch(nextPage);
  }

  prevPage = (e) => {
    if (e.target.id === "disabled") return;
    this.setState((prevState) => {
      prevState.pages.pop();
      return prevState;
    })
  }

  componentWillUnmount() {
    this.cancel();
  }

  render() {

    const {pages} = this.state;
    let content = [];

    let anyError   = pages.find((s) => s.status === "error");
    let anyLoading = pages.find(s => s.status === "loading");
    let anyEmpty   = pages.find(s => s.payload.length < 1);
    let onePage    = pages.length === 1;

    let nextDisabled = anyError || anyLoading || anyEmpty;
    let prevDisabled = anyError || anyLoading || onePage;


    if (anyError) content = <ErrorScreen err={anyError.payload} />
    else {  
      _forEach(pages, (page) => {
        page.payload.forEach((each, index) => {
          content.push(
            <LeadMember key={`${index} - ${each.name}`} 
                        status={page.status} 
                        data={each} 
                        mode={this.state.mode.value} 
                        />);
        });
      });
    }

    return (
      <React.Fragment>
        <Helmet>
          <title>Leaderboards</title>
        </Helmet>
        <div className="wrap Leaderboard-wrap">
          <Box.wrap className="Leaderboard-box">
            <Box.title>Lul</Box.title>
            <Box.body className="Leaderboard-body">
              <div className="Leaderboard-Members">
                {content}
              </div>
            </Box.body>
            <Box.action>
              <div className="button" onClick={this.prevPage} id={prevDisabled ? "disabled" : ""}>View Less</div>
              <div className="button" onClick={this.nextPage} id={nextDisabled ? "disabled" : ""}>View More</div>
            </Box.action>
          </Box.wrap>
        </div>
      
      </React.Fragment>
    )
  }
}

export default Leaderboard;