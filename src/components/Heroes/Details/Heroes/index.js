import React from "react";
import { Trans } from "react-i18next";

import * as Styled from "./Heroes.style.js";

import Box from "./../../../common/Box";
import { Rate } from "../../../common/ColoredValues.js";

import CompareBox from "./CompareBox";

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

export default class Heroes extends React.Component {
  state = {
    selectedHero: null,
  };

  selectHero = hero => () => {
    this.setState({ selectedHero: hero });
  };

  render() {
    if (!this.props.payload) {
      return <div>Loading</div>;
    }

    let heroes = this.props.payload.playingAgainst;

    return (
      <React.Fragment>
        <Styled.Sidebar>
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
        </Styled.Sidebar>
        <Styled.Content>
          <CompareBox
            {...this.props}
            selectedHero={this.state.selectedHero}
          />
        </Styled.Content>
      </React.Fragment>
    );
  }
}
