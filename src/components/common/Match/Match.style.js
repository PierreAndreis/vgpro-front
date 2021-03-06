import styled, { injectGlobal } from "styled-components";
import Box from "./../Box";
import AssetLoader from "./../AssetLoader";

export const Match = styled(Box.wrap)`
  width: 100%;
  height: 140px;
  margin: 10px 0;
  border-left: 6px solid ${props => props.theme.extra.win};
  border-left-color: ${props =>
    props.winner ? props.theme.extra.win : props.theme.extra.loss};
  position: relative;
  z-index: 2;
  transition: all cubic-bezier(0.075, 0.82, 0.165, 1) 500ms;
  cursor: pointer;

  animation-delay: ${props => props.animationDelay * 100}ms;

  &:hover {
    transform: scale(1.01);
    background: ${props => props.theme.background.boxHover};
  }
`;

export const MatchBody = styled.div`
  display: flex;
  flex-direction: row;
  height: 140px;
  justify-content: center;
  align-items: center;
  padding: 15px 20px;
  box-sizing: border-box;
`;

export const Avatar = styled(AssetLoader)`
  width: 90px;
  height: 90px;
  flex-shrink: 0;
  border-radius: 50%;
  background: ${props => props.theme.background.slot};
  border: 2px solid ${props => props.theme.background.slotBorder};
  background-size: 100%;
  position: relative;
  .PlayerMatch-Avatar-Role {
    background: ${props => props.theme.background.slot};
    width: 35px;
    height: 35px;
    top: -8px;
    right: -8px;
    border-radius: 50%;
    position: absolute;
    background-size: 70%;
    background-repeat: no-repeat;
    background-position: center center;
    &#captain {
      background-color: ${props => props.theme.extra.captain};
      background-image: url("/roles/captain.png");
    }

    &#carry {
      background-color: ${props => props.theme.extra.carry};
      background-image: url("/roles/carry.png");
    }

    &#jungler {
      background-color: ${props => props.theme.extra.jungler};
      background-image: url("/roles/jungler.png");
    }
  }

  @media screen and (max-width: 660px) {
    width: 55px;
    height: 55px;
    .PlayerMatch-Avatar-Role {
      width: 25px;
      height: 25px;
      top: -4px;
      right: -4px;
    }
  }

  @media screen and (max-width: 460px) {
    width: 45px;
    height: 45px;
    .PlayerMatch-Avatar-Role {
      width: 20px;
      height: 20px;
      top: -4px;
      right: -4px;
    }
  }
`;

/** MATCH INFO */

export const MatchInfo = styled.div`
  width: 160px;
  flex-grow: 1;
  box-sizing: border-box;
  padding-left: 20px;
  h2 {
    margin: 0;
    color: ${props => props.theme.text[500]};
    text-transform: uppercase;
    font-size: 16px;
  }
  @media screen and (max-width: 1290px) {
    width: 130px;
  }

  @media screen and (max-width: 1068px) {
    h2 {
      font-size: 14px;
    }
  }
  @media screen and (max-width: 725px) {
    padding-left: 10px;
  }
  @media screen and (max-width: 590px) {
    width: 90px;
  }
`;

export const MatchTime = styled.div`
  color: ${props => props.theme.text[300]};
  font-size: 13px;
  white-space: nowrap;
  margin-bottom: 5px;
  @media screen and (max-width: 1068px) {
    font-size: 11px;
  }
  @media screen and (max-width: 450px) {
    white-space: nowrap;
  }
`;

export const MatchDuration = MatchTime.extend`
  &:before {
    content: "";
    display: inline-block;
    vertical-align: bottom;
    width: 15px;
    height: 15px;
    margin-right: 2px;

    background: url("/icons/time.svg") no-repeat bottom;
    background-size: 13px 13px;
  }
`;

export const MatchKDA = styled.div`
  color: ${props => props.theme.text[300]};
  font-size: 14px;
  @media screen and (max-width: 1068px) {
    font-size: 13px;
  }
  span {
    margin-right: 3px;
  }
  span.k {
    color: ${props => props.theme.text.solid};
  }
  span.death {
    color: red;
  }
`;

