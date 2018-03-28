import React from "react";

import { SkeletonWrapper } from "./../../common/Skeleton";
import { Rate }            from "./../../common/ColoredValues";

import * as Styled from "./Hero.style.js";

const Hero = ({status, name, value, rank}) => {
  let heroName;

  if (status === "loaded") { 
    heroName = name;
  };

  return (
    <Styled.Each rank={rank}>
      <Styled.HeroImage rank={rank} type="heroes" name={heroName}>
        <Styled.HeroTag rank={rank}>
          {rank}
        </Styled.HeroTag>
      </Styled.HeroImage>
      <Styled.Name>
        <SkeletonWrapper status={status} width="70px" height="10px">
          {() => name || "Unknown"}
        </SkeletonWrapper>
      </Styled.Name>
      <Styled.Percentage>
        <SkeletonWrapper status={status} width="25px" height="7px">
          {() => <Rate rate={value} />}
        </SkeletonWrapper>
      </Styled.Percentage>
    </Styled.Each>
  );
}

export default Hero;