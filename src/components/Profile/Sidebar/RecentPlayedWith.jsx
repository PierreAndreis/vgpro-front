import React from "react";
import {Link} from "react-router-dom";
import Utils from "../../../utils";

import {Skeleton, SkeletonContainer, SkeletonPayload} from "../../common/Skeleton";

import "./RecentPlayedWith.css";

function compare(a,b) {
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
          <div className="PlayerFriends-each_stats_value">{wR}%</div>
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

const RecentPlayedWith = ({status, data, t}) => {

  let payload;
  let content = [];

  if (status === "loaded" && (data && data.stats && data.stats.PlayedWith)) {

    let playedWith = data.stats.PlayedWith;
    playedWith = playedWith.sort(compare)
    playedWith = playedWith.slice(0, 5);
    payload = playedWith;
  }
  else if (status === "loading") {
    payload = SkeletonPayload(5);
  }
  else {
    return (<p>Error!</p>);
  }

  payload.forEach((friend, index) => {
    content.push(<Friends key={index} status={status} data={friend} />);
  });

  return (
  <div className="PlayerFriends">
    {content}
  </div>
  )
}

export default RecentPlayedWith;