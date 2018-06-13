import React from "react";

import { Trans } from "react-i18next";

import * as Styled from "./Stats.style";
import Box from "../../../common/Box";
import { SkeletonWrapper } from "../../../common/Skeleton";

// CompareBox depends on it
export const AllStats = [
  {
    label: "terms.KDA",
    property: "kda",
  },
  {
    label: "terms.Kills",
    property: "killsPerGame",
  },
  {
    label: "terms.Deaths",
    property: "deathsPerGame",
  },
  {
    label: "terms.Assists",
    property: "assistsPerGame",
  },
  {
    label: "terms.goldMin",
    property: "goldPerMin",
  },
  {
    label: "terms.cs",
    property: "farmPerGame",
  },
  {
    label: "terms.DamageDone",
    property: "damagePerGame",
  },
  {
    label: "terms.HealingDone",
    property: "healingPerGame",
  },
];

const Stats = ({ payload, heroName }) => (
  <Box.wrap>
    <Box.title>
      <Trans i18nKey="terms.OverallStats" />
    </Box.title>
    <Box.body>
      <Styled.Table>
        <Styled.Row>
          <div>
            <Trans i18nKey="terms.type" />
          </div>
          <div>
            <Trans i18nKey="terms.average" />
          </div>
          <div>
            <Trans i18nKey="terms.placement" />
          </div>
        </Styled.Row>

        {AllStats.map(stat => {
          let rank = "..";
          let total = "..";
          let value = 0;

          if (payload) {
            const stats = payload.stats.find(
              l => l.name === stat.property
            );
            rank = stats.rank;
            value = stats.stats;
            total = stats.total;
          }

          return (
            <Styled.Row key={stat.property}>
              <div>
                <Trans i18nKey={stat.label} />
              </div>
              <div>
                <SkeletonWrapper width={30} height={10}>
                  {() => value.toLocaleString()}
                </SkeletonWrapper>
              </div>
              <div>
                <SkeletonWrapper width={30} height={10}>
                  {() => (
                    <React.Fragment>
                      {rank}/{total}
                    </React.Fragment>
                  )}
                </SkeletonWrapper>
              </div>
            </Styled.Row>
          );
        })}
      </Styled.Table>
    </Box.body>
  </Box.wrap>
);

export default Stats;
