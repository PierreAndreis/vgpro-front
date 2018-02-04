/**
 *  Make this component more useful lol
 */
import React from "react";

import "./Alert.css";

const Alert = ({message}) => (
  <div className="Alert">
    <span>{message}</span>
    {/* <div className="Alert__close"><i className="fa fa-close"/></div> */}
  </div>
);

export default Alert;