export const MatchKDAText = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: ${props => props.theme.text.solid};
  @media screen and (max-width: 450px) {
    font-size: 14px;
  }
`;

// ===== STATS ======

export const MatchStats = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 3;
  flex-shrink: 0;
  align-items: center;
`;

export const MatchVariables = styled.div`
  flex-grow: 2;
  width: 90px;
  display: flex;
  text-align: center;
  justify-content: center;
  flex-wrap: wrap;
  font-size: 13px;
  color: ${props => props.theme.text[300]};
  > div {
    width: 90px;
    margin: 0 5px;
  }
  @media screen and (max-width: 500px) {
    width: 90px;
  }
  @media screen and (max-width: 880px) and (min-width: 590px) {
    flex-direction: column;
    & > div {
      width: 100%;
      flex-wrap: nowrap;
    }
  }
  @media screen and (max-width: 400px) {
    width: 75px;
    font-size: 10px;
  }
`;

export const Gold = styled.div`
  > div {
    font-size: 110%;
    white-space: nowrap;
    color: ${props => props.theme.text[400]};
    font-weight: 500;
    &:after {
      content: "";
      display: inline-block;
      vertical-align: bottom;
      margin-left: 5px;
      width: 15px;
      height: 20px;

      background: url("/icons/gold.svg") no-repeat bottom;
      background-size: 15px 15px;
    }
  }
`;

export const CS = styled.div`
  > div {
    font-size: 110%;
    color: ${props => props.theme.text[400]};
    font-weight: 500;
    &:after {
      content: "";
      display: inline-block;
      vertical-align: bottom;
      margin-left: 5px;
      width: 15px;
      height: 20px;

      background: url("/icons/cs.png");
      background-repeat: no-repeat;
      background-position: bottom;
      background-size: 100%;
    }
  }
`;

export const Items = styled.div`
  width: 130px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 400px) {
    width: 90px;
  }
`;

export const Item = styled(AssetLoader)`
  width: 35px;
  height: 35px;
  margin: 3px;
  border-radius: 50%;
  background: ${props => props.theme.background.slot};
  border: 1px solid ${props => props.theme.background.slotBorder};
  background-size: 100%;
  @media screen and (max-width: 400px) {
    width: 20px;
    height: 20px;
  }
`;

// ==== PLAYERS =====

export const Players = styled.div`
  min-width: 240px;
  width: 300px;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  @media screen and (max-width: 1298px) {
    width: 250px;
  }
  @media screen and (max-width: 650px) {
    display: none;
  }
`;

export const PlayersTeam = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;

export const Player = styled.div`
  margin: 0.5px 0;
  width: 100%;
  text-align: right;
  display: flex;
  flex-direction: row-reverse;
  font-size: 12px;
  align-items: center;
  ${PlayersTeam}:last-of-type & {
    text-align: left;
    flex-direction: row;
  }
  a {
    color: ${props => props.theme.text[400]};
    width: 100px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    transition: all 300ms;
    &:hover {
      color: ${props => props.theme.text.solid};
    }
    b {
      color: ${props => props.theme.primary[400]};
    }
  }
`;

export const PlayerHero = styled(AssetLoader)`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${props => props.theme.background.slot};
  margin: 0 3px;
  border: 2px solid ${props => props.theme.extra.blueSide};
  background-size: 120%;
  background-position: center center;
  ${PlayersTeam}:last-of-type & {
    border-color: ${props => props.theme.extra.redSide};
  }
`;

export const MatchBadge = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 40px;
  height: 20px;
  background: ${props =>
    props.win ? props.theme.extra.win : props.theme.extra.loss};
  font-size: 12px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  margin-bottom: auto;
  border-radius: 30px;
`;

export const MatchMVP = styled.div`
  position: absolute;
  top: 10px;
  right: 60px;
  width: 40px;
  height: 20px;
  background: ${props => props.theme.primary[400]};
  font-size: 12px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  margin-bottom: auto;
  border-radius: 30px;
`;

injectGlobal`
  .Matches_Buttons {
    width: 100%;
    display: flex;
    justify-content: space-around;
  }
`;
