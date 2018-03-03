import styled, {css} from "styled-components";
import { transparentize } from 'polished';

export const Container = styled.div`
  width: 98%;
  min-height: 140px;;
  margin: 0 auto;
  margin-top: -10px;
  padding: 15px 5px 5px;
  box-sizing: border-box;
  background: ${props => props.theme.background.box};
  border-radius: 0 0 5px 5px;
  box-shadow: ${props => props.theme.shadow} 0 0px 30px 0;
  animation-name: slideInDown;
  animation-duration: 1s;
  animation-fill-mode: both;
  position: relative;
  z-index: 1;
`;

export const Tabs = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 10px;
  box-sizing: border-box;
`;

export const TabOption = styled.div`
  margin-right: 10px;

  text-transform: uppercase;
  font-size: 12px;
  color: ${props => props.theme.text[500]};
  font-weight: 700;
  cursor: pointer;

  padding: 5px;
  border-radius: 5px;
  transition: all 300ms;
  ${props => (
    (props.active && css`
    color: ${props => props.theme.primary[400]};
    `) || css`
      &:hover{
        background: ${props => transparentize(0.8, props.theme.background.third)};
      }
    `
  )}

  &:last-of-type {
    margin-right: 0;
  }
`