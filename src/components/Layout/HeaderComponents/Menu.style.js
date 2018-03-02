import styled, {css} from "styled-components";


export const MenuDesktop = styled.div`
  a {
    font-family: ${props => props.theme.font.highlight}, sans-serif;
    font-size: 15px;
    text-transform: uppercase;
    color: ${props => props.theme.text[300]};

    box-sizing: border-box;
    margin: 0 10px;
    transition: all 300ms;

    transition: all 300ms;
    &:hover {
      color: ${props => props.theme.text[500]};
    }
    &.active {
      color: ${props => props.theme.primary[400]};
    }
    i {
      font-size: 12px;
      font-weight: normal;
    }
  }
`;

export const MenuMobile = styled.div`
  width: 100%;
  min-width: 300px;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  padding-top: 70px;
  box-sizing: border-box;
  background-image: ${props => props.theme.gradient.primary};
  color: ${props => props.theme.background.black};

  opacity: 0;
  transition: all 300ms;
  visibility: hidden;
  ${props => props.open &&
  css `
    opacity: 1;
    visibility: visible;
  `}

  a {
    margin: 15px 0;
    text-transform: uppercase;
    font-size: 15px;
    &.active {
      text-decoration: underline;
    }
  }
`;

export const MobileButton = styled.div`
  /* background: ${props => props.theme.background.red}; */
  margin-left: auto;
  box-sizing: border-box;
  font-size: 25px;
  flex-grow: 1;
  text-align: right;
  position: relative;
  z-index: 1;
  /* background: ${props => props.theme.background.red}; */

  display: flex;
  justify-content: flex-end;
  align-items: center;

  padding-right: 15px;
`;

export const MobileIcon = styled.div`
  cursor: pointer;
  width: 30px;
  height: 22px;
  /* background: ${props => props.theme.background.blue}; */
  position: relative;
  text-indent: -9999em;

  span,
  span:before,
  span:after {
    transition: all 0.4s;
    background-color: ${props => props.theme.text[500]};
    display: block;
    position: absolute;
    width: 30px;
    height: 5px;
    left: 0;
  }

  span:before,
  span:after {
    content: "";
  }

  span {
    top: 8px;
    &:before {
        transform-origin: 33% 100%;
        top: -8px;
        z-index: 10;
    }
    &:after {
      transform-origin: 33% 0;
      top: 8px;
    }
  }

  ${props => 
    props.open && css`
      span,
      span:before,
      span:after {
        background-color: transparent;
      }

      span:before {
        transform: translateY(4px) translateX(0px) rotate(45deg);
        background-color: ${props => props.theme.text[500]};
      }

      span:after {
        transform: translateY(-4px) translateX(0px) rotate(-45deg);
        background-color: ${props => props.theme.text[500]};
      }
  `}

`;