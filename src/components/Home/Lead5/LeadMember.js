import React from "react";

import Utils from "utils"; 

import {KDA} from "../../common/ColoredValues";
import {VPR}      from "./../../common/Ratings";

import {Skeleton, SkeletonContainer, SkeletonWrapper} from "../../common/Skeleton";

import * as Styled from "./LeadMember.style";

// const Loading = ({data}) => {

//   let {position} = data;

//   let id = "";

//   if (position === 1 || position === "1") {
//     id = "featured";
//   }

//   return (
//   <div className="Lead5-each skeletonDiv" id={id}>
//     <div className="Lead5-each-pos">{position}</div>
//     <div className="Lead5-each-info">
//       <div className="Lead5-each-info-name">
//         <Skeleton width={60} height={20} />
//       </div>
//       <div className="Lead5-each-info-skilltier"><Skeleton width={80} height={10} /></div>
//       <div className="Lead5-each-info-stats"><Skeleton width={50} height={10} /></div>
//     </div>
//     <div className="Lead5-each-vpr">
//       <div className="Lead5-each-vpr-number"><Skeleton width={70} height={20} /></div>
//       <div className="Lead5-each-vpr-name"><Skeleton width={30} height={20} /></div>
//     </div>
//   </div>
//   );
// }

const LeadMember = ({status, data, mode}) => {

  let id = "";
  let link = "/";

  let {position} = data;

  if (position === 1 || position === "1") {
    id = "featured";
  }

  if (status === "loaded") {
    if (data.name) {
      link = Utils.goToPlayer(data.name);
    }
  }

  return (
    <Styled.Wrapper to={link}>

      <Styled.Position>{position}</Styled.Position>

      <Styled.Info>

        <Styled.Name>
          <SkeletonWrapper status={status} width={60} height={20}>
            {() => (
              <React.Fragment>
                {data.name}
                <span>{Utils.transformRegion(data.region)}</span>
              </React.Fragment>
            )}
          </SkeletonWrapper>
        </Styled.Name>

        <Styled.SkillTier>
          <SkeletonWrapper status={status} width={80} height={10}>
            {() => Utils.getSkillTier(data.tier)}
          </SkeletonWrapper>
        </Styled.SkillTier>

        <Styled.Stats>
          <span style={{paddingRight: "5px"}}>AVG KDA</span> 
          {/* React dumbessery... need padding right to give space */}
          <SkeletonWrapper status={status} width={30} height={10}>
            {() => <KDA kda={data.kda} />}
          </SkeletonWrapper>
        </Styled.Stats>

      </Styled.Info>
      <Styled.Points>
        <div className="Lead5-each-vpr-number">
          <SkeletonWrapper status={status} width={70} height={20}>
            {() => <VPR value={data.points} />}
          </SkeletonWrapper>
        </div>
        <Styled.PointsName>
          {mode === "ranked" ? "Rank" : "Blitz"} <br /> Points
        </Styled.PointsName>
      </Styled.Points>
    </Styled.Wrapper>
  );
}

// const LeadMember = SkeletonContainer(Loading, Loaded);

export default LeadMember;