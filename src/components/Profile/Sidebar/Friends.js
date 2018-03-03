import React from "react";

import ErrorScreen from "../../common/ErrorScreen";
import Box from "../../common/Box";
import { Rate } from "../../common/ColoredValues";
import Utils from "../../../utils";

import { SkeletonWrapper, SkeletonPayload } from "../../common/Skeleton";

import * as Styled from "./Friends.style";

const FRIENDS_PER_PAGE = 7;

function compare(a, b) {
  if (a.games < b.games) return 1;
  if (a.games > b.games) return -1;
  if (a.wins < b.wins) return 1;
  if (a.wins > b.wins) return -1;
  return 0;
};

const Friend = ({status, player}) => {
  let wR;
  let link = "/";

  if (status === "loaded") {
    wR = ((player.wins / player.games) * 100).toFixed(1);
    link = Utils.goToPlayer(player.name);
  } 

  return (
    <Styled.Each to={link}>

      <Styled.Name>
        <SkeletonWrapper status={status} width="40px" height="15px">
        {() => player.name}
        </SkeletonWrapper>
      </Styled.Name>

      <Styled.Stats>
        <span>
          <SkeletonWrapper status={status} width="20px" height="15px" children={() => player.wins}/>
        </span>
        <div className="PlayerFriends-each_stats_name">Wins</div>
      </Styled.Stats>

      <Styled.Stats>
        <span>
          <SkeletonWrapper status={status} width="20px" height="15px" children={() => player.games - player.wins}/>
        </span>
        <div>Losses</div>
      </Styled.Stats>

      <Styled.Stats>
        <span>
          <SkeletonWrapper status={status} width="20px" height="15px" children={() => <Rate rate={wR} label="%" />} />
        </span>
        <div>W/R</div>
      </Styled.Stats>

      <Styled.Stats>
        <span>
          <SkeletonWrapper status={status} width="20px" height="15px" children={() => player.games}/>
        </span>
        <div>Games</div>
      </Styled.Stats>

    </Styled.Each>
  )
}

class RecentPlayedWith extends React.Component {

  state = {
    page: 1,
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.status === "loading") return this.setState({ page: 1 });
  }

  paginateUp(e) {
    if (e.target.id === "disabled") return;

    this.setState({
      page: this.state.page + 1
    })
  }

  paginateDown(e) {
    if (e.target.id === "disabled"
      || this.state.page < 2) return;
    this.setState({
      page: this.state.page - 1
    })
  }

  render() {
    const { status, data } = this.props;
    const { page } = this.state;

    let payload;
    let lastPage;
    let content = [];

    if (status === "loaded" && (data && data.stats && data.stats.PlayedWith)) {

      let playedWith = data.stats.PlayedWith;
      let itemPerPage = FRIENDS_PER_PAGE;
      playedWith = playedWith.filter(p => p.games > 3);
      playedWith = playedWith.sort(compare);
      lastPage = (playedWith) ? (playedWith.length / itemPerPage) : 1;
      playedWith = Utils.paginateArray(playedWith, itemPerPage, page);
      payload = playedWith;
    }
    else if (status === "loading") {
      payload = SkeletonPayload(FRIENDS_PER_PAGE);
    }
    else {
      return <ErrorScreen />
    }

    payload.forEach((friend, index) => {
      content.push(<Friend key={index} status={status} player={friend} />);
    });

    return (
      <Styled.Wrap>
        <Box.title>Played with</Box.title>
        <Styled.Content>
          {content}
        </Styled.Content>
        <Box.action>
          <Box.button
            disabled={status !== "loaded" || page === 1}
            onClick={this.paginateDown.bind(this)}
          >Back</Box.button>
          <Box.button
            disabled={status !== "loaded" || page > lastPage}
            onClick={this.paginateUp.bind(this)}
          >Next</Box.button>
        </Box.action>
      </Styled.Wrap>
    )
  }
}

export default RecentPlayedWith;