/**
 *  Make this component more useful lol
 */
import React from "react";

import styled from "styled-components";

const AlertWrap = styled.div`
  font-family: ${props => props.theme.font.highlight}, sans-serif;
  width: 100%;
  height: 45px;
  background: #EED477;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  span {
    color: rgba(119, 119, 119, 0.75);
  }
`


const Alert = ({message}) => (
  <AlertWrap>
    <span>{message}</span>
  </AlertWrap>
);

export default Alert;