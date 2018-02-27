import styled, {css} from "styled-components";
import {Link} from "react-router-dom";
import AssetLoader from "../../common/AssetLoader";

export const Wrapper = styled(Link)`
  width: 100%;
  height: 45px;
  color: ${props => props.theme.background.black};
  display: flex;
  transition: background-color 0.2s;
  flex-direction: space-between;
  align-items: center;
  &:nth-child(even) {
    background: ${props => props.theme.background.boxOdd};
  }
  &:hover {
    background-color: ${props => props.theme.background.feedWrapperHover};
  }
`;

export const Status = styled.div`
  width: 6px;
  height: 85%;
  border-radius: 15px;
  ${props => {
    if (typeof props.winner === "undefined") {
      return css`
        background: ${props => props.theme.background.grey};
      `
    }
    if (props.winner) {
      return css`
        background: ${props => props.theme.background.feedStatusWinner};
      `
    }
    else return css`
      background: ${props => props.theme.background.feedStatusLoser};
    `
  }}
`

export const PlayerInfo = styled.div`
  display: flex;
  width: 140px;
  justify-content: space-around;
  align-items: center;
  padding-left: 2px;
`;

export const PlayerPicture = styled.div`
  width: 30px;
  height: 30px;
  background: ${props => props.theme.background.feedPlayerPictureBackground};
  background-size: 180%;
  background-position: center 4%;
  border-radius: 100%;
  ${props => props.playerName && css`
    background-image: url(/players/${props.playerName}.png)
  `}
`;

export const PlayerDetails = styled.div`
  width: 80px;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  font-family: ${props => props.theme.font.highlight}, sans-serif;
  div {
    color: ${props => props.theme.background.leadMemberName};
    font-weight: 100;
    font-size: 13px;
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    >span {
      text-transform: uppercase;
      font-size: 12px;
      font-weight: 100;
      color: ${props => props.theme.background.leadMemberNameSpan};
    }
  }
  span {
    font-weight: 100;
    margin-top: 1px;
    font-size: 10px;
    color: ${props => props.theme.background.feedPlayerDetailsSpan}
  }
`;

export const Game = styled.div`
  display: flex;
  width: 80px;
  justify-content: space-between;
  align-items: center;
  padding-left: 2px;
`;

export const GameHero = styled(AssetLoader)`
  width: 25px;
  height: 25px;
  background-color: ${props => props.theme.background.grey};
  background-size: 130%;
  background-position: center;
  border-radius: 50%;
  position: relative;
`;

export const GameRole = styled.div`
  width: 12px;
  height: 12px;
  background-size: 70%;
  background-repeat: no-repeat;
  background-position: center center;
  border-radius: 50%;

  position: absolute;
  top: -5px;
  left: -5px;
  ${props => {
    if (props.role === "Captain") {
      return css`
        background-color: ${props => props.theme.background.overviewPlayerRoleCaptain};
        background-image: url("/roles/captain.png");
      `
    };
    if (props.role === "Carry") {
      return css`
        background-color: ${props => props.theme.background.overviewPlayerRoleCarry};
        background-image: url("/roles/carry.png");
      `
    }
    if (props.role === "Jungler") {
      return css`
        background-color: ${props => props.theme.background.overviewPlayerRoleJungler};
        background-image: url("/roles/jungler.png");
      `
    }

    if (props.role === "Sub") {
      return css`
        background-color: ${props => props.theme.background.overviewPlayerRoleSub};
        background-image: url("/roles/sub.png");
      `
    }
  }}
`;

export const GameKDA = styled.div`
  width: 60px;
  font-size: 12px;
  white-space: nowrap;
  text-align: center;
`;

export const Items = styled.div`
  display: flex;
  width: 80px;
  height: 85%;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

export const Item = styled(AssetLoader)`
  width: 19px;
  height: 19px;
  background: ${props => props.theme.background.feedItem};
  border-radius: 50%;
  margin: 0 1px;
  background-size: 100%;
`;

export const Arrow = styled.div`
  width: 15px;
  height: 100%;
  color: ${props => props.theme.background.feedArrow};
  font-size: 35px;
  padding-right: 2px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;