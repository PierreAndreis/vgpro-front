import React from "react";

import ProfileHeader    from "./Header/ProfileHeader";
// import SubHeader from "./Header/SubHeader";

// import MatchFilter from "./MatchFilter";

// import "./profile.base.css";
// import "./profile.resp.css";

class Profile extends React.Component {
  render() {

    const {t} = this.props;
    return (
      <div>
        <ProfileHeader />
      </div>
    );
  }
}

export default Profile;
