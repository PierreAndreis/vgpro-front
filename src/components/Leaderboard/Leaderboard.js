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
    let { mode, region } = this.state;
    const server_region = (region === "sea") ? "sg" : region;
    const offset = page * PER_PAGE;
    const limit = PER_PAGE;

    // Create a loading page
    this.setState(modifyPage(page, this.initialPage()));

    this.cancel = Utils.makeCancelable(
      fetchLeaderboard(mode.value, server_region, { limit, offset }),
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

    const { pages } = this.state;
    let content = [];

    let anyError = pages.find(s => s.status === "error");
    let anyLoading = pages.find(s => s.status === "loading");
    let anyEmpty = pages.find(s => s.payload.length < 1);
    let onePage = pages.length === 1;

    let nextDisabled = anyError || anyLoading || anyEmpty;
    let prevDisabled = anyError || anyLoading || onePage;


    if (anyError) content = <ErrorScreen err={anyError.payload} boxed />
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
        <Styled.Wrapper>
          <Styled.Filter>
            <Styled.FilterCategory>
              <h2>Region</h2>
              {
                REGIONS.map(region => (
                  <Styled.FilterOption key={region}
                    onClick={this.changeRegion(region)}
                    active={this.state.region === region}>
                    {region}
                  </Styled.FilterOption>
                ))
              }
            </Styled.FilterCategory>

            <Styled.FilterCategory>
              <h2>Game Mode</h2>
              {
                LEADERBOARD_TYPES.map(type => (
                  <Styled.FilterOption key={type.label}
                    onClick={this.changeMode(type)}
                    active={this.state.mode.label === type.label}>
                    {type.label}
                  </Styled.FilterOption>
                ))
              }
            </Styled.FilterCategory>
          </Styled.Filter>

            <Styled.Content>
              {content}
            </Styled.Content>
            <Styled.Buttons>
              <BoxButton onClick={this.prevPage} disabled={prevDisabled}>View Less</BoxButton>
              <BoxButton onClick={this.nextPage} disabled={nextDisabled}>View More</BoxButton>
            </Styled.Buttons>
        </Styled.Wrapper>
      </React.Fragment>
        )
      }
    }
    
export default Leaderboard;