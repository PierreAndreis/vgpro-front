import styled from "styled-components";
import Box from "./../common/Box";
import { commonWrapper } from "./../../styles/App.style";

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
  box-sizing: border-box;
  @media screen and (max-width: 1120px) {
    flex-wrap: wrap;
  }

  @media screen and (max-width: 400px) {
    padding: 0;
  }
`;

export const Birthday = styled(Box.wrap)`
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("https://pbs.twimg.com/media/CmUI9yLVUAESLnf.jpg");
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center center;
  width: 100%;
  height: 150px;
  font-size: 21px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 18px;
  color: white;
  animation-duration: 600ms;
  animation-fill-mode: both;
  animation-name: fadeIn;
  font-weight: bold;

  & a {
    border-bottom: 1px solid white;
  }
`;
