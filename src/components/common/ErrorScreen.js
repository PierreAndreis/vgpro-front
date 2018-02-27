import React from "react";
import styled from "styled-components";

import Box from "./Box";

const ErrorScreenBox = styled(Box.wrap)`
  margin: 0 auto;
`;

const ErrorScreenContent = styled.div`
  width: 100%;
  min-height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`

const BadImage = styled.div`
  width: 50px;
  height: 96px;
  background: url("/images/error.png") no-repeat;
  background-size: 100%;
  filter: grayscale(100%);
  margin: 0 auto;
  opacity: 0.6;
`;

const Message = styled.div`
  font-family: ${props => props.theme.font.highlight}, sans-serif;
  font-size: 13px;
  text-align: center;

  opacity: 0.4;
`;


const ErrorScreen = ({err, height, message, boxed, width}) => {

  let text = (message) ? message : "Sorry, an error has occured!";

  if (err && err.message) {
    // text = err.message;
    // todo: analystics
  }

  let style = {};

  if (width) {
    style = {
      width
    }
  }

  let content = (
    <ErrorScreenContent>
      <BadImage/>
      <Message>{text}</Message>
    </ErrorScreenContent>
  )

  if (boxed) {
    return (
      <ErrorScreenBox style={style}>
        <Box.title>Error!</Box.title>
        <Box.body>{content}</Box.body>
      </ErrorScreenBox>
    )
  }

  return content;

}

export default ErrorScreen;