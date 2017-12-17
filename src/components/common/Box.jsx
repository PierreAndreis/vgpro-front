import React from "react";

import "./Box.css"

export const Box = (props) => {

  let style = {};
  const classNames = ["box__card"]

  if (props.style) {
    style = props.style;
  }

  if (props.className) {
    classNames.push(props.className);
  }

  return (
      <div className={classNames.join(" ")} style={style} >
        {props.children}
      </div>
    )
}

export const BoxTitle = (props) => {
  let style = {};
  const classNames = ["box__card-Title"];

  if (props.style) {
    style = props.style;
  }

  if (props.className) {
    classNames.push(props.className);
  }

  return (
    <div className={classNames.join(" ")} style={style}>
      {props.children}
    </div>
  )
}

export const BoxBody = (props) => {
  let style = {};
  const classNames = ["box__card-Body",];

  if (props.style) {
    style = props.style;
  }

  if (props.className) {
    classNames.push(props.className);
  }

  return (
    <div className={classNames.join(" ")} style={style}>
      {props.children}
    </div>
  )
}

export const BoxActions = (props) => {
  let style = {};
  const classNames = ["box__card-Actions"];

  if (props.style) {
    style = props.style;
  }

  if (props.className) {
    classNames.push(props.className);
  }

  return (
    <div className={classNames.join(" ")} style={style}>
      {props.children}
    </div>
  )
}

export default {
  wrap:   Box,
  title:  BoxTitle,
  body:   BoxBody,
  action: BoxActions,
}