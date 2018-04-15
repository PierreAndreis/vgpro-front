import React from "react";
import {ResponsiveContainer, LineChart, Line, XAxis, YAxis, ReferenceLine, CartesianGrid, Tooltip, Legend} from "recharts";
import styled from "styled-components";
import Spinner from "react-spinkit";

import Box from "../../../common/Box";
import { fetchHeroHistory } from "../../../../actions/api";
import Utils from "../../../../utils";
import { darken } from "polished";

const data = [
      {name: '3.1', average: 52},
      {name: '3.2', average: 51},
      {name: '3.3', average: 52},
      {name: '3.4', average: 50},
      {name: '3.5', average: 53},
];


const GraphArea = styled.div`
  display: flex;
  height: 150px;
  padding: 10px;
  box-sizing: border-box;
  font-size: 12px;
  font-weight: bold;
  justify-content: center;
`;

const TooltipStyle = styled(Box.wrap)`
  display: inline-block;
  width: auto;
  padding: 5px 10px;
  position: relative;
  color: #ECECEE;

  background-color: rgba(0, 0, 0, 0.7);
  &>span {
    color: ${props => props.theme.primary[400]};
    font-weight: bold;
  }
  &>div {
    text-align: center;
    width: 100%;
    font-weight: 400;
  }
`

const CustomTooltip  = ({active, payload, label}) => {
    if (active) {
      return (
        <TooltipStyle>
          <span>{label}</span> 
          <br />
          <div>{payload[0].value}%</div>
        </TooltipStyle>
      );
    }

    return null;
}

const SimpleLineChart = ({data, color, syncId}) => (
  <ResponsiveContainer>
    <LineChart data={data} syncId={syncId}>
      <defs>
        <linearGradient id="blue" x1="0%" x2="100%" y1="0%" y2="0%" gradientUnits="userSpaceOnUse">
              <stop offset="5%" stopColor="#51E1EC" stopOpacity={1}/>
              <stop offset="95%" stopColor="#3023AE" stopOpacity={1}/>
        </linearGradient>
        <linearGradient id="bluexpink" x1="0%" x2="100%" y1="0%" y2="0%" gradientUnits="userSpaceOnUse">
              <stop offset="5%" stopColor="#4681BA" stopOpacity={1}/>
              <stop offset="95%" stopColor="#DB4EA1" stopOpacity={1}/>
        </linearGradient>
        <linearGradient id="orange" x1="0%" x2="100%" y1="0%" y2="0%" gradientUnits="userSpaceOnUse">
              <stop offset="5%" stopColor="#F0CE78" stopOpacity={1}/>
              <stop offset="95%" stopColor="#EEAE85" stopOpacity={1}/>
        </linearGradient>
        <linearGradient id="red" x1="0%" y1="0%" x2="100%" y2="0%" gradientUnits="userSpaceOnUse">
          <stop offset="5%" stopColor="#FF5D6B" stopOpacity={1}/>
          <stop offset="95%" stopColor="#B1041E" stopOpacity={1}/>
        </linearGradient>
        <filter id="blur" x="-50%" y="-50%" width="200%" height="200%">
          <feOffset result="offOut" in="SourceGraphic" dx="0" dy="0" />
          <feGaussianBlur result="blurOut" in="offOut" stdDeviation="1.5" />
          <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
        </filter>
      </defs>
      <XAxis dataKey="name" 
             padding={{left: 0, right: 0}} 
             height={20} 
             allowDecimals={false}/>
      <YAxis scale="auto" 
             domain={["auto", "auto"]}
             padding={{left: 0, right: 0, top: 0, bottom: 0}} 
             width={20} 
             allowDecimals={false}/>
             
      <CartesianGrid stroke="rgba(104, 104, 104, 0.2)" strokeDasharray="5 5"/>
      <Tooltip content={<CustomTooltip/>}/>
      <ReferenceLine y={50} stroke="rgba(250, 0, 0, 0.5)" strokeDasharray="5 5"/>
      <Line type="monotone" dot={true} dataKey="average" stroke={`url(#${color})`} strokeWidth="2" filter={"url(#blur)"}/>
      {/* <Line type="linear" dot={true} dataKey="pickRate" stroke={`url(#orange)`} strokeWidth="1" filter={"url(#blur)"}/> */}
    </LineChart>
  </ResponsiveContainer>
);

class HistoryCharts extends React.Component {
  state = {
    payload: null,
    status: "loading",
    heroName: null
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.hero !== prevState.heroName) {
      return {
        status: "loading",
        heroName: nextProps.hero,
        payload: null
      };
    }

    // Return null to indicate no change to state.
    return null;
  }

  componentDidMount() {
    this.fetch();
  }
  
  componentWillUnmount() {
    this.cancel();
  }

  async fetch() {

    let heroName = this.state.heroName;

    this.cancel = Utils.makeCancelable(
      fetchHeroHistory(heroName, {region: "all", mode: "patch"}),
      (res) => this.setState({status: "loaded", payload: res})
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.heroName !== this.state.heroName) {
      this.fetch();
    }
  }

  render() {

    let payload = this.state.payload;
    let heroPayload = this.props.payload;

    let winRate = null;
    let pickRate = null;
    let banRate = null;

    if (payload) {
      winRate = payload.map(p => ({name: p.patch,  placement: p.rank && p.rank.winRate,  average: p.winRate || 0})).reverse();
      pickRate = payload.map(p => ({name: p.patch, placement: p.rank && p.rank.pickRate, average: p.pickRate || 0})).reverse();
      banRate = payload.map(p => ({name: p.patch,  placement: p.rank&& p.rank.banRate,   average: p.banRate || 0})).reverse();
    }

    let timeRelative = null;

    if (heroPayload) {
      timeRelative = heroPayload.durations
      .filter(duration => parseInt(duration.key) < 50) // Remove 45-55 That's way too not often
      .map(duration => ({name: `${duration.key - 5}-${parseInt(duration.key) + 5}`, average: duration.winRate, pickRate: duration.pickRate}));
    }


    console.log(winRate);
    return (
      <React.Fragment>
        <GraphBox title="Win Rate By Patch"       type="patch" payload={winRate}      color="orange"/>
        <GraphBox title="Pick Rate By Patch"      type="patch" payload={pickRate}     color="bluexpink"/>
        <GraphBox title="Win Rate By Game Length" type="time"  payload={timeRelative} color="blue"/>
        <GraphBox title="Ban Rate By Patch"       type="patch" payload={banRate}      color="red"/>
      </React.Fragment>
    )
  }
}


const GraphBox = ({title, payload, color, type}) => {

  let placementContent;

  if (payload && type === "patch") {
    
    // Make a copy since it's going to be mutated
    let patches = [...payload];

    let last = patches.pop();
    // let beforeLast = patches.pop();

    placementContent = (
      <Box.subtitle>
        {last.average}% (#{last.placement})
      </Box.subtitle>
    )

  }

  return (
    <Box.wrap>
      <Box.title>
        {title}
        {placementContent}
      </Box.title>
      <Box.body>
        <GraphArea>
          {payload && <SimpleLineChart data={payload} color={color} syncId={type}/>}
          {!payload && (
            <div style={{alignSelf: "center", justifySelf: "center"}}>
              <Spinner name="line-spin-fade-loader" color="rgba(0, 0, 0, 0.2)" fadeIn="none"/>
            </div>
          )}
        </GraphArea>
      </Box.body>
    </Box.wrap>
  )
}

export default HistoryCharts;