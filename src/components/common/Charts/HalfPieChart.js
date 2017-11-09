import React from "react";
import {PieChart, Pie} from "recharts";

import "./HalfPieChart.css";

export default ({data, label}) => {

  let composedData = data;

  if (data.length === 1) {

    let totalPercent = 100;

    let coloredPercent = data[0].value;
    let fadedPercent = totalPercent - coloredPercent;


    composedData = [
      { value: fadedPercent, fill: "rgba(0, 0, 0, 0.2)" },
      ...data,
    ]
  }

  const width = 150;
  const height = width / 1.6;

  const cy = height / 1.2;

  const outerRadius = width / 2.3;
  const innerRadius = outerRadius - 15;

  const fontSize = width / 7;


  return (
    <div className="HalfPie-Container" style={{width}}>
      <PieChart width={width} stroke height={height}>
        <Pie data={composedData}
            dataKey="value" 
            startAngle={0} 
            endAngle={180} 
            cy={cy}
            fill={"#00000"}
            outerRadius={outerRadius}
            innerRadius={innerRadius} 
            stroke={"none"}
            />
      </PieChart>
      <div className="HalfPie-Label" style={{fontSize}} >{label}</div>
    </div>
  )
}