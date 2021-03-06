import styled from "styled-components";
import Box from "../../../common/Box";
import Button from "../../../common/Button";

export const Container = styled.div`
  flex-shrink: 0;
  flex-grow: 0;
  width: 250px;
  height: 100%;
  margin: 0 5px;
  box-sizing: border-box;
  position: relative;

  @media screen and (max-width: 400px) {
    order: 3;
    width: 100%;
    margin: 0;
    padding: 0 5px;
  }
`;

export const Vs = styled(Button).attrs({
  children: "VS",
  active: "true",
})`
  width: 50px;
  height: 30px;
  position: absolute;
  top: -20px;
  margin-left: 50%;
  left: -25px;
`;

export const Body = styled(Box.body)`
  display: flex;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;

  & h4 {
    width: 100%;
    font-size: 11px;
    color: ${props => props.theme.text[300]};
    margin: 10px 0;
    text-transform: uppercase;
    text-align: center;
  }
`;

export const Label = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;

  & > div {
    font-size: 13px;
    color: ${props => props.theme.text[300]};
    font-weight: 400;
    & b {
      font-weight: 700;
      color: ${props => props.theme.primary[400]};
    }
  }

  & > span {
    font-size: 11px;
    color: ${props => props.theme.text[400]};
    font-weight: bold;
    text-transform: uppercase;

    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
  }
`;

export const Bar = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-wrap: nowrap;

  margin-bottom: 10px;

  & > div {
    background: linear-gradient(90deg, #4fa8dc 0%, #77e8c3 100%);
    height: 7px;
    border-radius: 30px;
    margin: 0 1px;
    transition: all 300ms;

    &:last-of-type {
      background: linear-gradient(90deg, #bf5e9f 0%, #2d2ca7 100%);
    }
  }
`;

export const Value = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > span {
    font-size: 21px;
    color: ${props => props.theme.text[500]};
  }
  & > div {
    font-size: 11px;
    color: ${props => props.theme.text[400]};
    font-weight: bold;
    text-transform: uppercase;
    text-align: center;
  }
`;
