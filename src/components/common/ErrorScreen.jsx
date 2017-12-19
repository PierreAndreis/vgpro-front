import React from "react";

import Box from "./Box";

import "./ErrorScreen.css";

const ErrorScreen = ({err, height, message, boxed}) => {

  let text = (message) ? message : "Sorry, an error has occured!";

  if (err && err.message) {
    // text = err.message;
    // todo: analystics
  }

  let content = (
    <div className="ErrorScreen">
      <div className="ErrorScreen-Bad"/>
      <div className="ErrorScreen-Message">{text}</div>
    </div>
  )

  if (boxed) {
    return (
      <Box.wrap className="Box-ErrorScreen">
        <Box.title>Error!</Box.title>
        <Box.body>{content}</Box.body>
      </Box.wrap>
    )
  }

  return content;

}

export default ErrorScreen;