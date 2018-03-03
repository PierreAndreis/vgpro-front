import styled from "styled-components";
import {Link} from "react-router-dom";

import {SidebarBox} from "./../Profile.style";
import Box from "./../../common/Box";

export const Wrap = SidebarBox;

export const Content = styled(Box.body)`
  width: 100%;
  font-size: 10px;
`;

export const Each = styled(Link)`
  color: ${props => props.theme.text[500]};
  width: 100%;
  height: 40px;
  padding: 5px 15px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 300ms;
  &:nth-child(2n + 1) {
    background: ${props => props.theme.background.listOdd};
  }
  &:hover {
    background: ${props => props.theme.background.listHover};
  }
`;

export const Name = styled.div`
  font-size: 13px;
  font-family: ${props => props.theme.font.highlight}, sans-serif;
  color: ${props => props.theme.text[500]};
  width: 140px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Stats = styled.div`
  text-align: center;
  width: 50px;
  &>span{
    display:block;
    font-size: 11px;
  }
  &>div{
    font-size: 10px;
    color: ${props => props.theme.text[400]};
  }
`;