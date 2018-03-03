import React from "react";
import Box from "./../../common/Box";

import ErrorScreen from "../../common/ErrorScreen";

import {KDA, Rate} from "../../common/ColoredValues";

import PieChart from "../../common/Charts/PieChart";
import * as Styled from "./RecentRoles.style.js";

import {SkeletonWrapper, SkeletonPayload} from "../../common/Skeleton";


const Role = ({status, role}) => {

  let chartData;

  if (status === "loaded") {
    let lowerName = role.name.toLowerCase();

    chartData = [
      { value: parseFloat(role.winRate), fill: `url(#${lowerName})`}
    ]
  }

  return (
     <Styled.Role>

      <Styled.IconChart>
        <SkeletonWrapper status={status} width="65px" height="65px" borderRadius="50%">
          {() => (  
          <PieChart data={chartData} width={80}>
            <Styled.Icon role={role.name}/>
          </PieChart>
          )}
        </SkeletonWrapper>
      </Styled.IconChart>

      <Styled.Stats>
        <div>
        <SkeletonWrapper status={status} width="80px" height="20px">
          {() => (
            <React.Fragment>
              <KDA kda={role.kda} /> KDA
            </React.Fragment>
          )}
        </SkeletonWrapper>
        </div>

        <span>
          <SkeletonWrapper status={status} width="100px" height="25px">
            {() => (
              <React.Fragment>
                <Styled.KDAIcon icon="kills">{role.avgKills}</Styled.KDAIcon>
                <Styled.KDAIcon icon="deaths">{role.avgDeaths}</Styled.KDAIcon>
                <Styled.KDAIcon icon="assists">{role.avgAssists}</Styled.KDAIcon>
              </React.Fragment>
            )}
          </SkeletonWrapper>
        </span>
      </Styled.Stats>

      <Styled.WR>
        <div>
        <SkeletonWrapper status={status} width="60px" height="20px">
          {() => <Rate rate={role.winRate} />}
        </SkeletonWrapper>
        </div>
        <span>
          <SkeletonWrapper status={status} width="90px" height="15px">
            {() => (
              <React.Fragment>
                {role.games} played
              </React.Fragment>
            )}
            </SkeletonWrapper>
          </span>
      </Styled.WR>
    </Styled.Role>
  )
};

const RecentRoles = ({t, status, data}) => {

  let payload;
  let content = [];

  if (status === "loaded" && (data && data.stats && data.stats.Roles)) {

    let roles = data.stats.Roles;
    roles = roles.slice(0, 5);
    payload = roles;
  }
  else if (status === "loading") {
    payload = SkeletonPayload(3);
  }
  else {
    return <ErrorScreen />;
  }

  payload.forEach((role, index) => {
    content.push(<Role key={index} status={status} role={role} />);
  });

  return (
    <Styled.Wrap>
    <Box.title>Recent Roles</Box.title>
    <Styled.Content>
      <div className="PlayerRoles">
        {content}
      </div>
    </Styled.Content>
    </Styled.Wrap>
  )
}

export default RecentRoles;