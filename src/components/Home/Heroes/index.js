import React from "react";

import Box from "./../../common/Box";
import { SkeletonPayload } from "./../../common/Skeleton";

import {fetchTopHeroes} from "./../../../actions/api";
import Utils            from "./../../../utils";
import {REGIONS, HEROES_TYPES} from "./../../../config/constants";

import Hero from "./Hero";

import "./Heroes.css";
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
      active: type,
    }, this.fetch)
  }

  changeRegion = (region) => (e) => {
    if (this.state.region === region) return;
    this.setState({
      region: region,
    }, this.fetch)
  }

  async fetch() {
    const {active, region} = this.state;

    this.setState({
      status: "loading",
      page: 0,
      payload: SkeletonPayload(5)
    })

    const server_region = (region === "sea") ? "sg" : region;


    this.cancel = Utils.makeCancelable(
      fetchTopHeroes(active.value, server_region),
      (res) => this.setState({status: "loaded", payload: res})
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

    const {status, payload, active, page} = this.state;

    let firstPage = 2;
    let perPage = 4;
    
    let toShow = 1 + (perPage * page) + perPage;

    const totalHeroes = payload.length;
    const heroes = payload.map((hero, i) => ({
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
          { page === 0 && 
            <div className="HeroesMeta-Top3">
              {
                top3.map(({name, rank, ...value}) => (
                  <Hero key={rank} status={status} name={name} value={value} rank={rank} />
                ))
              }
            </div>
          }
          <div className="Heroes-Meta-Others animated slideInUp">
            {
              rest.map(({name, rank, ...value}) => (
                <Hero key={rank} status={status} name={name} value={value} rank={rank} />
              ))
            }
          </div>
        
        </Styled.Body>
        <Box.action>
          <div className="button" id={prevBlocked ? "disabled" : ""} onClick={this.prevPage}>Back</div>
          <div className="button" id={nextBlocked ? "disabled" : ""} onClick={this.nextPage}>Next</div>
        </Box.action>
      </Styled.Wrapper> 
    )
  }
}