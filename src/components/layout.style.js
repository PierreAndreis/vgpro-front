import styled from "styled-components";

export const Background = styled.div`
  width: 100%;
  height: 100%;
  background: url("/images/logo_bg.png") no-repeat;
  background-position: center top;
  position: absolute;
  z-index: -1;
`

export const Wrap = styled.section`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: row;
  flex-direction: column;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`

export const Main = styled.section`
  display: flex;
  width: 100%;
  flex-direction: column;
  height: 100%;
  flex: 1;
  position: relative;
  @media screen and (max-width: 768px) {
    max-width: 100%;
  }
`;

export const Content = styled.section`
  flex: 1;
`;