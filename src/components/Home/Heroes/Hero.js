import React from "react";

import { SkeletonWrapper } from "./../../common/Skeleton";
import { Rate }            from "./../../common/ColoredValues";
import AssetLoader         from "./../../common/AssetLoader";

const Hero = ({status, name, value, rank}) => {
  let heroName;

  if (status === "loaded") { 
    heroName = name;
  };

  return (
    <div className={`HeroesMeta-Top Rank-${rank}`}>
      <AssetLoader type="heroes" className="Heroes-Meta-Top-Image" name={heroName}>
        <div className="Heroes-Meta-Top-Image-Tag">{rank}</div>
      </AssetLoader>
      <div className="Heroes-Meta-Top-Name">
        <SkeletonWrapper status={status} width="70px" height="10px">
          {() => name || "Unknown"}
        </SkeletonWrapper>
      </div>
      <span>
        <SkeletonWrapper status={status} width="25px" height="7px">
          {() => <Rate rate={value[Object.keys(value)[0]]} />}
        </SkeletonWrapper>
      </span>
    </div>
  );
}

export default Hero;