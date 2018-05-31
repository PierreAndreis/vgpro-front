import AssetLoader from "../../../common/AssetLoader";
import styled, { css } from "styled-components";

export const Builds = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  box-sizing: border-box;
  width: 200px;
`;

export const Description = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  color: ${props => props.theme.text[300]};
  justify-content: center;
  flex-direction: row;
  & > div {
    width: 55px;
    text-align: center;
  }
  & > div > div {
    font-size: 18px;
  }
  & > div > span {
    color: ${props => props.theme.text[400]};
    font-size: 10px;
    text-transform: uppercase;
    font-weight: 400;
  }
`;

export const Item = styled(AssetLoader)`
  background-size: 110%;
  background-position: center center;
  background-color: ${props => props.theme.background.slot};
  border: 1px solid ${props => props.theme.background.slotBorder};

  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin: 2px;

  position: relative;
`;

export const Interrogation = styled.div`
  position: absolute;
  top: -5;
  right: -5;
  width: 15px;
  height: 15px;
  color: white;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 50%;
  text-align: center;
  line-height: 14px;
  font-size: 12px;
  font-weight: bold;
`;

export const Modal = styled.div`
  position: fixed;
  z-index: 5;
  top: 4%;
  left: 50%;
  margin-left: -160px;
  width: 320px;
  font-size: 13px;
  color: ${props => props.theme.text[400]};
  transition: all 300ms;
  ${props =>
    props.visible
      ? css`
          opacity: 1;
          display: block;
          animation-duration: 300ms;
          animation-fill-mode: both;
          animation-name: fadeIn;
        `
      : css`
          opacity: 0;
          display: none;
        `};
`;

export const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.3);
`;
