import React from "react";

import "./ErrorScreen.css";

const ErrorScreen = ({err, height, message}) => {

  let text = (message) ? message : "Sorry, an error has occured!";

  if (err && err.message) {
    // text = err.message;
    // todo: analystics
  }

  return (
    <div className="ErrorScreen">
      <div className="ErrorScreen-Bad"/>
      <div className="ErrorScreen-Message">{text}</div>
    </div>
  )

}

export default ErrorScreen;