import React from "react";
import { Trans, translate } from "react-i18next";
import Helmet from "react-helmet";

import * as Styled from "./Heroes.style";

import { SkeletonWrapper, SkeletonPayload } from "./../common/Skeleton";
import { fetchTopHeroes } from "../../actions/api";
import Button from "./../common/Button";
import Utils from "./../../utils";
import { Adsense } from "../common/Ads";
import { Rate } from "../common/ColoredValues";

const ITEM_PER_PAGE = 30;

let HERO_TIERS = {
  0: t => t("terms.tier", { tier: 1 }),
  1: t => t("terms.tier", { tier: 2 }),
  2: t => t("terms.tier", { tier: 3 }),
  3: t => t("terms.tier", { tier: 4 }),
  4: t => t("terms.op"),
};

function compare(a, b, property, valueToReturn) {
  if (a[property] < b[property]) return valueToReturn;
  if (a[property] > b[property]) return valueToReturn * -1;
  if (property === "tier") {
    return compare(a, b, "winRate", valueToReturn);
  }

  return false;
}

const Subtitles = React.createContext(false);

const Hero = ({ status, position, payload, t }) => (
  <Styled.Hero
    hover="true"
    to={payload.name ? `/heroes/${payload.name}` : "/heroes"}
    animation="fadeIn"
    delay={position}
  >
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
            <b>
              <SkeletonWrapper status={status} width={40} height={10}>
                {() => payload.roles.join(", ")}
              </SkeletonWrapper>
            </b>
          </Styled.HeroNameRole>
        </Styled.HeroInfo>
      </Styled.Info>

      <Styled.Stats>
        <SkeletonWrapper status={status} width={40} height={20}>

          {() => <Rate fixed={2} rate={payload.pickRate} />}
        </SkeletonWrapper>
        <Subtitles.Consumer>
          {value => (
            <Styled.Subtitle visible={value}>
              <Trans i18nKey="terms.pickrate" />
            </Styled.Subtitle>
          )}
        </Subtitles.Consumer>
      </Styled.Stats>

      <Styled.Stats>
        <SkeletonWrapper status={status} width={40} height={20}>
          {() => <Rate fixed={2} rate={payload.winRate} />}
        </SkeletonWrapper>
        <Subtitles.Consumer>
          {value => (
            <Styled.Subtitle visible={value}>
              <Trans i18nKey="terms.winrate" />
            </Styled.Subtitle>
          )}
        </Subtitles.Consumer>
      </Styled.Stats>

      <Styled.Stats>
        <SkeletonWrapper status={status} width={40} height={20}>
          {() => <Rate fixed={2} rate={payload.banRate} />}
        </SkeletonWrapper>
        <Subtitles.Consumer>
          {value => (
            <Styled.Subtitle visible={value}>
              <Trans i18nKey="terms.banrate" />
            </Styled.Subtitle>
          )}
        </Subtitles.Consumer>
      </Styled.Stats>

      <Styled.Tier>
        <Styled.TierImg tier={payload && `tier${payload.tier}`} />
        <b>
          <SkeletonWrapper status={status} width={40} height={20}>
            {() => HERO_TIERS[payload.tier](t)}
          </SkeletonWrapper>
        </b>
      </Styled.Tier>
    </Styled.HeroContent>
  </Styled.Hero>
);

class Heroes extends React.Component {
  state = {
    status: "loading",
    roleFilter: null,
    sort: {
      property: "tier",
      order: 1,
    },
    payload: SkeletonPayload(ITEM_PER_PAGE),
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState !== this.state) {
      return true;
    }

