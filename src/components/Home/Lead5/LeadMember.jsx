import React from "react";

import Utils from "utils"; 

import {VPR}      from "./../../common/Ratings";
import { Link }   from 'react-router-dom';

const LeadMember = ({
  position,
  name,
  region,
  tier,
  kda,
  rating
}) => {

  let id = "";

  if (position === 1 || position === "1") {
    id = "featured";
  }

  return (
  <Link to={Utils.goToPlayer(name)} className="Lead5-each" id={id}>
    <div className="Lead5-each-pos">{position}</div>
    <div className="Lead5-each-info">
      <div className="Lead5-each-info-name">{name}
        <span>{Utils.transformRegion(region)}</span>
      </div>
      <div className="Lead5-each-info-skilltier">{Utils.getSkillTier(tier)}</div>
      <div className="Lead5-each-info-stats">AVG KDA {kda}</div>
    </div>
    <div className="Lead5-each-vpr">
      <div className="Lead5-each-vpr-number"><VPR value={rating} /></div>
      <div className="Lead5-each-vpr-name">VPR</div>
    </div>
  </Link>
  );
}

export default LeadMember;