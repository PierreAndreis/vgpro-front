import React from "react";

import Utils from "utils"; 

import {KDA} from "../../common/ColoredValues";
import {VPR}      from "./../../common/Ratings";
import { Link }   from 'react-router-dom';

import {Skeleton, SkeletonContainer} from "../../common/Skeleton";

const Loading = ({data}) => {

  let {position} = data;

  let id = "";

  if (position === 1 || position === "1") {
    id = "featured";
  }

  return (
  <div className="Lead5-each skeletonDiv" id={id}>
    <div className="Lead5-each-pos">{position}</div>
    <div className="Lead5-each-info">
      <div className="Lead5-each-info-name">
        <Skeleton width={60} height={20} />
      </div>
      <div className="Lead5-each-info-skilltier"><Skeleton width={80} height={10} /></div>
      <div className="Lead5-each-info-stats"><Skeleton width={50} height={10} /></div>
    </div>
    <div className="Lead5-each-vpr">
      <div className="Lead5-each-vpr-number"><Skeleton width={70} height={20} /></div>
      <div className="Lead5-each-vpr-name"><Skeleton width={30} height={20} /></div>
    </div>
  </div>
  );
}

const Loaded = ({data}) => {

  let id = "";

  let {
    position,
    name,
    region,
    tier,
    kda,
    rating
  } = data

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
      <div className="Lead5-each-info-stats">
        <span style={{paddingRight: "5px"}}>AVG KDA</span> 
        {/* React dumbessery... need padding right to give space */}
        <KDA kda={kda} />
      </div>
    </div>
    <div className="Lead5-each-vpr">
      <div className="Lead5-each-vpr-number"><VPR value={rating} /></div>
      <div className="Lead5-each-vpr-name">VST</div>
    </div>
  </Link>
  );
}

const LeadMember = SkeletonContainer(Loading, Loaded);

export default LeadMember;