import styled, {css} from "styled-components";
import AssetLoader from "../../common/AssetLoader";
import {Others} from "./HeroBox.style";

export const Each = styled.div`
  width: 90px;
  text-align: center;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: column;
  ${props => {
    if (props.rank === 1) {
      return css`
        order: 2;
      `
    }
    if (props.rank === 2) {
      return css`
        order: 1;
      `
    }
    if (props.rank === 3) {
      return css`
        order: 3;
      `
    }
  }}

  ${Others} &{
    flex-direction: row;
    width: 100%;
    justify-content: flex-start;
    align-items: center;
    padding:7px 30px;
    box-sizing: border-box;
    &:nth-child(odd) {
      background: ${props => props.theme.background.boxOdd};
    }
  }
`;

export const HeroImage = styled(AssetLoader)`
  width: 50px;
  margin-top: auto;
  position: relative;
  height: 50px;
  background-size: 100%;
  background-color: ${props => props.theme.background.matchAvatar};
  flex-shrink: 0;
  flex-grow: 0;
  border: 2px solid ${props => props.theme.background.matchAvatarBorder};
  border-radius: 50%;
  ${props => (
    props.rank === 1 && css`
      width: 65px;
      height: 65px;
    `
  )}

  ${Others} &{
    width: 40px;
    height: 40px;
    margin-right: 5px;
  }
`

export const HeroTag = styled.div`
  position: absolute;
  top: -5px;
  left: -5px;
  display: block;
  width: 23px;
  font-size: 14px;
  color: ${props => props.theme.background.white};
  height: 23px;
  box-sizing: border-box;
  padding: 4px;
  border-radius: 50%;
  background: rgb(73, 73, 73);
  ${props => {
  if (props.rank === 1) {
    return css`
      width: 25px;
      height: 25px;
      font-size: 14px;
      background: ${props => props.theme.background.buildsAbilityCssBackground};
    `
  }
  if (props.rank === 2) {
    return css`
      background: ${props => props.text[300]};
    `
  }
  if (props.rank === 3) {
    return css`
      background: #A54916;
    `
  }
  }}
`

export const Name = styled.div`
  text-align: center;
  margin-top: 5px;
  font-size: 13px;
  font-family: ${props => props.theme.font.highlight}, sans-serif;
  font-weight: bold;
  color: ${props => props.theme.background.overviewPlayerName};
  ${Others} &{
    margin-top: 0;
  }
`

export const Percentage = styled.div`
  margin: 5px;
  font-size: 13px;
  font-weight: bold;
  ${Others} &{
    margin-left: auto;
  }
`