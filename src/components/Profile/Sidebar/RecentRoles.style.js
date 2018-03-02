import styled, {css} from "styled-components";
import {SidebarBox} from "./../Profile.style";

export const Wrap = SidebarBox;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Role = styled.div`
  width: 100%;
  height: 100px;
  padding: 10px 5px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-around;
  &:nth-child(2) {
    background: ${props => props.theme.background.listOdd};
  }

  &:last-child {
    border-bottom: 0;
  }
`;

export const IconChart = styled.div`
  padding: 5px;
  box-sizing: border-box;
`;

export const Icon = styled.div`
  width: 35px;
  height: 35px;
  margin: 0 auto;
  border-radius: 50%;
  
  background-size: 25px 25px;
  background-position: center;
  background-repeat: no-repeat;
  ${props => {
    if (props.role === "Carry") {
      return css`
        background-image: url('/icons/carry_color.png');
      `
    }
    if (props.role === "Captain") {
      return css`
        background-image: url('/icons/captain_color.png');
      `

    }
    if (props.role === "Jungler") {
      return css`
        background-image: url('/icons/jungler_color.png');
      `
    }
  }}
`;

export const Stats = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  width: 150px;
  justify-content: center;
  &>div {
    font-size: 16px;
    text-align: center;
    font-weight: 500;
    color: ${props => props.theme.text[400]};
  }
  &>span {
      display: flex;
      width: 100%;
      justify-content: center;
  }
`;

export const KDAIcon = styled.div`
  width: 25px;
  text-align: center;
  padding-top: 20px;
  margin: 5px 5px;
  font-size: 13px;
  background-repeat: no-repeat;
  background-position: center top;
  background-size: 13px;
  color: ${props => props.theme.text.solid};

  ${props => {

    if (props.icon === "kills") {
      return css`
        background-image: url("/icons/kill.svg");
      `;
    }

    if (props.icon === "deaths") {
      return css`
        background-image: url("/icons/death.svg");
        background-position: center -3px;
        background-size: 15px;
        color: red;
      `;
    }

    if (props.icon === "assists") {
      return css`background-image: url("/icons/assist.svg");`
    }
  }}
`;

export const WR = styled.div`
  height: 100%;
  width: 90px;
  padding: 0 10px;
  white-space: nowrap;
  display: flex;
  flex-direction: column;
  justify-content: center;

  &>div {
    font-size: 21px;
    text-align: center;
    font-weight: 500;
  }

  &>span {
    display: block;
    text-align: center;
    font-size: 13px;
    color: ${props => props.theme.text[400]};
  }
`;