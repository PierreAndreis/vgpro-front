import React from "react";
import {Link} from "react-router-dom";
import _forEach from "lodash/forEach";

import {fetchLeaderboard} from "./../../../actions/api";

import {SkeletonPayload} from "../../common/Skeleton";
import Utils from "./../../../utils";

import {REGIONS, LEADERBOARD_TYPES} from "./../../../config/constants";

import Box         from "./../../common/Box";
import ErrorScreen from "./../../common/ErrorScreen";
import LeadMember from "./LeadMember";

import * as Styled from "./LeadBox.style";

class Lead5 extends React.Component {
  constructor() {
    super();

    this.state = {
      status: "loading",
      type: LEADERBOARD_TYPES[0],
      region: "all",
      payload: SkeletonPayload(4)
    };
  }

  changeRegion = (region) => (e) => {
    if (this.state.region === region) return;
    this.setState({
      region: region,
    }, this.fetch)
  }

  changeType = (type) => (e) => {
    if (this.state.type === type) return;
    this.setState({
      type,
    }, this.fetch)
  }

  componentDidMount() {
    this.fetch();
  }

  async fetch() {
    
    let {type, region} = this.state;

    const server_region = (region === "sea") ? "sg" : region;

    this.setState({
      status: "loading"
    });

    this.cancel = Utils.makeCancelable(
      fetchLeaderboard(type.value, server_region, {limit: 4}),
      (res) => this.setState({ status: "loaded", payload: res }),
      (e) => this.setState({ status: "error", payload: e })
    );
  }

  componentWillUnmount() {
    this.cancel();
  }
  
  render() {
    const {payload, status} = this.state;
    let content = [];

    if (status === "error" || !payload) content = <ErrorScreen err={payload} />
    else {  
      _forEach(payload, (each, index) => {
        content.push(<LeadMember key={`${index} - ${each.name}`} status={status} data={each} mode={this.state.type.value} />);
        index++;
      });
    }


    return (
      <Styled.Wrapper animation="fadeInUp">
        <Styled.Title className="Lead5-Title">
          {this.state.type.label} TOP4
          <Box.selector>
            {LEADERBOARD_TYPES.map(type => (
              <Box.selectorOptions
                   key={type.value}
                   icon={type.icon}
                   active={type.value === this.state.type.value}
                  onClick={this.changeType(type)}
              />
            ))}
          </Box.selector>
        </Styled.Title>
        <Box.body> 
          <div className="Box_RegionSelect">
              {
                REGIONS.map(region => (
                  <div key={region} 
                      className={region === this.state.region ? "active" : ""}
                      onClick={this.changeRegion(region)}>
                    {region}
                  </div>
                ))
              }
          </div>
          <div className="Box_Divider" />
          {content}
        </Box.body>
        <Box.action>
            <Link to={"/leaderboard"}>
              <div className="button">More</div>
            </Link>
        </Box.action>
      </Styled.Wrapper>
     
    )
  }
}

export default Lead5;