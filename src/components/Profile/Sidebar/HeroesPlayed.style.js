import styled from "styled-components";

import Box from "./../../common/Box";
import AssetLoader from "./../../common/AssetLoader";
import {SidebarBox} from "./../Profile.style";

export const Wrap = SidebarBox;

export const Content = styled(Box.body)`
  display: flex;
  flex-direction: column;
`;

export const Each = styled.div`
  width: 100%;
  height: 70px;
  padding: 5px 15px;
  box-sizing: border-box;
  background: ${props => props.theme.background.white};
  display: flex;

  align-items: center;
  &:nth-child(2n + 1) {
    background: ${props => props.theme.background.sidebarFriendsNth};
  }
`;

export const HeroImage = styled(AssetLoader)`
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border: 1px solid ${props => props.theme.background.grey};
  border-radius: 50%;
  background-size: 120%;
  background-position: center;
`;

export const Info = styled.div`
  margin-left: 10px;
  width: 85px;
`;

export const Name = styled.div`
  font-weight: 500;
  font-size: 12px;
  padding-bottom: 2px;
  color: ${props => props.text[500]};
`;

export const SubName = styled.div`
  color: ${props => props.theme.background.grey};
  font-size: 11px;
`;

export const Stats = styled.div`
  flex-grow: 1;
  width: 80px;
  text-align: center;
`;

export const KDA = styled.div`
  font-size: 16px;
  font-weight: 500;
  white-space: nowrap;
`;

export const KDADetails = styled.div`
  color: ${props => props.theme.background.grey};
  &span {
    color: ${props => props.text[500]};
    margin:0  5px;
  }
  &span#deaths {
    color: ${props => props.theme.background.red};
  }
`;

export const WR = styled.div`
  width: 90px;
  white-space: nowrap;
  display: flex;
  flex-direction: column;
  justify-content: center;
  &>div {
    font-size: 19px;
    text-align: center;
    font-weight: 500;
  }
  &>span{
  text-align: center;
  font-size: 11px;
}
`;