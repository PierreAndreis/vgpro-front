import React from "react";
import Tilt from "react-tilt";
import Link from "react-router-dom/Link";
import { Trans } from "react-i18next";

import Box from "../../../common/Box";

import * as Styled from "./CompareBox.style.js";

import Utils from "../../../../utils";
import { fetchHero } from "../../../../actions/api.js";

import PolygonSVG from "./PolygonSVG";

import Stats from "./Stats";
import { SkeletonWrapper } from "../../../common/Skeleton";
import { Rate } from "../../../common/ColoredValues";

const Portrait = ({ heroName, payload }) => {
  let roles = [];

  let strongAgainst = ["", "", ""];
  let weakAgainst = strongAgainst;

  if (payload) {
    let sortedEnemies = payload.playingAgainst.sort(
      (a, b) => (a.winRate > b.winRate ? 1 : -1)
    );

    roles = payload.roles
      .filter(role => role.pickRate > 33)
      .map(r => r.key);

    weakAgainst = sortedEnemies.slice(0, 3);

    strongAgainst = sortedEnemies.reverse().slice(0, 3);
  }

  return (
    <div style={{ flex: 1, margin: "0 2px 10px" }}>
      <Box.wrap>
        <Box.body>
          <Link to={`/heroes/${heroName}`}>
            <Styled.Container>
              <div>
                <Tilt
                  options={{ max: 20, scale: 1.1 }}
                  style={{ height: 100, width: 90 }}
                >
                  <div
                    style={{
                      filter:
                        "drop-shadow(0px 10px 10px rgba(0, 0, 0, 0.4))",
                    }}
                  >
                    <Styled.HeroImage type="heroes" name={heroName} />
                  </div>
                </Tilt>
                <h3>{heroName}</h3>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Styled.Value>
                    <span>
                      <SkeletonWrapper
                        width={30}
                        height={12}
                        status={payload ? "loaded" : "loading"}
                      >
                        {() => <Rate rate={payload.winRate} />}
                      </SkeletonWrapper>
                    </span>
                    <div>
                      <Trans i18nKey="terms.winrate" />
                    </div>
                  </Styled.Value>

                  <Styled.Value>
                    <span>
                      <SkeletonWrapper
                        width={30}
                        height={12}
                        status={payload ? "loaded" : "loading"}
                      >
                        {() => <Rate rate={payload.pickRate} />}
                      </SkeletonWrapper>
                    </span>
                    <div>
                      <Trans i18nKey="terms.pickrate" />
                    </div>
                  </Styled.Value>
                </div>
              </div>
            </Styled.Container>
          </Link>
          <Styled.Line />
          <Styled.Container>
            <div>
              <h4>
                <Trans i18nKey="profile.Roles" />
              </h4>
              <div style={{ display: "flex" }}>
                {["Carry", "Jungler", "Captain"].map(role => (
                  <Styled.Role
                    key={role}
                    name={role}
                    highlight={roles.includes(role)}
                  />
                ))}
              </div>
            </div>
          </Styled.Container>

          <Styled.Container>
            <div>
              <h4>
                <Trans i18nKey="heroes.strongAgainst" />
              </h4>
              <div style={{ display: "flex" }}>
                {strongAgainst.map((hero, i) => (
                  <Link
                    key={i}
                    to={hero.key ? `/heroes/${hero.key}` : "/"}
                  >
                    <Styled.Portrait type="heroes" name={hero.key} />
                  </Link>
                ))}
              </div>
            </div>
          </Styled.Container>

          <Styled.Container>
            <div>
              <h4>
                <Trans i18nKey="heroes.weakAgainst" />
              </h4>
              <div style={{ display: "flex" }}>
                {weakAgainst.map((hero, i) => (
                  <Link
                    key={i}
                    to={hero.key ? `/heroes/${hero.key}` : "/"}
                  >
                    <Styled.Portrait type="heroes" name={hero.key} />
                  </Link>
                ))}
              </div>
            </div>
          </Styled.Container>
        </Box.body>
      </Box.wrap>
    </div>
  );
};

export default class CompareBox extends React.Component {
  state = {
    status: "loading",
    selectedHero: this.props.selectedHero,
    payload: null,
  };

  componentDidMount() {
    this.props.selectedHero && this.fetch();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.selectedHero !== prevState.selectedHero) {
      return {
        status: "loading",
        selectedHero: nextProps.selectedHero,
        payload: null,
      };
    }

    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedHero !== this.state.selectedHero) {
      this.fetch();
    }
  }

  componentWillUnmount() {
    if (this.cancel) this.cancel();
  }

  fetch = async () => {
    if (this.cancel) this.cancel();
    this.cancel = Utils.makeCancelable(
      fetchHero(this.state.selectedHero),
      r => this.setState({ status: "loaded", payload: r }),
      () =>
        this.setState({
          status: "error",
        })
    );
  };

  render() {
    return (
      <React.Fragment>
        <Portrait
          heroName={this.props.hero}
          payload={this.props.payload}
        />

        <Stats
          stats={[this.props.payload, this.state.payload]}
          name={[this.props.hero, this.props.selectedHero]}
        />

        <Portrait
          heroName={this.state.selectedHero}
          payload={this.state.payload}
        />

        <PolygonSVG />
      </React.Fragment>
    );
  }
}
