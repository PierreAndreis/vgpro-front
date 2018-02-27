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
  color: ${props => props.theme.background.black};
  width: 100%;
  height: 40px;
  padding: 5px 15px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 300ms;
  &:nth-child(2n + 1) {
    background: ${props => props.theme.background.sidebarFriendsNth};
  }
  &:hover {
    background: ${props => props.theme.background.sidebarFriendsHover};
  }
`;

export const Name = styled.div`
  font-size: 13px;
  color: ${props => props.theme.background.sidebarFriendsName};
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
    color: ${props => props.theme.background.sidebarFriendsStats};
  }
`;