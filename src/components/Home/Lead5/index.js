import React from "react";
import * as lodash from "lodash";

import {fetchLead5}                         from "./../../../actions/api";

import {Box, BoxTitle, BoxBody, BoxActions} from "./../../common/Box";
import Loading                              from "./../../common/Loading";
import ErrorScreen                          from "./../../common/ErrorScreen";
import LeadMember from "./LeadMember";
import "./Lead5.css";

class Lead5 extends React.Component {
  constructor() {
    super();

    this.state = {
      status: "loading",
      region: "all", /* all, eu, na, sg, ea, cn */
      payload: null
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
    const {t} = this.props;
    const {payload, region, status} = this.state;
    let content = [];
    console.log(status, payload);

    /**/ if (status === "loading") content = <Loading/>
    else if (status === "error"  ) content = <ErrorScreen err={payload} />
    else if (status === "loaded" ) {

      const {all} = lodash.cloneDeep(payload)
      console.log(all);
      lodash.forEach(all, (each, position) => {
        each.position = position;
        content.push(<LeadMember key={`${position} - ${each.name}`} {...each} />);
      })


    }


    return (
      <Box>
        <BoxTitle>Leaderboard</BoxTitle>
        <BoxBody> 
          <div className="Lead5">
            {content}
         </div>
        </BoxBody>
        <BoxActions>
         <div className="view_more"> {t("view-less")} </div>
         <div className="view_more"> {t("view-more")}</div>
        </BoxActions>
      </Box>
     
    )
  }
}

export default Lead5;