import React from "react";
import { Trans } from "react-i18next";

import { Link } from "react-router-dom";
import * as Styled from "./HeroLists.style";
import Box from "../../../common/Box";
import { Rate } from "../../../common/ColoredValues";
import {
  SkeletonPayload,
  SkeletonWrapper,
} from "../../../common/Skeleton";

let TOTAL_COUNTERS = 5;

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

<<<<<<< HEAD
const Counter = ({ payload }) => {
=======
const Counter = ({ hero, payload }) => {
>>>>>>> 550a391b015ec7375bc89effb5a216452a3c2d75
  let heroes;
  if (!payload) heroes = SkeletonPayload(TOTAL_COUNTERS);
  else {
    heroes = payload.playingAgainst;
    heroes.sort((a, b) => (a.winRate > b.winRate ? 1 : -1));
    heroes = heroes.slice(0, TOTAL_COUNTERS);
  }

  return (
    <Box.wrap>
      <Box.title>
<<<<<<< HEAD
        <Trans i18nKey="heroes.playingAgainst" />
=======
        <Trans i18nKey="heroes.weakAgainst" />
>>>>>>> 550a391b015ec7375bc89effb5a216452a3c2d75
      </Box.title>
      <Box.body>
        <Styled.List>
          <div>
            <span>#</span>
            <Styled.HeroImage />
            <Styled.Info>
<<<<<<< HEAD
              {" "}
              <Trans i18nKey="terms.name" />{" "}
=======
              <Trans i18nKey="terms.name" />
>>>>>>> 550a391b015ec7375bc89effb5a216452a3c2d75
            </Styled.Info>
            <span>
              <Trans i18nKey="terms.winrate" />
            </span>
            <span>
              <Trans i18nKey="terms.pickrate" />
            </span>
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
      <Box.action>
<<<<<<< HEAD
        <Box.button>
          <Trans i18nKey="general.Back" />
        </Box.button>
        <Box.button>
          <Trans i18nKey="general.Next" />
        </Box.button>
=======
        <Link to={`/heroes/${hero}/heroes`}>
          <Box.button>
            <Trans i18nKey="general.More" />
          </Box.button>
        </Link>
>>>>>>> 550a391b015ec7375bc89effb5a216452a3c2d75
      </Box.action>
    </Box.wrap>
  );
};

export default Counter;
