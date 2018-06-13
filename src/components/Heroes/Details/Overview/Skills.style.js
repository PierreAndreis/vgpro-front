import styled, { css } from "styled-components";
import AssetLoader from "../../../common/AssetLoader";

export const AbilitiesGrid = styled.div`
  margin: 10px auto;
`;

export const AbilitiesRow = styled.div`
  display: flex;
  align-items: stretch;
  ${"" /* margin: 2px 0; */} &>span {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    width: 15px;

    padding: 0 2px;
    box-sizing: border-box;

    text-align: right;
    text-transform: uppercase;
    font-size: 11px;
    display: none;
    color: ${props => props.theme.text[300]};
  }
`;

export const AbilityLevel = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 100%;
  box-sizing: border-box;
  font-size: 11px;

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0;
  color: ${props => props.theme.text[100]};
  background-color: ${props => props.theme.text[100]};
  border: 1px solid ${props => props.theme.background.third};
  background-size: 100%;
  margin: 2px;

  flex-stretch: 0;
  flex-grow: 0;

  ${props =>
    props.active &&
    css`
      font-size: 13px;
      font-weight: 500;
      color: white;
      background-color: ${props => props.theme.primary[400]};
    `}
  }
`;

export const AbilitiesLabel = AbilityLevel.withComponent(AssetLoader)
  .extend`
  border-radius: 5px;
  border: 0;
`;

export const Stats = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: space-around;
  text-align: center;
  align-items: center;

  b {
    display: block;
  }

  & > div > span {
    font-family: ${props => props.theme.font.highlight};
    color: ${props => props.theme.text[400]};
    font-size: 12px;
    text-transform: uppercase;
    font-weight: 400;
  }
`;
