import React from "react";

import * as Styled from "./Stats.style";
import Box from "../../../common/Box";
import { SkeletonWrapper } from "../../../common/Skeleton";
import { Rate } from "../../../common/ColoredValues";

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

        <Styled.Row>
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
        </Styled.Row>

        <Styled.Row>
          <div>Kills</div>
          <div>
            <SkeletonWrapper width={30} height={10}>
              {() => payload.killsPerGame}
            </SkeletonWrapper>
          </div>
          <div>23/49</div>
        </Styled.Row>

        <Styled.Row>
          <div>Deaths</div>
          <div>
            <SkeletonWrapper width={30} height={10}>
              {() => payload.deathsPerGame}
            </SkeletonWrapper>
          </div>
          <div>23/49</div>
        </Styled.Row>

        <Styled.Row>
          <div>Assists</div>
          <div>
            <SkeletonWrapper width={30} height={10}>
              {() => payload.assistsPerGame}
            </SkeletonWrapper>
          </div>
          <div>23/49</div>
        </Styled.Row>


        <Styled.Row>
          <div>Gold/Min</div>
          <div>
            <SkeletonWrapper width={30} height={10}>
              {() => payload.goldPerMin}
            </SkeletonWrapper>
          </div>
          <div>23/49</div>
        </Styled.Row>

      </Styled.Table>
    </Box.body>
  </Box.wrap>
);

export default Stats;