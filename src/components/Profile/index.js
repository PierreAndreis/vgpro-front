import React from "react";

import Header    from "./Header";
import SubHeader from "./Header/SubHeader";

import MatchFilter from "./MatchFilter";

import "./profile.base.css";
import "./profile.resp.css";

class Profile extends React.Component {
  render() {

    const {t} = this.props;
    return (
      <div>
        <Header t={t} />
        <SubHeader t={t} />
          <div className="wrap">
            <MatchFilter t={t} />

            <div className="match_history_content"><div className="match_history"></div> </div>

          </div>
        </div>
    );
  }
}

export default Profile;
