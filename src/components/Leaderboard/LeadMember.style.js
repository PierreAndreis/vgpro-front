import styled, {css} from "styled-components";
import Box from "./../common/Box";
import AssetLoader from "./../common/AssetLoader";

export const Wrapper = styled(Box.wrap)`
  width: 100%;
  margin: 3px 0;
  transition: all 300ms;
  &:hover {
    transform: scale3d(1.005, 1.005, 1.005);
    background: rgb(247, 247, 247);
  }
`;

export const Body = styled(Box.body)`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 60px;
  padding: 2px 15px;
  justify-content: space-around;
  /* margin: 2px 0; */
  box-sizing: border-box;
  border-bottom: 1px solid #e9e9e9;
  color: grey;
  >div {
    flex-shrink: 0;
  }
`;

export const Position = styled.div`
  font-size: 15px;
  color: rgba(234, 203, 93, 1);
  font-weight: 500;
  width: 30px;
`;

export const Tier = styled(AssetLoader)`
  width: 45px;
  display: inline-block;
  height: 35px;
  background-size: 100%;
`;

export const PlayerInfo = styled.div`
  width: 130px;
  display: inline-block;
  span {
    font-size: 12px;
    color: grey;
  }
  @media screen and (max-width: 560px) {
    width: 100px;
  }

`;

export const PlayerName = styled.div`
  font-size: 15px;
  font-family: "Roboto Condensed", sans-serif;
  font-weight: bold;
  color: rgba(57, 57, 57, 1);
  margin-bottom: 1px;
  span {
    font-size: 9px;
    color: grey;
    text-transform: uppercase;
    font-weight: 300;
  }

  @media screen and (max-width 560px) {
    font-size: 13px;
  }
`;

export const Points = styled.div`
  width: 50px;
  text-align: center;
  &>div {
    font-size: 21px;
    @media screen and (max-width: 560px) {
      font-size: 18px;
    }
  }
  &>span {
    font-size: 11px;
    text-transform: uppercase;
    color: gray;
    @media screen and (max-width: 560px) {
      font-size: 9px;
    }
  }
  @media screen and (max-width: 560px) {
    order: 3;
    width: 40px;
    flex-grow: 1;
  }
`;

export const GameInfo = styled.div`
  width: 130px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Chart = styled.div`
 width: 60px;
 span {
  font-size: 9px;
  font-weight: 500;
 }
`;

export const Rates = styled.div`
  font-size: 13px;
  font-weight: 500;
  width: 100px;
  &>div {
    white-space: nowrap;
  }
`;

export const RateLabel = styled.span`
  padding-left: 10px;
  display: inline-block;
  width: 25px;
  &:before {
    content: "";
    display: inline-block;
    width: 10px;
    height: 10px;
    margin-right: 2px;
    border-radius: 50%;
  }

  ${props => {
    if (props.label === "w") {
      return css`
        color: #5DB4F1;
        :before {
          background: #5DB4F1;
        }
      `
    }
    if (props.label === "l") {
      return css`
        color: #F1685D;
        :before {
          background: #F1685D;
        }
      `
    }
  }}
`;

export const Heroes = styled.div`
  display: flex;
  width: 150px;
  @media screen and (max-width: 560px) {
    display: none;
  }
`;

export const Hero = styled(AssetLoader)`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  margin: 0 2px;
  border: 1px solid grey;
  background-color: #D8D8D8;
  background-size: 120%;
  background-position: center center;
`;
