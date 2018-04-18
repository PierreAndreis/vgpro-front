import React from "react";
import Helmet from "react-helmet";

import * as Styled from "./Details.style.js";
import Button from "./../../common/Button";
import Overview from "./Overview";
import Utils from "../../../utils/index.js";
import { fetchHero } from "../../../actions/api.js"

import { SkeletonWrapper, SkeletonContext } from "./../../common/Skeleton";


class HeroDetails extends React.Component {

  state = {
    status: "loading",
    heroName: "Unknown",
    payload: null
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.match.params.heroName !== prevState.heroName) {
      return {
        status: "loading",
        heroName: nextProps.match.params.heroName,
        payload: null
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

  async fetch() {

    let heroName = this.state.heroName;

    this.cancel = Utils.makeCancelable(
      fetchHero(heroName),
      (res) => this.setState({ status: "loaded", payload: res })
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.heroName !== this.state.heroName) {
      this.fetch();
    }
  }


  render() {

    let heroName = this.state.heroName;

    let payload = this.state.payload;

    let topRoles;

    if (this.state.status === "loaded") {
      topRoles = payload.roles
        .sort((a, b) => (a.pickRate > b.pickRate) ? -1 : 1)
        .filter(role => role.pickRate > 33)
        .map(role => `${role.key} (${role.pickRate.toFixed(0)}%)`)
        .join(", ")
    };

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
                  {() => `Most played as ${topRoles}`}
                </SkeletonWrapper>
              </div>

            </Styled.HeroTitle>
          </Styled.Header>

          <Styled.Tabs>
            <Button active> Overview </Button>
            <Button> Skills </Button>
            <Button> Builds </Button>
            <Button> Heroes </Button>
          </Styled.Tabs>

          <Styled.Content>
            <Overview hero={heroName} payload={payload} />
          </Styled.Content>

        </Styled.Wrapper>
      </SkeletonContext.Provider>
    )
  }
}

export default HeroDetails;