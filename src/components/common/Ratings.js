import React from "react";

const kdas = [
  {between: [-99.0, 1.0], color: ""           },
  {between: [1.0, 3.0]  , color: ""           },
  {between: [3.0, 6.0]  , color: "#0089EF"    },
  {between: [6.0, 40.0] , color: "#C8311E"    }
];

const vprs = [
  {between: [0   , 1000], color: "#CCCCC"                 },
  {between: [1000, 2000], color: "#726F6F"                },
  {between: [2000, 2400], color: "#85A3C0"                },
  {between: [2400, 2800], color: "#5B93C8"                },
  {between: [2800, 9000], color: "rgba(134, 200, 91, 1)"  },
];


export const KDA = ({value, label, defaultColor, className}) => {

  let kda = value;
  let color = (defaultColor) ? defaultColor : "black";
  let classes = (className) ? className : "";

  for (let i in kdas) {
    const desc = kdas[i];
    const start = desc.between[0];
    const end   = desc.between[1];
    if (kda >= start && kda < end) {
      color = desc.color;
      break;
    }
  }

  if (label) {
    kda += " " + label;
  }


  return <span style={{color: color}} className={classes}>{kda}</span>
}

export const VPR = ({value, defaultColor, className}) => {

  let vpr = value;
  let color = (defaultColor) ? defaultColor : "black";
  let classes = (className) ? className : "";

  for (let i in vprs) {
    const desc = vprs[i];
    const start = desc.between[0];
    const end   = desc.between[1];
    if (vpr >= start && vpr < end) {
      color = desc.color;
      break;
    }
  }

  return <span style={{color: color}} className={classes}>{parseInt(vpr, 10)}</span>

}