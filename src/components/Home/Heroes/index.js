import React from "react";

import {Box, BoxTitle, BoxBody, BoxActions} from "./../../common/Box";
import { Rate } from "./../../common/ColoredValues";
import { SkeletonPayload, SkeletonWrapper } from "../../common/Skeleton";

import {fetchTopHeroes} from "../../../actions/api";
import Utils from "../../../utils";

import "./Heroes.css";

const Hero = ({status, name, value, rank}) => {
  let heroImage = {};

  if (status === "loaded") { 
    heroImage = {
      backgroundImage: `url(http://vgpro.gg/assets/images/heroes/${name.toLowerCase()}.gif)`
    }
  };

  return (
    <div className={`HeroesMeta-Top Rank-${rank}`}>
      <div className="Heroes-Meta-Top-Image" style={heroImage}>
        <div className="Heroes-Meta-Top-Image-Tag">{rank}</div>
      </div>
      <div className="Heroes-Meta-Top-Name">
        <SkeletonWrapper status={status} width="70px" height="10px">
          {() => name}
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
    payload: SkeletonPayload(5),
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
      payload: SkeletonPayload(5)
    })

    const server_region = (region === "sea") ? "sg" : region;


    this.cancel = Utils.makeCancelable(
      fetchTopHeroes(active.value, server_region),
      (res) => this.setState({status: "loaded", payload: res})
    );
  }


  render() {

    const {status, payload, active} = this.state;

    const top3 = payload.splice(0, 3);
    const rest = payload;

    let rank = 1;

    return (
      <Box className="animated fadeInRight">
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

          <div className="HeroesMeta-Top3 animated fadeInLeft">
            {
              top3.map(({name, ...value}) => (
                <Hero key={rank} status={status} name={name} value={value} rank={rank++} />
              ))
            }
          </div>

          <div className="Heroes-Meta-Divider" />
          <div className="Heroes-Meta-Others animated slideInUp">
            {
              rest.map(({name, ...value}) => (
                <Hero key={rank} status={status} name={name} value={value} rank={rank++} />
              ))
            }
          </div>
        
        </BoxBody>
        <BoxActions />
      </Box> 
    )
  }
}