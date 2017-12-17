import React from "react";
import {Link} from "react-router-dom";

import ErrorScreen from "../../common/ErrorScreen";
import Box         from "../../common/Box";
import {Rate}      from "../../common/ColoredValues";
import Utils       from "../../../utils";

import {Skeleton, SkeletonContainer, SkeletonPayload} from "../../common/Skeleton";

import "./RecentPlayedWith.css";

const FRIENDS_PER_PAGE = 7;

function compare (a,b) {
  if (a.games < b.games)
    return 1;
  if (a.games > b.games)
    return -1;
  return 0;
}

const Loading = () => (
  <div className="PlayerFriends-each">
    <div className="PlayerFriends-each_name"><Skeleton width="40px" height="15px"/></div>
    <div className="PlayerFriends-each_stats">
      <div className="PlayerFriends-each_stats_value"><Skeleton width="20px" height="15px"/></div>
      <div className="PlayerFriends-each_stats_name">Wins</div>
    </div>
    <div className="PlayerFriends-each_stats">
      <div className="PlayerFriends-each_stats_value"><Skeleton width="20px" height="15px"/></div>
      <div className="PlayerFriends-each_stats_name">Losses</div>
    </div>
    <div className="PlayerFriends-each_stats">
      <div className="PlayerFriends-each_stats_value"><Skeleton width="20px" height="15px"/></div>
      <div className="PlayerFriends-each_stats_name">W/R</div>
    </div>
    <div className="PlayerFriends-each_stats">
      <div className="PlayerFriends-each_stats_value"><Skeleton width="20px" height="15px"/></div>
      <div className="PlayerFriends-each_stats_name">Games</div>
    </div>
  </div>
)

class Loaded extends React.Component{
  render() {
    const {data} = this.props;

    const {games, wins, name} = data;

    const loss = (games - wins);
    const wR = ((wins / games) * 100).toFixed(1);

    return (
      <Link to={Utils.goToPlayer(name)} className="PlayerFriends-each">
        <div className="PlayerFriends-each_name">{name}</div>
        <div className="PlayerFriends-each_stats">
          <div className="PlayerFriends-each_stats_value">{wins}</div>
          <div className="PlayerFriends-each_stats_name">Wins</div>
        </div>
        <div className="PlayerFriends-each_stats">
          <div className="PlayerFriends-each_stats_value">{loss}</div>
          <div className="PlayerFriends-each_stats_name">Losses</div>
        </div>
        <div className="PlayerFriends-each_stats">
          <div className="PlayerFriends-each_stats_value"><Rate rate={wR} label="%" /></div>
          <div className="PlayerFriends-each_stats_name">W/R</div>
        </div>
        <div className="PlayerFriends-each_stats">
          <div className="PlayerFriends-each_stats_value">{games}</div>
          <div className="PlayerFriends-each_stats_name">Games</div>
        </div>
      </Link>
    )
  }
}

const Friends = SkeletonContainer(Loading, Loaded);

class RecentPlayedWith extends React.Component {
  
  state = {
    page: 1,
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.status === "loading") return this.setState({page: 1});
  }

  paginateUp(e) {
    if (e.target.id === "disabled") return;
    
    this.setState({
      page: this.state.page + 1
    })
  }

  paginateDown(e) {
    if (   e.target.id === "disabled"
        || this.state.page < 2) return;
    this.setState({
      page: this.state.page - 1
    })
  }

  render() {
    const {status, data} = this.props;
    const {page} = this.state;

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
      content.push(<Friends key={index} status={status} data={friend} />);
    });

    return (
    <div className="PlayerFriends">
      {content}
      <Box.action>
        <div className="button" 
        id={(page > 1       ) ? "" : "disabled"}  
        onClick={this.paginateDown.bind(this)}
            >Back</div>
        <div className="button" 
            id={(page < lastPage) ? "" : "disabled"} 
            onClick={this.paginateUp.bind(this) } 
            >Next</div>
      </Box.action>
    </div>
    )
  }
}

export default RecentPlayedWith;