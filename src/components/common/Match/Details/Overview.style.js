import styled, {css} from "styled-components";
import {Link} from "react-router-dom";
import AssetLoader from "../../AssetLoader";

import { transparentize, darken } from 'polished';

const GREEN_GRADIENT = "linear-gradient(-90deg, rgb(110, 243, 92) 0%, rgb(11, 201, 21) 100%)";
const ORANGE_GRADIENT = "linear-gradient(-90deg, rgb(243, 165, 92) 0%, rgb(231, 118, 42) 100%)";
const YELLOW_GRADIENT = "linear-gradient(-90deg, #F3DD5C 0%, #E7AE2A 100%)";
// .Overview-Player-me {
//   background: rgba(230, 194, 86, 0.151) !important;
// }
export const Wrap = styled.section`
  width: 100%;
  display: flex;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Team = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Cell = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-around;
  box-sizing: border-box;
  ${Team}:last-of-type &{
    flex-direction: row-reverse;
    @media screen and (max-width: 768px) {
      flex-direction: row;
    }
  }

  &>div{
    flex-shrink: 0;
    flex-grow: 0;
  }

  
`;

export const CellHeader = Cell.extend`
  height: 25px;
  font-size: 10px;
  text-align: center;
  font-weight: 700;
  color: ${props => props.theme.text[300]};
  text-transform: uppercase;
  
  background: ${props => transparentize(0.5, props.theme.background.slot)};

  span {
    &.win { color: ${props => props.theme.extra.win};}
    &.loss { color: ${props => props.theme.extra.loss};}
  }
`;

export const CellPlayer = Cell.extend`
  height: 65px;
  border-bottom: 1px solid ${props => darken(0.2, props.theme.background.listOdd)};
  transition: all 300ms;
  &:nth-child(odd) {
    background: ${props => props.theme.background.listOdd};
  }
  &:hover {
    background: ${props => props.theme.background.listHover};
  }
`;

export const PlayerInfo = styled.div`
  width: 130px;
  display: flex;
  box-sizing: border-box;
  padding: 2px;
  flex-direction: row;
  ${Team}:last-of-type &{
    flex-direction: row-reverse;
    @media screen and (max-width: 768px) {
      flex-direction: row;
    }
  }
`;


export const PlayerImage = styled.div`
  width: 40px;
  margin-right: 10px;
  ${Team}:last-of-type &{
    @media screen and (max-width: 768px) {
      margin-right: 10px;
      margin-left: 0;
    }
  }
`;

export const PlayerHero = styled(AssetLoader)`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background-size: 140%;
  background-position: center center;
  background-color: ${props => props.theme.background.slot};
  border: 3px solid ${props => props.theme.extra.blueSide};
  position: relative;
  ${Team}:last-of-type &{
    border-color: ${props => props.theme.extra.redSide};
  }
`;

export const PlayerRole = styled.div`
  width: 20px;
  height: 20px;
  position: absolute;
  top: -5px;
  right: -5px;
  border-radius: 50%;
  background-size: 70%;
  background-position: center center;
  background-repeat: no-repeat;
  ${props => {
    if (props.role === "Captain") {
      return css`
        background-color: ${props => props.theme.extra.captain};
        background-image: url("/roles/captain.png");
      `
    };
    if (props.role === "Carry") {
      return css`
        background-color: ${props => props.theme.extra.carry};
        background-image: url("/roles/carry.png");
      `
    }
    if (props.role === "Jungler") {
      return css`
        background-color: ${props => props.theme.extra.jungler};
        background-image: url("/roles/jungler.png");
      `
    }

    if (props.role === "Sub") {
      return css`
        background-color: ${props => props.theme.extra.sub};
        background-image: url("/roles/sub.png");
      `
    }
  }}
`;

export const PlayerDetails = styled.div`
  width: 80px;
  align-self: flex-start;
  ${Team}:last-of-type &{
    text-align: right;
    margin-right: 5px;
    @media screen and (max-width: 768px) {
      text-align: left;
    }
  }
`;

export const PlayerName = styled(Link)`
  width: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  font-size: 12px;
  font-family: ${props => props.theme.font.highlight}, sans-serif;
  font-weight: bold;
  color: ${props => props.theme.text[500]};
`;

export const PlayerKDA = styled.div`
  font-size: 11px;
  color: ${props => props.theme.text[300]};
  &>span {
    color: ${props => props.theme.text[500]};
  }
  &>span.d {
    color: red;
  }
  &>div {
    font-size: 13px;
    color: ${props => props.theme.text.solid};
    font-weight: bold;
  }
`;

export const PlayerItems = styled.div`
  width: 75px;
  flex-wrap: wrap;
  display: flex;
  justify-content: space-between;
  margin-right: 5px;
  ${CellHeader} &{
    justify-content: center;
  }
`;

export const PlayerItem = styled(AssetLoader)`
  width: 23px;
  height: 23px;
  margin: 2px 0;
  flex-shrink: 0;
  background-color: ${props => props.theme.background.slot};
  background-size: 100%;
  border-radius: 50%;
`;

export const PlayerStats = styled.div`
  width: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
`;

export const PlayerGameStats = styled.div`
  display: flex;
  justify-content: center;
`;

export const GameStats = styled.div`
  font-size: 11px;
  color: ${props => props.theme.text[400]};
  font-weight: 500;
  ${props => props.farm && css`
    margin-right: 10px;
    margin-bottom: 5px;
  `}
  &:before {
    content: "";
    display: inline-block;
    vertical-align: center;
    margin-right: 2px;
    width: 10px;
    height: 15px;

    ${props => {
      if (props.farm) {
        return css`
          background: url("/icons/cs.png");
          background-repeat: no-repeat;
          background-position: bottom;
          background-size: 10px 10px;
        `
      }
      if (props.gold) {
        return css`
          background: url("/icons/gold.svg") no-repeat bottom;
          background-size: 10px 10px;
        `
      }
    }}
  }
`

