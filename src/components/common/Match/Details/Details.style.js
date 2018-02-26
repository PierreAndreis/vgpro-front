import styled, {css} from "styled-components";


export const Container = styled.div`
  width: 98%;
  min-height: 140px;;
  margin: 0 auto;
  margin-top: -10px;
  padding: 15px 5px 5px;
  box-sizing: border-box;
  background: white;
  border-radius: 0 0 5px 5px;
  box-shadow: #EAEDF3 0 0px 30px 0;
  animation-name: slideInDown;
  animation-duration: 1s;
  animation-fill-mode: both;
  position: relative;
  z-index: 1;
`;

export const Tabs = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 10px;
  box-sizing: border-box;
`;

export const TabOption = styled.div`
  margin-right: 10px;

  text-transform: uppercase;
  font-size: 12px;
  color: rgb(75, 75, 75);
  font-weight: 700;
  cursor: pointer;

  padding: 5px;
  border-radius: 5px;
  transition: all 300ms;
  ${props => (
    (props.active && css`
    color: #DCAF5A;
    `) || css`
      &:hover{
        background: rgba(207, 207, 207, 0.24);
      }
    `
  )}

  &:last-of-type {
    margin-right: 0;
  }
`