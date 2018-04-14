import styled from "styled-components";
import AssetLoader from "../../../common/AssetLoader";


export const List = styled.div`
  display: flex;
  flex-direction: column;
  &>a, &>div {
    display: flex;
    justify-content: space-around;
    color: ${props => props.theme.text[400]};
    margin: 2px 0;
    align-items: center;
    padding: 5px 0;
    box-sizing: border-box;

    &:nth-child(odd) {
      background: ${props => props.theme.background.listOdd};
    }

    &>span {
      ${'' /* Rate */}
      width: 70px;
      text-align: center;
      &:first-of-type{
        width: 20px;
        color: ${props => props.theme.primary[400]};
      }

    }
  }

  &>div:first-of-type {
    font-size: 11px;
    font-weight: bold;
    height: 30px;
    text-transform: uppercase;
    background: none;
  }
`;

export const HeroImage = styled(AssetLoader)`
  background-size: 130%;
  background-position: center top;
  background-color: ${props => props.theme.background.slot};
  border: 1px solid ${props => props.theme.background.slotBorder};
  width: 60px;
  height: 60px;
  border-radius: 100%;
  width: 30px;
  height: 30px;
  ${List}>div:first-of-type &{
    ${'' /* Remove on Header */}
    height: 0;
    background: 0;
    border: 0;
  }
`;

export const Info = styled.div`
  width: 100px;
  font-size: 15px;
  font-family: ${props => props.theme.font.highlight};
  font-weight: 700;
  ${List}>div:first-of-type &{
    font-size: 12px;
    font-family: inherit;
  }
  
`;