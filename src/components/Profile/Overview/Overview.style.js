import Box from "./../../common/Box";
import styled, {css} from "styled-components";

export const Wrap = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

export const Group = styled(Box.wrap)`
  ${'' /* width: 550px; */}
  flex-grow: 1;
  margin: 5px 10px;
  box-sizing: border-box;
`;

export const Title = styled(Box.title)`
`;

export const Content = styled(Box.body)`
  padding: 15px 0;
  display: flex;
  flex-direction: row;
  font-size: 13px;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
`;

export const Chart = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ChartLabel = styled.div`
  text-align: center;
  font-size: 16px;
  width: 100%;
  color: ${props => props.theme.background.grey};
  font-weight: 500;
  text-transform: uppercase;
  margin-top: 10px;
`;

export const Stats = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 15px;
  align-items: center;
  position: relative;
  margin-bottom: 15px;
  &>div {
    font-size: 25px;
    font-weight: 500;
    color: ${props => props.theme.background.profileOverviewStatsDiv};
  }
  &>span {
    font-size: 13px;
    text-transform: uppercase;
    text-align: center;
    font-weight: 500;
  }
  &>small {
    font-size: 10px;
    position: absolute;
    bottom: -10px;
    &>b {
      ${'' /* Deaths */}
      color: ${props => props.theme.background.red};
    }

  }
`;

export const PlayerGraphBar = styled.div`
  width: 75%;
  border-radius: 15px;
  height: 7px;
  position: relative;
  background: ${props => props.theme.background.overviewPlayerGraphBar};
  
  &>div {
    height: 100%;
    border-radius: 15px;
    width: ${props => props.percent};
    transition: all 300ms;
    background-image: linear-gradient(-90deg, #FAD961 0%, #F76B1C 100%);
    box-shadow: 0 0 2px #E7AE2A;
  }
`;

export const PlayerGraph = styled.div`
  width: 100%;
  display: flex;
  margin-top: 1px;
  height: 10px;
  align-items: center;
  &>span {
    font-size: 10px;
    font-weight: bold;
    white-space: nowrap;
    color: ${props => props.theme.background.grey};
    margin-left: 3px;
  }
`;

export const PlayerStats = styled.div`
  width: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
`;