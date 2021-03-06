import styled, { css } from "styled-components";
import Box from "./../common/Box";
import AssetLoader from "./../common/AssetLoader";
import { transparentize } from "polished";

export const Wrapper = styled(Box.wrap)`
  width: 100%;
  margin: 3px 0;
  animation-delay: ${props => props.animationDelay * 100}ms;
`;

export const Body = styled(Box.body)`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 60px;
  padding: 2px 15px;
  justify-content: space-around;
  /* margin: 2px 0; */
  box-sizing: border-box;
  color: ${props => props.theme.text[300]};
  > div {
    flex-shrink: 0;
  }
  ${props =>
    props.me &&
    css`
      background: linear-gradient(
        -90deg,
        ${transparentize(0.7, props.theme.primary[400])} 0%,
        ${transparentize(1, props.theme.primary[400])} 100%
      );
    `};
`;

export const Position = styled.div`
  font-size: 15px;
  color: ${props => props.theme.primary[400]};
  font-weight: 500;
  width: 30px;
`;

export const Tier = styled(AssetLoader)`
  width: 45px;
  display: inline-block;
  height: 35px;
  background-size: 70%;
  background-position: top middle;
  ${"" /* background-color: red; */} background-repeat: no-repeat;
`;

export const PlayerInfo = styled.div`
  width: 130px;
  display: inline-block;
  span {
    font-size: 12px;
    color: ${props => props.theme.text[400]};
  }
  @media screen and (max-width: 560px) {
    width: 100px;
  }
`;

export const PlayerName = styled.div`
  font-size: 15px;
  font-family: ${props => props.theme.font.highlight}, sans-serif;
  font-weight: bold;
  color: ${props => props.theme.text[400]};
  margin-bottom: 1px;
  span {
    font-size: 9px;
    color: ${props => props.theme.text[300]};
    text-transform: uppercase;
    font-weight: 300;
  }

  @media screen and (max-width 560px) {
    font-size: 13px;
  }
`;

export const Points = styled.div`
  width: 50px;
  text-align: center;
  & > div {
    font-size: 21px;
    @media screen and (max-width: 560px) {
      font-size: 18px;
    }
  }
  & > span {
    font-size: 11px;
    text-transform: uppercase;
    color: ${props => props.theme.text[500]};
    @media screen and (max-width: 560px) {
      font-size: 9px;
    }
  }
  @media screen and (max-width: 560px) {
    order: 3;
    width: 40px;
    flex-grow: 1;
  }
`;

export const GameInfo = styled.div`
  width: 130px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Chart = styled.div`
  width: 60px;
  span {
    font-size: 9px;
    font-weight: 500;
  }
`;

export const Rates = styled.div`
  font-size: 13px;
  font-weight: 500;
  width: 100px;
  & > div {
    white-space: nowrap;
  }
`;

export const RateLabel = styled.span`
  padding-left: 10px;
  display: inline-block;
  width: 25px;
  &:before {
    content: "";
    display: inline-block;
    width: 10px;
    height: 10px;
    margin-right: 2px;
    border-radius: 50%;
  }

  ${props => {
    if (props.label === "w") {
      return css`
        color: ${props => props.theme.extra.win};
        :before {
          background: ${props => props.theme.extra.win};
        }
      `;
    }
    if (props.label === "l") {
      return css`
        color: ${props => props.theme.extra.loss};
        :before {
          background: ${props => props.theme.extra.loss};
        }
      `;
    }
  }};
`;

export const Heroes = styled.div`
  display: flex;
  width: 150px;
  @media screen and (max-width: 560px) {
    display: none;
  }
`;

export const Hero = styled(AssetLoader)`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  margin: 0 2px;
  border: 1px solid ${props => props.theme.background.slotBorder};
  background-color: ${props => props.theme.background.slot};
  background-size: 120%;
  background-position: center center;
`;
