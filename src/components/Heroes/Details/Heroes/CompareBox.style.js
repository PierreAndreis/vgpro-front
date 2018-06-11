import styled, { css } from "styled-components";
import AssetLoader from "../../../common/AssetLoader";
import { transparentize, lighten } from "polished";

export const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  margin: 10px auto;
  max-width: 150px;

  & h3 {
    width: 100%;
    text-align: center;
    color: ${props => props.theme.text[500]};
    font-family: ${props => props.theme.font.highlight};
    font-weight: 700;
    font-size: 21px;
    text-align: center;
    margin: 10px 0;
  }

  & h4 {
    width: 100%;
    font-size: 11px;
    color: ${props => props.theme.text[400]};
    text-transform: uppercase;
    text-align: center;
    margin: 5px 0;
  }
`;

export const Line = styled.div`
  width: 70%;
  margin: 0 auto;
  height: 1px;
  background: rgba(0, 0, 0, 0.1);
`;

export const HeroImage = styled(AssetLoader)`
  width: 90px;
  height: 100px;
  margin: 0 auto;

  background-size: 120%;
  background-position: center center;
  clip-path: url(#heroPolygon);

  position: relative;
  ${"" /* margin: 15px; */};
`;

export const Role = styled.div`
  position: relative;

  transition: all 300ms;
  background: linear-gradient(
    0deg,
    ${props => props.theme.extra[props.name.toLowerCase()]} 0%,
    ${props => lighten(0.1, props.theme.extra[props.name.toLowerCase()])}
      100%
  );

  ${props =>
    props.highlight &&
    css`
      box-shadow: 0 0 20px
        ${props =>
          transparentize(
            0.3,
            props.theme.extra[props.name.toLowerCase()]
          )};
    `};
  border-radius: 50%;
  margin: 0 5px;

  &:before {
    content: "";
    display: block;
    width: 25px;
    height: 25px;

    background-size: 15px 15px;
    background-position: center;
    background-repeat: no-repeat;

    ${props => {
      if (props.name === "Carry") {
        return css`
          background-image: url("/icons/carry.png");
        `;
      }
      if (props.name === "Captain") {
        return css`
          background-image: url("/icons/captain.png");
        `;
      }
      if (props.name === "Jungler") {
        return css`
          background-image: url("/icons/jungler.png");
        `;
      }
    }};
  }

  opacity: ${props => (props.highlight ? 1 : 0.5)};
  &:after {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 50%;
    ${props =>
      !props.highlight &&
      css`
        background: rgba(0, 0, 0, 0.3);
      `};
  }
`;

export const Portrait = styled(AssetLoader)`
  width: 25px;
  height: 25px;
  background-size: 100%;
  background-position: center center;
  border-radius: 50%;

  border: 1px solid ${props => props.theme.background.slotBorder};
  background-color: ${props => props.theme.background.slot};
  margin: 0 3px;
`;
