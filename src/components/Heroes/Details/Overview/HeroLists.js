import React from "react";
import { Link } from "react-router-dom";
import * as Styled from "./HeroLists.style";
import Box from "../../../common/Box";
import { Rate } from "../../../common/ColoredValues";
import {
  SkeletonPayload,
  SkeletonWrapper,
} from "../../../common/Skeleton";

let TOTAL_COUNTERS = 6;

const Hero = ({ payload, rank }) => (
  <Link to={payload.key ? `/heroes/${payload.key}` : "/heroes"}>
    <span>{rank}</span>
    <Styled.HeroImage type="heroes" name={payload && payload.key} />
    <Styled.Info>
      <SkeletonWrapper>{() => payload.key}</SkeletonWrapper>
    </Styled.Info>
    <span>
      <SkeletonWrapper width={20}>
        {() => <Rate rate={payload.winRate} />}
      </SkeletonWrapper>
    </span>
    <span>
      <SkeletonWrapper width={20}>
        {() => <Rate rate={payload.pickRate} />}
      </SkeletonWrapper>
    </span>
  </Link>
);

const Counter = ({ payload }) => {
  let heroes;
  if (!payload) heroes = SkeletonPayload(TOTAL_COUNTERS);
  else {
    heroes = payload.playingAgainst;
    heroes.sort((a, b) => (a.winRate > b.winRate ? 1 : -1));
    heroes = heroes.slice(0, TOTAL_COUNTERS);
  }

  return (
    <Box.wrap>
      <Box.title>Playing Against</Box.title>
      <Box.body>
        <Styled.List>
          <div>
            <span>#</span>
            <Styled.HeroImage />
            <Styled.Info> Name </Styled.Info>
            <span>Win Rate</span>
            <span>Play Rate</span>
          </div>
          {heroes.map((hero, index) => (
            <Hero
              key={(hero && hero.name) || index}
              payload={hero}
              rank={index + 1}
            />
          ))}
        </Styled.List>
      </Box.body>
      <Box.action />
    </Box.wrap>
  );
};

export default Counter;
