import React from "react";
import _forEach from "lodash/forEach";

import {fetchLead5}                         from "./../../../actions/api";

import {SkeletonPayload} from "../../common/Skeleton";
import Utils from "./../../../utils";

import {Box, BoxTitle, BoxBody, BoxActions} from "./../../common/Box";
import ErrorScreen                          from "./../../common/ErrorScreen";
import LeadMember from "./LeadMember";
import "./Lead5.css";

const REGIONS = [
  "all",
  "na",
  "eu",
  "ea",
  "sea",
  "sa",
  "cn"
]

class Lead5 extends React.Component {
  constructor() {
    super();

    this.state = {
      status: "loading",
      mode: "ranked",
      region: "all", /* all, eu, na, sg, ea, cn */
      payload: SkeletonPayload(4)
    }

  }

  changeRegion = (region) => (e) => {
    if (this.state.region === region) return;
    this.setState({
      region: region,
    }, this.fetch)
  }

  componentDidMount() {
    this.fetch();
  }

  async fetch() {
    
    let {mode, region} = this.state;

    const server_region = (region === "sea") ? "sg" : region;

    this.setState({
      status: "loading"
    });

    this.cancel = Utils.makeCancelable(
      fetchLead5(mode, server_region, {limit: 4}),
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
        content.push(<LeadMember key={`${index} - ${each.name}`} status={status} data={each} />);
        index++;
      });
    }


    return (
      <Box className="Lead5-box animated fadeInUp">
        <BoxTitle>Leaderboard</BoxTitle>
        <BoxBody className="Lead5-body"> 
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
          <div className="Lead5">
            {content}
         </div>
        </BoxBody>
        <BoxActions/>
      </Box>
     
    )
  }
}

export default Lead5;