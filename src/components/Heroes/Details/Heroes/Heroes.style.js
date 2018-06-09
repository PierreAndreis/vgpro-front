import styled, { css } from "styled-components";
import AssetLoader from "../../../common/AssetLoader";
import Button from "../../../common/Button";

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
  }
`;

export const BackButton = styled(Button)`
  margin: 0 2px;
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;

  & > section {
    height: 400px;
    overflow-y: scroll;
    &:first-of-type {
      height: auto;
      overflow: auto;
    }
  }
`;

export const ListRow = styled.div`
  display: flex;
  justify-content: space-around;
  color: ${props => props.theme.text[400]};
  align-items: center;
  padding: 15px 15px;
  flex-grow: 0;
  flex-shrink: 0;
  height: 45px;
  box-sizing: border-box;

  cursor: pointer;

  &:nth-child(odd) {
    background: ${props => props.theme.background.listOdd};
  }

  &:hover {
    background: ${props => props.theme.background.listHover};
  }

  & > span {
    ${"" /* Rate */};
    width: 70px;
    text-align: center;
  }

  ${List}>section:first-of-type & {
    font-size: 11px;
    font-weight: bold;
    height: 30px;
    text-transform: uppercase;
    background: none;
    cursor: none;
  }
`;

export const HeroImage = styled(AssetLoader)`
  background-size: 120%;
  background-position: center center;
  background-color: ${props => props.theme.background.slot};
  border: 1px solid ${props => props.theme.background.slotBorder};
  width: 60px;
  height: 60px;
  border-radius: 100%;
  width: 30px;
  height: 30px;
  ${List}>section:first-of-type & {
    height: 0;
    background: 0;
    border: 0;
  }
`;

export const Info = styled.div`
  width: 100px;
  font-size: 15px;
  font-family: ${props => props.theme.font.highlight};
  font-weight: 700;
  margin-left: 10px;
  ${List}>section:first-of-type & {
    font-size: 12px;
    font-family: inherit;
  }
`;

export const Search = styled.input.attrs({
  type: "text",
})`
  width: 80%;
  height: 30px;
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.1);
  padding: 5px 15px;
  border-radius: 30px;
  border: 0;
  outline: 0;
  margin: 15px auto;
  &:focus {
    outline: 0;
  }
`;
