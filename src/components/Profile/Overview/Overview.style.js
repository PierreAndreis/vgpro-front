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

export const Stats = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 15px;
  align-items: center;
  position: relative;
  margin-bottom: 15px;
  color: ${props => props.theme.text[500]};
  &>div {
    font-size: 25px;
    font-weight: 500;
    color: ${props => props.theme.text[400]};
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
      color: red;
    }

  }
`;

export const Bar = styled.div`
  width: 90%;
  padding: 5px;
  box-sizing:border-box;
`;

export const Label = styled.div`
  text-align: left;
  font-size: 12px;
  width: 100%;
  color: ${props => props.theme.text[500]};
  text-transform: uppercase;
  font-weight: 500;
  margin-bottom: 5px;
  &>span {
    color: ${props => props.theme.text[300]};
    float:right;
  }
  
`;

export const GraphBar = styled.div`
  width: 100%;
  border-radius: 15px;
  height: 10px;
  position: relative;
  background: ${props => props.theme.background.slot};
  
  &>div {
    height: 100%;
    border-radius: 15px;
    width: ${props => props.percent};
    transition: all 300ms;
    box-shadow: 0 0 2px #E7AE2A;
    ${props => {
      switch (props.type) {
        case "win":
          return css`
            background-image: linear-gradient(-90deg, #F76B1C 0%, #FAD961 100%);
            box-shadow: 0 0 6px 0 #F5A623;
          `;
        case "kp":
          return css`
            background-image: linear-gradient(-225deg, #2B86C5 0%, #FF3CAC 100%);
            box-shadow: 0 0 6px 0 #F83EAC;
          `;
        default:
          return css`
            background-image: linear-gradient(90deg, #2AF598 0%, #08AEEA 100%);
            box-shadow: 0 0 6px 0 #2AF49A;
          `;
      }
    }}
  }
`;

export const Graph = styled.div`
  width: 100%;
  display: flex;
  margin-top: 1px;
  height: 10px;
  align-items: center;
  &>span {
    width: 30px;
    text-align: right;
    font-size: 13px;
    font-weight: 500;
    white-space: nowrap;
    color: ${props => props.theme.text[500]};
    margin-left: 3px;
  }
`;

export const PlayerStats = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
`;