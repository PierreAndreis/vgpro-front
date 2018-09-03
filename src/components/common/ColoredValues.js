import React from "react";

const findInArray = (array, value) => {
  let color = "black";

  for (let i in array) {
    const desc = array[i];
    const start = desc.between[0];
    const end = desc.between[1];
    if (value >= start && value < end) {
      color = desc.color;
      break;
    }
  }

  return color;
};

export const KDA = ({ kda, label }) => {
  // I'd like to suggest something.KDA part (0 to 1 white) (3.0 yellow) (3.0L to 4.9 blue) (5.0 to higher red)
  // pQq
  // (3.0 yellow) -> 1.1 ~2.9 kda
  let value = kda;

  const kdaColors = [
    { between: [-99.0, 1.0], color: "" },
    { between: [1.0, 3.0], color: "rgb(136, 72, 72)" },
    { between: [3.0, 4.0], color: "rgb(136, 72, 72)" },
    { between: [4.0, 6.0], color: "#C8311E" },
    { between: [6.0, 9.0], color: "#F7B757" },
    { between: [9.0, Infinity], color: "#0089EF" },
  ];

  const color = findInArray(kdaColors, value);

  value = value.toFixed(2);

  if (label) {
    value += " " + label;
  }

  // if (deaths === 0 && (kills > 0 || assists > 0)) {
  //   kda = "PERFECT";
  //   color = "#C8311E";
  // }

  return <span style={{ color }}>{value}</span>;
};

export const Rate = ({ rate, label, fixed, component }) => {
  let value = Number(rate);
  // redo this color plz todo
  const RateColors = [
    { between: [0, 49.0], color: "grey" },
    { between: [45.0, 50.0], color: "darkgrey" },
    { between: [50.0, 70.0], color: "rgb(134, 200, 91)" },
    { between: [70.0, 80.0], color: "#0089EF" },
    { between: [80.0, 99.0], color: "tomato" },
    { between: [99.0, 101.0], color: "#C8311E" },
  ]; // {between: [30.0, 50.0]   , color: "#C8311E"         }, //yellow //blue //red //green

  const color = findInArray(RateColors, value);

  rate = (Number(rate) || 0).toFixed(fixed || 1) + "%";

  const Wrap = component || "span";

  console.log("Wrap=", Wrap);

  return (
    <Wrap
      style={{
        color,
        textShadow: `0 0 ${
          value === 100 ? "10px" : 0
        } rgba(255, 0, 0, 0.4)`,
      }}
    >
      {rate}
      {label}
    </Wrap>
  );
};
