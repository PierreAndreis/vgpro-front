import React, { Component } from "react";
import styled from "styled-components";
import { Box } from "../../common/Box";
import AssetLoader from "../../common/AssetLoader";
import { KDA as KDARate } from "../../common/ColoredValues";
import TimeAgo from "./../../../i18n/timeAgo";

const Wrap = styled(Box)`
  background-color: #282c37;
  width: calc(50% - 2vw);
  height: 13vw;
  margin: 1vw 1vw;
  padding: 1vw 1vw;
  box-sizing: border-box;

  position: relative;
  overflow: hidden;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

const HeroImage = styled(AssetLoader)`
  width: 7vw;
  height: 7vw;
  border-radius: 100%;
  background-size: 120%;
  background-position: center center;
  flex-shrink: 0;
`;

const BorderWinner = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 0.5vw;
  height: 100%;
  background: ${props =>
    props.winner ? props.theme.extra.win : props.theme.extra.loss};
`;

const WinnerBadge = styled.span`
  background: ${props =>
    props.winner ? props.theme.extra.win : props.theme.extra.loss};
`;

const MVPBadge = styled.span`
  background: ${props => props.theme.primary[300]};
`;

const Section = styled.div`
  border-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  flex-shrink: 0;
`;

const FloatingBadges = styled.div`
  position: absolute;
  top: -1.8vw;
  display: flex;

  & > span {
    text-transform: uppercase;
    color: white;
    margin-right: 0.5vw;
    font-size: 1vw;
    display: block;
    border-radius: 1vw;
    border-sizing: border-box;
    padding: 0.2vw 1vw;
    line-height: 1.5vw;
  }
`;

const Text = styled.div`
  font-size: 1.5vw;
  text-transform: uppercase;
  font-weight: 700;
  margin-bottom: 0.2vw;
`;

const Time = styled.div`
  /*font-style: italic;*/
  font-size: 1.3vw;

  i {
    display: inline-block;
    position: relative;
    top: 0.15vw;
  }
`;

const KDA = styled.div`
  font-size: 1.2vw;
  i {
    display: inline-block;
    position: relative;
    top: 0.15vw;
    color: ${props => props.theme.text[300]};
  }
  b {
    color: red;
  }
`;

const Stat = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-bottom: 0.1vw;
  i {
    display: inline-block;
    position: relative;
    top: 0.15vw;
    color: ${props => props.theme.primary[300]};
  }
  div {
    font-size: 1.5vw;
    font-weight: 700;
    margin-bottom: 0.3vw;
  }
  span {
    font-size: 1.1vw;
    color: ${props => props.theme.text[100]};
  }
`;

const Items = styled.div`
  display: grid;
  grid-gap: 0.2vw;
  grid-template-columns: repeat(3, 2.5vw);
`;

const Item = styled(AssetLoader)`
  width: 2.7vw;
  height: 2.7vw;
  border-radius: 50%;
  background-size: 100%;
  background-position: center center;
  background-color: ${props => props.theme.background.slot};
`;

export default class WidgetMatch extends Component {
  render() {
    const payload = this.props.payload;
    const me = payload.players.find(p => p.me);

    return (
      <Wrap>
        <BorderWinner winner={me.winner} />
        <HeroImage type="heroes" name={me.hero} />
        <Section>
          <FloatingBadges>
            <WinnerBadge winner={me.winner}>
              {me.winner ? "WIN" : "LOSS"}
            </WinnerBadge>
            {me.mvp && <MVPBadge>MVP</MVPBadge>}
          </FloatingBadges>
          <Text>{payload.gameMode}</Text>
          <Time>
            <TimeAgo date={payload.ended} /> <i className="vg-timer" />{" "}
            {payload.minutes}
          </Time>
          <Text>
            <KDARate kda={me.kda} /> KDA
          </Text>
          <KDA>
            <i className="vg-kills" /> {me.kills}{" "}
            <b>
              <i className="vg-deaths" /> {me.deaths}
            </b>{" "}
            <i className="vg-assists" /> {me.assists}
          </KDA>
        </Section>
        <Section>
          <Stat>
            <div>
              <i className="vg-coin" /> {me.gold.toLocaleString()}
            </div>
            <span>({me.goldShare}% share)</span>
          </Stat>
          <Stat>
            <div>
              <i className="vg-minion" /> {me.cs}
            </div>
            <span>({me.csMin} cs/min)</span>
          </Stat>
        </Section>
        <Items>
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <Item key={index} type="items" name={me.items[index]} />
            ))}
        </Items>
      </Wrap>
    );
  }
}
