import React from "react";
import Helmet from "react-helmet";
import { Trans } from "react-i18next";
import { Link } from "react-router-dom";

import Button from "./../../common/Button";

import * as Styled from "./Details.style.js";
import Utils from "../../../utils/index.js";
import { fetchHero } from "../../../actions/api.js";

import { SkeletonWrapper, SkeletonContext } from "./../../common/Skeleton";
import { Adsense } from "../../common/Ads";

import Overview from "./Overview";
import Skills from "./Skills";
import Builds from "./Builds";
import Heroes from "./Heroes";
import ErrorScreen from "../../common/ErrorScreen";

class HeroDetails extends React.Component {
  state = {
    status: "loading",
    heroName: "Unknown",
    payload: null,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.match.params.heroName !== prevState.heroName) {
      return {
        status: "loading",
        heroName: nextProps.match.params.heroName,
        payload: null,
      };
    }

    // Return null to indicate no change to state.
    return null;
  }

  componentDidMount() {
    this.fetch();
  }

  componentWillUnmount() {
    this.cancel();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.heroName !== this.state.heroName) {
      if (this.cancel) this.cancel();
      this.fetch();
    }
  }

  async fetch() {
    let heroName = this.state.heroName;

    this.cancel = Utils.makeCancelable(fetchHero(heroName), res =>
      this.setState({ status: "loaded", payload: res })
    );
  }

  render() {
    const t = this.props.t;

    let heroName = this.state.heroName;
    let tab = this.props.match.params.tab;

    let payload = this.state.payload;

    let topRoles;
    if (this.state.status === "loaded" && !payload.name) {
      return <ErrorScreen />;
    }

    console.log(this.state.status, payload);
    if (this.state.status === "loaded") {
      topRoles = payload.roles
        .sort((a, b) => (a.pickRate > b.pickRate ? -1 : 1))
        .filter(role => role.pickRate > 33)
        .map(
          role =>
            `${t(
              `terms.${role.key.toLowerCase()}`
            )} (${role.pickRate.toFixed(0)}%)`
        )
        .join(", ");
    }

    let element =
      {
        overview: Overview,
        abilities: Skills,
        builds: Builds,
        heroes: Heroes,
      }[tab] || Overview;

    let content = React.createElement(element, {
      hero: heroName,
      payload: this.state.payload,
    });

    let toLink = `/heroes/${heroName}/`;

    return (
      <SkeletonContext.Provider value={this.state.status}>
        <Helmet>
          <title>{heroName}</title>
        </Helmet>
        <Styled.Wrapper>
          <Styled.Header>
            <Styled.HeroImage type="heroes" name={heroName} />

            <Styled.HeroTitle>
              <h1>{heroName}</h1>
              <div>
                <SkeletonWrapper height={15}>
                  {() => (
                    <React.Fragment>
                      <Trans i18nKey="heroes.mostPlayedAs" /> {topRoles}
                    </React.Fragment>
                  )}
                </SkeletonWrapper>
              </div>
            </Styled.HeroTitle>
          </Styled.Header>

          <Styled.Tabs>
            <Link to={`${toLink}overview`}>
              <Button active={tab === "overview" || !tab}>
                <Trans i18nKey="tab.Overview" />
              </Button>
            </Link>
            <Link to={`${toLink}abilities`}>
              <Button active={tab === "abilities"}>
                <Trans i18nKey="tab.Abilities" />
              </Button>
            </Link>
            <Link to={`${toLink}builds`}>
              <Button active={tab === "builds"}>
                <Trans i18nKey="tab.Builds" />
              </Button>
            </Link>
            <Link to={`${toLink}heroes`}>
              <Button active={tab === "heroes"}>
                <Trans i18nKey="tab.Heroes" />
              </Button>
            </Link>
          </Styled.Tabs>

          <Adsense />
          <Styled.Content>{content}</Styled.Content>
          <Adsense />
        </Styled.Wrapper>
      </SkeletonContext.Provider>
    );
  }
}

export default HeroDetails;
