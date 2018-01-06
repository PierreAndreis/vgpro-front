import React from "react";

import {Box, BoxTitle, BoxBody, BoxActions} from "./../../common/Box";
import { Rate }                             from "./../../common/ColoredValues";
import AssetLoader                          from "./../../common/AssetLoader";
import { SkeletonPayload, SkeletonWrapper } from "./../../common/Skeleton";

import {fetchTopHeroes} from "./../../../actions/api";
import Utils            from "./../../../utils";

import "./Heroes.css";

const Hero = ({status, name, value, rank}) => {
  let heroName;

  if (status === "loaded") { 
    heroName = name;
  };

  return (
    <div className={`HeroesMeta-Top Rank-${rank}`}>
      <AssetLoader type="heroes" className="Heroes-Meta-Top-Image" name={heroName}>
        <div className="Heroes-Meta-Top-Image-Tag">{rank}</div>
      </AssetLoader>
      <div className="Heroes-Meta-Top-Name">
        <SkeletonWrapper status={status} width="70px" height="10px">
          {() => name || "Unknown"}
        </SkeletonWrapper>
      </div>
      <span>
        <SkeletonWrapper status={status} width="25px" height="7px">
          {() => <Rate rate={value[Object.keys(value)[0]]} />}
        </SkeletonWrapper>
      </span>
    </div>
  );
}

const TYPES = [
  { value: "pickrate", label: "Pick Rate", selector: "Selector-PickRate" },
  { value: "winrate" , label: "Win Rate" , selector: "Selector-WinRate"  },
  { value: "banrate" , label: "Ban Rate" , selector: "Selector-BanRate"  },
];

const REGIONS = [
  "all",
  "na",
  "eu",
  "ea",
  "sea",
  "sa",
  "cn"
]

export default class extends React.Component {

  state = {
    active: TYPES[0],
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
      <Box className="animated fadeInRight HeroesMeta-Box">
        <BoxTitle className="HeroesMeta-Title">
          <span>Top {active.label}</span>
          <div className="HeroesMeta-Selector">
            {TYPES.map(type => (
              <div key={type.value}
                className={`
                  HeroesMeta-Selector-Icon 
                  ${type.selector} 
                  ${type.selector === active.selector ? "active" : ""}`}
                onClick={this.changeType(type)}
              />
            ))}
          </div>
        </BoxTitle>
        <BoxBody className="HeroesMeta">
          <div className="HeroesMeta_RegionSelect">
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
          <div className="Heroes-Meta-Divider" />
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
        
        </BoxBody>
        <BoxActions>
          <div className="button" id={prevBlocked ? "disabled" : ""} onClick={this.prevPage}>View Less</div>
          <div className="button" id={nextBlocked ? "disabled" : ""} onClick={this.nextPage}>View more</div>
        </BoxActions>
      </Box> 
    )
  }
}