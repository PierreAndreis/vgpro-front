/**
 *  Make this component more useful lol
 */
import React from "react";

import styled from "styled-components";

const AlertWrap = styled.div`
  font-family: ${props => props.theme.font.highlight}, sans-serif;
  width: 100%;
  height: 45px;
  background: ${props => props.theme.primary[200]};
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  span {
    color: ${props => props.theme.text[300]};
  }
`;


const Alert = ({message}) => (
  <AlertWrap>
    <span>{message}</span>
  </AlertWrap>
);

export default Alert;