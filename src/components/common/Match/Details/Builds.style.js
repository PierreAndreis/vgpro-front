import styled, {css} from "styled-components";
import AssetLoader from "./../../AssetLoader";


export const Wrap = styled.div`
  width: 100%;
  display: flex;
  @media screen and (max-width: 710px) {
    flex-direction: column;
  }
`;

export const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 710px) {
    flex-direction: row;
    flex-grow: 1;
    justify-content: center;
  }
`;

export const Team = styled.div`

`;

export const Player = styled.div`
  padding: 3px 10px;
  display: flex;
  width: 200px;
  cursor: pointer;
  align-items: center;
  box-sizing: border-box;
  transition: all 300ms;
  border-bottom: 1px solid ${props => props.theme.background.builds};
  ${Team}:first-of-type &{
    @media screen and (max-width: 710px) {
      flex-direction: row-reverse;
    }
  }
  ${Team}:last-of-type &:last-of-type{
    @media screen and (min-width: 710px) {
      border-bottom: 0;
    }
  }
  &:hover {
    background: ${props => props.theme.background.buildsHover};
    font-weight: bold;
  }
  &>span {
    overflow: hidden;
    margin: 0 5px;
    text-overflow: ellipsis;
    display: block;
    font-size: 12px;
    font-family: ${props => props.theme.font.highlight}, sans-serif;
    font-weight: 500;
    color: ${props => props.theme.background.buildsSpanColor};
    ${props => props.active &&
    css`
      font-weight: 700;
      color: ${props => props.theme.background.buildsSpanCssColor};
    `}
  }
`;

export const PlayerHero = styled(AssetLoader)`
  width: 30px;
  height: 30px;
  border-radius: 90%;
  background-size: 100%;
  border: 3px solid ${props => props.theme.background.buildsPlayerBorder};
  ${Team}:last-of-type &{
    border-color: ${props => props.theme.background.buildsPlayerLastBorder};
  }
`;

export const Content = styled.section`
  border-left: 1px solid ${props => props.theme.background.buildsContentBorder};
  padding-left: 20px;
  flex-grow: 1;
  box-sizing: border-box;
  &>h2 {
      font-size: 15px;
      padding-bottom: 5px;
      color: ${props => props.theme.background.buildsContentH2Color};
      margin: 0;
      text-transform: uppercase;
      font-weight: 700;
      width: 100%;
      border-bottom: 1px solid ${props => props.theme.background.buildsContentH2Color};
  }
`;

export const Abilities = styled.div`
  text-align: center;
`;

export const AbilitiesGrid = styled.div`
  display: inline-block;
  margin: 0 auto;
`;

export const AbilitiesRow = styled.div`
  display: flex;
  align-items: stretch;
  flex-grow: 0;
  height: 25px;
  margin: 2px 0;
  &>span {
    font-size: 11px;
    color: ${props => props.theme.background.grey};
    display: flex;
    align-items: center;
    justify-content: flex-end;

    padding: 0 5px;
    box-sizing: border-box;
    text-align: right;
    width: 90px;
    text-transform: uppercase;
    @media screen and (max-width: 710px) {
      display: none;
    }
  }
`;

export const AbilityLevel = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 100%;
  box-sizing: border-box;
  font-size: 13px;

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0;
  color: ${props => props.text[100]};
  background-color: ${props => props.text[100]};
  border: 1px solid ${props => props.theme.background.buildsAbilityBorder};
  background-size: 100%;
  margin: 0 2px;
  @media screen and (max-width: 710px) {
    width: 20px;
    height: 20px;
    font-size: 11px;
    border-radius: 50%;
    margin: 1px;
  }
  ${props => props.active &&
  css`
    font-size: 13px;
    font-weight: 500;
    color: ${props => props.theme.background.white};
    background-color: ${props => props.theme.background.buildsAbilityCssBackground};
  `}
  }
`;

export const AbilitiesLabel = AbilityLevel.withComponent(AssetLoader).extend`
  border-radius: 5px;
  border: 0;
`;

export const Builds = styled.div`
  display: flex;
  padding: 5px;
  box-sizing: border-box;
  flex-wrap: wrap;
`;

export const BuildGroup = styled.div`
  margin: 0 5px 5px;
  box-sizing: border-box;
  background: ${props => props.text[100]};
  border: 1px solid ${props => props.theme.background.buildsGroupsBorder};
  &>span {
    display: block;
    background: ${props => props.theme.background.buildsGroupsSpanBackground};
    font-size: 12px;
    font-weight: 400;
    padding: 5px;
    text-transform: uppercase;
    text-align: center;
    color: ${props => props.theme.background.white};
  }
`;

export const BuildItems = styled.div`
  padding: 5px;
  display: flex;
  justify-content: space-around;
`;

export const BuildItem = styled(AssetLoader)`
  width: 30px;
  height: 30px;
  background-size: 100%;
  border-radius: 50%;
  position: relative;
  &>span {
    position: absolute;
    top: -3px;
    right: -3px;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    font-size: 12px;
    text-align: center;
    background: ${props => props.theme.background.buildsItemSpanBackground};
    color: ${props => props.theme.background.white};
  }
`