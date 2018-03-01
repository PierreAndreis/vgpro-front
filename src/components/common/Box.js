import styled, {injectGlobal, css} from "styled-components";

export const Box = styled.div`
  width: 320px;
  margin: 5px 2px 35px;
  background: ${props => props.theme.background.box};
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 6px 30px ${props => props.theme.background.boxShadow};

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
  background: ${props => props.theme.background.boxTitle};
  color: ${props => props.theme.primary[400]};
  border-bottom: 2px solid ${props => props.theme.primary[400]};

  padding: 13px;

  font-family: ${props => props.theme.font.highlight}, sans-serif;
  font-weight: bold;
  font-size: 14px;
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
  background: ${props => props.theme.background.primary};
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
    ${props => !props.active && css`background-color: ${props => props.theme.background.boxHoverCss}`}
  }
`;

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
        background: ${props => props.theme.primary[300]};
        box-shadow: 0 0 10px ${props => props.theme.primary[400]};
      }
    `}
    ${props => props.disabled && css`
      background: ${props => props.theme.extra.slot};
      color: ${props => props.theme.background.boxButtonDisabledColor};
      cursor: no-drop;
      opacity: .9;
      box-shadow: 0 0 0 ${props => props.theme.extra.slot};
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
    height: 10px;
    background: linear-gradient(0deg, rgba(0,0,0,.05) 0, transparent);
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