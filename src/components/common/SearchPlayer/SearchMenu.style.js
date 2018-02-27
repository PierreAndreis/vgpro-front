import styled from "styled-components";
import Box from "../Box";

export const SearchMenu = styled(Box.wrap)`
  position: absolute;
  z-index: 99;
  margin: 10px 5px;
  padding: 15px;
  box-sizing: border-box;
  border-radius: 5px;
  width: 100%;
`;

export const Category = styled.div`
  width: 100%;
  h1 {
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


export const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  >a {
    width: 155px;
    padding: 10px;
    box-sizing: border-box;
    margin: 2px 2px;
    position: relative;
    font-size: 15px;
    font-family: ${props => props.theme.font.highlight}, sans-serif;
    font-weight: 600;
    color: ${props => props.theme.background.overviewPlayerName};
    cursor: pointer;
    &:hover {
      background-color: ${props => props.theme.background.searchMenuContentHover};
    }
    >span {
      position: absolute;
      right: 5px;
      font-size: 15px;
      color: ${props => props.theme.background.searchMenuContentSpan};
    }
    @media screen and (max-width: 700px) {
      flex-grow: 1;
    }
  }
`;