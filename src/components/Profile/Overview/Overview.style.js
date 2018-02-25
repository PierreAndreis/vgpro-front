import styled from "styled-components";

import Box from "./../../common/Box";

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
`

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
`

export const ChartLabel = styled.div`
  text-align: center;
  font-size: 16px;
  width: 100%;
  color: grey;
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
    color: rgba(128, 128, 128, 1);
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