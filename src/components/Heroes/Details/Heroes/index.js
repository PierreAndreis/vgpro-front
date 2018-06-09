import React from "react";
import { Trans } from "react-i18next";

import Media from "react-media";

import * as Styled from "./Heroes.style.js";

import Box from "./../../../common/Box";
import { Rate } from "../../../common/ColoredValues.js";

import CompareBox from "./CompareBox";
import Button from "../../../common/Button.js";

const Hero = ({ payload, onClick }) => (
  <Styled.ListRow onClick={onClick}>
    <Styled.HeroImage type="heroes" name={payload && payload.key} />
    <Styled.Info>{payload.key}</Styled.Info>
    <span>
      <Rate rate={payload.winRate} />
    </span>
    <span>
      <Rate rate={payload.pickRate} />
    </span>
  </Styled.ListRow>
);

class Heroes extends React.Component {
  state = {
    selectedHero: null,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.mobile) return null;

    if (!prevState.selectedHero && nextProps.payload) {
      return { selectedHero: nextProps.payload.playingAgainst[0].key };
    }

    return null;
  }

  selectHero = hero => () => {
    this.setState({ selectedHero: hero });
  };

  render() {
    let mobile = this.props.mobile;

    if (!this.props.payload) {
      return <div>Loading</div>;
    }

    let heroes = this.props.payload.playingAgainst;

    let sidebar = (
      <Box.wrap>
        <Box.body>
          <Styled.Search />
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
                  onClick={this.selectHero(hero.key)}
                  key={hero.key}
                  payload={hero}
                />
              ))}
            </section>
          </Styled.List>
        </Box.body>
      </Box.wrap>
    );

    let content = (
      <React.Fragment>
        <CompareBox
          {...this.props}
          selectedHero={this.state.selectedHero}
        />
      </React.Fragment>
    );

    return (
      <React.Fragment>
        {!mobile && <Styled.Sidebar> {sidebar}</Styled.Sidebar>}

        {mobile &&
          this.state.selectedHero && (
            <div>
              <Styled.BackButton onClick={this.selectHero()}>
                <Trans i18nKey="general.Back" />
              </Styled.BackButton>
            </div>
          )}
        <Styled.Content>
          {(!mobile && content) ||
            (this.state.selectedHero ? content : sidebar)}
        </Styled.Content>
      </React.Fragment>
    );
  }
}
const queryToMobile = "(max-width: 800px)";

export default props => (
  <Media query={queryToMobile}>
    {matches => <Heroes {...props} mobile={matches} />}
  </Media>
);
