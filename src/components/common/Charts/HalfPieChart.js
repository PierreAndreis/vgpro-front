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
      { value: fadedPercent, fill: "rgba(0,0,0,0.1)" },
      ...data,
    ]
  }

  const width = 180;
  // const height = width / 1.6;
  const height = width / 1.29;
  
  // const cy = height / 1.2;
  const cy = height / 2;
  const outerRadius = width / 2.6;
  const innerRadius = outerRadius - 10;

  const fontSize = width / 7;

  const startAngle = -50;
  const endAngle = 180 + (startAngle * -1);


  return (
    <div className="HalfPie-Container" style={{width}}>
      <PieChart width={width} stroke height={height} margin={{top:0, left: 0, bottom:0, right: 0}}>
        <Pie data={composedData}
            dataKey="value" 
            startAngle={startAngle} 
            endAngle={endAngle} 
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