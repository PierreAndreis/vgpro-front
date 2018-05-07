import React from "react";

import * as Styled from "./Stats.style";
import Box from "../../../common/Box";
import { SkeletonWrapper } from "../../../common/Skeleton";

const AllStats = [
  {
    label: "KDA",
    property: "kda",
  },
  {
    label: "Kills",
    property: "killsPerGame",
  },
  {
    label: "Deaths",
    property: "deathsPerGame",
  },
  {
    label: "Assists",
    property: "assistsPerGame",
  },
  {
    label: "Gold/Min",
    property: "goldPerMin",
  },
  {
    label: "Farm",
    property: "farmPerGame",
  },
  {
    label: "Damage",
    property: "damagePerGame",
  },
  {
    label: "Healing",
    property: "healingPerGame",
  },

]

const Stats = ({payload, heroName}) => (

  <Box.wrap>
    <Box.title>Statistics</Box.title>
    <Box.body>
      <Styled.Table>

        <Styled.Row>
          <div>Type</div>
          <div>Average</div>
          <div>Placement</div>
        </Styled.Row>

        {/* <Styled.Row>
          <div>Win Rate</div>
          <div>
            <SkeletonWrapper width={30} height={10}>
              {() => <Rate rate={payload.winRate} />}
            </SkeletonWrapper>
          </div>
          <div>23/49</div>
        </Styled.Row>
        
        <Styled.Row>
          <div>Pick Rate</div>
          <div>
            <SkeletonWrapper width={30} height={10}>
              {() => <Rate rate={payload.pickRate} />}
            </SkeletonWrapper>
          </div>
          <div>23/49</div>
        </Styled.Row>

        <Styled.Row>
          <div>Ban Rate</div>
          <div>
            <SkeletonWrapper width={30} height={10}>
              {() => <Rate rate={payload.banRate} />}
            </SkeletonWrapper>
          </div>
          <div>23/49</div>
        </Styled.Row> */}

        {
          AllStats.map(stat => {
            let rank = "..";
            let total = "..";
            let value = 0;

            if (payload) {
              const stats = payload.stats.find(l => l.name === stat.property);
              rank = stats.rank;
              value = stats.stats;
              total = stats.total;
            }

            return (
              <Styled.Row key={stat.property}>
                <div>{stat.label}</div>
                <div>
                  <SkeletonWrapper width={30} height={10}>
                    {() => value.toLocaleString()}
                  </SkeletonWrapper>
                </div>
                <div>
                  <SkeletonWrapper width={30} height={10}>
                    {() => <React.Fragment>{rank}/{total}</React.Fragment>}
                  </SkeletonWrapper>
                </div>
              </Styled.Row>
            );
          })
        }

      </Styled.Table>
    </Box.body>
  </Box.wrap>
);

export default Stats;