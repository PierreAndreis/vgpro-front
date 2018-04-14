import React from "react";

import Box from "./../../common/Box";
import { SkeletonPayload } from "./../../common/Skeleton";

import { fetchTopHeroes } from "./../../../actions/api";
import Utils from "./../../../utils";
import { REGIONS, HEROES_TYPES } from "./../../../config/constants";

import Hero from "./Hero";
import * as Styled from "./HeroBox.style.js";

export default class extends React.Component {

  state = {
    active: HEROES_TYPES[0],
    region: "all",
    status: "loading",
    page: 0,
    payload: SkeletonPayload(6),
  }

  componentDidMount() {
    this.fetch();
  }

  componentWillUnmount() {
    this.cancel();
  }

  changeType = (type) => (e) => {
    if (this.state.active.value === type.value) return;
    this.setState({
      active: type
    })
  }

  changeRegion = (region) => (e) => {
    if (this.state.region === region) return;
    this.setState({
      region: region,
    }, this.fetch)
  }

  async fetch() {
    const { region } = this.state;

    this.setState({
      status: "loading",
      page: 0,
      payload: SkeletonPayload(5)
    })

    const server_region = (region === "sea") ? "sg" : region;


    this.cancel = Utils.makeCancelable(
      fetchTopHeroes(server_region),
      (res) => this.setState({ status: "loaded", payload: res })
    );
  }

  nextPage = (e) => {
    e.preventDefault();
    if (e.target.id === "disabled") return;
    this.setState((prevState) => ({
      page: prevState.page + 1,
    }));
  }

  prevPage = (e) => {
    e.preventDefault();
    if (e.target.id === "disabled") return;
    this.setState((prevState) => ({
      page: prevState.page - 1,
    }));
  }

  render() {

    const { status, payload, active, page } = this.state;

    let firstPage = 2;
    let perPage = 4;

    let toShow = 1 + (perPage * page) + perPage;

    let payloadSorted = payload.sort((a, b) => {
      if (parseFloat(a[active.value]) > parseFloat(b[active.value])) return -1;
      if (parseFloat(a[active.value]) < parseFloat(b[active.value])) return 1;
      return 0;
    })

    const totalHeroes = payloadSorted.length;
    const heroes = payloadSorted.map((hero, i) => ({
      ...hero,
      rank: i + 1
    }))

    const top3 = [...heroes].splice(0, 3);

    let rest = [...heroes].slice(toShow - perPage, toShow);

    if (page === 0) {
      rest = [...heroes].slice(3, 3 + firstPage);
    }

    const nextBlocked = toShow >= (totalHeroes);
    const prevBlocked = page === 0;

    return (
      <Styled.Wrapper animation="fadeInRight">

        <Styled.Title>
          <span>Top {active.label}</span>
          <Box.selector>
            {HEROES_TYPES.map(type => (
              <Box.selectorOptions
                key={type.value}
                icon={type.icon}
                active={type.value === active.value}
                onClick={this.changeType(type)}
              />
            ))}
          </Box.selector>
        </Styled.Title>

        <Styled.Body>
          <div className="Box_RegionSelect">
            {
              REGIONS.map(region => (
                <div key={region}
                  className={region === this.state.region ? "active" : ""}
                  onClick={this.changeRegion(region)}>
                  {region}
                </div>
              ))
            }
          </div>
          <div className="Box_Divider" />
          {page === 0 &&
            <Styled.Top3>
              {
                top3.map(({ name, rank, ...data }) => (
                  <Hero key={rank} status={status} name={name} value={data[active.value]} rank={rank} />
                ))
              }
            </Styled.Top3>
          }
          <Styled.Others>
            {
              rest.map(({ name, rank, ...data }) => (
                <Hero key={rank} status={status} name={name} value={data[active.value]} rank={rank} />
              ))
            }
          </Styled.Others>

        </Styled.Body>
        <Box.action>
          <Box.button disabled={prevBlocked} onClick={this.prevPage}>Back</Box.button>
          <Box.button disabled={nextBlocked} onClick={this.nextPage}>Next</Box.button>
        </Box.action>
      </Styled.Wrapper>
    )
  }
}