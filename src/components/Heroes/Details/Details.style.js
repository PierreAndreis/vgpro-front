import styled, {css} from "styled-components";
import { commonWrapper } from "../../../styles/App.style";
import AssetLoader from "../../common/AssetLoader";
import {Box} from "../../common/Box";

export const SPACE_GRID = "10px";

export const Wrapper = commonWrapper.extend`
  max-width: 950px;
  &>section {
    margin: 20px 0;
  }
`

export const Header = styled.section`
  padding: 15px;
  box-sizing: border-box;
  width: 100%;

  display: flex;
  align-items: center;
`;

export const HeroImage = styled(AssetLoader)`
  background-size: 130%;
  background-position: center top;
  background-color: ${props => props.theme.background.slot};
  border: 1px solid ${props => props.theme.background.slotBorder};
  width: 60px;
  height: 60px;
  border-radius: 100%;
`;

export const HeroTitle = styled.div`
  color: ${props => props.theme.text[400]};
  margin-left: 15px;

  &>h1 {
    font-size: 25px;
    margin: 0;
    font-family: ${props => props.theme.font.highlight};
  }
  &>div {
    color: ${props => props.theme.text[300]};
    font-size: 14px;
  }
`;

export const Tabs = styled.section`
  display: flex;
`;

export const Content = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: ${SPACE_GRID};
  grid-row-gap: ${SPACE_GRID};
  justify-content: end;
  @media screen and (max-width: 800px) {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    flex-direction: column;
  }
  & ${Box} {
    margin: 0;
    @media screen and (max-width: 800px) {
      width: 100%;
      margin: ${SPACE_GRID} 0;
    }
  }
`;