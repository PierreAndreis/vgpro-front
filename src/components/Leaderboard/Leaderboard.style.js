import styled, { css } from "styled-components";

import { commonWrapper } from "./../../styles/App.style";
import { Box } from "../common/Box";

export const Wrapper = commonWrapper.extend`
  width: 100%;
  max-width: 800px;
  margin: 15px auto;
`;

export const Filter = styled.div`
  width: 100%;
  margin-bottom: 10px;
  display: flex;
  @media screen and (max-width: 500px) {
    display: block;
  }
`;

export const FilterCategory = styled.div`
  margin: 0 5px;
  box-sizing: border-box;
  & > h2 {
    margin: 5px;
    padding: 3px 4px;
    ${"" /* border-bottom: 1px solid ${props => props.theme.primary[400]}; */} font-size: 14px;
    text-transform: uppercase;
  }
  color: ${props => props.theme.text[400]};
`;

// export const FilterOption = styled.div`
//   display: inline-block;
//   margin: 5px;
//   padding: 3px 4px;
//   border-radius: 2px;
//   cursor: pointer;
//   text-transform: uppercase;
//   font-size: 14px;
//   transition: all 300ms;
//   ${props => {
//     if (props.active) {
//       return css`
//         color: ${props => props.theme.primary[400]};
//         font-weight: 500;
//       `
//     }
//     return css`
//       &:hover {
//         background: ${props => transparentize(0.5, props.theme.background.third)};
//       }
//     `
//   }}
// `;

export const InputCategory = FilterCategory.extend`
  margin-left: auto;
  align-self: center;
  position: relative;
  box-sizing: border-box;
`;

export const Input = Box.withComponent("input").extend`
  border: 0;
  max-width: 250px;
  padding: 10px 35px;
  box-sizing: border-box;
  margin: 0 5px;
  color: ${props => props.theme.text[400]};

  @media screen and (max-width: 500px) {
    max-width: 100%;
    width: 100%;
    margin: 0 auto;
  }
`;

export const Icon = styled.div`
  position: absolute;
  z-index: 2;
  cursor: pointer;
  color: ${props => props.theme.text[400]};
  & > i {
    font-size: 18px;
  }
  top: 10px;

  ${props =>
    (props.left &&
      css`
        left: 15px;
      `) ||
    css`
      right: 15px;
    `};
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
