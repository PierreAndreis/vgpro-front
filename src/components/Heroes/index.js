import React from "react";
import Helmet from "react-helmet";

import * as Styled from "./Heroes.style";

import { SkeletonWrapper, SkeletonPayload } from "./../common/Skeleton";
import { fetchTopHeroes } from "../../actions/api";
import Button from "./../common/Button";
import Utils from "./../../utils";

const ITEM_PER_PAGE = 30;

let HERO_TIERS = {
  0: "Tier 1",
  1: "Tier 2",
  2: "Tier 3",
  3: "Tier 4",
  4: "OP"
}

function compare(a, b, property, valueToReturn) {
  if (a[property] < b[property]) return valueToReturn;
  if (a[property] > b[property]) return valueToReturn * -1;
  if (property === "tier") {
    return compare(a, b, "winRate", valueToReturn);
  }

  return false;
};

const Hero = ({status, position, subtitles, payload}) => (
  <Styled.Hero hover to={payload.name ? `/heroes/${payload.name}` : "/heroes"}>
  {/* <Styled.Hero> */}
    <Styled.HeroContent>

      <Styled.Info>

      <Styled.Position>{position + 1}</Styled.Position>

        <Styled.HeroInfo>
          <Styled.HeroImage type="heroes" name={payload.name} />

          <Styled.HeroNameRole>
            <Styled.Name>
              <SkeletonWrapper status={status} width={50} height={10}>
                {() => payload.name}
              </SkeletonWrapper>
            </Styled.Name>
            <span>
              <SkeletonWrapper status={status} width={40} height={10}>
                {() => payload.roles.join(", ")}
              </SkeletonWrapper>
            </span>
          </Styled.HeroNameRole>
          </Styled.HeroInfo>

      </Styled.Info>

      <Styled.Stats>
        <SkeletonWrapper status={status} width={40} height={20}>
          {() => payload.pickRate + "%"}
        </SkeletonWrapper>
        {subtitles && <b>Popularity</b>}
      </Styled.Stats>

      <Styled.Stats>
        <SkeletonWrapper status={status} width={40} height={20}>
          {() => payload.winRate + "%"}
        </SkeletonWrapper>
        {subtitles && <b>Win Rate</b>}
      </Styled.Stats>

      <Styled.Stats>
        <SkeletonWrapper status={status} width={40} height={20}>
          {() => payload.banRate + "%"}
        </SkeletonWrapper>
        {subtitles && <b>Ban Rate</b>}
      </Styled.Stats>

      <Styled.Tier>
        <Styled.TierImg tier={payload && `tier${payload.tier}`} />
        <span>
          <SkeletonWrapper status={status} with={40} height={20}>
            {() => HERO_TIERS[payload.tier]}
          </SkeletonWrapper>
        </span>
      </Styled.Tier>

    </Styled.HeroContent>
  </Styled.Hero>
)


class Heroes extends React.Component {

  state = {
    status: "loading",
    roleFilter: null,
    sort: {
      property: "tier",
      order: 1,
    },
    isHeaderVisible: true,
    payload: SkeletonPayload(ITEM_PER_PAGE),
  }

  componentDidMount() {
    this.fetch();
    document.addEventListener('scroll', this.trackScrolling);
  }

  componentWillUnmount() {
    this.cancel();
    document.removeEventListener('scroll', this.trackScrolling);
  }

  roleFilter = (role) => () => {
    this.setState((prevState) => ({
      roleFilter: prevState.roleFilter === role ? null : role
    }));
  }

  // Track if the header is visible or not
  trackScrolling = () => {
    if (!this.header) return;

    const rect = this.header.getBoundingClientRect();
    const elemTop = rect.top;
    const elemBottom = rect.bottom;

    const isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
    if (!isVisible) {
      if (this.state.isHeaderVisible) {
        this.setState({isHeaderVisible: false})
      }
    }
    else {
      if (!this.state.isHeaderVisible) {
        this.setState({isHeaderVisible: true})
      }
    }
    
  }

  async fetch() {

    this.cancel = Utils.makeCancelable(
      fetchTopHeroes(),
      (res) => this.setState({status: "loaded", payload: res})
    );
  }

  changeSort = (property) => (e) => {
    this.setState(prevState => {
      let newOrder = 1;

      if (prevState.sort.order === 1) newOrder = -1;

      return {
        sort: {
          property: property,
          order: newOrder
        }
      }
    })
  }

  render() {

    const { status, roleFilter, sort, payload, isHeaderVisible} = this.state;

    let sortIcon = (property) => {
      let base = "fa fa-sort";

      if (sort.property === property) {
        if (sort.order === 1) base += "-asc";
        else base += "-desc";
      }
      return base;
    }

    let heroes = payload;

    if (roleFilter) {
      heroes = heroes.filter(hero => hero.roles.includes(roleFilter));
    }

    heroes.sort((a, b) => compare(a, b, sort.property, sort.order));
    // heroes = Utils.paginateArray(heroes, ITEM_PER_PAGE, page);

    return (
    <Styled.Wrap>
      <Helmet>
        <title>Heroes</title>
      </Helmet>
      <div>
        <Button active={!roleFilter} onClick={this.roleFilter(null)}>
          All
        </Button>

        <Button active={roleFilter === "Carry"} onClick={this.roleFilter("Carry")}>
          Carry
        </Button>

        <Button active={roleFilter === "Captain"} onClick={this.roleFilter("Captain")}>
          Captain
        </Button>

        <Button active={roleFilter === "Jungler"} onClick={this.roleFilter("Jungler")}>
          Jungler
        </Button>
      </div>

      <Styled.Header innerRef={(r) => this.header = r}>
        <Styled.Info></Styled.Info>
        <Styled.Stats onClick={this.changeSort("pickRate")}>
          Popularity <i className={sortIcon("pickRate")} />
        </Styled.Stats>
        <Styled.Stats onClick={this.changeSort("winRate")}>
          Win Rate <i className={sortIcon("winRate")} />
        </Styled.Stats>
        <Styled.Stats onClick={this.changeSort("banRate")}>
          Ban Rate <i className={sortIcon("banRate")} />
        </Styled.Stats>
        <Styled.Tier onClick={this.changeSort("tier")}> 
          Tier <i className={sortIcon("tier")} />
        </Styled.Tier>
      </Styled.Header>

      {
        heroes.map((hero, index) => (
          <Hero key={hero.name || index} subtitles={!isHeaderVisible} position={index} status={status} payload={hero} />
        ))
      }

    </Styled.Wrap>
    )
  }
};

export default Heroes;