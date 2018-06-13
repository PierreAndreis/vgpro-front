import React from "react";
import { Trans } from "react-i18next";
import Utils from "utils";

import { KDA } from "../../common/ColoredValues";
import { VPR } from "./../../common/Ratings";

import { SkeletonWrapper } from "../../common/Skeleton";

import * as Styled from "./LeadMember.style";

const LeadMember = ({ status, data, mode }) => {
  let link = "/";

  if (status === "loaded") {
    if (data.name) {
      link = Utils.goToPlayer(data.name);
    }
  }

  return (
    <Styled.Wrapper to={link}>
      <Styled.Position>{data.position}</Styled.Position>

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
            {() => Utils.getSkillTier(Utils.getTier(data.points))}
          </SkeletonWrapper>
        </Styled.SkillTier>

        <Styled.Stats>
          <span style={{ paddingRight: "5px" }}>
            <Trans i18nKey="terms.AVG" /> <Trans i18nKey="terms.KDA" />
          </span>
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
          <Trans i18nKey="terms.Points" />
        </Styled.PointsName>
      </Styled.Points>
    </Styled.Wrapper>
  );
};

export default LeadMember;