    return false;
  }

  componentDidMount() {
    this.fetch();
  }

  componentWillUnmount() {
    this.cancel();
  }

  roleFilter = role => () => {
    this.setState(prevState => ({
      roleFilter: prevState.roleFilter === role ? null : role,
    }));
  };

  async fetch() {
    this.cancel = Utils.makeCancelable(fetchTopHeroes(), res =>
      this.setState({ status: "loaded", payload: res })
    );
  }

  changeSort = property => e => {
    this.setState(prevState => {
      let newOrder = 1;

      if (prevState.sort.order === 1) newOrder = -1;

      return {
        sort: {
          property: property,
          order: newOrder,
        },
      };
    });
  };

  render() {
    const { t } = this.props;

    const { status, roleFilter, sort, payload } = this.state;

    let sortIcon = property => {
      let base = "fa fa-sort";

      if (sort.property === property) {
        if (sort.order === 1) base += "-asc";
        else base += "-desc";
      }
      return base;
    };

    let heroes = payload;

    if (roleFilter) {
      heroes = heroes.filter(hero => hero.roles.includes(roleFilter));
    }

    heroes.sort((a, b) => compare(a, b, sort.property, sort.order));
    // heroes = Utils.paginateArray(heroes, ITEM_PER_PAGE, page);

    return (
      <Styled.Wrap>
        <Helmet>
          <title>{t("profile.Heroes")}</title>
        </Helmet>
        <div>
          <Styled.FilterTitle>
            <Trans i18nKey="filters.role" />
          </Styled.FilterTitle>

          <Button active={!roleFilter} onClick={this.roleFilter(null)}>
            <Trans i18nKey="terms.All" />
          </Button>

          <Button
            active={roleFilter === "Carry"}
            onClick={this.roleFilter("Carry")}
          >
            <Trans i18nKey="terms.carry" />
          </Button>

          <Button
            active={roleFilter === "Captain"}
            onClick={this.roleFilter("Captain")}
          >
            <Trans i18nKey="terms.captain" />
          </Button>

          <Button
            active={roleFilter === "Jungler"}
            onClick={this.roleFilter("Jungler")}
          >
            <Trans i18nKey="terms.jungler" />
          </Button>
        </div>

        <Adsense />

        <Styled.Header innerRef={this.props.headerRef}>
          <Styled.Info />
          <Styled.Stats onClick={this.changeSort("pickRate")}>
            <Trans i18nKey="terms.pickrate" />{" "}
            <i className={sortIcon("pickRate")} />
          </Styled.Stats>
          <Styled.Stats onClick={this.changeSort("winRate")}>
            <Trans i18nKey="terms.winrate" />{" "}
            <i className={sortIcon("winRate")} />
          </Styled.Stats>
          <Styled.Stats onClick={this.changeSort("banRate")}>
            <Trans i18nKey="terms.banrate" />{" "}
            <i className={sortIcon("banRate")} />
          </Styled.Stats>
          <Styled.Tier onClick={this.changeSort("tier")}>
            {t("terms.tier", { tier: null })}{" "}
            <i className={sortIcon("tier")} />
          </Styled.Tier>
        </Styled.Header>

        {heroes.map((hero, index) => (
          <Hero
            key={status === "loaded" ? hero.name + index : index}
            position={index}
            status={status}
            payload={hero}
            t={t}
          />
        ))}
      </Styled.Wrap>
    );
  }
}

class TrackScroll extends React.Component {
  state = {
    isHeaderVisible: true,
  };

  componentDidMount() {
    document.addEventListener("scroll", this.trackScrolling);
  }

  componentWillUnmount() {
    document.removeEventListener("scroll", this.trackScrolling);
  }

  // Track if the header is visible or not
  trackScrolling = () => {
    if (!this.header) return;

    const rect = this.header.getBoundingClientRect();
    const elemTop = rect.top;
    const elemBottom = rect.bottom;

    const isVisible = elemTop >= 0 && elemBottom <= window.innerHeight;
    if (!isVisible) {
      if (this.state.isHeaderVisible) {
        this.setState({ isHeaderVisible: false });
      }
    } else {
      if (!this.state.isHeaderVisible) {
        this.setState({ isHeaderVisible: true });
      }
    }
  };

  render() {
    return (
      <Subtitles.Provider value={!this.state.isHeaderVisible}>
        <Heroes headerRef={ref => (this.header = ref)} t={this.props.t} />
      </Subtitles.Provider>
    );
  }
}

export default translate()(TrackScroll);
