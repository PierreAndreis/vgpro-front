import React from "react";

import "./teams.base.css";
import "./teams.resp.css";

class Team extends React.Component {
  render() {
    return (
      <div>
        <div className="teams_up">
          <div className="wrap">
            <div className="regieach">
              <div className="select" id="na">
                NA
              </div>
              <div id="eu">EU</div>
              <div id="ea">EA</div>
              <div id="sg">SEA</div>
              <div id="sa">SA</div>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="wrap">
            <div className="boxes" />
          </div>
        </div>
      </div>
    );
  }
}

export default Team;
