import React from "react";
import Box from "../../../common/Box";
import Button from "../../../common/Button";

import * as Styled from "./CompareBox.style.js";

import Utils from "../../../../utils";
import { fetchHero } from "../../../../actions/api.js";

import PolygonSVG from "./PolygonSVG";

import Stats from "./Stats";

const Portrait = ({ heroName, payload }) => {
  let roles = [];

  if (payload) {
    roles = payload.roles
      .filter(role => role.pickRate > 33)
      .map(r => r.key);
  }

  console.log(payload);

  return (
    <div style={{ flex: 1, margin: "0 2px" }}>
      <Box.wrap>
        <Box.body>
          <Styled.Container>
            <div>
              <div
                style={{
                  filter: "drop-shadow(0px 5px 30px rgba(0, 0, 0, 0.2))",
                }}
              >
                <Styled.HeroImage type="heroes" name={heroName} />
              </div>
              <h3>{heroName}</h3>
            </div>
          </Styled.Container>
          <Styled.Line />
          <Styled.Container>
            {["Carry", "Jungler", "Captain"].map(role => (
              <Styled.Role
                key={role}
                name={role}
                highlight={roles.includes(role)}
              />
            ))}
          </Styled.Container>
        </Box.body>
      </Box.wrap>
    </div>
  );
};

export default class CompareBox extends React.Component {
  state = {
    status: "loading",
    selectedHero: null,
    payload: null,
  };

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
      () => this.setState({ status: "error" })
    );
  };

  render() {
    return (
      <React.Fragment>
        <Portrait
          heroName={this.props.hero}
          payload={this.props.payload}
        />

        <Stats stats={[this.props.payload, this.state.payload]} />

        <Portrait
          heroName={this.state.selectedHero}
          payload={this.state.payload}
        />

        <PolygonSVG />
      </React.Fragment>
    );
  }
}
