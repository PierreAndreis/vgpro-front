import React from "react";
import {PieChart, Pie} from "recharts";

import "./FullPieChart.css";

export default ({data, label, children}) => {

  let composedData = data;

  if (data.length === 1) {

    let totalPercent = 100;

    let coloredPercent = data[0].value;
    let fadedPercent = totalPercent - coloredPercent;


    composedData = [
      ...data,
      { value: fadedPercent, fill: "rgba(0,0,0,0.1)" },
    ]
  }

  const width = 80;
  // const height = width / 1.6;
  const height = width / 1.29;
  
  // const cy = height / 1.2;
  const cy = height / 2;
  const outerRadius = width / 2.6;
  const innerRadius = outerRadius - 6;

  const fontSize = width / 7;

  const startAngle = 180;
  const endAngle = -180;


  return (
    <div className="FullPie-Container" style={{width}}>
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
            filter={"url(#blur)"}
            />
      </PieChart>
      <div className="FullPie-Label" style={{fontSize}} >{children}</div>
    </div>
  )
}