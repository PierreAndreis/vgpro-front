import React from "react";

import FeedMatch from "./FeedMatch";

import {fetchProFeed} from "./../../../actions/feed";

import "./ProFeed.css";

const PRO_FEED_ITEM_PER_PAGE = 5;

class ProFeed extends React.Component {

  constructor() {
    super();

    this.state = {
      status: "none",
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
      });
      console.warn(e);
    }
    
  }

  componentWillMount() {
    this.fetch();
  }

  render() {

    const {t} = this.props;

    const {status, payload, page} = this.state;

    let matches = null;
    let lastPage;

    if (status === "loading") matches = "Loading...";
    else if (status === "loaded") {

      const itemPerPage = PRO_FEED_ITEM_PER_PAGE;

      const endIndex = page * itemPerPage;

      const startIndex = endIndex - itemPerPage;

      lastPage = (payload) ? (payload.length / itemPerPage) : 1;

      console.log(page, lastPage, page <= lastPage)
      
      matches = payload.map((match, i) => {

        if ((i >= startIndex) && (i <= endIndex)) {
          return <FeedMatch key={i} t={t} data={match} />
        }

        return null;


      })
    }

    return (
      <div className="ProFeed">
        {matches}
      <div className="ProFeed-buttons">
        <div className="view_more" id={(page > 1       ) ? "" : "disabled"}  onClick={this.paginateDown.bind(this)}> {t("view-less")} </div>
        <div className="view_more" id={(page < lastPage) ? "" : "disabled"}  onClick={this.paginateUp.bind(this)  } >{t("view-more")}</div>
      </div>
      </div>
    )
  }
}

export default ProFeed;