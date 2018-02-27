import styled, {injectGlobal, css} from "styled-components";

export const Box = styled.div`
  width: 320px;
  margin: 5px 2px 35px;
  background: ${props => props.theme.background.box};
  box-sizing: border-box;
  position: relative;
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
  background: ${props => props.theme.background.secondary};
  color: ${props => props.theme.primary[400]};
  border-bottom: 2px solid ${props => props.theme.primary[400]};

  padding: 15px;

  font-family: ${props => props.theme.font.highlight}, sans-serif;
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
  margin-top: auto;
  background: ${props => props.theme.background.third};
  border-radius: 0 0 5px 5px;
  height: 20px;
  display: flex;
  justify-content: space-around;
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
    background-color: ${props => props.theme.primary[400]}; 
    `
  }
  &:hover {
    ${props => !props.active && css`background-color: rgba(0, 0, 0, 0.055)`}
  }
`

export const BoxButton = styled.button.attrs({
  disabled: props => props.disabled
  })`
    line-height: 12px;
    border: 0;
    display: block;
    background: ${props => props.theme.primary[400]};
    background-image: ${props => props.theme.gradient.primary};
    border-radius: 100px;
    color: ${props => props.theme.primary[100]};
    padding: 10px 15px;
    box-sizing: content-box;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 12px;
    height: 12px;
    box-shadow: 0 0 10px ${props => props.theme.primary[400]};
    margin: 5px;
    transition: all 300ms;
    cursor: pointer;
    &::selection{
      background-color:${props => props.theme.background.transparent} !important;
    }
    ${props => !props.disabled && css`
      &:hover {
        background: #f7d05b;
        box-shadow: 0 0 10px #e4b727;
      }
    `}
    ${props => props.disabled && css`
      background: #d3d2d3;
      color: #565656;
      cursor: no-drop;
      opacity: .9;
      box-shadow: 0 0 0 #d3d2d3;
    `}
`;

injectGlobal`
  .Box_RegionSelect {
    display: flex;
    justify-content: space-around;
    text-transform: uppercase;
    padding: 10px 50px 0px;
    /* padding: 0 50px; */
  }

  .Box_RegionSelect div {
    font-size: 14px;
    color: ${props => props.theme.background.grey};
    font-weight: 500;
    padding: 0 5px 2px;
    cursor: pointer;
  }

  .Box_RegionSelect div:hover {
    color: ${props => props.theme.background.detailsTabOptionColor};
    cursor: pointer;
  }

  .Box_RegionSelect div.active {
    color: ${props => props.theme.background.buildsContentH2Color};
    
  }

  .Box_Divider {
    width: 100%;
    /* margin: 0 0 10px; */
    height: 10px;
    background: linear-gradient(to top, rgba(0,0,0,0.05) 0%,rgba(0,0,0,0) 100%);
  }
`

export default {
  wrap           : Box,
  title          : BoxTitle,
  selector       : BoxSelector,
  selectorOptions: BoxSelectorOptions,
  body           : BoxBody,
  button         : BoxButton,
  action         : BoxActions,
}