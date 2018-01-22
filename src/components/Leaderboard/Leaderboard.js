import React    from "react";
import Helmet   from "react-helmet";
import _forEach from "lodash/forEach";

import {fetchLeaderboard} from "./../../actions/api";
import {SkeletonPayload} from "./../common/Skeleton";
import ErrorScreen from "./../common/ErrorScreen";

import LeadMember from "./LeadMember";

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
};

class Leaderboard extends React.Component {

  initialPage = () => (
    {
          status: "loading",
          payload: SkeletonPayload(PER_PAGE)
    }
  )

  initialState = () => {
    return {
      mode: LEADERBOARD_TYPES[0],
      region: "all",
      pages: [this.initialPage()]
    }
  }

  state = this.initialState();

  changeRegion = (region) => (e) => {
    if (this.state.region === region) return;
    // We have to reset all the pages
    this.setState({
      region,
      pages: [this.initialPage()]
    }, () => this.fetch(0))
  }

  changeMode = (mode) => (e) => {
    if (this.state.mode === mode) return;
    // We have to reset all the pages
    this.setState({
      mode,
      pages: [this.initialPage()]
    }, () => this.fetch(0))
  }

  componentDidMount() {
    this.fetch(0);
  }

  componentWillUnmount() {
    this.cancel();
  }

  async fetch(page) {
    let {mode, region} = this.state;
    const server_region = (region === "sea") ? "sg" : region;
    const offset = page * PER_PAGE;
    const limit = PER_PAGE;

    // Create a loading page
    this.setState(modifyPage(page, this.initialPage()));

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

  render() {

    const {pages} = this.state;
    let content = [];

    let anyError   = pages.find(s => s.status === "error"  );
    let anyLoading = pages.find(s => s.status === "loading");
    let anyEmpty   = pages.find(s => s.payload.length < 1  );
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
    };

    return (
      <React.Fragment>
        <Helmet>
          <title>Leaderboards</title>
        </Helmet>
        <div className="wrap Leaderboard-wrap">
          <div className="Leaderboard-box">
            <div className="Leaderboard-Filters">
              <div className="Leaderboard-Filters-category">
                <h2>Region</h2>
                {
                  REGIONS.map(region => <div key={region} 
                    onClick={this.changeRegion(region)} 
                    className={this.state.region === region ? "active" : ""}>
                    {region}</div>)
                }
              </div>

              <div className="Leaderboard-Filters-category">
                <h2>Game Mode</h2>
                {
                  LEADERBOARD_TYPES.map(type => <div key={type.label} 
                    onClick={this.changeMode(type)}
                    className={this.state.mode.label === type.label ? "active" : ""}>
                    {type.label}</div>)
                }
              </div>
            </div>
            
            <div className="Leaderboard-Members">
              {content}
            </div>
            <div className="Leaderboard-buttons">
              <div className="button" onClick={this.prevPage} id={prevDisabled ? "disabled" : ""}>View Less</div>
              <div className="button" onClick={this.nextPage} id={nextDisabled ? "disabled" : ""}>View More</div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Leaderboard;