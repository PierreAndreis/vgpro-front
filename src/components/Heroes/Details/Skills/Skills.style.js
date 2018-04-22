import styled, { css } from "styled-components";
import { Box } from "../../../common/Box";
import AssetLoader from "../../../common/AssetLoader";

export const Sidebar = styled.div`
  width: 100%;
  ${'' /* background: red; */}
`;

export const Content = styled.div`
  width: 100%;
  ${'' /* background: blue; */}
  grid-column: 2 / 4;
  grid-row: 1 / 1;
`;

// Sidebar

export const Category = Box.extend`
  padding: 10px;
  width: 100%;
  border-left: 5px solid transparent;
  cursor: pointer;

  ${props => props.active && css`
    border-left-color: ${props => props.theme.primary[300]};
  `}

  &>div {
    display: flex;
    justify-content: center;
    margin: 15px 0;
  }

  &>section {
    display: flex;
    justify-content: space-around;
    text-align: center;
    b {
      display: block;
    }
    &>div>span {
      font-family: ${props => props.theme.font.highlight};
      color: ${props => props.theme.text[400]};
      font-size: 12px;
      text-transform: uppercase;
      font-weight: 400;
      
    }
  }

`;

export const CategorySkills = styled(AssetLoader)`
  width: 55px;
  height: 55px;
  background-size: 100%;
  background-color: ${props => props.theme.background.slot};
  border-radius: 20px;
  margin-right: 35px;
  position: relative;

  &:after {
    display: block;
    position: absolute;
    right: -25px;
    color: ${props => props.theme.text[100]};
    font-family: "FontAwesome";
    font-size: 45px;
    ${'' /* line-height: 50px; */}
    content: "\f105"; 
  }

  &:last-of-type {
    margin-right: 0;
    &:after {
      display: none;
    }
  }
`

// Content

export const Each = Box.extend`
  width: 100%;
  padding: 15px;
  box-sizing: border-box;
  flex-direction: row;
  justify-content: center;
  @media screen and (max-width: 950px) {
    flex-direction: column;
  }

  &>section {
    flex-grow: 1;
    display: flex;
    justify-content: space-around;
    text-align: center;
    align-items: center;

    b {
      display: block;
    }
    &>div>span {
      font-family: ${props => props.theme.font.highlight};
      color: ${props => props.theme.text[400]};
      font-size: 12px;
      text-transform: uppercase;
      font-weight: 400;
      
    }
  }
`;

export const SkillOrder = styled.div`
  display: flex;
  justify-content: center;
  font-size: 13px;
  color: ${props => props.theme.text[300]};
  text-align: center;
`;

export const Order = styled(AssetLoader)`
  width: 30px;
  height: 30px;
  border: 2px solid ${props => props.theme.background.slotBorder};
  border-radius: 50%;
  margin: 2px;
  line-height: 32px;
  font-size: 16px;
  text-transform: uppercase;
  background-size: 100%;

  @media screen and (max-width: 750px) {
    width: 25px;
    height: 25px;
    line-height: 25px;
    font-size: 16px;
    border: 1px solid ${props => props.theme.background.slotBorder};
  }
`;