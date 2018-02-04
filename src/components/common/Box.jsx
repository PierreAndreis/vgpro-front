import styled, {injectGlobal} from "styled-components";

export const Box = styled.div`
  width: 320px;
  margin: 5px 2px 35px;
  background: white;
  box-sizing: border-box;
  position: relative;
  /* box-shadow: 0px 0px 10px -3px rgba(0,0,0,0.7); */
  /* box-shadow: 0 10px 15px rgba(0,0,0,0.06); */
  box-shadow: 0 6px 30px rgba(0, 14, 77, 0.07);

  border-radius: 5px;

  /* Flex so we can have actions at bottom */
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 400px) {
    .box__card {
      margin-left: auto;
      margin-right: auto;
    }
  }
`;

export const BoxBody = styled.div`
  position: relative;
  flex-grow: 1;
`;

export const BoxTitle = styled.div`
  width: 100%;
  box-sizing: border-box;
  text-align: left;
  background: #FAFAFA;
  color: #E6BE3D;

  /* color: #FAFAFA;
  background: #E6BE3D; */
  border-bottom: 2px solid rgba(234, 203, 93, 1);

  padding: 15px;

  font-family: "Roboto Condensed", sans-serif;
  font-weight: bold;
  font-size: 18px;
  text-transform: uppercase;
  border-radius: 5px 5px 0 0;
`

export const BoxActions = styled.div`
  /* Martin-top so it is on bottom :p */
  margin-top: auto;
  height: 20px;
  display: flex;
  justify-content: space-around;
  background: rgba(195, 195, 195, 0.3);
  /* border: 1px solid blue; */
`;

  injectGlobal`
  .button {
    line-height: 12px;
    border: 0;
    display: block;
    background: #F3DD5C;
    /* background: linear-gradient(to right, rgba(242,219,101,1) 1%,rgba(231,177,62,1) 100%); */
    background-image: linear-gradient(-90deg, rgb(236, 211, 67) 0%, #E7AE2A 100%);
    border-radius: 100px;
    color: #faf3d9;
    padding: 10px 15px;
    /* border-radius: 20px; */
    font-weight: 700;
    text-transform: uppercase;
    font-size: 12px;
    height: 12px;
    box-shadow: 0 0 10px #e4b727;
    margin: 5px;
    transition: all 300ms;
    cursor: pointer;
  }

  .button::selection{
    background-color:transparent !important;
  }

  .button:hover {
    /* background: linear-gradient(to right, #f7d05b 1%,#f7d05b 100%); */
    background: #f7d05b;
    box-shadow: 0 0 10px #e4b727;
  }

  .button#disabled{
    background: #d3d2d3;
    color: #565656;
    cursor: no-drop;
    opacity: .9;
    box-shadow: 0 0 0 #d3d2d3;
  }
`

export default {
  wrap:   Box,
  title:  BoxTitle,
  body:   BoxBody,
  action: BoxActions,
}