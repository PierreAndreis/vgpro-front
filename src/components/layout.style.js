import styled from "styled-components";

export const Background = styled.div`
  width: 100%;
  height: 100%;
  background: url("/images/logo_bg.png") no-repeat;
  opacity: ${props => props.theme.bgOpacity};
  background-position: center top;
  position: absolute;
  z-index: -1;
`;

export const Wrap = styled.section`
  position: relative;
  display: flex;
  min-height: 100%;
  flex-direction: row;
  flex-direction: column;
  background-color: ${props => props.theme.background.primary};

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Main = styled.section`
  display: flex;
  width: 100%;
  flex-direction: column;
  
  flex: 1;
  position: relative;
  z-index: 1;
  @media screen and (max-width: 768px) {
    max-width: 100%;
  }
`;

export const Content = styled.section`
  flex: 1;
`;