import React from "react";

import FeedMatch from "./FeedMatch";
import {Box, BoxTitle, BoxBody, BoxActions} from "./../../common/Box";
import Loading                              from "./../../common/Loading";
import ErrorScreen                          from "./../../common/ErrorScreen";
import {fetchProFeed}                       from "./../../../actions/api";
import FadeProps from 'fade-props';

import "./ProFeed.css";

const PRO_FEED_ITEM_PER_PAGE = 6;

class ProFeed extends React.Component {

  constructor() {
    super();

    this.state = {
      status: "loading",
      page: 1,
      payload: null
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
    let content = [];

    /**/ if (status === "loading") content = <Loading items={PRO_FEED_ITEM_PER_PAGE}/>
    else if (status === "error"  ) content = <ErrorScreen err={payload} />
    else if (status === "loaded") {

      const itemPerPage = PRO_FEED_ITEM_PER_PAGE;
      lastPage = (payload) ? (payload.length / itemPerPage) : 1;

      const endIndex   = page     * itemPerPage;
      const startIndex = endIndex - itemPerPage;
      payload.forEach((match, i) => {

        if ((i >= startIndex) && (i < endIndex)) {
          content.push(<FeedMatch key={i} t={t} data={match} />);
        }
        
      })
    }

    return (

      <Box>
      <BoxTitle>{t('pro-history')}</BoxTitle>
      <BoxBody>
        <div className="ProFeed">
          <FadeProps animationLength={100}>
            <div>
              {content}
            </div>
          </FadeProps>
        </div>
      </BoxBody>
      <BoxActions>
        <div className="view_more" id={(page > 1       ) ? "" : "disabled"}  onClick={this.paginateDown.bind(this)}> {t("view-less")} </div>
        <div className="view_more" id={(page < lastPage) ? "" : "disabled"}  onClick={this.paginateUp.bind(this)  } >{t("view-more")}</div>
      </BoxActions>
    </Box>
    )
  }
}


export default ProFeed;