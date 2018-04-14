import styled, { css } from "styled-components";

export default styled.button`
  border: 0;
  padding: 10px 15px;
  margin: 0 5px;
  border-radius: 20px;

  background: transparent;
  border: 1px solid ${props => props.theme.primary[400]};
  color: ${props => props.theme.text[400]};
  transition: all 300ms;
  font-size: 11px;
  text-transform: uppercase;
  font-weight: bold;

  ${props => typeof props.onClick === "function" && css`
    cursor: pointer;
  `}
  
  ${props => (props.active && css`
    background: linear-gradient(90deg, rgba(230, 202, 121) 0%, rgba(238, 178, 130, 1) 100%);
    border-color: transparent;
    color: white;
  `) || css`
    &:hover {
      background: ${props => props.theme.primary[200]};
    }
  `}
`;