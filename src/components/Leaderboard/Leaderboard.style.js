import styled, {css} from "styled-components";

import {commonWrapper} from "./../../styles/App.style";

export const Wrapper = commonWrapper.extend`
  width: 100%;
  max-width: 800px;
  margin: 15px auto;
  @media screen and (max-width: 560px) {
    padding: 5px;
  }
`;

export const Filter = styled.div`
  width: 100%;
  margin-bottom: 10px;
  display: flex;
`;

export const FilterCategory = styled.div`
  padding: 5px;
  box-sizing: border-box;
  margin-left: 10px;

  &>h2 {
    margin: 5px;
    padding: 3px 4px;
    border-bottom: 1px solid rgba(234, 203, 93, 1);
    font-size: 14px;
    text-transform: uppercase;
  }
`;

export const FilterOption = styled.div`
  display: inline-block;
  margin: 5px;
  padding: 3px 4px;
  border-radius: 2px;
  cursor: pointer;
  text-transform: uppercase;
  font-size: 12px;
  transition: all 300ms;
  ${props => {
    if (props.active) {
      return css`
        color: rgba(234, 203, 93, 1);
        font-weight: 500;
      `
    }
    return css`
      &:hover {
        background: rgba(0,0,0,0.1);
      }
    `
  }}
`;

export const Content = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: space-around;
`