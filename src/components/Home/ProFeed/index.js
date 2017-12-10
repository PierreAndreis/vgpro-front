import React from "react";

import FeedMatch        from "./FeedMatch";
import {Box, BoxTitle, BoxBody, BoxActions} from "./../../common/Box";
import {SkeletonPayload}                    from "../../common/Skeleton";
import ErrorScreen                          from "./../../common/ErrorScreen";
import {fetchProFeed}                       from "./../../../actions/api";

import Utils from "../../../utils";


import "./ProFeed.css";

const PRO_FEED_ITEM_PER_PAGE = 6;


class ProFeed extends React.Component {

  constructor() {
    super();

    this.state = {
      status: "loading",
      page: 1,
      payload: SkeletonPayload(PRO_FEED_ITEM_PER_PAGE)
    }

  }

  paginateUp(e) {
    e.preventDefault();
    if (e.target.id === "disabled") return;
    
    this.setState({
      page: this.state.page + 1
    })
  }

  paginateDown(e) {
    e.preventDefault();

    if (   e.target.id === "disabled"
        || this.state.page < 2) return;
    this.setState({
      page: this.state.page - 1
    })
  }
  
  async fetch() {
    try {
      this.setState({
        status: "loading"
      })
  
      const res = await fetchProFeed();
  
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

  componentWillMount() {
    this.fetch();
  }

  render() {

    const {t} = this.props;

    const {status, payload, page} = this.state;

    let lastPage;
    let content = null;
    if (status === "error"  ) content = <ErrorScreen err={payload} />
    else {

      const itemPerPage = PRO_FEED_ITEM_PER_PAGE;
      lastPage = (payload) ? (payload.length / itemPerPage) : 1;
      const matches = Utils.paginateArray(payload, PRO_FEED_ITEM_PER_PAGE, page);
      content = matches.map((match, i) => <FeedMatch key={i} t={t} status={status} data={match} />);
    }

    return (

      <Box>
      <BoxTitle>{t('pro-history')}</BoxTitle>
      <BoxBody>
        <div className="ProFeed">
          {content}
        </div>
      </BoxBody>
      <BoxActions>
        <div className="button" id={(page > 1       ) ? "" : "disabled"}  onClick={this.paginateDown.bind(this)}> {t("view-less")} </div>
        <div className="button" id={(page < lastPage) ? "" : "disabled"}  onClick={this.paginateUp.bind(this)  } >{t("view-more")}</div>
      </BoxActions>
    </Box>
    )
  }
}

export default ProFeed;