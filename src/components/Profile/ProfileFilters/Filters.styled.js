import styled, {css} from "styled-components";


export const Wrapper = styled.div`
  width: 100%;
  align-items: center;
  display: flex;
  height: 45px;
  justify-content: center;
  font-size: 12px;
  color: ${props => props.theme.background.profileFiltersWrapper};
  font-weight: 500;
  margin: 20px 0 5px;
`;

export const Label = styled.div`
  margin: 0 5px;
  text-transform: uppercase;
`;

export const Menu = styled.div`
  position: absolute;
  width: 140px;
  margin-top: 10px;
  text-align: center;
  left: 0;
  right: 0;
  height: auto;
  padding: 5px;
  background: ${props => props.theme.background.white};
  z-index: 99;
  border-radius: 5px;
  /* box-shadow: rgba(54, 54, 54, 0.315) 0 10px 30px 0; */
  box-shadow: 0 0.625rem 1.25rem 0 ${props => props.theme.background.profileFiltersMenuShadow};
`;

export const Option = styled.div`
  padding: 7px 15px;
  cursor: pointer;
  text-transform: uppercase;
  transition: all 300ms;
  font-size: 12px;
  ${props => (
    (props.active && css`
      background: ${props => props.theme.background.searchInput};
    `) || css `
      &:hover {
        background: ${props => props.theme.background.whitesmoke};
      }
    `
  )}
`;

export const MenuLabel = styled.div`
  width: auto;
  position: relative;
  &>span {
    font-size: 13px;
    text-transform: uppercase;
    padding: 5px 25px 5px 10px;
    cursor: pointer;
    color: ${props => props.theme.background.profileFiltersMenuLabel};
    font-weight: 700;
    background: ${props => props.theme.background.white};
    border-radius: 5px;
    &:after {
      content: "";
      position: absolute;
      background-image: url("/icons/down.svg");
      background-size: 100%;
      width: 13px;
      height: 13px;
      margin-left: 3px;
      margin-top: 2px;
    }
  }
`;