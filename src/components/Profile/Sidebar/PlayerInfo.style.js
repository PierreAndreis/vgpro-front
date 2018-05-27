import styled from "styled-components";

import { SidebarBox } from "./../Profile.style";
import Box from "./../../common/Box";
import AssetLoader from "./../../common/AssetLoader";

export const Wrap = SidebarBox.extend`
  height: auto;
`;

export const Content = styled(Box.body)`
  width: 100%;
  padding: 10px;
  flex-grow: 1;
  box-sizing: border-box;
`;

export const Divider = styled.div`
  width: 100%;
  height: 0;
  border-bottom: 2px solid ${props => props.theme.background.listOdd};
`;

export const Info = styled.section`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

export const Tier = styled(AssetLoader)`
  width: 130px;
  height: 150px;
  background-size: 75%;
  background-repeat: no-repeat;
  background-position: top center;
  flex-shrink: 0;
  flex-grow: 0;
  position: relative;
`;

export const TierBar = styled.div`
  width: 110px;
  margin: 85% auto;
  height: 10px;
  background: ${props => props.theme.background.slot};
  border-radius: 10px;
  position: relative;

  & > div {
    background: ${props => props.theme.primary[400]};
    border-radius: 10px;
    height: 100%;
    width: ${props => `${props.percentage}%`};
  }

  & > span {
    position: absolute;
    bottom: -23px;
    left: 50%;
    transform: translate(-50%, 0);
    font-size: 13px;
    color: ${props => props.theme.primary[400]};
    border: 2px solid ${props => props.theme.background.third};
    background: ${props => props.theme.background.box};
    font-weight: bolder;
    padding: 2px 5px;
    text-align: center;
    border-radius: 20px;
  }
`;

export const Details = styled.section`
  padding: 20px 10px;
  box-sizing: border-box;
  width: 180px;
`;

export const Icons = styled.div`
  text-align: right;
  i {
    font-size: 20px;
    color: ${props => props.theme.primary[400]};
    cursor: pointer;
  }
`;

export const Name = styled.div`
  font-size: 21px;
  color: ${props => props.theme.primary[300]};
  font-weight: bold;
  margin-bottom: 5px;
`;

export const UnderName = styled.div`
  font-size: 15px;
  font-weight: 300;
  color: ${props => props.theme.text[400]};
`;

export const LastUpdate = styled.div`
  margin-top: 20px;
  font-size: 13px;
  color: ${props => props.theme.text[400]};
`;

export const Team = styled.section`
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TeamPhoto = styled.div`
  width: 70px;
  height: 70px;
  background-size: 120%;
  background-position: top center;
  background-repeat: no-repeat;
  border-radius: 10px;
  background-image: url('${props => props.img}');
`;

export const TeamLogo = styled.div`
  background-size: 80%;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url('${props => props.img}');
  width: 45px;
  height: 45px;
  margin-left: 10px;
`;

export const TeamDetails = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 10px;
  h4 {
    margin: 0;
    font-size: 13px;
    color: ${props => props.theme.text[400]};
    font-weight: 400;
  }
  span {
    color: ${props => props.theme.text[500]};
    font-weight: bold;
    font-size: 15px;
  }
`;

export const PlayerStats = styled.div`
  display: flex;
  padding: 20px 5px;
  box-sizing: border-box;
  justify-content: space-around;
  flex-wrap: wrap;
  h3 {
    width: 100%;
    font-size: 14px;
    text-transform: uppercase;
    margin: 0 0 5px;
    text-align: center;
    color: ${props => props.theme.primary[400]};
  }
`;

export const PlayerStat = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  height: 55px;

  div {
    font-size: 16px;
    color: ${props => props.theme.text[500]};
    font-weight: 500;
  }

  span {
    font-size: 13px;
    color: ${props => props.theme.primary[400]};
    font-weight: bold;
  }
`;

export const PlayerAka = styled.section`
  width: 100%;
  padding: 5px;
  box-sizing: border-box;
  & > h2 {
    font-size: 12px;
    text-transform: uppercase;
    font-weight: 500;
    color: ${props => props.theme.text[500]};
    margin: 2px 5px 10px;
  }

  & span {
    margin: 1px;
    padding: 2px 5px;
    background: ${props => props.theme.primary[400]};
    color: white;
    margin-left: 5px;
    border-radius: 5px;
    font-size: 13px;
  }
`;
