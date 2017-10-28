import React from "react";

import "./leaderboard.base.css";
import "./leaderboard.resp.css";


class Leaderboard extends React.Component{
  render() {

  return (
    <div className="content">
    <div className="wrap">
      <div className="leaderboard">
        <div className="leaderboard_tools">
          <div>

          </div>
          <div className="region_list">
            <div className="region_all_filter">
              <div className="region_filter" data-region='global'>Global</div>
              <div className="region_filter" data-region='na'>NA</div>
              <div className="region_filter" data-region='eu'>EU</div>
              <div className="region_filter" data-region='ea'>EA</div>
              <div className="region_filter" data-region='sg'>SEA</div>
              <div className="region_filter" data-region='sa'>SA</div>
              <div className="region_filter" data-region='cn'>CN</div>
            </div>
          </div>
          <div className="player_input">
            <form className="lookup_leader">
            <input type="text" className="input_name" required name="playername" placeholder="Player Name (case sensitive)" />
            <button><i className="fa fa-search"></i></button>
             </form>
          </div>
          <div></div>
        </div>
        <div className="leaderboard_table">
          <div className="leaderboard_header">
            <div className="position"></div>

            <div className="player">
              <div className="tier"></div>Player</div>

            <div className="kda">KDA</div>
            <div className="winrate">Win Rate</div>
            <div className="points">VPR</div>
          </div>

          <span className="lead_box"></span>
          <div className="load">
            <svg className="circular">
              <circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10" />
            </svg>
          </div>
          <div className="view_more_space">
            <div className="view_more">
              View More
            </div>
            <div className="view_reset" style={{display:"none"}}>
              Reset
            </div>

          </div>

        </div>

      </div>

    </div>
  </div>
    );
  }
}

export default Leaderboard;