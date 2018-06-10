import styled from "styled-components";

import Box from "./../../common/Box";
import AssetLoader from "./../../common/AssetLoader";
import { SidebarBox } from "./../Profile.style";
import Link from "react-router-dom/Link";

export const Wrap = SidebarBox;

export const Content = styled(Box.body)`
  display: flex;
  flex-direction: column;
`;

export const Each = styled(Link)`
  width: 100%;
  height: 70px;
  padding: 5px 15px;
  box-sizing: border-box;
  display: flex;

  align-items: center;
  &:nth-child(2n + 1) {
    background: ${props => props.theme.background.listOdd};
  }
  &:hover {
    background: ${props => props.theme.background.listHover};
  }
`;

export const HeroImage = styled(AssetLoader)`
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border: 1px solid ${props => props.theme.background.slotBorder};
  border-radius: 50%;
  background-color: ${props => props.theme.background.slot};
  background-size: 120%;
  background-position: center;
`;

export const Info = styled.div`
  margin-left: 10px;
  width: 85px;
  color: ${props => props.theme.text[300]};
`;

export const Name = styled.div`
  font-weight: 500;
  font-size: 12px;
  padding-bottom: 2px;
  color: ${props => props.theme.text[500]};
`;

export const SubName = styled.div`
  color: ${props => props.theme.background.grey};
  font-size: 11px;
`;

export const Stats = styled.div`
  flex-grow: 1;
  width: 80px;
  color: ${props => props.theme.text[300]};
  text-align: center;
`;

export const KDA = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: ${props => props.theme.text.solid};
  white-space: nowrap;
`;

export const KDADetails = styled.div`
  color: ${props => props.theme.text[300]};
  & > span {
    color: ${props => props.theme.text[500]};
    margin: 0 5px;
  }
  & > span#deaths {
    color: red;
  }
`;

export const WR = styled.div`
  width: 90px;
  white-space: nowrap;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: ${props => props.theme.text[300]};
  & > div {
    font-size: 19px;
    text-align: center;
    font-weight: 500;
  }
  & > span {
    text-align: center;
    font-size: 11px;
  }
`;
