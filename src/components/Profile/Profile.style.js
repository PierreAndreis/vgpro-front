import styled from "styled-components";
import Box from "./../common/Box";
import {commonWrapper} from "./../../styles/App.style";

export const Wrap = commonWrapper.extend`
  display: flex;
  position: relative;
  @media screen and (max-width: 1120px) {
    flex-wrap: wrap;
  }
`;

export const Sidebar = styled.section`
  height: 100%;
  padding: 0 5px;
  box-sizing: border-box;
  animation-name: fadeInLeft;
  animation-duration: 1s;
  animation-fill-mode: both;
  @media screen and (max-width: 1120px) {
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }

  @media screen and (max-width: 400px) {
    flex-direction: column;
    justify-content: center;
  }
`;

export const SidebarBox = styled(Box.wrap)`
  height: 350px;
  @media screen and (max-width: 400px) {
    width: 100%;
  }
`;

export const Main = styled.section`
  width: 100%;
  padding: 0 10px;
  overflow: hidden;
  animation-name: fadeInRight;
  animation-duration: 1s;
  animation-fill-mode: both;
  box-sizing: border-box;
  @media screen and (max-width: 1120px) {
    flex-wrap: wrap;
  }

  @media screen and (max-width: 400px) {
    padding: 0;
  }
`;