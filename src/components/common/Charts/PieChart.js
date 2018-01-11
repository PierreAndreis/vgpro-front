import React from "react";
import {PieChart, Pie} from "recharts";

import "./FullPieChart.css";

export default ({data, label, children, ...props}) => {

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

  const width = props.width || 80;
  // const height = width / 1.6;
  const height = width / 1.29;
  
  // const cy = height / 1.2;
  const cy = height / 2;
  const outerRadius = width / 2.6;
  const innerRadius = outerRadius - 6;

  const fontSize = width / 7;

  const startAngle = 90;
  const endAngle = -360;


  return (
    <div className="FullPie-Container" style={{width}}>
      <PieChart width={width} height={height} margin={{top:0, left: 0, bottom:0, right: 0}}>
        <defs>
          <linearGradient id="orange" x1="0%" y1="0%" x2="100%" y2="0%" gradientUnits="userSpaceOnUse">
            <stop offset="5%" stopColor="#FAD961" stopOpacity={1}/>
            <stop offset="95%" stopColor="#F76B1C" stopOpacity={1}/>
          </linearGradient>

          <linearGradient id="red" x1="0%" y1="0%" x2="100%" y2="0%" gradientUnits="userSpaceOnUse">
            <stop offset="5%" stopColor="#FF5D6B" stopOpacity={1}/>
            <stop offset="95%" stopColor="#B1041E" stopOpacity={1}/>
          </linearGradient>

          <linearGradient id="blue" x1="0%" x2="100%" y1="0%" y2="0%" gradientUnits="userSpaceOnUse">
            <stop offset="5%" stopColor="#51E1EC" stopOpacity={1}/>
            <stop offset="95%" stopColor="#3023AE" stopOpacity={1}/>
          </linearGradient>

          <linearGradient id="carry" x1="0%" y1="0%" x2="100%" y2="0%" gradientUnits="userSpaceOnUse">
            <stop offset="5%" stopColor="#F5515F" stopOpacity={1}/>
            <stop offset="95%" stopColor="#9F041B" stopOpacity={1}/>
          </linearGradient>

          <linearGradient id="jungler" x1="0%" y1="0%" x2="100%" y2="0%" gradientUnits="userSpaceOnUse">
            <stop offset="5%" stopColor="#B4EC51" stopOpacity={1}/>
            <stop offset="95%" stopColor="#429321" stopOpacity={1}/>
          </linearGradient>


          <linearGradient id="captain" x1="0%" y1="0%" x2="100%" y2="0%" gradientUnits="userSpaceOnUse">
            <stop offset="5%" stopColor="#FAD961" stopOpacity={1}/>
            <stop offset="95%" stopColor="#F76B1C" stopOpacity={1}/>
          </linearGradient>

          <filter id="blur" x="0" y="0" width="200%" height="200%">
            <feOffset result="offOut" in="SourceGraphic" dx="0" dy="0" />
            <feGaussianBlur result="blurOut" in="offOut" stdDeviation="1.5" />
            <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
          </filter>
        </defs>
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