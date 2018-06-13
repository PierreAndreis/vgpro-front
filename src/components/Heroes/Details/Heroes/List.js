import React from "react";

import { translate, Trans } from "react-i18next";
import Box from "./../../../common/Box";

import { Rate } from "../../../common/ColoredValues.js";

import * as Styled from "./List.style.js";
import Button from "../../../common/Button";

class Hero extends React.Component {
  // We check for key to make sure it doesn't re-render
  shouldComponentUpdate(nextProps) {
    if (nextProps.payload.key === this.props.payload.key) return false;
    return true;
  }

  render() {
    let payload = this.props.payload;

    return (
      <Styled.ListRow onClick={this.props.onClick} tabIndex={0}>
        <Styled.HeroImage type="heroes" name={payload && payload.key} />
        <Styled.Info>{payload.key}</Styled.Info>
        <span>
          <Rate
            rate={
              this.props.type === "against"
                ? 100 - payload.winRate
                : payload.winRate
            }
          />
        </span>
        <span>
          <Rate rate={payload.pickRate} />
        </span>
      </Styled.ListRow>
    );
  }
}
class List extends React.Component {
  state = {
    value: "",
    list: "against",
  };

  onChange = e => {
    let value = e.target.value;
    this.setState({ value });
  };

  changeList = mode => () => {
    this.setState({
      list: mode,
    });
  };

  render() {
    let payload = this.props.payload;
    let currentList = this.state.list;

    let heroes = {
      against: payload.playingAgainst,
      with: payload.playingWith,
    }[currentList].sort((a, b) => (a.key > b.key ? 1 : -1));

    if (this.state.value) {
      heroes = heroes.filter(hero => hero.key.includes(this.state.value));
    }

    return (
      <Box.wrap>
        <Box.body>
          <Styled.Search
            type="text"
            value={this.state.value}
            onChange={this.onChange}
            placeholder={this.props.t("search.placeholderShort")}
          />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              active={currentList === "against"}
              group
              onClick={this.changeList("against")}
            >
              <Trans i18nKey="heroes.playingAgainst" /> {payload.name}
            </Button>
            <Button
              active={currentList === "with"}
              group
              onClick={this.changeList("with")}
            >
              <Trans i18nKey="heroes.playingWith" /> {payload.name}
            </Button>
          </div>
          <Styled.List>
            <section>
              <Styled.ListRow>
                <Styled.HeroImage />
                <Styled.Info>
                  <Trans i18nKey="terms.name" />
                </Styled.Info>
                <span>
                  <Trans i18nKey="terms.winrate" />
                </span>
                <span>
                  <Trans i18nKey="terms.pickrate" />
                </span>
              </Styled.ListRow>
            </section>
            <section>
              {heroes.map((hero, index) => (
                <Hero
                  key={hero.key + currentList}
                  type={currentList}
                  onClick={this.props.onClick(hero.key)}
                  payload={hero}
                />
              ))}
            </section>
          </Styled.List>
        </Box.body>
      </Box.wrap>
    );
  }
}

export default translate()(List);
