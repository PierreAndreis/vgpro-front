import styled, {injectGlobal, css} from "styled-components";

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

  ${(props) => props.animation && css`

    animation-duration: 1s;
    animation-fill-mode: both;
    animation-name: ${props.animation};
  `}


  @media screen and (max-width: 400px) {
    .box__card {
      margin-left: auto;
      margin-right: auto;
    }
  }
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
`;

export const BoxBody = styled.div`
  position: relative;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

export const BoxActions = styled.div`
  /* Martin-top so it is on bottom :p */
  margin-top: auto;
  background: hsla(0,0%,76%,.3);
  height: 20px;
  display: flex;
  justify-content: space-around;
  ${BoxBody} &{

  }
`;

export const BoxSelector = styled.div`
  margin-left: auto;
  width: 150px;
  height: 20px;
  display: flex;
  justify-content: flex-end;
`

export const BoxSelectorOptions = styled.div`
  cursor: pointer;
  margin: 0 5px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-size: 80%;
  background-repeat: no-repeat;
  background-position: center center;
  transition: all 300ms;
  ${props => 
    props.icon && css`
      background-image: url(${props.icon}${props.active ? ".svg" : "_.svg"});
    `
  }
  ${props => 
    props.active && css`
    background-color: #E3B63B; 
    `
  }
  &:hover {
    ${props => !props.active && css`background-color: rgba(0, 0, 0, 0.055)`}
  }
`

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



  .Box_RegionSelect {
    display: flex;
    justify-content: space-around;
    text-transform: uppercase;
    padding: 10px 50px 0px;
    /* padding: 0 50px; */
  }

  .Box_RegionSelect div {
    font-size: 14px;
    color: grey;
    font-weight: 500;
    padding: 0 5px 2px;
    cursor: pointer;
  }

  .Box_RegionSelect div:hover {
    color: rgb(75, 75, 75);
    cursor: pointer;
  }

  .Box_RegionSelect div.active {
    color: #DCAF5A;
    
  }

  .Box_Divider {
    width: 100%;
    /* margin: 0 0 10px; */
    height: 10px;
    background: linear-gradient(to top, rgba(0,0,0,0.05) 0%,rgba(0,0,0,0) 100%);
  }
`

export default {
  wrap    : Box,
  title   : BoxTitle,
  selector: BoxSelector,
  selectorOptions: BoxSelectorOptions,
  divider:  BoxDivider,
  body    : BoxBody,
  action  : BoxActions,
}