export const PlayerGraph = styled.div`
  width: 100%;
  display: flex;
  margin-top: 1px;
  height: 10px;
  align-items: center;
  &>span {
    font-size: 10px;
    font-weight: bold;
    white-space: nowrap;
    color: ${props => props.theme.text[400]};
    margin-left: 3px;
  }
`;

export const PlayerGraphBar = styled.div`
  width: 75%;
  border-radius: 15px;
  height: 7px;
  position: relative;
  background: ${props => props.theme.background.slot};
  &>div {
    height: 100%;
    border-radius: 15px;
    width: ${props => props.percent};
    transition: all 300ms;

    ${props => {
      
      if (props.type === "taken") {
        return css`
          background-image: ${YELLOW_GRADIENT};
          box-shadow: 0 0 2px #E7AE2A;
        `
      }

      if (props.type === "healing") {
        return css`
          background-image: ${GREEN_GRADIENT};
          box-shadow: 0 0 2px rgb(11, 201, 21);
        `
      }

      return css`
        background-image: ${ORANGE_GRADIENT};
        box-shadow: 0 0 2px rgb(231, 143, 42);
      `
    }}
  }
`;

export const PlayerRank = styled.div`
  width: 30px;
  &>span {
    display: block;
    width: 30px;
    margin-top: -2px;
    background: ${props => props.theme.background.secondary};
    font-size: 10px;
    color: ${props => props.theme.text[400]};
    border: 1px solid ${props => darken(0.3, props.theme.background.secondary)};
    border-radius: 5px;
    text-align: center;
    padding: 3px;
    box-sizing: border-box;
  }
`;

export const PlayerTier = styled(AssetLoader)`
  width: 30px;
  height: 40px;
  background-size: 100%;
  background-repeat: no-repeat;
  border-radius: 50%;
  background-position: center top;
`;


export const CellTeam = Cell.extend`
  width: 100%;
  height: 50px;
  box-sizing: border-box;
  padding: 0 5px;
  margin-top: auto;
  display: flex;
`;

export const Legend = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: auto;
  ${Team}:last-of-type &{
    opacity: 0;
  }
`;

export const LegendBall = styled.div`
  position: relative;
  margin: 1px 0;
  padding-left: 18px;
  height: 13px;
  line-height: 17px;

  font-size: 10px;
  font-weight: 500;
  color: ${props => props.theme.text[300]};
  text-transform: uppercase;
  &:before {
    content: "";
    display: block;
    position: absolute;
    left: -1px;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background-size: 100%;
    ${props => {
      if (props.type === "taken") {
        return css`
          background-image: ${YELLOW_GRADIENT};
          box-shadow: 0 0 2px #E7AE2A;
        `
      }

      if (props.type === "healing") {
        return css`
          background-image: ${GREEN_GRADIENT};
          box-shadow: 0 0 2px rgb(11, 201, 21);
        `
      }

      return css`
        background-image: ${ORANGE_GRADIENT};
        box-shadow: 0 0 2px rgb(231, 143, 42);
      `
    }}
  }
`;

export const TeamStats = styled.div`
  display: flex;
  ${Team}:last-of-type &{
    flex-direction: row-reverse;
    @media screen and (max-width: 768px) {
      flex-direction: row;
    }
  }
  
`;

export const TeamBan = styled(AssetLoader)`
  width: 35px;
  height: 35px;
  background-size: 120%;
  background-position: center;
  border-radius: 50%;
  margin: 0 2px;
  border: 3px solid ${props => props.theme.extra.redSide};
  position: relative;
  ${Team}:last-of-type &{
    border-color: ${props => props.theme.extra.blueSide};
  }

  &:after {
    content: "";
    display: block;
    position: absolute;
    top: 16px;
    right: -8px;
    transform: rotate(120deg);
    width: 50px;
    height: 3px;
    background: ${props => props.theme.extra.redSide};
    ${Team}:last-of-type & {
      background: ${props => props.theme.extra.blueSide};
    }
  }
`;

export const TeamValues = styled.div`
  width: 90px;
  display: flex;
  flex-direction: column;

  margin: 0 10px;

  position: relative;
  padding: 0 5px;
  box-sizing: border-box;

  font-size: 13px;
  color: ${props => props.theme.text[500]};
  &>div:first-of-type {
    border-bottom: 2px solid ${props => props.theme.extra.redSide};
    height: 20px;
    ${Team}:last-of-type &{
      border-bottom-color: ${props => props.theme.extra.blueSide};
    }
  }

  &>div:last-of-type {
    display: flex;
    justify-content: space-around;
  }
`;

export const TeamIcon = styled.div`
  text-align: center;
  &:before {
    content: "";
    display: inline-block;
    vertical-align: center;
    margin-right: 2px;
    width: 10px;
    height: 15px;
    
    background: url("/icons/${props => props.icon}_red.${props => props.ext || "svg"}") no-repeat bottom;
    background-size: 10px 10px;
    ${Team}:last-of-type &{
      background-image: url("/icons/${props => props.icon}_blue.${props => props.ext || "svg"}");
    }
  }
`;

export const TeamScore = styled.div`
  width: 40px;
  color:${props => props.theme.extra.redSide};
  ${Team}:last-of-type &{
    color: ${props => props.theme.extra.blueSide};
  }
  &>div {
    font-size: 25px;
    text-align: center;
    font-weight: 700;
  }
  &>span {
    display: block;
    text-align: center;
    text-transform: uppercase;
    font-weight: 700;
    font-size: 11px;
  }
`;