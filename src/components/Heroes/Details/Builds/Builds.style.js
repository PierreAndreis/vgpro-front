import AssetLoader from "../../../common/AssetLoader";
import styled, { css } from "styled-components";
import { Box } from "../../../common/Box";

export const Sidebar = styled.div`
  width: 100%;
  font-size: 13px;
  color: ${props => props.theme.text[400]};
`;

export const Content = styled.div`
  width: 100%;
  grid-column: 2 / 4;
  grid-row: 1 / 1;

  display: flex;
  flex-wrap: wrap;
  align-items: center;

  @media screen and (max-width: 450px) {
    justify-content: center;
  }
`;

export const BuildBox = Box.extend`
  margin: 5px;
  width: auto;
`;

export const Builds = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  box-sizing: border-box;
`;

export const Description = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  color: ${props => props.theme.text[300]};
  justify-content: center;
  flex-direction: row;
  & > div {
    width: 55px;
    text-align: center;
  }
  & > div > div {
    font-size: 18px;
  }
  & > div > span {
    color: ${props => props.theme.text[400]};
    font-size: 10px;
    text-transform: uppercase;
    font-weight: 400;
  }
`;

export const Item = styled(AssetLoader)`
  background-size: 110%;
  background-position: center center;
  background-color: ${props => props.theme.background.slot};
  border: 1px solid ${props => props.theme.background.slotBorder};

  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin: 2px;

  position: relative;

  @media screen and (max-width: 450px) {
    width: 30px;
    height: 30px;
  }
`;

export const SubtitleItem = styled(AssetLoader).attrs({
  type: "items",
})`
  display: inline-block;
  background-size: 110%;
  background-position: center center;
  background-color: ${props => props.theme.background.slot};
  position: relative;

  width: 17px;
  height: 17px;
  border-radius: 50%;

  ${props =>
    props.big &&
    css`
      width: 20px;
      height: 20px;
      top: 3px;
    `};
`;
