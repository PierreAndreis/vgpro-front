import React from "react";

import { Trans } from "react-i18next";

import FeedMatch from "./FeedMatch";
import Box from "./../../common/Box";
import { SkeletonPayload } from "./../../common/Skeleton";
import ErrorScreen from "./../../common/ErrorScreen";
import { fetchProFeed } from "./../../../actions/api";

import Utils from "../../../utils";

import * as Styled from "./ProFeedBox.style.js";

const PRO_FEED_ITEM_PER_PAGE = 6;

class ProFeed extends React.Component {
  constructor() {
    super();

    this.state = {
      status: "loading",
      page: 1,
      payload: SkeletonPayload(PRO_FEED_ITEM_PER_PAGE),
    };
  }

  componentWillMount() {
    this.fetch();
  }

  componentWillUnmount() {
    if (typeof this.cancel === "function") this.cancel();
  }

  paginateUp(e) {
    e.preventDefault();
    if (e.target.id === "disabled") return;
    this.setState(prevState => {
      return {
        page: prevState.page + 1,
      };
    });
  }
  paginateDown(e) {
    e.preventDefault();
    if (e.target.id === "disabled") return;

    this.setState(prevState => {
      if (prevState.page < 2) return;
      return {
        page: prevState.page - 1,
      };
    });
  }

  fetch() {
    this.setState({
      status: "loading",
    });

    this.cancel = Utils.makeCancelable(
      fetchProFeed(),
      res => this.setState({ status: "loaded", payload: res }),
      e => this.setState({ status: "error", payload: e })
    );
  }

  render() {
    const { t } = this.props;

    const { status, payload, page } = this.state;

    let lastPage;
    let content = null;
    if (status === "error" || !payload)
      content = <ErrorScreen err={payload} />;
    else {
      const itemPerPage = PRO_FEED_ITEM_PER_PAGE;
      lastPage = payload ? payload.length / itemPerPage : 1;
      const matches = Utils.paginateArray(
        payload,
        PRO_FEED_ITEM_PER_PAGE,
        page
      );
      content = matches.map((match, i) => {
        let key = page + i;
        return <FeedMatch key={key} t={t} status={status} data={match} />;
      });
    }

    return (
      <Styled.Wrapper animation="fadeInLeft">
        <Box.title>
          <Trans i18nKey="feature.ProHistory" /> 5v5
        </Box.title>
        <Styled.Body>{content}</Styled.Body>
        <Box.action>
          <Box.button
            disabled={page === 1}
            onClick={this.paginateDown.bind(this)}
          >
            <Trans i18nKey="general.Back" />
          </Box.button>
          <Box.button
            disabled={page > lastPage}
            onClick={this.paginateUp.bind(this)}
          >
            <Trans i18nKey="general.Next" />
          </Box.button>
        </Box.action>
      </Styled.Wrapper>
    );
  }
}

export default ProFeed;
