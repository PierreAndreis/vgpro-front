import React from "react";
import Helmet from "react-helmet";
import _forEach from "lodash/forEach";

import {BoxButton} from "./../common/Box";

import { fetchLeaderboard } from "./../../actions/api";
import { SkeletonPayload } from "./../common/Skeleton";
import ErrorScreen from "./../common/ErrorScreen";

import LeadMember from "./LeadMember";

import { LEADERBOARD_TYPES, REGIONS } from "./../../config/constants";

import Utils from "./../../utils";

import * as Styled from "./Leaderboard.style";

import Button from "./../common/Button";

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
      pages: [this.initialPage()],
      player: "",
      isPlayer: false
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

  changePlayer = (e) => {
    let value = e.target.value;
    this.setState({
      player: value
    })
  }

  resetPlayer = () => {
    this.setState({
      isPlayer: false,
      player: "",
      page: [this.initialPage()]
    }, this.fetch.bind(this, [0]));
  }

  searchPlayer = (e) => {
    e.preventDefault();
    this.setState({
      pages: [this.initialPage()],
      isPlayer: this.state.player
    }, this.fetch.bind(this, [0]));
  }

  componentDidMount() {
    this.fetch(0);
  }

  componentWillUnmount() {
    this.cancel();
  }

  async fetch(page) {
    let { mode, region } = this.state;
    const server_region = (region === "sea") ? "sg" : region;
    const offset = page * PER_PAGE;
    const limit = PER_PAGE;

    const player = this.state.isPlayer && this.state.player;

    // Create a loading page
    this.setState(modifyPage(page, this.initialPage()));

    this.cancel = Utils.makeCancelable(
      fetchLeaderboard(mode.value, server_region, { player, limit, offset }),
      (res) => this.setState(modifyPage(page, { status: "ready", payload: res })),
      (e) => this.setState(modifyPage(page, { status: "error", payload: e }))
    );
  }

  nextPage = (e) => {
    if (e.target.id === "disabled") return;
    const { pages } = this.state;
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

    const { isPlayer, pages } = this.state;
    let content = [];

    let anyError = pages.find(s => s.status === "error");
    let anyLoading = pages.find(s => s.status === "loading");
    let anyEmpty = pages.find(s => s.payload.length < 1);
    let onePage = pages.length === 1;

    let nextDisabled = isPlayer || anyError || anyLoading || anyEmpty;
    let prevDisabled = isPlayer || anyError || anyLoading || onePage;

    if (anyError) content = <ErrorScreen err={anyError.payload} boxed />
    else if (isPlayer && pages[0].payload.length < 1) content = <ErrorScreen message={`${isPlayer} was not found on this search criteria`} boxed />
    else {
      let index = 0;
      _forEach(pages, (page, pageIndex, lol) => {
        page.payload.forEach((each) => {
          content.push(
            <LeadMember key={`${index++} - ${this.state.mode.label} - ${this.state.region}`}
              me={this.state.isPlayer}
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
        <Styled.Wrapper>
          <Styled.Filter>
            <Styled.FilterCategory>
              <h2>Region</h2>
              {
                REGIONS.map(region => (
                  <Button key={region}
                    onClick={this.changeRegion(region)}
                    active={this.state.region === region}
                    group >
                    {region}
                  </Button>
                ))
              }
            </Styled.FilterCategory>

            <Styled.FilterCategory>
              <h2>Game Mode</h2>
              {
                LEADERBOARD_TYPES.map(type => (
                  <Button key={type.label}
                    onClick={this.changeMode(type)}
                    active={this.state.mode.label === type.label}
                    small>
                    {type.label}
                  </Button>
                ))
              }
            </Styled.FilterCategory>

            <Styled.InputCategory>
              <h2>Search</h2>
              <form onSubmit={this.searchPlayer} style={{position: "relative"}}>
                <Styled.Icon left onClick={this.searchPlayer}><i className="fa fa-search"/></Styled.Icon>
                {isPlayer && (
                  <Styled.Icon right 
                  onClick={this.resetPlayer}>
                  <i className="fa fa-close" style={{color: "rgba(250, 0, 0, 0.7)"}} />
                  </Styled.Icon>)}
                <Styled.Input onChange={this.changePlayer} 
                  onSubmit={() => console.log("lol")} 
                  value={this.state.player}
                />
              </form>
            </Styled.InputCategory>

          </Styled.Filter>
          

            <Styled.Content>
              {content}
            </Styled.Content>
            <Styled.Buttons>
              {
                !isPlayer ? (
                  <React.Fragment>
                    <BoxButton onClick={this.prevPage} disabled={prevDisabled}>View Less</BoxButton>
                    <BoxButton onClick={this.nextPage} disabled={nextDisabled}>View More</BoxButton>
                  </React.Fragment>
                ) : (
                  <BoxButton onClick={this.resetPlayer}>Reset</BoxButton>
                )
              }
            </Styled.Buttons>
        </Styled.Wrapper>
      </React.Fragment>
        )
      }
    }
    
export default Leaderboard;