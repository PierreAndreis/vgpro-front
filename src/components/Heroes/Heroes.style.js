import styled from "styled-components";
import {Link} from "react-router-dom";
import Box from "../common/Box";
import { commonWrapper } from "../../styles/App.style";
import AssetLoader from "../common/AssetLoader";

export const Wrap = commonWrapper.extend`
  width: 100%;
  max-width: 800px;
  margin: 15px auto;
`;

let BoxWrap = Box.wrap;

// export const Hero = BoxWrap.withComponent(Link).extend`
export const Hero = BoxWrap.extend`
  width: 100%;
  margin: 3px 0;
`;

export const Header = styled.div`
  display: flex;
  margin: 20px 0 0;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 30px;
  padding: 2px 15px;
  justify-content: space-around;
  box-sizing: border-box;
  color: ${props => props.theme.text[500]};
  font-family: ${props => props.theme.font.highlight};

  text-transform: uppercase;
  font-size: 12px;
  >div {
    cursor: pointer;
    font-weight: bold;

    display: block;

    white-space: nowrap;
    &::selection {
      background: rgba(0, 0, 0, 0);
    }
  }
  @media screen and (max-width: 560px) {
    font-size: 10px;
  }

`

export const HeroContent = styled(Box.body)`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 70px;
  padding: 2px 15px;
  justify-content: space-around;
  box-sizing: border-box;
  color: ${props => props.theme.text[400]};
  >div {
    flex-shrink: 0;
    position: relative;
    b {
      display: block;
      position: absolute;
      bottom: -15px;
      font-size: 11px;
      color: ${props => props.theme.text[500]};
      font-weight: 500;
      text-transform: uppercase;
      width: 100%;
      white-space: nowrap;
      
      animation-duration: 1s;
      animation-fill-mode: both;
      animation-name: fadeIn;
      @media screen and (max-width: 560px) {
        font-size: 9px;
      }
    }
    span {
      font-size: 11px;
      color: ${props => props.theme.text[300]};
      text-transform: uppercase;
      font-weight: 500;
      @media screen and (max-width: 560px) {
        font-size: 9px;
      }

    }
  }
`


export const Info = styled.div`
  display: flex;
  align-items: center;
  width: 200px;
  @media screen and (max-width: 560px) {
    width: 70px;
    span {
      display: none;
    }
  }
`;

export const Position = styled.div`
  font-size: 21px;
  color: ${props => props.theme.primary[400]};
  font-weight: 500;
  width: 30px;
  margin-right: 15px;
  @media screen and (max-width: 560px) {
    width: 15px;
    font-size: 15px;
    margin-right: 10px;
  }
`

export const HeroImage = styled(AssetLoader)`
  width: 50px;
  height: 50px;
  border-radius: 100%;
  background-size: 130%;
  background-position: top center;
  background-color: grey;
  flex-shrink: 0;
  @media screen and (max-width: 560px) {
    width: 35px;
    height: 35px;
  }
`;

export const HeroInfo = styled.div`
  display: flex;
  align-items: center;
  @media screen and (max-width: 560px) {
    flex-direction: column;
  }
`

export const HeroNameRole = styled.div`
  margin: 0 5px;
  @media screen and (max-width: 560px) {
    margin: 5px 0;
  }
`

export const Name = styled.div`
  font-size: 15px;
  text-align: left;
  flex-grow: 1;
  font-family: ${props => props.theme.font.highlight};
  font-weight: bold;
  @media screen and (max-width: 560px) {
    flex-grow: 0;
    width: 40px;
    font-size: 8px;
    text-align: center;
  }
`;

export const Stats = styled.div`
  width: 60px;
  text-align: center;
  color: ${props => props.theme.text[400]};
  ${HeroContent} &{
    font-size: 18px;
    @media screen and (max-width: 560px) {
      font-size: 14px;
    }
  }
`;

export const Tier = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TierImg = styled.div`
  width: 25px;
  height: 25px;
  background-repeat: no-repeat;
  background-size: 100%;

  background-image: url("/${props => props.tier}.svg");
  margin-bottom: 5px;

`