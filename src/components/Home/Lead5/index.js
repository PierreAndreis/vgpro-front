import React from "react";
import _forEach from "lodash/forEach";

import {fetchLead5}                         from "./../../../actions/api";

import {SkeletonPayload} from "../../common/Skeleton";

import {Box, BoxTitle, BoxBody, BoxActions} from "./../../common/Box";
import ErrorScreen                          from "./../../common/ErrorScreen";
import LeadMember from "./LeadMember";
import "./Lead5.css";

class Lead5 extends React.Component {
  constructor() {
    super();

    this.state = {
      status: "loading",
      region: "all", /* all, eu, na, sg, ea, cn */
      payload: {all: SkeletonPayload(5)}
    }

  }

  componentDidMount() {
    this.fetch();
  }

  async fetch() {
    
    try {
      this.setState({
        status: "loading"
      })
  
      const res = await fetchLead5();
  
      this.setState({
        status: "loaded",
        payload: res
      })
    }
    catch(e) {
      this.setState({
        status: "error",
        payload: e
      })
    }
    
  }
  
  render() {
    const {payload, status} = this.state;
    let content = [];

    if (status === "error" || !payload) content = <ErrorScreen err={payload} />
    else {  

      const {all} = payload;
      let index = 1;
      _forEach(all, (each) => {
        let data = {
          ...each,
          position: index
        }
        content.push(<LeadMember key={`${index} - ${each.name}`} status={status} data={data} />);
        index++;
      })


    }


    return (
      <Box className="Lead5-box animated fadeInUp">
        <BoxTitle>Leaderboard</BoxTitle>
        <BoxBody> 
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