import styled, {css} from "styled-components";

import {commonWrapper} from "./../../styles/App.style";
import { transparentize } from "polished";

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

  color: ${props => props.theme.text[400]};

  &>h2 {
    margin: 5px;
    padding: 3px 4px;
    border-bottom: 1px solid ${props => props.theme.primary[400]};
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
        color: ${props => props.theme.primary[400]};
        font-weight: 500;
      `
    }
    return css`
      &:hover {
        background: ${props => transparentize(0.5, props.theme.background.third)};
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
`;